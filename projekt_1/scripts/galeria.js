import { obrazy } from "./obrazy.js";
const path = "/src/img/obrazy/"

var gridContainer = document.getElementById("grid-container")
function loadGrid(){
    console.log("loaded grid")
    for(let i = 0;i<obrazy.length;i++){
        var obraz = '<img src="'+path+obrazy[i].src+'" />'
        var podpis = '<p class="img-title">'+ obrazy[i].title + "</p>"
        gridContainer.innerHTML += '<div class="grid-item" >'+obraz+podpis+'</div>';
    }
}
document.getElementById("grid-container").addEventListener("load",loadGrid())