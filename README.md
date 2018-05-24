# Web-Developer-Ebook

__前言:__ 学到的东西，写进读书笔记里，按照模块来，待完善，今晚先测试这个页面同步性

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
