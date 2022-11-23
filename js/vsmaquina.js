// Jogo vs a máquina

// valindando que todas as células são clicáveis. 
const cells = document.querySelectorAll(".cell");
const TextoVitoria = document.querySelector("[texto-de-vitoria]");
const MensagemVitoria = document.querySelector("[mensagem-de-vitoria]");

let FinalDeJogo = false;

// declaração de caracter para os jogadores.
const jogadorX = "X";
const jogadorO = "O";

function vsmaquina() {

}

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
        setTimeout(() => Bot(), 500);
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

    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );

        if(!FinalDeJogo) {
            jogar(posicoesDisponiveis[posicaoAleatoria], jogadorO);
    }
}   

// Função para começar o jogo e ideintificar de quem é a vez de jogar.
function jogar(id, jogada) {

    const cell = document.getElementById(id);
  
    cell.textContent = jogada;
    cell.classList.add(jogada);
    jogadorvencedor(jogada);
    
}

function finalizarjogo(vencedor = null) {
    FinalDeJogo = true;
    if (vencedor) {
        TextoVitoria.innerText = "Vencedor: " + vencedor;
    } else {
        TextoVitoria.innerText = "Velha";
    }

    MensagemVitoria.classList.add("MostrarMensagem");
    
    let contador = 3;
    setInterval(() => {
       MensagemVitoria.innerHTML = `Reiniciando em  ${contador--}`; 
    }, 500);

    setTimeout(() => location.reload(), 300);
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
    }else {
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