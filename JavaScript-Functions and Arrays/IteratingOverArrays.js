function print(element){
    console.log(element);
}

// for(var i=0;i<=arr.length;i++){
//     print(arr[i]);
// }


var arr=[1,2,3,4];

arr.forEach(print);

var words = ['one', 'two', 'three', 'four'];

words.forEach(function(word) {
    console.log(word);
    if (word === 'two') {
        words.shift();
    }
});


var color = ['red', 'orange', 'blue', 'violet'];

var removed = color.splice(2);

console.log(color);
console.log(removed);