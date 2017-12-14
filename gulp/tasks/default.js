var gulp = require('gulp'),
	// if条件执行
    gulpif = require('gulp-if'),
	// 获取cmd参数
	argv = require('yargs').argv;



	if( argv.mode=='continue' || !argv.mode ){

	    console.log('准备编译工作');
	    gulp.task('default', ['serve','watch']);
	}else if( argv.mode=='compile' ){

	    console.log('编译资源，监听资源');
	    gulp.task('default', ['build-all','serve','watch']);
	}else if( argv.mode=='del'  ){

	    console.log('删除资源，编译资源，监听资源');
	    gulp.task('default', ['del-all','build-all','serve','watch']);
	}else{
		console.log('不清楚要执行神马，API详见README.md');
	}


