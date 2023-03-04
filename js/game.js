let jogadorAtual;
let gameAtual;
let modoJogo = false;

document.addEventListener("click", (event) => { // Para identificar um uvento de clique dentro da célula.
    if(event.target.matches(".cell")) { // Para somente os cliques de dentro da célula serem identficados.
        JogarNovo(event.target.id);      
    }   
});

function IniciaNovoJogo(){

    //Declaração e instância dos dois jogadores
    const player1 = new Player("X", modoJogo);
    const player2 = new Player("O", true); 

    
    //Seta quem começa o jogo
    jogadorAtual = player1;

    //Declaração e instância de matriz dos locais do tabuleiro
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
            card.classList.add('cell');
            container.appendChild(card); 
        }
    }

    if(jogadorAtual.isBot)
        Bot();     
}

//Ação de jogar
function JogarNovo(id){

    //Busca elemento HTML para inserir o símbolo do jogador
    const cell = document.getElementById(id);

    if(id) {
        //Retorna o número da coluna
        const col = String(id).substring(0,1);
        //Retorna o número da linha
        const row = String(id).substring(1);

        //Validar se a posição não está preenchida
        if(gameAtual.placesBoard[col][row] === "" || gameAtual.placesBoard[col][row] === null){
            cell.textContent = jogadorAtual.symbol; //Insere o símbolo no elemento no HTML
            gameAtual.placesBoard[col][row] = jogadorAtual.symbol; // Insere o símbolo na posição da matriz

            var validacao = ValidaPartida(col, row); // Valida se houve ganhador ou velha
            
            // Caso a partida seja finalizada, stopa a função
            if(validacao)
                return;

            // permutação de jogagores
            jogadorAtual = jogadorAtual == gameAtual.player1 ? gameAtual.player2 : gameAtual.player1;
            
            //Valida se o jogador é um Bot
            if(jogadorAtual.isBot){
                Bot();
            }     
        }  
        
    }

}

//Limpa o tabuleiro atual e reinicia a partida
function ClearAll(){

    for(let i = 0; i < gameAtual.placesBoard.length; i++){
        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            var ind = '';
            var card = document.getElementById(ind.concat(i,j));
            gameAtual.placesBoard[i][j] = '';

            var parentCard = card.parentElement;
            parentCard.removeChild(card);
        }
    }

    IniciaNovoJogo();
}

//Verifica se houve ganhador ou se deu velha
function ValidaPartida(col, row){

    var listValuesRow = []; // Listar todos os símbolos da linha
    var listValuesVector = []; // Listar todos os símbolos do vetor
    var listValuesInverseVector = []; // Listar todos os símbolos do vetor inverso

    var velha = true; // variavel para verificar se o jogo deu velha
    var fim = false; // variável para verificar se o jogo finalizou

    for(let i = 0; i < 3; i++){
        listValuesRow.push(gameAtual.placesBoard[i][row]); // insere os símbolos da mesma linha
        listValuesVector.push(gameAtual.placesBoard[i][i]); // insere os símbolos do vetor

        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            if(i + j == 2){
                listValuesInverseVector.push(gameAtual.placesBoard[i][j]); // insere os símbolos do vetor inverso
            }
        
            if(gameAtual.placesBoard[i][j] === "" || gameAtual.placesBoard[i][j] === null)
                velha = false;  //seta a velha como falso caso possua campos a serem preenchidos
        }
    }

    // verifica as possibilidades de vitória do jogagor atual
    if(gameAtual.placesBoard[col].every( v => v === gameAtual.placesBoard[col][row]) 
        || listValuesRow.every(v => v === gameAtual.placesBoard[col][row])
        || listValuesVector.every(v => v === gameAtual.placesBoard[col][row])
        || listValuesInverseVector.every(v => v === gameAtual.placesBoard[col][row])){
        alert( "O jogador " + jogadorAtual.symbol + " venceu!");
        setTimeout(() => ClearAll(), 300);
        fim = true;
        
    } else if(velha) // valida se o jogo não houve ganhador e deu velha
    {
        alert("O jogo deu velha!")
        ClearAll();
        fim = false;
    }
    
    return fim;
    
}

//Executa função automática de inserir valor
function Bot(){
    var indicesDisponiveis = [];

    // percorre a matriz para buscar posições disponíveis para a jogada
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            var ind = '';
            if(gameAtual.placesBoard[i][j] === "" || gameAtual.placesBoard[i][j] === null)
                indicesDisponiveis.push(ind.concat(i,j));
        }
    }

    //randomização da jogada
    const position = Math.floor(Math.random() * indicesDisponiveis.length);
    // executa a função de Jogar após 1 segundo
    setTimeout(() => JogarNovo(indicesDisponiveis[position]), 1000);
}

function playerXmaq(){
    modoJogo = modoJogo;
    IniciaNovoJogo()
}

function maqXmaq(){
    modoJogo = !modoJogo;
    IniciaNovoJogo()
}

function reiniciaJogo() {
    ClearAll();
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
        this.placesBoard = placesBoard;
    }
}