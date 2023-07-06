var combinedString = "";
function a() {
    combinedString = "Inside a";

    function b() {
        combinedString = combinedString + " Inside b";
    }

    b();
}

a();
console.log(combinedString);