
document.querySelector('button').addEventListener("click", () => {
  // console.log("innnnnn");
    fun();
});
function fun() {

        var txt = document.getElementById(
          "mytext").value;
        window.location.href = '/spellcheck?text='+txt;// will redirect to url ad download
          //window.open('http://www.google.com'); //This will open Google in a new window.
}
