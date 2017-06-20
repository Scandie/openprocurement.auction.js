// Karma configuration
// Generated on Tue Jun 06 2017 16:26:07 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './src/lib/angular/angular.js',
      './src/lib/event-source-polyfill/eventsource.js',
      './src/lib/pouchdb/dist/pouchdb.min.js',
      './src/lib/angular-mocks/angular-mocks.js',
      //'./src/lib/pouchdb/dist/pouchdb.localstorage.js',
      './src/lib/angular-cookies/angular-cookies.js',
      './src/lib/angular-translate/*.js',
      './src/lib/angular-translate-storage-cookie/*.js',
      './src/lib/angular-translate-storage-local/*.js',
      './src/lib/angular-timer/dist/*.js',
      './src/lib/angular-bootstrap/ui-bootstrap.js',
      './src/lib/angular-growl-2/build/*.js',
      './src/lib/angular-ellipses/src/*.js',
      './src/lib/angular-gtm-logger/*.js',
      './src/lib/mathjs/dist/*.js',
      //'./src/lib/moment/*.js',
      //'./src/lib/moment-timezone/*.js',
      './dynamic_src/src/app/auction.js',
      './dynamic_src/src/app/translations.js',
      './dynamic_src/src/app/config.js',
      './dynamic_src/src/app/factories/*.js',
      './dynamic_src/src/app/controllers/*.js',
      './dynamic_src/src/app/filters/*.js',
      './dynamic_src/src/app/directives/*.js',
      //'test-main.js',
      './dynamic_src/src/app/tests/auction_data_samples.js',
      './dynamic_src/src/app/tests/auction_utils.spec.js',
      './dynamic_src/src/app/tests/controllers.spec.js',
      './dynamic_src/src/app/tests/filters.spec.js',
      './dynamic_src/src/app/tests/utils.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
