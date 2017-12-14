// 资源路径
var path = require('../path.js');

// 插件
var gulp = require('gulp'),
    // 自动检测刷新
    browserSync = require('browser-sync').create(),
    // 删除文件
    del = require('del'),
    // 获取cmd参数
    argv = require('yargs').argv;





/**
 * css
 */
gulp.task('watch:css',function(){

    browserSync.watch( path.css.srcPath, function(event,file) {
        // console.log('type:' + event);
        // 改变图片路径
        var ext = file.slice( file.lastIndexOf('\\')+1 );
        var extScss = ext.indexOf('scss') + 1;
        var extMin = ext.indexOf('min.css') + 1;
        var delCssJsPath = path.css.dest+'/'+ext;

        if( event=='add' ){
            if( extScss ){
                // console.log('添加scss');
                gulp.start('css_sass');
            }else{
                if( extMin ){
                    // console.log('添加 min.css');
                    gulp.start('css_minCss');
                }else{
                    gulp.start('css_css');
                }
            }
        }else if( event=='change' ){
            // console.log('改变css');
            if( extScss ){
                gulp.start('css_sass');
            }else{
                if( extMin ){
                    gulp.start('css_minCss');
                }else{
                    gulp.start('css_css');
                }
            }
        }else if( event=='unlink' ){
            del.sync( [delCssJsPath] );
        }else{
            console.log('我不清楚css执行了什么鬼操作');
        }
    });
});





/**
 * js
 */
gulp.task('watch:js',function(){

    browserSync.watch( path.js.srcPath, function(event,file) {
        // console.log('type:' + event);
        // 改变图片路径
        var ext = file.slice( file.lastIndexOf('\\')+1 );
        var extMin = ext.indexOf('min') + 1;
        var delJsPath = path.js.dest+'/'+ext;

        if( event=='add' ){
            // console.log('添加js');
            if( extMin ){
                gulp.start('js_min');
            }else{
                gulp.start('js_deal');
            }
        }else if( event=='change' ){
            // console.log('改变js');
            if( extMin ){
                gulp.start('js_min');
            }else{
                gulp.start('js_deal');
            }
        }else if( event=='unlink' ){
            // console.log('删除js');
            del.sync( [delJsPath] );
        }else{
            console.log('我不清楚js执行了什么鬼操作');
        }
    });
});





/**
 * 图片
 */
gulp.task('watch:images',function(){

    browserSync.watch( path.images.src, function(event,file) {
        // console.log('type:' + event);
        // 改变图片路径
        var destImage = path.images.dest+'/'+file.slice( file.lastIndexOf('\\')+1 );

        if( event=='add' ){
            // console.log('添加图片');
            gulp.start('build-images');
        }else if( event=='change' ){
            // console.log('改变图片');
            del.sync( [destImage] );
            gulp.start('build-images');
        }else if( event=='unlink' ){
            // console.log('删除图片');
            del.sync( [destImage] );
        }else{
            console.log('我不清楚图片执行了什么鬼操作');
        }
    });
});





/**
 * yaml
 */
gulp.task('watch:yaml',function(){

    browserSync.watch( path.yaml.src, function(event,file) {

        var destYaml = path.yaml.dest+'/'+file.slice( file.lastIndexOf('\\')+1 );

        if( event=='add' ){
            gulp.start('build-yaml');
        }else if( event=='change' ){
            del.sync( [destYaml] );
            gulp.start('build-yaml');
        }else if( event=='unlink' ){
            del.sync( [destYaml] );
        }else{
            console.warn(destYaml+' 文件操作错误');
        }
    });
});

/**
 * views
 */
gulp.task('watch:views',function(){

    browserSync.watch( path.views.src, function(event,file) {

        var destYaml = path.views.dest+'/'+file.slice( file.lastIndexOf('\\')+1 );

        if( event=='add' ){
            gulp.start('build-views');
        }else if( event=='change' ){
            del.sync( [destYaml] );
            gulp.start('build-views');
        }else if( event=='unlink' ){
            del.sync( [destYaml] );
        }else{
            console.warn(destYaml+' 文件操作错误');
        }
    });
});

/**
 * components
 */
gulp.task('watch:components',function(){

    browserSync.watch( path.components.src, function(event,file) {

        var destYaml = path.components.dest+'/'+file.slice( file.lastIndexOf('\\')+1 );

        if( event=='add' ){
            gulp.start('build-components');
        }else if( event=='change' ){
            del.sync( [destYaml] );
            gulp.start('build-components');
        }else if( event=='unlink' ){
            del.sync( [destYaml] );
        }else{
            console.warn(destYaml+' 文件操作错误');
        }
    });
});