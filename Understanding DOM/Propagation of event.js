var outer=document.getElementById('outerdiv');
outer.addEventListener('click',function(){
    console.log('CLick Outer div');
    
});

var inner=document.getElementById('innerdiv');
inner.addEventListener('click',function(event){
    console.log('CLick inner div');
    event.stopPropagation();
});

document.addEventListener('click',function(){
    console.log('CLick Document');
});

