let gulp          = require('gulp'),
	sass          = require('gulp-sass')(require('sass')),
	browsersync   = require('browser-sync'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify");
const browserSync = require('browser-sync').create();

const config = {
	server: {
		baseDir: "./"
	},
	tunnel: false,
	host: 'localhost',
	port: 3333

};
gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: './'
		},
		notify: false,
	})
});

gulp.task('styles', async function() {
	gulp.src('scss/**/*.scss')
	.pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream())
});

gulp.task('watch', function() {

	browserSync.init(config);

	gulp.watch('scss/**/*.scss', gulp.series('styles')).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch'));