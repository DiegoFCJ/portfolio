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

module.exports = function (config) {
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
    browsers: ['ChromeHeadlessPuppeteer'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessPuppeteer: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
        executablePath: chromeExecutablePath,
      },
    },
  });
};
