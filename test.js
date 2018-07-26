var arr = [4,5,1,3,2,4,7];
//var arr = [3,4,5,7,8,2,5,9];

function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    let left = [];
    let right = [];
    let mid = Math.floor(arr.length/2);
    let midval = arr.splice(mid,1);
    for(let i = 0; i<arr.length;i++){
        if(arr[i]<midval){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(midval,quickSort(right));
}
console.log(quickSort(arr));