// Regras do jogo e decidindo se houve vitória/empate

let FinalDeJogo = false;

// valindando que todas as células são clicáveis. 
const cells = document.querySelectorAll(".cell");
const TextoVitoria = document.querySelector("[texto-de-vitoria]");
const MensagemVitoria = document.querySelector("[mensagem-de-vitoria]");
const BotaoReiniciar = document.querySelector("[btn-reiniciar]");

// declaração de caracter para os jogadores.
const jogadorX = "X";
const jogadorO = "O";

const jogadasvencedoras = [ // Jogadas para ganhar

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [6,3,0],
    [8,4,0],
    [6,4,2]  
];

// Evento de interação para a célula.
document.addEventListener("click", (event) => {
    // identificar que meus cliques vão ser só dentro da célula.
    if(event.target.matches(".cell")) {
        // Identidicar qual a célula que foi clicada.
        jogar(event.target.id, jogadorX);
        Bot();
    }   
});

function Bot() {
    const posicoesDisponiveis = [];
    for (index in cells) {
        if(!isNaN(index)) {
            if(
                !cells[index].classList.contains("X") && 
                !cells[index].classList.contains("O")
        ) {
            posicoesDisponiveis.push(index);
        }
    }
}

    const PosicaoAleatoria = math.floor(
        Math.random() * jogadasvencedoras.length
    );

        if (!FinalDeJogo) {
            jogar(posicoesDisponiveis[PosicaoAleatoria], jogadorO);
    }
}   

// Função para começar o jogo e ideintificar de quem é a vez de jogar.
function jogar(id, jogada) {
    const cell = document.getElementById(id);
    cell.classList.remove(jogadorX);
    cell.classList.remove(jogadorO);
    MensagemVitoria.classList.remove('MostrarMensagem');
    cell.textContent = jogada;
    cell.classList.add(jogada);
    jogadorvencedor(jogada);
    
}

function finalizarjogo(vencedor = null) {
    fimDeJogo = true;
    if (vencedor) {
        TextoVitoria.innerText = "Vencedor: " + vencedor;
    } else {
        TextoVitoria.innerText = "Velha";
    }

    MensagemVitoria.classList.add("MostrarMensagem");
}

function jogadorvencedor(jogada) { // Identidicar quem foi o vencendor
    const vencedor = jogadasvencedoras.some((jogds) => { // analisar dentro das jogadas vencedoras 1 por 1 se houve um vencedor.
    return jogds.every((index) => {
        return cells[index].classList.contains(jogada);
        })        
    });
    
    if(vencedor) {
        finalizarjogo(jogada);
    } else if (Velha()) {
        finalizarjogo();
    }
}

function Velha() {
    let x = 0;
    let o = 0;

    for (index in cells) {
        if(!isNaN(index)) {
            if(cells[index].classList.contains(jogadorX)) {
            x++;
        }

        if (cells[index].classList.contains(jogadorO)) {
            o++;
        }
    }
}
    return x + o === 9 ? true : false;
}