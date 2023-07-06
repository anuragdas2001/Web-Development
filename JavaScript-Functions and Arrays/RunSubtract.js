var add = function (a, b) {
    return a+b;
}

var subtract = function (a, b) {
    return a-b;
}

var op = function (func) {
    var x = 2;
    var y = 3;
    return func(x, y);
}
console.log(op(subtract));