$('#para1').css('color','red');
$('#para1').css('fontSize','30px');

$('div').css({
    height:"200px",
    width:"200px",
    backgroundColor:"cyan"
});

$('div').click(function(){
    alert('Div Clicked');

});

// or,

$('div').on('click',function(){
    alert('Div Clicked');  
});

$('a').on('click',function(){
    var element = $(this);
    element.width(element.width() + 10 + "px");
    //alert("Div Clicked");
});