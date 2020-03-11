const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')

gulp.task('sass', () => {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './src'
  })

  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
    ['sass']
  )

  gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('js', () => {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/scrollreveal/dist/scrollreveal.js',
      'node_modules/angular-1.7.8/angular.min.js',
      'node_modules/angular-1.7.8/angular-route.js',
      'node_modules/angular-1.7.8/angular-sanitize.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
})

/*
gulp.task('font-awesome', () => {
  return gulp
    .src('node_modules/font-awesome/css/font-awesome.css')
    .pipe(gulp.dest('src/css'))
})

gulp.task('fonts', () => {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
})
*/
gulp.task('default', ['serve','js'])
