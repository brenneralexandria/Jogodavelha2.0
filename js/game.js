let jogadorAtual;
let gameAtual;

document.addEventListener("click", (event) => { // Para identificar um evento de clique dentro da célula.
    if(event.target.matches(".cell")) { // Para somente os cliques de dentro da célula serem identficados.
        //jogar(event.target.id, jogadorX.simbol);
        JogarNovo(event.target.id);
        setTimeout(() => Bot(), 500);       
    }   
});

function IniciaNovoJogo(){

    //Declaração dos dois jogadores
    const player1 = new Player("X", true);
    const player2 = new Player("O", true); 
    
    jogadorAtual = player1;

    //Declaração de matriz dos locais do tabuleiro
    var matriz = [ ["","",""],
                   ["","",""],
                   ["","",""] ];
}