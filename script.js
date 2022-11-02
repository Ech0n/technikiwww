const srcs = ["dali.jpg","cezanne_mont_sainte_victorie.jpg","unknown.jpg","mattise.jpg","monet.jpg","monet_sunflowers.jpg","van_gogh_sunflowers.jpg"]
const path = "/src/img/obrazy/"
var curimg = 0

var left,center,right
var galeria;

function onGalleryLoad(){

    galeria = document.getElementById("gallery")
    box = document.getElementById("image");
    box.src = path+srcs[curimg]

}



function hidePopup(){
    el = document.getElementById("popup-container")
    el.style.display = "none";
}


function onImgClick(){
    
    popup = document.getElementById("popup-container");
    imag = document.getElementById("img-in-pop") 
    imag.src = path+srcs[curimg]
    popup.style.display = "flex";

}



function nextimg(){  
    box = document.getElementById("image");
    curimg= (Math.abs(curimg+1))%srcs.length
    box.src = path+srcs[curimg]
}
function previmg (){
    box = document.getElementById("image");
    if(curimg>0)
    curimg= (curimg-1)%srcs.length
    else
    curimg = srcs.length-1
    box.src =path+srcs[curimg]
}