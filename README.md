# Web-Developer-Ebook

__前言:__ 希望学到的看到的书和源码都可以变成自己的东西。不断读书，源码，不断进步。首页是学习资料汇总（少数时候会被*掉，上不去在线版)

## 导航

>基础开发工具vscode

* 插件
  * Auto Rename Tag (方便写HTML)
  * Beautify （格式化神器）
  * Code Runner （可以编译运行多种语言）
  * ESLint (强制提高代码编写质量与整洁度)
  * Emmet（提高代码编写速度，这个是内置的，[Emmet](https://www.cnblogs.com/summit7ca/p/6944215.html))
  * HTML CSS Support（字面意思）
  * HTML Snippets（标签提醒）
  * HTMLHint（查错）
  * jQuery Code Snippets（提醒）
  * Markdown PDF
  * markdownlint（markdown书写规范）
  * Markdown Preview Enhanced（[可以看](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/))
  * open in browser（alt+B打开网页浏览，较方便）
  * Output Colorizer（高亮）
  * Path Intellisense（路径提示，很好用）
  * VSCode Great Icons（好看）
  * Project Manager（没自己用过，听说很好用）
  * vscode-fileheader（没自己用过，听说很好用）

>学习及文档

* [es5 入门小册子](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)
* [es6 入门小册子](http://es6.ruanyifeng.com/)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [React](http://www.css88.com/react/)
* [React Router](http://react-guide.github.io/react-router-cn/docs/API.html#router)
* [webpack](https://www.webpackjs.com/)

>社区

* [大漠w3c](http://www.w3cplus.com/)

* [alloyteam](http://www.alloyteam.com/)

* [react中文社区](http://react-china.org/)

* [掘金](https://juejin.im/)

## git命令

>常见:

    1、git init 初始化一个仓库
    2、git add .(sth) 添加文件
    3、git commit -m "描述"
    4、git status 查看状态
    5、git log 查看历史状态
    6、git reset --hard commit-id 版本回滚
    7、git reflog 查看命令历史，方便“回到未来”
    8、git checkout --文件名 撤销修改到最近一次状态，比如撤销对工作区的修改
    9、git reset Head 文件名 撤销对暂存区的修改放回到工作区
    10、git rm 文件名 版本库内文件删除+rm 文件名 工作区删除（后需git commit 一下），工作区误删可用git checkout 撤销
    11、git remote add origin http/ssh  //origin是默认名，后面表示用http地址和ssh地址都可以
    12、git push -u origin master 发射到github上-u参数还会将本地的master分支与远程的master分支关联，方便日后修改

>手册
>补充：

    1、git branch 查看分支
    2、git branch <name> 创建分支
    3、git checkout <name> 切换分支
    4、git checkout -b <name> 创建并切换分支
    5、git merge <name> 合并某分支到当前分支
    6、git branch -d <name> 删除分支
>其他：

    1、git gc 垃圾回收，压缩本地.git文件夹（上次使用的时候出现了问题。。）
    2、git clone git://xxoo --depth 1 只克隆上次commit的内容
>工作分区(个人只是改动master)：

    1、git clone +https/ssh
    2、到clone下的目录下git init 一下
    3、改动后 git staus查看一下，然后git add .
    4、git commit -m "sth"
    5、git push 部署到服务器上
    6、不同机器操作时要从远程仓库pull一下拉入最新修改如 git pull origin master
    7、markdown去掉小型乱码的方法，直接在github页面上改吧，记得pull

>问题：

```txt
1、提交的commit并没有被github记录，往往是本地github邮箱和用户名设置的解决方案：
git config --global user.email "你的邮件地址"
git config --global user.name "你的Github用户名"
```

[详细方案](https://segmentfault.com/a/1190000004318632)

## 有需求再看

>gitbook与gitpages相关

* [只用master 搭git前端页面](https://www.cnblogs.com/iamzhanglei/p/6177961.html)

* [搭自己写的html文件页面](https://www.cnblogs.com/lijiayi/p/githubpages.html)

* [gitbook简单使用(已过时，仅供本地参考)](http://www.chengweiyang.cn/gitbook/github-pages/README.html)

* [github搭博客攻略](https://blog.csdn.net/renfufei/article/details/37725057/)

* [gh-pages使用](https://www.cnblogs.com/bahcelor/p/6555011.html)

* [gitbook打包pdf](https://jingyan.baidu.com/article/fec7a1e5e08a381191b4e75b.html)

>mongodb

* [centos7下搭建mongodb](https://www.cnblogs.com/layezi/p/7290082.html)