var gulp = require('gulp'), 
    uglifyjs = require('gulp-uglify'), 
    rename = require('gulp-rename');

//PATHS FILES
var paths = {
	src: {
	    js: 'src/**/*.js'
	},
	dest: {
		js: 'dist/js'
	}
};

// Minify js
gulp.task('js', function(){
    gulp.src(paths.src.js)
        .pipe(uglifyjs())
        .pipe(rename(function(file){
            file.extname = ".min.js";
        }))
        .pipe(gulp.dest(paths.dest.js));
});

// Watch all tasks
gulp.task('watch', function(){
    gulp.watch(paths.src.js, ['js']);
});

// Init all tasks
gulp.task('default', ['js', 'watch']);