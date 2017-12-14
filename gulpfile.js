/**
 * 入口文件
 */

// 引入其他任务
const requireDir = require('require-dir');

requireDir( './gulp/tasks', {
    // 是否递归子目录
    recurse:true
});




/**
 * 参数说明
 */

/*
gulp --env = develp | produce

gulp --mode= continue | compile | del


/**
 * 其他插件
 */

// run-sequence 顺序运行指定任务
// gulp-sourcemaps 资源地图