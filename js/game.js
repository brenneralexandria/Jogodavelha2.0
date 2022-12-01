let jogadorAtual;
let gameAtual;
let modojogo = false;

document.addEventListener("click", (event) => { // Para identificar um evento de clique dentro da célula.
    if(event.target.matches(".cell")) { // Para somente os cliques de dentro da célula serem identficados.
        JogarNovo(event.target.id);
        setTimeout(() => Bot(), 500);       
    }   
});

function IniciaNovoJogo(){ // para iniciar o jogo

    //Declaração dos dois jogadores
    const player1 = new Player("X", modojogo);
    const player2 = new Player("O", true); 
    
    // Mostra quem vai começar o jogo.
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
      
    // Para mudar a função do botão de iniciar para Reiniciar
    var botaoInicio = document.getElementById("btnStartGame"); // mudar a função de iniciar jogo para reiniciar
    botaoInicio.innerText = "Reiniciar Jogo";
    botaoInicio.onclick = function(){ClearAll()};

    if(jogadorAtual.isBot)
        bot();
}

//Ação de jogar
function JogarNovo(id){
    // Busca elemento HTML para inserir o símbolo de jogador.
    const cell = document.getElementById(id);

    if(id) {
        // Retorno o núero da coluna.
        const col = String(id).substring(0,1);
        // Retorna o número da linha.
        const row = String(id).substring(1);

        // validar se a posição está preenchida.
        if(gameAtual.placesBoard[col][row] === "" || gameAtual.placesBoard[col][row] === null){
            cell.textContent = jogadorAtual.symbol; //Insere o símbolo no elemento no HTML.
            gameAtual.placesBoard[col][row] = jogadorAtual.symbol; // Insere o símbolo na posição da matriz.

            var validacao = ValidaPartida(col, row); // Valida se houve ganhador ou velha.
            
            // Caso a partida seja finalizada, stopa a função.
            if(validacao)
                return;

            // Saber de quem é a vez de jogar.
            jogadorAtual = jogadorAtual == gameAtual.player1 ? gameAtual.player2 : gameAtual.player1;

            // Valida se o jogador é um Bot.
            if(jogadorAtual.isBot){
                Bot();
            }
            
        }

    }
    
}

// Limpa o tabuleiro e reinicia a partida.
function ClearAll(){

    for(let i = 0; i < gameAtual.placesBoard.length; i++){
        for(let j = 0; j < gameAtual.placesBoard[i].length; j++){
            var ind = '';
            var card = document.getElementById(ind.concat(i,j));
            console.log(ind.concat(ind.concat(i,j)))
            card.innerText = '';
            gameAtual.placesBoard[i][j] = '';
            break;
        }
    }

    IniciaNovoJogo();
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