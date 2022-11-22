// Regras do jogo e decidindo se houve vitória/empate

// valindando que todas as células são clicáveis. 
const cells = document.querySelectorAll(".cell");
const TextoVitoria = document.querySelector("[texto-de-vitoria]");
const MensagemVitoria = document.querySelector("[mensagem-de-vitoria]");

// Declarando uma variável para mudança de jogador.
let proximajogada = true;

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
        jogar(event.target.id);
    }   
});

// Função para começar o jogo e ideintificar de quem é a vez de jogar.
function jogar(id) {
    const cell = document.getElementById(id);
    // Mudar a vez do jogador.
    jogada = proximajogada ? jogadorX : jogadorO;
    
   
    MensagemVitoria.classList.remove("MostrarMensagem");

    cell.textContent = jogada;
    cell.classList.add(jogada);
    jogadorvencedor(jogada);
    
}

function finalizarjogo(vencedor = null) {
    if (vencedor) {
        TextoVitoria.innerText = "Vencedor: " + vencedor;
    } else {
        TextoVitoria.innerText = "Velha";
    }

    MensagemVitoria.classList.add("MostrarMensagem");

    let contador = 3;
    setInterval(() => {
       MensagemVitoria.innerHTML = `Reiniciando em  ${contador--}`; 
    }, 1000);

    setTimeout(() => location.reload(), 4000);
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
    } else {
        proximajogada = !proximajogada;
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
