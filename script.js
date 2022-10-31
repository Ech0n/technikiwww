var imgslots = 0
var left,center,right

function adjustToScreenWidth(){
    if(window.screen.width>900){
        imgslots=3
        imgbox = document.getElementById("imgbox")
        imgbox.innerHTML = "<img src=\"https://picsum.photos/300\" id=\"left_img\" /><img src=\"https://picsum.photos/300\" id=\"center_img\" /> <img src=\"https://picsum.photos/300\" id=\"right_img\" />"

    }else{
        imgslots=1

        imgbox = document.getElementById("imgbox")
        imgbox.innerHTML = "<img src=\"https://picsum.photos/300\" id=\"center_img\" />"

    }
}

addEventListener('resize', (event) => {
   adjustToScreenWidth();
});

function onGalleryLoad(){
    console.log("zaladowano galerie")
    //generuj liczbe zdjec w rzedzie
    //dla telefonow 1, dla wiekszych ekranow 3
    adjustToScreenWidth();


}

function nextimg(){
    left = document.getElementById("left_img");
    right = document.getElementById("center_img");    
    center = document.getElementById("right_img");    

    right.src = center.src;
    center.src = left.src;

    //TODO: nastepne zdjecie z zaladowac z listy zdjec po kolei
    left.src = "https://picsum.photos/id/"+Math.floor(Math.random() * 101).toString()+"/300/300";

}
function previmg (){
    left = document.getElementById("left_img");
    right = document.getElementById("center_img");    
    center = document.getElementById("right_img");    

    left.src = center.src;
    center.src = right.src;

    //TODO: nastepne zdjecie z zaladowac z listy zdjec po kolei
    right.src = "https://picsum.photos/id/"+Math.floor(Math.random() * 101).toString()+"/300/300"

}