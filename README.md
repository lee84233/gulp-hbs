
# Gulp demo

标签： gulp、自动化构建工具

---


# 写在前面
1. 依赖环境：node、gulp。[『node、gulp安装教程』](http://blog.csdn.net/qq_23215957/article/details/51050460 "如有问题请联系842337932@qq.com")
2. 终端：系统终端，推荐cmder工具。


# 1 启动默认任务

## 1.1 终端中输入命令
```
gulp
// 或者
gulp default
```
### 1.1.1 说明
1. 启动locahost:3000，根目录为 `./view`
2. 监听`scss`,`css`,`js`,`html,php`，自动刷新浏览器

## 1.2 gulp任务
```
// gulp <任务名>，默认default任务
gulp <taskName>
```

# 2 参数

## 2.1 env-环境（默认值：develop）
1. **develop**:`css`、`js`未压缩（开发环境推荐使用）		
2. **produce**:`css`、`js`压缩版（生产，上线推荐使用）
```
gulp --env=develop
gulp --env=produce
```

## 2.2 mode-起始模式（默认值：continue）
1. **continue**：启动服务，监听资源
2. **compile**：编译资源，启动服务，监听资源
3. **del**：清空资源、编译资源，启动服务，监听资源
```
gulp --mode=compile
gulp --mode=del
```

## 2.3 noWatch-监听注入（默认值：true）
1. **true**：监听资源注入(css、js、images)
2. **less**：监听资源注入(css、js）
3. **close**：不监听资源注入

*说明*：
1. 监听过多资源，内存消耗大，根据电脑配置选择监听资源多少
2. 暂时只支持这些资源的监听，后续陆续更新
3. 未监听资源可使用`gulp build-<nama>`进行手动处理

## 2.4 open-开启服务，是否自动打开浏览器（默认值：true）
**true**：自动打开
**false**：关闭自动打开功能


# css处理
```
// 处理src下css源
gulp build-css
```
说明：
1. *.scss自动编译为css（默认未压缩，可使用env指令，生成压缩版）
2. *.css复制（默认未压缩，可使用env指令，生成压缩版）
3. *.min.css复制


# js处理
```
// js输出压缩包，附带sourcemaps，方便调试
gulp build-js
```
说明：
1. *.scss自动编译为css（默认未压缩，可使用env指令，生成压缩版）
2. *.css复制（默认未压缩，可使用env指令，生成压缩版）
3. *.min.css复制

```
// 编译所有资源
gulp build-all

// 编译images，会压缩图片
gulp build-images

// 编译fonts，仅复制
gulp build-fonts

// 编译others，仅复制
gulp build-others

// 编译plugins，仅复制
gulp build-plugins
```

# 删除生产目录资源
```
// 删除所有资源
gulp del-all

// 删除css
gulp del-css

// 删除js
gulp del-js

// 删除images
gulp del-images

// 删除fonts
gulp del-fonts

// 删除others
gulp del-others

// 删除plugins
gulp del-plugins
```
*说明*：删除目标为编译后的资源，一般放在`assets`文件夹中，不会删除源文件。
