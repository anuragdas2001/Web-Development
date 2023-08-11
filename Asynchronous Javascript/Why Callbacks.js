console.log(1);

var promise = new Promise((resolve, reject) => {
  resolve(2);
});

promise.then(function (data) {
    console.log(data);
});


console.log(3);
