//Objeto que mantém Mantém a exibição atualizada
var view = { //Métodos
    displayMessage: function(msg){ 
        var messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg;
    },
    displayHit: function(location){
        var cell = document.getElementById(location)
        cell.setAttribute("class", "hit");  //Definimos a class hit ao elemento
    },
    displayMiss: function(location){
        var cell = document.getElementById(location)
        cell.setAttribute("class", "miss") //Definimos a class miss ao elemento
    }
}

view.displayMiss("00")
view.displayHit("34")
view.displayMiss("55")
view.displayHit("12")
view.displayMiss("25")
view.displayHit("26")

view.displayMessage("Tap Tap, is this thing on?")