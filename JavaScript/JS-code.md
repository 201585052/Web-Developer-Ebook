# JS Code

__前言：__ Js的数据结构和算法描述其实挺重要的，虽然没有C++这种强类型语言那么有优势，但是有空看看吧，然后这里附上各种面试考手写的小题吧

-----------

## js小题狂练

> 实现一个英文字段，每个单词首字母大写

```js
function upperHead(text){
    var arr = text.split(" ");
    for(var i in arr){
        arr[i] = arr[i].substring(0,1).toUpperCase()+arr[i].substring(1);
    }
    return arr.join(" ");
}
var text = "hello i'm liaoliao";
text[0] = text[0].toUpperCase();
console.log(text);
console.log(upperHead(text));

//正则+es6
//const upperHead = (text) => text.replace(/\b[a-z]/g,head => head.toUpperCase());
//console.log(upperHead("hello liaoliao"));
```

> 如何实现数组的随机排序

```js
// function shuffle(arr) {
//     arr.sort(function (a, b) {
//         return Math.random() - 0.5;
//     });
//     console.log(arr);
//     return arr;
// }
// //虽然前面的方法实现了数组的随机排序，但总感觉每个元素被派到新数组的位置不是随机的。就如前面的示例，数组arr中值为1的元素，它的原先键值为0，随机排序后，1的键值要求上为0-8的几率是一样的。然后在这里是递减的，原因是sort()方法是依次比较的。
// function shuffle(arr) {
//     var i, j, temp;
//     for (i = arr.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//     }
//     return arr;
// };
function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

function shuffle(arr) {//underscore.js
    var length = arr.length,
        shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = random(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = arr[index];
        //总体思路就是随机往里放呗，反正上一行每一次shuffled的最新值都是一次备份
    }
    return shuffled;
}


let arr = [1, 4, 7, 3, 2, 5, 6, 7, 8];
for (let i = 0; i < 10; i++) {
    console.log(shuffle(arr));
}
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
//以下是算法导论上的代码，我转的js
function Partition(arr,p,r){
      let x = arr[r];
      let i = p-1;
      for(let j =p;j<r;j++){
          if(arr[j]<=x){
            i++;
            [arr[i],arr[j]]=[arr[j],arr[i]];
          }
      }
      [arr[i+1],arr[r]]=[arr[r],arr[i+1]];
      return i+1;
}
function quickSort(arr,p,r){
      let q = 0;
      if(p<r){
        q = Partition(arr,p,r);
        quickSort(arr,p,q-1);
        quickSort(arr,q+1,r);
      }
}
//以下是传说中优雅的es 6 写法
var arr =[7,3,4,2,5,6,6,8,100,20,-5];
var quickSort = function(arr){
  if(!arr.length){
    return [];
  }
  const [pivot,...rest] = arr;
  return [
      ...quickSort(rest.filter((x) => x<pivot)),
      pivot,
      ...quickSort(rest.filter((x) => x>=pivot))
  ];
}
console.log(quickSort(arr));
```

>数组去重

```js
let arr = [];
function random(min,max){
    return Math.floor((max-min+1)*Math.random())+min;
}
for(let i = 0;i<10;i++){
    arr[i] = random(10,15);
}
console.log("之前",arr);
// 法一:
// arr.sort((x,y) => (x-y));
// arr = arr.filter((x,y) => arr.indexOf(x) === y);
// console.log("之后",arr);
//法二:
let hashT = {};
let ans = [];
for(var i of arr){
    if(!hashT[i]){
        hashT[i] = 1;
        ans.push(i);
    }else{
        hashT[i]++;
    }
}
console.log("之后",ans);
//法三是真的强。。
//const deleDupl  = (arr) => [...new Set(arr)];
//console.log(deleDupl([1,1,1,2,3,4,5,1]));
```

>反转字符串

```js
const tranString = (arr) => [...arr].reverse().join("");
let test = "BrellyLiao lio"
console.log(tranString(test));
//就注意一下哪些操作会改变原数组就好

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

>阻止事件冒泡

```js
function stopBubble(e) {
    if (e && e.stopPropagation) { //非IE 
        e.stopPropagation();
    } else { //IE 
        window.event.cancelBubble = true;
    }
}
```


>页面回到顶部

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

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

>格式化数字输出(从最后起每三个数字加个逗号)

```js
var str = "12345678901";
function numSplit(str){
    var re = /(\d)(?=(\d{3})+$)/g;
    //(\d{3})+$ 的意思是连续匹配 3 个数字，且最后一次匹配以 3 个数字结尾。
    //要找到所有的单个字符，这些字符的后面跟随的字符的个数必须是3的倍数，并在符合条件的单个字符后面添加,
    return str.replace(re,'$1,');
}
console.log(numSplit(str));

----------------------------

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

---------------

const toDecimalMark = num => num.toLocaleString('en-US');
```

偶然发现的比较有趣的，哇这个真的是真大佬，30-seconds系列无敌强。。。，然后这个是国人翻译的
[实用有趣的js代码片段](http://www.css88.com/30-seconds-of-code/)

## js-OJ

感觉正式放弃c++写是件比较痛苦的事，可是从事一门像一门以后oj练题与数据结构从js入手。

### 读取

从oj上读取数据是第一步。。。

>读取字符串

```js
while(line = readline()){
    var str = line.trim();
    ...
}
```

>读取变量

```js
var line;
while(line = readline().spilt(' ')){
    var a = line[0];
    var b = line[1];
    ...
}
```