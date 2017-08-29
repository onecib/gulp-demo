const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// logs Message
gulp.task('message', () =>{
    console.log('Gulp s running');
});

// copy all HTML Files
gulp.task('copyHtml', ()=> {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

// Optimize Images
gulp.task('imageMin', ()=> {
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

// minify JS
gulp.task('minify', ()=> {
    gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// compile SASS
gulp.task('sass', ()=> {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

// Scripts
gulp.task('scripts', ()=> {
    gulp.src('./src/js/*.js')
    .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// the default task
gulp.task('default', [
                'message',
                'copyHtml',
                'imageMin',
                'sass',
                'scripts']
);

// watch the files
gulp.task('watch', function(){
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/images/*', ['imageMin']);
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['copyHtml']);
})
