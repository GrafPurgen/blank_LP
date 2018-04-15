
var gulp 		= require('gulp'),
	del 		= require('del'),
	sass 		= require('gulp-sass'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename'),
	concatCss 	= require('gulp-concat-css'),
	autoprefix 	= require('gulp-autoprefixer'),
	cache  		= require('gulp-cache'),
	//
	browserSync = require('browser-sync').create()
	gutil 		= require('gulp-util'),
	prompt 		= require('gulp-prompt');
	notify 		= require('gulp-notify')
	// FTP //
	ftp 		= require('vinyl-ftp'),

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost/capsule/app",
		notify: false
	});
});

gulp.task('watch', ['css-libs', 'scripts','browser-sync' ], function () {
	gulp.watch('app/_css/**/*.+(css|sass|scss)', ['css-libs']);
	gulp.watch('app/_js/**/*.js', ['scripts']);

    gulp.watch('app/css/style.css', browserSync.reload);

    gulp.watch('app/js/*.js').on("change", browserSync.reload);
    gulp.watch('app/**/*.php').on('change', browserSync.reload);
});

// SASS

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/_css/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/_css/'));
});

// Css to one file
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/_css/master.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({basename: "style"}))
        .pipe(gulp.dest('app/css/')); // Выгружаем в папку app/css
});
// Scripts

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/_js/**/*.js', // Берем js
        ])
        .pipe(concat('scripts.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

// FTP upload
gulp.task('upload', function() {
    var conn = ftp.create( {
        host:     '81.218.117.94',
        user:     '',
        password: '',
        parallel: 3,
        log: gutil.log
    } );

    var globs = [
        'app/**/*',
        '!node_modules/**' 
    ];

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( 'test/' ) )
        .pipe( conn.dest( 'test/' ) )
        .pipe(notify("Dev site updated!"));
});


// BackUp
gulp.task('backup', function() {
    var myVDate = new Date().getTime();
	return gulp.src('app/*', { base: './' })
		.pipe(gulp.dest('backup/version-' + myVDate))
		.pipe(notify("Backup done!"));
});


gulp.task('default', ['browser-sync', 'watch']);