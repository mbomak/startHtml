var gulp = require('gulp');
var image = require('gulp-image');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var notify = require("gulp-notify");


// Images

gulp.task('app.images', function() {
    gulp.src(['app/img/*'])
        .pipe(image())
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload());
});

// Scripts

gulp.task('app.scripts', function() {
    gulp.src(['app/js/*.js'])
        .pipe(concat('scripts.common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});


// Styles

gulp.task('app.styles', function() {
    gulp.src(['app/scss/*.scss'])
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoprefixer({browsers:['last 10 version', 'last 10 Chrome version', 'IE 9'], cascade: false}))
        .pipe(concat('styles.common.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload());  
});

// Watch

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('app/js/*.js', ['app.scripts']);
    gulp.watch('app/scss/*.scss', ['app.styles']);
    gulp.watch('app/img/*.*', ['app.images']);
});


//-===GULP===-

gulp.task('default',[
    'app.scripts',
    'app.styles',
    'app.images',
    'watch'
]);