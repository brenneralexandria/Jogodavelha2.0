let jogadorAtual;
let gameAtual;

document.addEventListener("click", (event) => { // Para identificar um evento de clique dentro da célula.
    if(event.target.matches(".cell")) { // Para somente os cliques de dentro da célula serem identficados.
        //jogar(event.target.id, jogadorX.simbol);
        JogarNovo(event.target.id);
        setTimeout(() => Bot(), 500);       
    }   
});

function IniciaNovoJogo(){ // para iniciar o jogo

    //Declaração dos dois jogadores
    const player1 = new Player("X", true);
    const player2 = new Player("O", true); 
    
    jogadorAtual = player1;

    //Declaração de matriz dos locais do tabuleiro
    var matriz = [ ["","",""],
                   ["","",""],
                   ["","",""] ];

    gameAtual = new Board(player1, player2, matriz);

    var container = document.getElementById("containerBoard");
               
    for(let i = 0; i < gameAtual.placesBoard.length; i++){
        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            var ind = '';
            var card = document.createElement('div');
            card.setAttribute("id", ind.concat(i,j));
            card.classList.add('cell'); // As atribuções para a div
                container.appendChild(card); // Adicionando o elemento criando dentro do meu board
        }
    }
               
    var botaoInicio = document.getElementById("btnStartGame"); // mudar a função de iniciar jogo para reiniciar
    botaoInicio.innerText = "Reiniciar Jogo";
    botaoInicio.onclick = function(){ClearAll()};
}

//Ação de jogar
function JogarNovo(id){

    const cell = document.getElementById(id);


    if(id) { // identificar se não está nulo
        const col = String(id).substring(0,1);
        const row = String(id).substring(1);
        cell.textContent = jogadorAtual.symbol;
        cell.classList.add(jogadorAtual.symbol);

        gameAtual.placesBoard[col][row] = jogadorAtual.symbol;

        if(gameAtual.placesBoard[col].every( v => v === gameAtual.placesBoard[col][row])){
            // alert( "O jogador " + jogadorAtual.symbol + " venceu!");
            ClearAll();
        }

    }

    jogadorAtual = jogadorAtual == gameAtual.player1 ? gameAtual.player2 : gameAtual.player1;
}

function ClearAll(){

    for(let i = 0; i < gameAtual.placesBoard.length; i++){
        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            var ind = '';
            var card = document.getElementById(ind.concat(i,j));
            console.log(ind.concat(ind.concat(i,j)))
            card.innerText = '';
            gameAtual.placesBoard[i][j] = '';
        }
    }

}

//Entidade Jogador
class Player{
    constructor(symbol, isBot){
        this.symbol = symbol; //X  ou O
        this.isBot = isBot; // true é a máquina e se for false é jogador
    }
}

//Entidade Tabuleio de Jogo
class Board{
    constructor(player1, player2, placesBoard){
        this.player1 = player1;
        this.player2 = player2;
        this.placesBoard = placesBoard; // as posições do tabuleiro
    }
}