// include gulp
var gulp = require('gulp'); 

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var cache = require('gulp-cache');

// script plugins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

//style plugins
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var connect = require('gulp-connect');
var gutil = require('gulp-util');
//var compass = require('gulp-compass');

var ts = require('gulp-typescript');

gulp.task('imagemin', function(){
	var imgSrc = './src/images/**/*';
	var imgDst = './build/images';
	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		//.pipe(imagemin())
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
	var htmlSrc = './src/*.html',
	htmlDst = './build';
	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
});

// TS concat, strip debugging and minify
gulp.task('scripts', function() {
	var tsSrc = './src/scripts/*.ts',
	jsDest = './build/scripts/';
	gulp.src(tsSrc)
		.pipe(ts())
		.pipe(stripDebug())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest));	
});

gulp.task('styles', function() {
	gulp.src(['./src/styles/*.css'])
		.pipe(concat('style.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/styles/'));
		/*gulp.src('./assets/css/*.scss')
			.pipe(compass({
				config_file: './config.rb',
            	sass: 'src/sass',
           		css: 'build/style'
			}))
			.on('error', function(err) {
				console.log(err)
			})
			.pipe(minifyCSS())
			.pipe(gulp.dest('./build/style/'));*/
});

gulp.task('connect', function() {
	connect.server({
		root: 'build'
		//livereload: true
	});
});

// build task
gulp.task('build', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {});


//default
/*gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {

	gutil.log('Now Watching...');

	// watch for HTML changes
	gulp.watch('./src/*.html', function() {
		gulp.run('htmlpage');
	});

	// watch for JS changes
	gulp.watch('./src/scripts/*.js', function() {
		gulp.run('jshint', 'scripts');
	});

	// watch for CSS changes
	gulp.watch('./src/styles/*.css', function() {
		gulp.run('styles');
	});

});*/