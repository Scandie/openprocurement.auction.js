const gulp          = require('gulp'),
      git           = require('gulp-git'),
      notify        = require('gulp-notify'),
      del           = require('del'),
      concat        = require('gulp-concat'),
      vendorFiles   = require('gulp-main-bower-files'),
      minify        = require('gulp-minify'),
      gulpFilter    = require('gulp-filter'),
      source        = require('vinyl-source-stream'),
      cleanCSS      = require('gulp-clean-css'),
      browserify    = require('browserify'),
      babelify      = require('babelify'),
      ngAnnotate    = require('browserify-ngannotate'),
      fileinclude   = require('gulp-file-include'),
      uglify        = require('gulp-uglify'),
      rename        = require("gulp-rename"),
      fs            = require("fs"),
      merge         = require('merge-stream'),
      server        = require('karma').Server;

function  interceptErrors(error) {
  let args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}



const config = JSON.parse(fs.readFileSync('./config.json'));


// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
gulp.task('clonesub', () => {
  return git.clone(
      /*'https://github.com/openprocurement/'+*/config.procurementMethodType,
      {args: './'}).on('error', interceptErrors);
});

gulp.task('fonts', () => {
  return gulp.src(config.fonts)
    .on('error', interceptErrors)
    .pipe(gulp.dest(config.buildDir+'/fonts/'));
});


gulp.task('png-images', () => {
  return gulp.src(config.img.png)
    .on('error', interceptErrors)
    .pipe(gulp.dest(config.buildDir));
});


gulp.task('icons', () => {
  return gulp.src(config.img.icons)
    .on('error', interceptErrors)
    .pipe(gulp.dest(config.buildDir+'/img/'));
});


gulp.task('bower-main', () => {
  return allJs = gulp.src('./bower.json')
      .pipe(vendorFiles({
        base: "src/lib",}))
      .pipe(gulpFilter(['**/*.js']))
      .pipe(gulp.dest(config.buildDir + '/vendor/'));
});


gulp.task('all-js', ['bower-main'], () => {
  return gulp.src([
    config.buildDir + '/vendor/**/*.js',
    './src/lib/moment/locale/uk.js',
    './src/lib/moment/locale/ru.js',
    './src/lib/puchdb/**/*.js',
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.buildDir));
});


gulp.task('css', () => {
  return gulp.src(config.styles)
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS())
    .on('error', interceptErrors)
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('htmlPages', () => {
  return merge(config.html.map((page) => {
    return gulp.src('./templates/base.html')
    .pipe(fileinclude({
      prefix: '@@',
      indent: true,
      context: {
        title: page.title,
        name: page.name,
        scripts: page.scripts,
	controller: page.controller,
        db_url: config.dbUrl,
        auctions_server: config.auctions_server
      }}))
    .on('error', interceptErrors)
    .pipe(rename(page.name +'.html'))
    .pipe(gulp.dest(config.buildDir));

  }));
});


gulp.task('listingApp', () => {
  return gulp.src(['./src/app/index.js',
    './src/app/config.js',
    './src/app/controllers/ListingCtrl.js'
    ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('archiveApp', () => {
  return gulp.src(['./src/app/archive.js',
    './src/app/config.js',
    './src/app/controllers/ArchiveCtl.js'])
    .pipe(concat('archive.js'))
    .pipe(gulp.dest(config.buildDir));
});



gulp.task('auctionApp', () => {
    return gulp.src(['./src/app/auction.js',
      './src/app/filters/*.js',
      './src/app/translations.js',
      './src/app/config.js',
      './src/app/factories/*.js',
      './src/app/controllers/AuctionCtl.js',
      './src/app/controllers/OffCanvasCtl.js',
      './src/app/directives/*.js'])
    .pipe(concat('auction.js'))
    .pipe(gulp.dest(config.buildDir));
});


gulp.task('build', ['all-js', 'css', 'png-images', 'icons', 'htmlPages', 'listingApp', 'archiveApp', 'auctionApp', 'fonts'], () => {

  let css = gulp.src(`${config.buildDir}/bundle.css`)
      .pipe(gulp.dest(config.outDir + '/static/css/'));

  let listPage = gulp.src(`${config.buildDir}/index.html`)
      .pipe(gulp.dest(config.outDir));

  let listApp = gulp.src(`${config.buildDir}/index.js`)
      .pipe(gulp.dest(config.outDir + '/static/'));

  let vendor_js = gulp.src(`${config.buildDir}/vendor.js`)
      .pipe(gulp.dest(config.outDir + '/static/'));

  let archivePage = gulp.src(`${config.buildDir}/archive.html`)
      .pipe(gulp.dest(config.outDir));

  let archiveApp = gulp.src(`${config.buildDir}/archive.js`)
      .pipe(gulp.dest(config.outDir + '/static/'));

  let auctionPage = gulp.src(`${config.buildDir}/tender.html`)
      .pipe(gulp.dest(config.outDir));

  let auctionApp = gulp.src(`${config.buildDir}/auction.js`)
      .pipe(gulp.dest(config.outDir + '/static/'));

  let png = gulp.src("build/*.png")
      .pipe(gulp.dest(config.outDir));

  let icons = gulp.src("build/img/*.png")
      .pipe(gulp.dest(config.outDir+'/img/'));


  let fonts = gulp.src("build/fonts/*")
      .pipe(gulp.dest(config.outDir+'/static/fonts/'));
 
  let fonts2 = gulp.src("build/fonts/*")
      .pipe(gulp.dest(config.outDir+'/fonts/'));


  return merge(css, png, fonts, vendor_js, listPage, listApp, auctionPage, auctionApp, archivePage, archiveApp, fonts, fonts2, icons);
});


gulp.task('default', ['build']);

gulp.task('clean', function () {
  del.sync([config.buildDir + '*/**', config.outDir + '*/**'], {force: true});
});

gulp.task('test', function(done) {
  new server({
    configFile:__dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
