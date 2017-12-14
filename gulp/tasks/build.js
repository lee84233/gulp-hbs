// 资源路径
var path = require('../path.js');
// 插件
var gulp = require('gulp'),
    // 仅传递更改过的文件
    changed = require('gulp-changed'),
    // debug
    debug = require('gulp-debug'),
    // 自动检测刷新
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;





/*
* 复制
*/
// 复制所有
gulp.task('build-all',
    ['build-css','build-js','build-images','build-plugins','build-yaml','build-fonts','build-views','build-components'],
    function(){
        console.log('通知：已创建资源');
    }
);



gulp.task('build-css',['css_sass','css_css','css_minCss'], function(){});
gulp.task('build-js',['js_deal','js_min'], function(){});


// copy fonts
gulp.task('build-fonts',function(){
    return gulp.src(path.fonts.src)
    .pipe( changed( path.fonts.dest ) )
    .pipe( debug({
        title: '编译：'
    }) )
    .pipe( gulp.dest(path.fonts.dest) )
    .pipe( reload({stream: true}) );
});




// 复制插件
gulp.task('build-plugins',function(){
    return gulp.src( path.plugins.src )
    .pipe( changed( path.plugins.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )
    .pipe( gulp.dest( path.plugins.dest ) )
    .pipe( reload({stream: true}) );
});






// 复制 *.yaml文件
gulp.task('build-yaml',function(){
    return gulp.src( path.yaml.src )
    .pipe( changed( path.yaml.dest ) )
    .pipe( debug({
        title: '编译：'
    }) )
    .pipe( gulp.dest( path.yaml.dest ) )
    .pipe( reload({stream: true}) );
});


// 复制 *.hbs
gulp.task('build-views',function(){
    return gulp.src( path.views.src )
    .pipe( changed( path.views.dest ) )
    .pipe( debug({
        title: '编译：'
    }) )
    .pipe( gulp.dest( path.views.dest ) )
    .pipe( reload({stream: true}) );
});


// 复制 components/*.hbs
gulp.task('build-components',function(){
    return gulp.src( path.components.src )
    .pipe( changed( path.components.dest ) )
    .pipe( debug({
        title: '编译：'
    }) )
    .pipe( gulp.dest( path.components.dest ) )
    .pipe( reload({stream: true}) );
});