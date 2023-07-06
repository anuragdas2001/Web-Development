var arr=[20,30,40,50];

var obj={
    "0":20,
    "1":30,
    "2":40,
    "3":50
}
console.log(arr);
console.log(obj);

obj.prop="60";
console.log(obj);
arr[10]="prop";
for(var i in arr)
{
    console.log(i);
}
