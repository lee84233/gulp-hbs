// 资源路径
const path = require('../path.js');

// 插件
const gulp = require('gulp'),

    // css
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),

    // js
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),// es6

    // 合并
    concat = require('gulp-concat'),

    // 图片处理
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),

    // 消息提示
    notify = require('gulp-notify'),
    // 重命名
    rename = require('gulp-rename'),
    // 自动处理全部错误信息防止因为错误而导致 watch不正常工作
    plumber = require('gulp-plumber'),

    // 仅传递更改过的文件
    changed = require('gulp-changed'),
    // debug
    debug = require('gulp-debug'),
    // 删除文件
    del = require('del'),

    // 自动检测刷新
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    // 监听 暂未用到
    gulpWatch = require('gulp-watch'),
    // if条件执行
    gulpif = require('gulp-if'),

    // 获取cmd参数
    argv = require('yargs').argv;





    // develop | produce  默认develop
    var envirment = false;
    // 环境
    if( argv.env==='develop' || !argv.env ){
        envirment = false;
        // console.log('正在运行开发环境');
    }else if( argv.env==='produce' ){
        envirment = true;
        // console.log('正在运行生产环境');
    }else{
        console.log('env命令错误');
    }

    // 监听css、js、images
    var watchMore = 'all';
    if( argv.noWatch ){
        watchMore = argv.noWatch;
    }

    // 是否打开浏览器
    var open = true;
    if( argv.open==='true' || !argv.open ){
        open = true;
    }else if( argv.open==='false' ){
        open = false;
    }else{
        console.error('open指令输入错误，执行默认指令true');
    }






gulp.task('serve', function() {

    browserSync.init({
        // 静态服务器
        // server: {
        //     baseDir: path.baseDir,
        // },
        // port:8000,
        // 默认打开浏览器
        browser: "chrome",
        //不显示在浏览器中的任何通知。
        notify: false,
        // 打开浏览器
        open:open,

        // 代理
        proxy: "http://localhost:8080"
    });

});





// 监听
gulp.task('watch', function(){
    // console.dir(path.css.cleanCss);

    gulp.watch( path.css.src.scss, ['css_sass'] );
    gulp.watch( path.css.src.css, ['css_css'] );
    gulp.watch( path.css.src.minCss, ['css_minCss'] );

    gulp.watch( path.js.src.js,['js_deal'] );
    gulp.watch( path.js.src.minJs,['js_min'] );

    gulp.watch( path.html ).on('change', reload);

    if( watchMore=='all'  ){
        gulp.start('watch:css','watch:js','watch:images','watch:views','watch:yaml','watch:components');
    }else if( watchMore==='less' ){
        gulp.start('watch:css','watch:js','watch:views','watch:yaml','watch:components');
    }else if( watchMore==='close' ){
        console.log('不监听资源注入');
    }else{
        console.log('不清楚要监听的资源');
    }

    // gulp.watch( path.plugins.src+'**/*',['copy_plugins'] );

});






/**
 * 编译sass
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('css_sass',function(){

    return gulp.src( path.css.src.scss )

    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )

    .pipe(
        sass({
            // nested:默认 嵌套缩进的css代码
            // expanded:没有缩进、扩展的css
            // compact:简洁格式
            // compressed:压缩
            outputStyle:'expanded'
        })
    )


    // `changed` 任务需要提前知道目标目录位置
    // 才能找出哪些文件是被修改过的
    // 只有被更改过的文件才会通过这里
    .pipe( changed( path.css.dest ) )
    // 提示
    .pipe( debug({
        title: '编译:'
    }) )


    .pipe( autoprefixer({
        browsers: ['last 2 versions', 'ie 6-8', 'Android >= 4.0'],
        //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        cascade: true,
        //是否去掉不必要的前缀 默认：true
        remove:true
    }) )

    // produce环境压缩
    .pipe(
        gulpif(
            envirment,
            cleanCSS()
        )
    )

    .pipe( gulp.dest( path.css.dest ) )
    .pipe( reload({stream: true}) );
});





/**
 * 压缩css
 * @author Lee
 * @date 2016-07-04
 */
/*gulp.task('css_clean', ['css_sass'],function(){

    return gulp.src( path.css.cleanCss )
    .pipe( changed( path.css.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )

    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )

    .pipe( cleanCSS() )

    .pipe( rename(function(path){
        path.basename += '.min'
    }) )
    .pipe( gulp.dest( path.css.dest ) )
    .pipe( reload({stream: true}) );
});*/






// .css
gulp.task('css_css',function(){
    gulp.src( path.css.src.css )
    .pipe( changed( path.css.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )

    .pipe(
        gulpif(
            envirment,
            cleanCSS()
        )
    )

    .pipe( gulp.dest( path.css.dest ) )
    .pipe( reload({stream: true}) );
});






// min.css
gulp.task('css_minCss',function(){
    gulp.src( path.css.src.minCss )
    .pipe( changed( path.css.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )
    .pipe( gulp.dest( path.css.dest ) )
    .pipe( reload({stream: true}) );
});






/**
 * js 检测和压缩
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('js_deal',function() {
    return gulp.src( path.js.src.js )
    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )

    .pipe( jshint() )
    .pipe( jshint.reporter('default') )

    .pipe( changed( path.js.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )

    .pipe( gulp.dest( path.js.dest ) )

    .pipe( sourcemaps.init() )
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe( uglify() )
        /*.pipe( rename(function(path){
            path.basename += '.min'
        }) )*/
    .pipe( sourcemaps.write('maps') )

    .pipe( gulp.dest( path.js.dest ) )
    .pipe( reload({stream: true}) );
});


// *.min.js
gulp.task('js_min',function(){
    return gulp.src( path.js.src.minJs )
    .pipe( changed( path.js.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )
    .pipe( gulp.dest( path.js.dest ) )
    .pipe( reload({stream: true}) );
});


// copy images
gulp.task('build-images',function(){
    return gulp.src( path.images.src )
    .pipe(
        cache(
            imagemin({
                //类型：Number  默认：3  取值范围：0-7（优化等级）
                optimizationLevel: 5,
                //类型：Boolean 默认：false 无损压缩jpg图片
                progressive: true,
                //类型：Boolean 默认：false 隔行扫描gif进行渲染
                interlaced: true,
                //类型：Boolean 默认：false 多次优化svg直到完全优化
                multipass: true,
                //不要移除svg的viewbox属性
                svgoPlugins: [
                    {removeViewBox: false}
                ],
                //使用pngquant深度压缩png图片的imagemin插件
                use: [pngquant()],
            })
        )
    )
    .pipe( changed( path.images.dest ) )
    .pipe( debug({
        title: '编译:'
    }) )
    .pipe( gulp.dest(path.images.dest) )
    .pipe( reload({stream: true}) );
});
