
var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename'),

	//
	browserSync = require('browser-sync').create()


gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost/compost_lp/",
		notify: false
	});
});

gulp.task('watch', ['css-libs', 'scripts','browser-sync' ], function () {
	gulp.watch('assets/_css/**/*.+(css|sass|scss)', ['css-libs']);
	gulp.watch('assets/_js/**/*.js', ['scripts']);

    gulp.watch('assets/style.css', browserSync.reload);

    gulp.watch('assets/**/*.js').on("change", browserSync.reload);
    gulp.watch('assets/**/*.php').on('change', browserSync.reload);
});

// SASS

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('assets/_css/master.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('assets/_css/'));
});

// Css to one file
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('assets/_css/master.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({basename: "style"}))
        .pipe(gulp.dest('assets/')); // Выгружаем в папку assets/css
});
// Scripts

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'assets/_js/**/*.js', // Берем js
        ])
        .pipe(concat('scripts.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('assets/')); // Выгружаем в папку assets/js
});




gulp.task('default', ['browser-sync', 'watch']);