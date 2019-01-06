# Web-Developer-Ebook

__前言:__ 校招时期写的一个简单的小册子，但是gitbook同步更新到外网是需要手段的，现在即将离开了学校的ipv6了，这就暂时停更了，换git issue。
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
  * Markdown Theme Kit （不知道有没有用，用的是自己的css）
  * markdownlint（markdown书写规范）
  * Markdown Preview Enhanced（[可以看](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/))
  * open in browser（alt+B打开网页浏览，较方便）
  * Output Colorizer（高亮）
  * Path Intellisense（路径提示，很好用）
  * VSCode Great Icons（好看）
  * Project Manager（没自己用过，听说很好用）
  * vscode-fileheader（没自己用过，听说很好用）
  * Bracket Pair Colorizer (括号插件）
  * VSCode Great Icons(自己更新安装的？【笑哭】)
  * Python(由此可见mac用brew做包管理的重要性)
  

>学习及文档

* [es5 入门小册子](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)
* [es6 入门小册子](http://es6.ruanyifeng.com/)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [React](http://www.css88.com/react/)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [webpack](https://www.webpackjs.com/)
* [ECMA官方文档](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.1)
* [electron](https://electronjs.org/)

>前沿

* [大漠w3c](http://www.w3cplus.com/)

* [alloyteam](http://www.alloyteam.com/)

* [淘宝前端团队FED](http://taobaofed.org/)

* [百度前端研发部](http://fex.baidu.com/)

* [360奇舞团](https://75team.com/)

* [凹凸实验室](https://aotu.io/)

* [YMFE去哪儿大前端](https://ymfe.org/)

* [阮一峰老师](http://www.ruanyifeng.com/blog/)

* [IMWeb](http://imweb.io/)

* [美团技术团队](https://tech.meituan.com/)

* [饿了么前端](https://zhuanlan.zhihu.com/ElemeFE)

>社区

* [segmentfaul](https://segmentfault.com/frontend)

* [掘金](https://juejin.im/)

* [react中文社区](http://react-china.org/)

* [CNode](https://cnodejs.org/)

>资源

* [icon 1](http://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2)

* [icon 2](https://www.iconfinder.com/)

* [设计可参考 1](https://www.syncfusion.com/)

* [设计可参考 2](https://www.qianduanmei.com/)

* [简书](https://www.jianshu.com/)

>工具

* [Gopng-图片精灵制作](http://alloyteam.github.io/gopng/)
* [在线IDE](https://stackblitz.com/)
* [较全在线IDE](https://codesandbox.io/)
* [免费cdn加速](https://www.bootcdn.cn/)
* [查阅css对浏览器兼容性](https://caniuse.com/)
* [HTMLtoJSX](https://magic.reactjs.net/htmltojsx.htm)
* [在线babel转译](https://babeljs.io/repl/)

>框架

* [Ant Design,React UI](https://ant.design/index-cn)

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

>gh-pages放多个静态页面

    1、git checkout --orphan gh-pages
    2、git add .
    3、git commit -m 'sth'
    4、git push -u origin gh-pages

>git多人合作

    1、fork项目
    2、git remote -v 查看远程仓库，应该只有自己的
    3、git remote add upstream https://github.com/......git 连接原作者的远程仓库
    4、git fetch upstream master 从原仓库获取最新版本到本地
    (git checkout master 保证自己在主分支上)
    5、git merge upstream/master 将最新版本整合到本地的master分支上
    6、git push origin master 把最新版本同步更新到自己的版本库里
    7、在确定版本和自己是否工作在主分支的基础上可以提pr

>个人项目分支管理

```txt
这个情况其实也就是来自于自己写的一个项目，要创立这个项目的新版本，所以要在分支上修改，大体策略分两种：
1、自己给自己提pr，在网页里新建branch分支，通过git clone -b copy到本地分支里，再进行提交，之后就是所谓自己给自己提pr。。。。
2、本地创建分支
首先，我们创建dev分支，然后切换到dev分支：

$ git checkout -b dev
Switched to a new branch 'dev'
git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：

$ git branch dev
$ git checkout dev
Switched to branch 'dev'
然后，用git branch命令查看当前分支：

$ git branch
* dev
  master
git branch命令会列出所有分支，当前分支前面会标一个*号。

然后，我们就可以在dev分支上正常提交，比如对readme.txt做个修改，加上一行：

Creating a new branch is quick.
然后提交：

$ git add readme.txt 
$ git commit -m "branch test"
[dev fec145a] branch test
 1 file changed, 1 insertion(+)
现在，dev分支的工作完成，我们就可以切换回master分支：

$ git checkout master
[转自](https://www.cnblogs.com/tracylxy/p/6433916.html)
```



>问题：

```txt
1、提交的commit并没有被github记录，往往是本地github邮箱和用户名设置的解决方案：
git config --global user.email "你的邮件地址"
git config --global user.name "你的Github用户名"
2、.git文件夹比较大
新建文件命名为.gitignore,内容为node_modules/,没必要把这么大用处不大的东西传上去(.gigignore那个命名windows下不可以，用ren gitignore.txt .gitignore转化一下)
git clone git://xxoo --depth 1//克隆一次commit，删掉本地库重新传，副作用较小，对git非大牛的简单安全的方法
```

[详细方案](https://segmentfault.com/a/1190000004318632)

## 有需求再看

>gitbook相关

* [gitbook简单使用(已过时，仅供本地参考)](http://www.chengweiyang.cn/gitbook/github-pages/README.html)

* [github搭博客攻略](https://blog.csdn.net/renfufei/article/details/37725057/)

* [gitbook打包pdf](https://jingyan.baidu.com/article/fec7a1e5e08a381191b4e75b.html)

>mongodb

* [centos7下搭建mongodb](https://www.cnblogs.com/layezi/p/7290082.html)
