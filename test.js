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