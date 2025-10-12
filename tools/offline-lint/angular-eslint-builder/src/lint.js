const { createBuilder } = require('@angular-devkit/architect');
const path = require('node:path');
const fs = require('node:fs');
const ts = require('typescript');

function loadConfig(workspaceRoot, configPath) {
  const resolved = path.resolve(workspaceRoot, configPath ?? '.eslintrc.json');
  if (!fs.existsSync(resolved)) {
    return {
      ignorePatterns: [],
      rules: {
        noExplicitAny: true,
        noConsoleLog: true,
      },
    };
  }

  try {
    const raw = fs.readFileSync(resolved, 'utf8');
    const parsed = JSON.parse(raw);
    const rules = parsed.rules ?? {};
    return {
      ignorePatterns: Array.isArray(parsed.ignorePatterns) ? parsed.ignorePatterns : [],
      rules: {
        noExplicitAny: rules.noExplicitAny !== false,
        noConsoleLog: rules.noConsoleLog !== false,
      },
    };
  } catch (error) {
    throw new Error(`Failed to read lint configuration at ${resolved}: ${error.message}`);
  }
}

function lintTypeScript(file, source, config) {
  const issues = [];

  function report(node, message) {
    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart());
    issues.push({
      file,
      line: line + 1,
      column: character + 1,
      message,
    });
  }

  function checkNode(node) {
    if (config.rules.noExplicitAny && node.kind === ts.SyntaxKind.AnyKeyword) {
      report(node, 'Unexpected any type.');
    }

    if (
      config.rules.noConsoleLog &&
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText(source) === 'console' &&
      node.expression.name.getText(source) === 'log'
    ) {
      report(node.expression.name, 'Unexpected console.log call.');
    }

    ts.forEachChild(node, checkNode);
  }

  checkNode(source);
  return issues;
}

function lintHtml(file, content, config) {
  const issues = [];
  if (config.rules.noConsoleLog && content.includes('console.log')) {
    const index = content.indexOf('console.log');
    const snippet = content.slice(0, index);
    const line = snippet.split(/\r?\n/).length;
    const lastLine = snippet.split(/\r?\n/).pop() || '';
    issues.push({
      file,
      line,
      column: lastLine.length + 1,
      message: 'Unexpected console.log usage inside template.',
    });
  }
  return issues;
}

async function lint(options, context) {
  const workspaceRoot = context.workspaceRoot;
  const config = loadConfig(workspaceRoot, options.configPath);
  const excludePatterns = config.ignorePatterns.map((pattern) => path.join(workspaceRoot, pattern));
  const includes = options.lintFilePatterns && options.lintFilePatterns.length
    ? options.lintFilePatterns
    : ['src/**/*.ts', 'src/**/*.html'];
  const discovered = ts.sys.readDirectory(
    workspaceRoot,
    ['.ts', '.html'],
    excludePatterns,
    includes.map((pattern) => path.join(workspaceRoot, pattern))
  );
  const files = Array.from(new Set(discovered.map((entry) => path.resolve(entry))));

  const findings = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (file.endsWith('.ts')) {
      const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
      findings.push(...lintTypeScript(file, source, config));
    } else if (file.endsWith('.html')) {
      findings.push(...lintHtml(file, content, config));
    }
  }

  if (findings.length === 0) {
    context.logger.info('✔ Linting completed without findings.');
    return { success: true };
  }

  for (const issue of findings) {
    context.logger.error(`${path.relative(workspaceRoot, issue.file)}:${issue.line}:${issue.column} ${issue.message}`);
  }

  context.logger.error(`✖ ${findings.length} lint issue${findings.length === 1 ? '' : 's'} detected.`);
  return { success: false };
}

module.exports = createBuilder(lint);
