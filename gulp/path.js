
const app = './app',// 开发目录
	assets = app+'/assets',// 开发资源目录

	public = './public',// 生产目录
	dest = public + '/assets',// 生产资源目录

	baseDir = public + '/views';// html页面路径

/**
 * 目录结构
 * css 		-> 	css
 * js 		-> 	js
 * fonts 	-> 	字体
 * images 	-> 	图片
 * plugins 	-> 	插件
 * others	-> 	其他，eg:flash，视频，音频...
 */

module.exports = {

	baseDir:baseDir,

	assets:assets,

	dest:dest,

	html:baseDir+'/**/*.{html,php,hbs,jsp}',

	css:{
		srcPath:assets + '/css',
		src:{
			// 需要编译的scss
			scss:assets + '/css/*.scss',
			css:[
				assets + '/css/*.css',
				'!'+assets + '/css/*.min.css'
			],
			minCss:assets + '/css/*.min.css'
		},
		dest:dest+'/css',
		cleanCss:[
			dest+'/css/*.css',
			'!'+dest+'/css/*.min.css'
		]
	},

	js:{
		srcPath:assets + '/js',
		src:{
			js:[
				assets + '/js/*.js',
				'!'+assets + '/js/*.min.js'
			],
			minJs:assets + '/js/*.min.js'
		},
		dest:dest+'/js'
	},

	images: {
        src: assets + '/images/**/*.{png,jpg,gif,ico}',
        dest: dest + '/images'
    },

    fonts:{
    	src: assets + '/fonts/**/*',
    	dest: dest + '/fonts'
    },

    plugins:{
    	src: assets + '/plugins/**/*',
    	dest: dest + '/plugins'
    },

    views:{
    	src: app + '/views/**/*.{html,hbs}',
    	dest: public + '/views'
    },
    components:{
    	src: app + '/components/**/*.{html,hbs}',
    	dest: public + '/components'
    },

    yaml:{
    	src: assets + '/*.yaml',
    	dest: 'public'
    },
};