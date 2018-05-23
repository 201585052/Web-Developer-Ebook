# JS Code

__前言：__ Js的数据结构和算法描述其实挺重要的，虽然没有C++这种强类型语言那么有优势，但是有空看看吧，然后这里附上各种面试考手写的小题吧

-----------

## js小题狂练

> 实现一个英文字段，每个单词首字母大写
> 如何实现数组的随机排序
> 使用JS实现获取文件扩展名？
> 一次笔试的题求连通图的（不会）

```js
var [n,m] = read_line().split(" ");
function Node(num){
    this.num=num;
    this.friends=[];
}
var x,y;
[x,y]=read_line().split(" ");
var sta=new Node(x);
sta.friends.push(y);
var tu={};
tu[x] =sta;
for(var i=1;i<m;i++){
    [x,y]=read_line().split(" ");
    if(!tu[x])
    {
        for(var hh in tu){
            if(tu[hh]==y)
                tu[hh].friends.push(y);
        }
        tu[x]=new Node(x);
        tu[x].friends.push(y);
    }
    else
        tu[x].friends.push(y);
}
var Q = readInt();
var bx,by;
var ans=0;
for(var x1 in tu){
    for(x2 of tu[x1])
    {
        tu[x1].friends=tu[x1].friends.concat(tu[x2].frineds);
    }
}
for(var j=0;j<Q;j++)
{
    [bx,by]=read_line.split(" ");
    if(tu[bx].friends.indexOf(by)>=0||tu[by].friends.indexOf(bx)>=0)
        ans++;
}
print(ans);

var input = read_line().split(' ').map(item => parseInt(item, 10));
var N = input[0];
var M = input[1];
var MArr = [];
var QArr = [];
var i = 0;
for (i = 0; i < M; i++) {
    MArr.push(read_line().split(' '));
}
var Q = readInt();
for (i = 0; i < Q; i++) {
    QArr.push(read_line().split(' '));
}
// 以上为输入信息
function dist (str) {
    var o = {}, i = 0, result = '';
    var temp = str.split('');
    for (i = temp.length - 1; i >= 0; i--) {
        if(!o[temp[i]]) {
            o[temp[i]] = true;
        }
    }
    for (i in o) {
        if(o.hasOwnProperty(i)) {
            result += i;
        }
    }
    return result
}
var graph = []
var j = 0;
var result = 0;
for(i = 0; i < N; i++) {
    graph.push(String(i))
}

for(i = 0; i < M; i++) {
    var point1 = MArr[i][0];
    var point2 = MArr[i][1];
    var pos1 = 0;
    var pos2 = 0;
    for(j = graph.length - 1; j >= 0; j--) {
        if(graph[j].indexOf(point1) !== -1) {
            pos1 = j;
        }
        if(graph[j].indexOf(point2) !== -1) {
            pos2 = j;
        }
        if(pos1 * pos2 !== 0) break;
    }

    if (pos1 !== pos2) {
        graph[pos1] = dist(graph[pos1] + graph[pos2]);
        graph.splice(pos2, 1);
    }
}
for(i = 0; i < Q; i++) {
    var point1 = QArr[i][0];
    var point2 = QArr[i][1];
    var pos1 = 0;
    var pos2 = 0;
    for(j = graph.length - 1; j >= 0; j--) {
        if(graph[j].indexOf(point1) !== -1) {
            pos1 = j;
        }
        if(graph[j].indexOf(point2) !== -1) {
            pos2 = j;
        }
        if(pos1 * pos2 !== 0) break;
    }
    if(pos1 === pos2) {
        result++;
    }
}
print(result)
```

>实现数字字符格式化输出，从最后起每三个数字加个逗号

```js
//感觉自己写得更好点对于正则考虑了小数，确实是有些麻烦
function formalize(x){
    var cnt=0;
    var y=x.toString();
    var res=[];
    var start=y.indexOf('.')==-1?y.length-1:y.indexOf('.')-1;
    for(var i=start;i>=0;i--)
    {
        res.push(y[i]);
        cnt++;
        if(cnt==3&&i>0)
        {
            cnt=0;
            res.push(',');
        }
    }
    res.reverse();
    res=res.join("");
    res=y.indexOf('.')==-1?res:res+'.'+y.substring(y.indexOf('.')+1);
    console.log(res);
}
formalize(12345);
formalize(1234.123);
```

>手写快速排序

```js
function quicksort(arr)
{
    if(arr.length<=1)
        return arr;
    var mid=Math.floor((arr.length-1)/2);
    var midval=arr.splice(mid,1);//注意这里返回数组中间值的同时，又把中间值拿出去
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]<midval)
            left.push(arr[i]);
        else
            right.push(arr[i]);
    }
    return quicksort(left).concat(midval,quicksort(right));//递归求解
}

arr=[1,2,3,5,56,2,2,4,5,6,7,4,2,7,9];
var res=quicksort(arr);
console.log(res);

```

>手写ajax传值过程

```js
这里是用es6的promise封装版的：

function getJson(url){
    return new Promise(function(resolve,reject) {
        var xhr=new XMLHttpRequest();
        xhr.open("GET",url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                try{
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                }catch(e){
                    reject(e);
                }
            }else{
                reject(new Error(xhr.statusText));
            }
        };
    });
}
getJson("www.liao.com").then((val)=>console.log(val));
```

> 手写实现跨域

## 正则表达式

>用户名正则，4到16位（字母，数字，下划线，减号）

    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
>密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符

    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

>正整数正则

    var posPattern = /^\d+$/;

>负整数正则

    var negPattern = /^-\d+$/;

>整数正则

    var intPattern = /^-?\d+$/;
>正数正则

    var posPattern = /^\d*\.?\d+$/;
>负数正则

    var negPattern = /^-\d*\.?\d+$/;
>数字正则

    var numPattern = /^-?\d*\.?\d+$/;
>Email正则

    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
>手机号正则

    var mPattern = /^1[34578]\d{9}$/;
>身份证号（18位）正则

    var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
>URL正则

    var urlP= /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
>ipv4地址正则

    var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
>日期正则，简单判定,未做月份及日期的判定

    var dP1 = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/;
>日期正则，复杂判定

    var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
>QQ号正则，5至11位

    var qqPattern = /^[1-9][0-9]{4,10}$/;
>微信号正则，6至20位，以字母开头，字母，数字，减号，下划线

    var wxPattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
>包含中文正则

    var cnPattern = /[\u4E00-\u9FA5]/;
>格式化数字输出

```js
var str = "12345678901";
function numSplit(str){
    var re = /(\d)(?=(\d{3})+$)/g;
    //(\d{3})+$ 的意思是连续匹配 3 个数字，且最后一次匹配以 3 个数字结尾。
    //要找到所有的单个字符，这些字符的后面跟随的字符的个数必须是3的倍数，并在符合条件的单个字符后面添加,
    return str.replace(re,'$1,');
}
console.log(numSplit(str));
```

## 剑指offer

-----------

## 待看书籍

* 数据结构与算法JavaScript描述