/*gulp基本工作流程*/

"user strict";

//载入gulp模块
var gulp = require("gulp");

//载入html压缩模块
var htmlmin = require("gulp-htmlmin");

//载入less模块
var less =require("gulp-less");

//载入css合并模块
var concat = require("gulp-concat");

//载入css压缩模块
var cssnano = require("gulp-cssnano");

//载入js压缩模块
var jsuglify = require("gulp-uglify");

//载入浏览器同步操作模块
var browserSync = require('browser-sync').create();

//创建任务
gulp.task("default" , function(){
	//创建文件副本（源码文件和发布文件各一个）
	//获取文件
	gulp.src("./src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"))//将文件复制到dist目录（没有会自动创建）
});

//创建CSS编译、压缩任务
gulp.task("less" , function(){
	gulp.src("./src/css/*.less")
		.pipe(less())//编译less文件
		.pipe(concat())//合并css文件
		.pipe(cssnano())//压缩css文件
		.pipe(gulp.dest("./dist/css/"))//复制副本
});

//创建js混淆压缩任务
gulp.task("uglify" , function(){
	gulp.src("./src/js/*.js")
		.pipe(jsuglify())//压缩混淆js
		.pipe(gulp.dest("./dist/js/"))//复制副本
});

//创建监控任务
gulp.task("dist" , function(){
	gulp.watch("./src/index.html" , ["default"]);//监控文件，当文件改变时执行default任务
	gulp.watch("./src/css/*.less" , ["less"]);//监控文件
	gulp.watch("./src/js/*.js" , ["uglify"]);//监控文件
});

//创建静态服务器任务
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});