const XHR = new XMLHttpRequest();

window.addEventListener("load", () => {

    function sendData() {
    
        var data = new FormData(form);
        var new_data = {}
        for (var [key, value] of data.entries()) { 
            if(key=="password" ){
                if(!value){
                alert("Prosze podac haslo!")
                return}else if(value.length<4){
                    alert("Haslo musi zawierac:przynajmniej 4 znaki\n-")
                    return
                }
            }
            if(key=="email"){
                const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                if(!pattern.test(value)){
                    alert("email jest nie prawidlowy!")
                    return
                }
            }
            if(key=="username" && value.length < 3){
                alert("Nazwa uzytkownika jest za krotka!")
                    return
            }
            new_data[key] = value
        }
        XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Utworzono konto")
            }
        };

        XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
                if(this.responseText=="Pomyslnie zalogowano!"){
                    window.location.replace("../");
                }
            }
        };
        XHR.open("POST", "/api/register",true);
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XHR.send(JSON.stringify(new_data));
    }
    const form = document.getElementById("formularz");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendData();
    });
});

