import {obrazy} from "./obrazy.js"

const setTitle = obraz =>{
    var textbox = document.getElementById("painting-title")
    if(textbox)
    {
        textbox.innerHTML = obraz.author + ", "+obraz.title;
    }
}

const path = "./images/obrazy/"
var curimg = 0

var galeria,box;

function onGalleryLoad(){

    galeria = document.getElementById("gallery")
    box = document.getElementById("image");
    box.src = path+obrazy[curimg].src
    setTitle(obrazy[curimg])
}
document.getElementById('image').addEventListener("load",onGalleryLoad());


function hidePopup(){
    var el = document.getElementById("popup-container")
    el.style.display = "none";
}
document.getElementById('popup-container').addEventListener("click",hidePopup);


function onImgClick(){
    var popup = document.getElementById("popup-container");
    var imag = document.getElementById("img-in-pop") 
    imag.src = path+obrazy[curimg].src
    popup.style.display = "flex";

}
document.getElementById('image').addEventListener("click",onImgClick);



function nextimg(){  
    box = document.getElementById("image");
    curimg= (Math.abs(curimg+1))%obrazy.length
    box.src = path+obrazy[curimg].src
    setTitle(obrazy[curimg])

}
function previmg (){
    box = document.getElementById("image");
    if(curimg>0)
    curimg= (curimg-1)%obrazy.length
    else
    curimg = obrazy.length-1
    box.src = path+obrazy[curimg].src
    setTitle(obrazy[curimg])
}
document.getElementById('arrow-left').addEventListener("click",previmg);
document.getElementById('arrow-right').addEventListener("click",nextimg);
