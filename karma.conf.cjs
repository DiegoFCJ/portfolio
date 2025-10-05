const { join } = require('node:path');

let chromeExecutablePath = process.env.CHROME_BIN;

try {
  chromeExecutablePath = require('puppeteer').executablePath();
} catch (error) {
  try {
    const puppeteerPath = require.resolve('puppeteer');
    chromeExecutablePath = require(puppeteerPath).executablePath();
  } catch (resolveError) {
    if (resolveError.code !== 'MODULE_NOT_FOUND') {
      throw resolveError;
    }
  }
}

if (chromeExecutablePath) {
  process.env.CHROME_BIN = chromeExecutablePath;
} else {
  delete process.env.CHROME_BIN;
}

const chromeHeadlessFlags = ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

if (!process.env.CHROME_BIN && chromeExecutablePath) {
  process.env.CHROME_BIN = chromeExecutablePath;
}

module.exports = function (config) {
  const requestedBrowsers =
    config.browsers && config.browsers.length > 0
      ? Array.isArray(config.browsers)
        ? config.browsers
        : String(config.browsers)
            .split(',')
            .map((browser) => browser.trim())
            .filter(Boolean)
      : undefined;

  const browsers = (requestedBrowsers || ['ChromeHeadlessNoSandbox']).map((browser) =>
    browser === 'ChromeHeadless' ? 'ChromeHeadlessNoSandbox' : browser,
  );

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: join(__dirname, './coverage/portfolio'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers,
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: chromeHeadlessFlags,
        executablePath: chromeExecutablePath,
      },
      ChromeHeadlessPuppeteer: {
        base: 'ChromeHeadless',
        flags: chromeHeadlessFlags,
        executablePath: chromeExecutablePath,
      },
    },
  });
};
