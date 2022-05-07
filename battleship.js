//Objeto que mantém Mantém a exibição atualizada
var view = {

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
//Objeto responsável por manter a lógica do jogo. Verificando navios afundados, processando as tentativas e contabilizar o estado atual do jogo. 
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
    generateShipLocations: function(){
        var locations;
        for (var i = 0; i < this.numShips; i++){
            do{
                locations = this.generateShip()
            }while(this.collision(locations))
            this.ships[i].locations = locations
        }
    },
    generateShip: function(){
        var direction = Math.floo(Math.random() * 2) //assim se cria um seguimento binário
        var row, col
        if(direction === 1){
            //Gere a posição inicial para um navio horizontal
            row = Math.floor(Math.random() * this.boardSize)
            col = Math.floor(Math.random() * (this.boardSize  - this.shipLength))
        }else{
            //Gere a posição inicial para um navio vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength))
            col = Math.floor(Math.random() * this.boardSize)
        }

        var newShipLocations = []     //Para as posições, um array vazio, e adicionar as posições uma por uma
        for(var i= 0; i< this.shipLength; i++){
            if(direction === 1){
            //adiciona a posição ao array para umm novo navio horizontal
            newShipLocations.push(row + "" + (col + 1))
            }else{
            //adiciona a posição ao array para um novo navio vertical
            newShipLocations.push((row + 1 ) + "" + col)
            }
        }
        return newShipLocations
    },
    //Método que dispara no navio
    fire: function(guess){
        for( var i =0; i <this.numShips; i++){ //Passa por cada método do navio
            var ship = this.ships[i]    //variável q recebe o navio
            var index = ship.locations.indexOf(guess) //Retorna o index do 'locations' na variável 'ship' de nosso palpite.

            if(index >= 0){ //O método indexOf retorna -1 se não achar o nosso palpite, então não entramos nessa condicional.
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
        view.displayMiss(guess)
        view.displayMessage("You missed.")
        return false
    },
    //Método que verifica se o navio esta afundado
    isSunk: function(ship){ //Recebe um navio como argumento
        for( var i = 0; i < this.shipLength ; i++){     

            if(ship.hits[i] =! "hit"){ //Passa pelo array hit desse navio, verificando em cada índice se o valor é diferente de hit, se for retorna false. e o navio ainda não afundou.
                return false
            }
        }
        return true
    }
}

//Objeto Controller 
//Este objeto é responsável por pegar o palpite, processar o palpite e entregar para o model. 
//Se apoia no model para manter o estado no objeto view para exibir o jogo.

var controller = {
    guesses: 0,
    processGuess: function(guess){
        var location = parseGuess(guess);
        if(location){ //Desde que não recebamos null, sabemos que temos um objeto location válido. null é um valor falsey
            this.guesses++;
            var hit = model.fire(location);
            if(hit && model.shipsSunk === model.numShips){
                view.displayMessage("You sank all the battleships, in " + this.guesses + "guesses")
                
            }
        }
    },
    
}


//Função que verifica o palpite
function parseGuess(guess){
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]
    if (guess === null || guess.length !== 2){
        alert("Please enter a letter and a number on the board")
    }else{
        var firstChar = guess.charAt(0) //Pega o primeiro palpite do guess
        var row = alphabet.indexOf(firstChar) //Retorna no alfabeto um número entre 0 e 6 referente a letra correspondida no guess

        var column = guess.charAt(1) //Pega o segundo caractere do guess
        if(isNaN(row) || isNaN(column)){
            alert("That isn't on the board")
        }else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
            alert("That's off the board")        
        }else{
            return row + column //Se nada falhar retorna a string convertida
        }
    }
    return null
}

function init(){
    //para botão fire
    var fireButton = document.getElementById("fireButton")
    fireButton.onclick = handlerFireButton
    //para o botão enter
    var guessInput = document.getElementById("guessInput")
    guessInput.onkeydown = handleKeyPress
}
//função que ativa o enter
function handleKeyPress(e){
    var fireButton = document.getElementById("fireButton") //recebe o botao fire
    if(e.keyCode === 13){  //passa o botão fire quando é apertado enter
    fireButton.click()
    return false  //retorna false para que o formulário não faça nada mais ( tentar enviar a si mesmo, por exemplo)
    }
}


function handlerFireButton(){
    guessInput = document.getElementById("guessInput")
    var guess = guessInput.value  //recebe o palpite no campo de input
    controller.processGuess(guess) // passa o palpite no campo de input pro controller 

    guessInput.value = ""
}

window.onload = init  // Só roda init quando o código estiver totalmente carregado