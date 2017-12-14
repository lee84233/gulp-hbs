# app.js

## 1.cookie操作
### 1.1设置cookie
```
/**
 * 设置cookie
 * @param {[string]} name  [键名]
 * @param {[string]} value [键值]
 * @param {[string]} time  [过期时间，可选 默认1天]
 * s20是代表20秒
 * h12是代表12小时
 * d30是代表30天
 */

// 使用
setCookie(name,value,time);

// 示例：
setCookie("browserInfo","loser","d30"); // 存储browserInfo的值为loser，有效期30天
```

### 1.2读取cookie
```
/**
 * 读取cookie
 * @param {[string]} name  [键名]
 * @return {[string]} value [键值，当不存在该cookie时返回null]
 */

// 使用
getCookie(name);

// 示例：
getCookie("browserInfo"); // 读取browserInfo的值
```

### 1.3删除cookie
```
/**
 * 删除cookie
 * @param {[string]} name  [键名]
 */

// 使用
delCookie(name);

// 示例：
delCookie("browserInfo"); // 删除browserInfo的值
```



## 2. 获取 | 格式化日期
```
/**
 * [获取当前日期，格式化日期]
 * @param  {[string]} current [可选，值为某个时间戳，不填写返回当前时间]
 * @param  {[string]} style   [可选，日期格式 可选值为 ymd | ymdHi | ymdHis ]
 * 			ymd		返回格式：2016-10-10
 * 			ymdHi	返回格式：2016-10-10 10:10
 * 			ymdHis	返回格式：2016-10-10 10:10:10
 * @return {[string]}         [日期]
 */

// 使用
getDateFunc(current,style)

// 示例：
getDateFunc(); 返回当前日期
getDateFunc(false,'ymd'); 按指定格式返回当前日期
getDateFunc('Mon Aug 08 2016 08:08:00 GMT+0800','ymdHi'); 按指定格式返回指定日期
 ```



## 3. 提示信息，代替alert
```
/**
 * 提示信息
 * @param  {[str]} msg  [必选，提示信息文本]
 * @param  {[int]} time [可选，提示信息自动消息时间，默认3000毫秒，单位毫秒]
 * @return {[type]}      [无返回]
 */

// 使用
msgFunc(msg,time);

// 示例
msgFunc("请输入账号");			//提示信息，默认3秒后消失
msgFunc("请输入账号",5000);		//提示信息，5秒后自动消失
```