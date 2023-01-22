var xmlhttp = new XMLHttpRequest();

const windowurl =  window.location.pathname.split("/")
var url = ""
if (windowurl[1]=="user"){
    url = "/getphotos/"+ windowurl.pop();
    
}else if(windowurl[1]=="galeria"){
    url = "/getallphotos"
}

function updateGallery(){
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
}
//pierwsze zaladowanie zdjec
updateGallery()


var gridContainer = document.getElementById("grid-container")
function loadGrid(data){

    data.forEach(element => {
        var prepath = "data:image/"+element.ext.slice(1)+";base64,"

        var img = element.img.data
        var base64String = _arrayBufferToBase64(img)
        var podpis = '<p class="img-title">'+element.name+ "</p>"
        var gritem = document.createElement("div")
        var imghtml = document.createElement("img")
        imghtml.src = prepath+ base64String
        imghtml.name = element.name
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


var delete_mode = false;
function hidePopup(){
    var el = document.getElementById("popup-container")
    el.style.display = "none";
}
document.getElementById('popup-container').addEventListener("click",hidePopup);

function usun(name){
    var req = new XMLHttpRequest();
    req.open("DELETE","/delete/"+name)
    req.send()
    gridContainer.innerHTML = " "
    updateGallery()
}
document.getElementById('deletebutton').addEventListener("click",changeDelState)
function changeDelState(){
    if(delete_mode){
        delete_mode = false;
        var button = document.getElementById('deletebutton')
        button.className = "button"
        button.innerHTML = "Kliknij tutaj aby wlaczyc tryb usuwania zdjęć"
    }else{
        delete_mode = true;
        var button = document.getElementById('deletebutton')
        button.className = "activeButton"
        button.innerHTML = "Kliknij tutaj aby wylaczyc tryb usuwania zdjęć"
        alert("Kliknij na zdjecie aby je usunac!")
    }
}

function onImgClick(e){
    if(delete_mode){
        usun(e.target.name)
    }else{
        var popup = document.getElementById("popup-container");
        var imag = document.getElementById("img-in-pop") 
        imag.src = e.target.src 
        popup.style.display = "flex";
    }
}

