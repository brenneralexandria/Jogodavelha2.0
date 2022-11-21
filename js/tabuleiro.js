// Regras do jogo e decidindo se houve vitória/empate

// valindando que todas as células são clicáveis. 
const cells = document.querySelectorAll(".cell");

// Declarando uma variável para mudança de jogador.
let proximajogada = true;

// declaração de caracter para os jogadores.
const jogadorX = "X";
const jogadorO = "O";

// Evento de interação para a célula.
document.addEventListener("click", (event) => {
    // identificar que meus cliques vão ser só dentro da célula.
    if(event.target.matches(".cell")) {
        // Identidicar qual a célula que foi clicada.
        jogar(event.target.id);
    }   
});

// Função para começar o jogo e ideintificar de quem é a vez de jogar.
function jogar(id) {
    const cell = document.getElementById(id);
    // Mudar a vez do jogador.
    jogada = proximajogada ? jogadorX : jogadorO;
    cell.textContent = jogada;
    proximajogada = !proximajogada;
}


/* function jogadasvencedoras() {

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [6,3,0],
    [8,4,0],
    [6,4,2]

} */
