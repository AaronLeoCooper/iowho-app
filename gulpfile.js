/**
 * Gulpfile for automating build tasks for development & production
 */

const env = process.env.NODE_ENV || 'development'
const isPlaceholder = env === 'placeholder'
const isProduction = isPlaceholder || env === 'production'
const uniqueHash = (new Date()).getTime()

const path = require('path')
const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const size = require('gulp-size')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const autoprefixerBrowsers = [ 'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 23', 'ios >= 6', 'android >= 4.4', 'bb >= 10' ]
const runSequence = require('run-sequence')

const cssName = `app.${uniqueHash}.css`
const jsName = `bundle.${uniqueHash}.js`

const root = __dirname
const srcDir = path.join(root, 'src')
const outputDir = isProduction ? path.join(root, 'public_html') : path.join(root, 'dist/development')

const srcPath = {
  scripts: path.join(srcDir, 'scripts'),
  styles: path.join(srcDir, 'styles'),
  images: path.join(srcDir, 'images'),
  fonts: path.join(srcDir, 'fonts'),
  pug: srcDir,
  htaccess: srcDir,
  robots: srcDir,
  html: srcDir
}

const distPath = {
  scripts: path.join(outputDir, 'assets', 'scripts'),
  styles: path.join(outputDir, 'assets', 'styles'),
  images: path.join(outputDir, 'assets', 'images'),
  fonts: path.join(outputDir, 'assets', 'fonts'),
  pug: outputDir,
  htaccess: outputDir,
  robots: outputDir,
  html: outputDir
}

const webpack = require('webpack')
const webpackConfigSrc = './webpack/config.build'
const webpackConfig = require(webpackConfigSrc)(distPath.scripts, jsName)

gutil.log(` --- Gulp running for: ${env} --- `)
gutil.log(` --- Webpack config loaded: ${webpackConfigSrc} --- `)

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded' // Production compression we'll leave up to csso
}

const cssoOptions = {
  sourceMap: true
}

gulp.task('sass', function () {
  return gulp.src(path.join(srcPath.styles, 'app.scss'))
    .pipe(!isProduction ? sourcemaps.init() : gutil.noop())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(!isProduction ? sourcemaps.write() : gutil.noop())
    .pipe(rename(cssName))
    .pipe(isProduction ? csso(cssoOptions) : gutil.noop()) // Production compression
    .pipe(gulp.dest(distPath.styles))
    .pipe(size({ title: 'sass' }))
})

gulp.task('images', function (cb) {
  return gulp.src(path.join(srcPath.images, '**/*'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(gulp.dest(distPath.images))
    .pipe(size({ title: 'images' }))
})

gulp.task('fonts', function (cb) {
  return gulp.src(path.join(srcPath.fonts, '**/*'))
    .pipe(!isProduction ? plumber() : gutil.noop())
    .pipe(gulp.dest(distPath.fonts))
    .pipe(size({ title: 'fonts' }))
})

gulp.task('htaccess', function (cb) {
  return gulp.src(path.join(srcPath.htaccess, '.htaccess'))
    .pipe(gulp.dest(distPath.htaccess))
    .pipe(size({ title: 'htaccess' }))
})

gulp.task('robots', function (cb) {
  return gulp.src(path.join(srcPath.robots, 'robots.txt'))
    .pipe(gulp.dest(distPath.robots))
    .pipe(size({ title: 'robots' }))
})

gulp.task('pug', function (cb) {
  return gulp.src(path.join(srcPath.pug, isPlaceholder ? 'placeholder.pug' : 'build.index.pug'))
    .pipe(pug({
      locals: { cssName: cssName, jsName: jsName },
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(distPath.pug))
    .pipe(size({ title: 'pug' }))
})

const webpackBuild = (cb) => {
  return (err, stats) => {
    if (err) {
      gutil.log('Webpack Build Error', err)
      if (cb) cb()
    } else {
      Object.keys(stats.compilation.assets).forEach(function (key) {
        gutil.log('Webpack: output ', gutil.colors.green(key))
      })
      gutil.log('Webpack: ', gutil.colors.blue('finished'))
      if (cb) cb()
    }
  }
}

gulp.task('webpack-build', function (cb) {
  webpack(webpackConfig).run(webpackBuild(cb))
})

gulp.task('clean', function (cb) {
  return del(path.join(outputDir, '/*'), { force: true }, cb)
})

// build:dev
gulp.task('build:dev', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:dev ]')
  runSequence(['pug', 'sass', 'images', 'fonts'], 'webpack-build', cb)
})

// build:prod
gulp.task('build:prod', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:prod ]')
  runSequence(['pug', 'htaccess', 'robots', 'sass', 'images', 'fonts'], 'webpack-build', cb)
})

// build:placeholder
gulp.task('build:placeholder', ['clean'], function (cb) {
  gutil.log('gulp - running task: [ build:placeholder ]')
  runSequence(['pug', 'htaccess', 'robots', 'sass', 'images', 'fonts'], cb)
})
