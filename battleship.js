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
/*Objeto que representam o navio 

    var ships1 = {
    locations: ["10", "20", "30"], //Esta propriedade é um array que contém cada localização no tabuleiro 
    hits: ["","",""] /*Também é um array, que contém se o navio foi atingido em cada localização
    vamos definir os itens do arrays como string vazias inicialmente e mudar cada item para hit quando o navio for atingido no local correspondente 
} */

    

//Objeto Model
var model = {
    boardSize:  7,  //tamanho da grade
    numShips:   3,  //número de navios
    shipLength: 3,  //o número de locais em cada navio 
    shipsSunk:  0,  //número atual de navios afundados pelo jogador (valor inicial = 0)

    ships: [ //Esse é a propriedade ships , que é um array de objetos que contém a localização dos navios. É usado um array para otimizar a simplicidade do código, em vez de criar 3 propriedades diferentes.
    {
        locations: ["06", "16", "26"], // i = 0
        hits: ["", "", ""] }, //Navio 1
    {
        locations: ["24", "34", "44"], // i = 1
        hits: ["", "", ""] }, //Navio 2 
    {
        locations: ["10", "11", "12"], // i = 2
        hits: ["", "", ""] } //Navio 3 
    ], 

    //Método que dispara no navio
    fire: function(guess){
        for( var i =0; i <this.numShips; i++){ //Passa por cada método do navio
            var ship = this.ships[i]    //variável q recebe o navio
            var index = ship.locations.indexOf(guess) //Retorna o index do 'locations' na variável 'ship' de nosso palpite.
            if(index >= 0){ //O método indexOf retorna zero se não achar o nosso palpite, então não entramos nessa condicional.
                ship.hits[index] = "hit" //marca hit no array hits com o index da localização, caso o palpite esteja correto
                view.displayHit(guess)
                view.displayMessage("HIT")
                if(this.isSunk(ship)){ //caso nosso método isSunk retorne true. Propriedade do número de navios afundado recebe +1
                    view.displayMessage("You sank a battleship!")
                    this.shipsSunk++
                }
                return true
            }
        }
        return false
    },
    //Método que verifica se o navio esta afundado
    isSunk: function(ship){ //Recebe um navio como argumento
        for( var i = 0; i < this.ship.length ; i++){ 
            if(ship.hits[i] =! "hit"){ //Passa pelo array hit desse navio, verificando em cada índice se o valor é diferente de hit, se for retorna false. e o navio ainda não afundou.
                return false
            }
        }
        return true
    }
    

}
