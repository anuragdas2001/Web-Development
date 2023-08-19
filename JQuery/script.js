// var para=document.getElementById("para1");

// para.textContent='Welcome';

$('#para1').html('Welcome');
var para=$('p');
var p2=para.eq(1); //returns JQuery Object
var p3=para[0]; //returns DOM object

p2.html('Changed');



/*
    function $(query){
        document.querySelector(query);
    }
*/