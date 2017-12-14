// 资源路径
var path = require('../path.js');
// 插件
var gulp = require('gulp'),
	// 删除文件
    del = require('del'),
    // 仅传递更改过的文件
    changed = require('gulp-changed'),
    // debug
    debug = require('gulp-debug');


/*
*   删除文件
*/
// 清空css
gulp.task('del-css',function(lc){
    del(path.css.dest+'/**/*',lc);

});

// 清空fonts
gulp.task('del-fonts',function(lc){
    del(path.fonts.dest+'/**/*',lc);
});

// 清空js
gulp.task('del-js',function(lc){
    del(path.js.dest+'/**/*',lc);
});

// 清空图片库
gulp.task('del-images',function(lc){
    del(path.images.dest+'/**/*',lc);
});

// 清空插件库
gulp.task('del-plugins',function(lc){
    del(path.plugins.dest+'/**/*',lc);
});

// 清空yaml
gulp.task('del-yaml',function(lc){
    del(path.yaml.dest+'/*.yaml',lc);
});

// 清空所有生产环境
gulp.task('del-all',
    ['del-css','del-fonts','del-js','del-images','del-plugins','del-yaml'],
    function(){
    	console.log('通知：已删除所有资源');
    }
);