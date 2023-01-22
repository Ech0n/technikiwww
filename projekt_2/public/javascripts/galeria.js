var xmlhttp = new XMLHttpRequest();

const windowurl =  window.location.pathname.split("/")
var url = ""
if (windowurl[1]=="user"){
    url = "/getphotos/"+ windowurl.pop();
    
}else if(windowurl[1]=="galeria"){
    url = "/getallphotos"
}

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        if(data.length == 0){
            display_empty()
        }else{
        loadGrid(data);}
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();



var gridContainer = document.getElementById("grid-container")
function loadGrid(data){

    data.forEach(element => {
        var prepath = "data:image/"+element.ext.slice(1)+";base64,"

        var img = element.img.data
        var base64String = _arrayBufferToBase64(img)
        var obraz = '<img src="'+prepath+ base64String +'" />'
        var podpis = '<p class="img-title">'+element.name+ "</p>"
        var gritem = document.createElement("div")
        var imghtml = document.createElement("img")
        imghtml.src = prepath+ base64String
        gritem.addEventListener("click",onImgClick)
        gritem.className = "grid-item"
        gritem.appendChild(imghtml)
        gritem.innerHTML += podpis
        gridContainer.appendChild(gritem)
    });
    console.log("loaded image grid") 
    
}

function display_empty(){
    var paragraf = document.createElement("p")
    paragraf.innerHTML = "Użytkownik nie dodał żadnych zdjęć :("
    gridContainer.appendChild(paragraf)
}

// Funkcja z internetu konwertujaca tablice bitow na string
// zrodlo: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}



function hidePopup(){
    var el = document.getElementById("popup-container")
    el.style.display = "none";
}
document.getElementById('popup-container').addEventListener("click",hidePopup);

function onImgClick(e){
    var popup = document.getElementById("popup-container");
    var imag = document.getElementById("img-in-pop") 
    imag.src = e.target.src
    popup.style.display = "flex";

}

