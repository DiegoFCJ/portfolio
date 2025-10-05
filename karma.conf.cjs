const { existsSync } = require('node:fs');
const { join } = require('node:path');

const chromeExecutablePath =
  process.env.CHROME_BIN ||
  (existsSync(join(__dirname, 'node_modules', 'puppeteer'))
    ? require('puppeteer').executablePath()
    : undefined);

const chromeHeadlessFlags = ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

if (!process.env.CHROME_BIN && chromeExecutablePath) {
  process.env.CHROME_BIN = chromeExecutablePath;
}

module.exports = function (config) {
  const requestedBrowsers = config.browsers && config.browsers.length > 0 ? config.browsers : undefined;
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
