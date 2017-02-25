// 请求模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// 创建任务（执行任务）
// 目的：编译sass文件
gulp.task('buildSass',function(){
	// 查找需要编译的文件
	gulp.src('src/sass/*.scss')

		// 编译scss文件
		.pipe(sass({outputStyle:'compact'}))

		// 输出文件
		.pipe(gulp.dest('src/css'))

		// 编译成功后，利用browser-sync刷新页面
		.pipe(browserSync.reload({stream:true}));

});


// 监听sass文件
gulp.task('jtSass',function(){
	// 监听文件，当文件有修改时，执行buildSass任务
	gulp.watch('src/sass/*.scss',['buildSass']);
});


// 利用browser-sync创建静态服务器
gulp.task('server',function(){
	browserSync({
		// server:{
		// 	baseDir: "./src"
		// },
		// port:4000,

		// 代理
		proxy:'http://localhost',

		// 监听html文件
		files:['./src/*.html','./src/html/*.html'],
	});

	gulp.watch('src/sass/*.scss',['buildSass']);
	gulp.watch('./src/*.php').on('change',browserSync.reload);
})