var uglify = require('gulp-uglify');

var gulp = require('gulp');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css');

var concatJs = require('gulp-concat');
/**
 * <link rel="stylesheet" type="text/css" href="{{url('sitio')}}/css/library/bootstrap.min.css">
 <link rel="stylesheet" type="text/css" href="{{url('sitio')}}/css/library/font-awesome.min.css">
 <link rel="stylesheet" type="text/css" href="{{url('sitio')}}/css/library/owl.carousel.css">
 <link rel="stylesheet" type="text/css" href="{{url('sitio')}}/css/md-font.css">
 <link rel="stylesheet" type="text/css" href="{{url('sitio')}}/css/style.css">
 */
gulp.task('css', function () {
    gulp.src([
        'public/assets/materialize/css/style.css',
        'public/assets/css/swal.css',
        'public/vendor/angular/toaster/toaster.css'
    ])
        .pipe(concatCss("controlplus.min.css"))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('public/assets/css/'))
        .pipe(notify("Ha finalizado la task css!"));
});
gulp.task('sitio-css', function () {
    gulp.src([
        'public/sitio/css/library/bootstrap.min.css',
        'public/sitio/css/library/font-awesome.min.css',
        'public/sitio/css/library/owl.carousel.css',
        'public/sitio/css/md-font.css',
        'public/sitio/css/css/style.css',
        'public/vendor/angular/toaster/toaster.css'

    ])
        .pipe(concatCss("sitio.min.css"))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('public/sitio/css/'))
        .pipe(notify("Ha finalizado la task css!"));
});
gulp.task('js', function () {
    return gulp.src([
        'public/vendor/jquery/jquery.min.js',
        'public/vendor/angular/angular.js',
        'public/vendor/angular/redactor.js',
        'public/vendor/modules/redactor.js',
        'public/vendor/ng-map.min.js',
        'public/vendor/angular/angular-animate/angular-animate.js',
        'public/vendor/angular/angular-cookies/angular-cookies.js',
        'public/vendor/angular/angular-resource/angular-resource.js',
        'public/vendor/angular/angular-sanitize/angular-sanitize.js',
        'public/vendor/angular/angular-touch/angular-touch.js',
        'public/vendor/angular/angular-ui-router/angular-ui-router.js',
        'public/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/vendor/angular/ngstorage/ngStorage.js',
        "public/vendor/angular/oclazyload/ocLazyLoad.js",
        'public/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/vendor/angular/angular-translate/angular-translate.js',
        'public/vendor/angular/angular-translate/loader-static-files.js',
        'public/vendor/angular/angular-translate/storage-cookie.js',
        'public/vendor/angular/angular-translate/storage-local.js',
        'public/vendor/angular/infinite-scroll.js',
        'public/vendor/swet.js',
        'public/vendor/swet-angular.js',
        'public/vendor/angular/satellizer.js',
        'public/vendor/angular/toaster/toaster.js'
    ])
        .pipe(uglify())
        .pipe(concatJs('gicdt.min.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(notify("Ha finalizado la minificacion de todos los archivos js!"));
});
/**

 */
gulp.task('sitio-js', function () {
    return gulp.src([
        'public/vendor/jquery/jquery.min.js',
        'public/vendor/angular/angular.js',
        'public/vendor/angular/angular-resource/angular-resource.js',
        'public/vendor/angular/angular-touch/angular-touch.js',
        'public/vendor/angular/angular-ui-router/angular-ui-router.js',
        "public/vendor/angular/oclazyload/ocLazyLoad.js",
        'public/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/vendor/angular/satellizer.js',
        'public/vendor/angular/toaster/toaster.js'
    ])
        .pipe(uglify())
        .pipe(concatJs('sitio.min.js'))
        .pipe(gulp.dest('public/sitio/js/'))
        .pipe(notify("Ha finalizado la minificacion de todos los archivos js!"));
});
gulp.task('directives', function () {
    return gulp.src([
        'public/js/services/ui-load.js',
        'public/js/filters/fromNow.js',
        'public/js/directives/setnganimate.js',
        'public/js/directives/ui-butterbar.js',
        'public/js/directives/ui-focus.js',
        'public/js/directives/ui-fullscreen.js',
        'public/js/directives/ui-jq.js',
        'public/js/directives/ui-module.js',
        'public/js/directives/ui-nav.js',
        'public/js/directives/ui-scroll.js',
        'public/js/directives/ui-shift.js',
        'public/js/directives/ui-toggleclass.js',
        'public/js/directives/ui-validate.js',

    ])
        .pipe(uglify())
        .pipe(concatJs('directives.min.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(notify("Ha finalizado la minificacion de todos los archivos js!"));
});

gulp.task('sitio', ['sitio-js', 'sitio-css']);
gulp.task('min', ['js', 'css', 'directives','sitio']);
