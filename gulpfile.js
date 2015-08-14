var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	argv = require('yargs').argv;

var build = "./app/",
	b = !!(argv.b) || !!(argv.build),
	o = !!(argv.o) || !!(argv.open);

var comps = {
	src: "./src/assets/**/*.html"};
var css = {
	src: "./src/assets/css/**/*.css",
	dest: build + "assets/css/"};
var docs = {
	src: "./src/assets/*.{pdf,doc,docx,txt}",
	dest: build + "assets/"};
var fonts = {
	src: "./src/assets/fonts/**/*.{eot,ttf,woff,woff2}",
	dest: build + "assets/fonts/"};
var index = {
	src: "./src/index.html",
	dest: build};
var images = {
	src: "./src/assets/img/**/*.{jpg,jpeg,png,gif,svg}",
	dest: build + "assets/img/"};
var js = {
	src: "./src/assets/js/**/*.js",
	dest: build + "assets/js/"};
var pages = {
	src: "./src/pages/**/*.html",
	dest: build + "pages/"}
var sass = {
	src: "./src/assets/sass/**/*.scss"};

/***** COMPOSITE TASKS *****/
gulp.task('assets', ['style','script','image','font','docs']);
gulp.task('build', ['assets','html']);
gulp.task('html', ['index','page']);
gulp.task('serve', ( b ? ['build','browse','watch'] : ['browse','watch']));
gulp.task('watch', function(){
	gulp.watch(comps.src, ['comp']);
	gulp.watch(images.src, ['image']);
	gulp.watch(index.src, ['index']);
	gulp.watch(js.src, ['script']);
	gulp.watch(pages.src, ['page']);
	gulp.watch(sass.src, ['style']);
});

/***** SIMPLEX TASKS *****/

gulp.task('browse', function(){
	browserSync.init({
		server: build,
		open: (o ? 'external' : false),
		notify: false
	});
});
gulp.task('style', function(){
	return gulp.src(sass.src)
		.pipe($.newer(css.dest))
		.pipe($.compass({
			css: css.dest,
			sass: 'src/assets/sass/',
			style: 'compressed'
		}))
		.on('error', function(error){
			console.log('Compilation Error\n' + error);})
		.pipe($.autoprefixer())
		.pipe(gulp.dest(css.dest))
		.pipe(browserSync.stream());
});
gulp.task('script', function(){
	return gulp.src(js.src)
		.pipe($.newer(js.dest))
		.pipe($.concat('main.js'))
		.pipe($.uglify())
		.pipe(gulp.dest(js.dest))
		.pipe(browserSync.stream());
});
gulp.task('image', function(){
	return gulp.src(images.src)
		.pipe($.changed(images.dest))
		.pipe($.imagemin({
			optimizationLevel: 4,
			progressive: true
		}))
		.pipe(gulp.dest(images.dest));
});
gulp.task('font', function(){
	return gulp.src(fonts.src)
		.pipe($.changed(fonts.dest))
		.pipe(gulp.dest(fonts.dest))
		.pipe(browserSync.stream());
});
gulp.task('docs', function(){
	return gulp.src(docs.src)
		.pipe($.changed(docs.dest))
		.pipe(gulp.dest(docs.dest));
});
gulp.task('page', function(){
	return gulp.src(pages.src)
		.pipe($.changed(build+'pages/'))
		.pipe($.fileInclude({
			prefix: '$',
			basepath: '@root'}))
		.pipe(gulp.dest(build+'pages/'))
		.pipe(browserSync.stream());
});
gulp.task('index', function(){
	return gulp.src(index.src)
		.pipe($.changed(build))
		.pipe($.fileInclude({
			basepath: '@root'}))
		.pipe(gulp.dest(build))
		.pipe(browserSync.stream());
});
gulp.task('comp', function(){
	gulp.src(index.src)
		.pipe($.fileInclude({
			basepath: '@root'}))
		.pipe(gulp.dest(build))
		.pipe(browserSync.stream());
	gulp.src(pages.src)
		.pipe($.fileInclude({
			prefix: '$',
			basepath: '@root'}))
		.pipe(gulp.dest(build+'pages/'))
		.pipe(browserSync.stream());
});
