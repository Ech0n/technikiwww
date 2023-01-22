var xmlhttp = new XMLHttpRequest();

const url = "/listusers/get";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        createtable(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function createtable(data){
    const container = document.getElementById("list-container")
    var table = document.createElement("table")
    data.forEach(element => {
        var row = document.createElement("tr")
        row.innerHTML = element.username
        row.className = "User-item"
        row.addEventListener("click",onPressRedirect)
        table.appendChild(row)
    });
    container.appendChild(table)
}

function onPressRedirect(e){
    window.location.href = "/user/"+e.target.innerHTML;
}