// valindando que todas as células são clicáveis. 
const cells = document.querySelectorAll(".cell");
const TextoVitoria = document.querySelector("[texto-de-vitoria]");
const MensagemVitoria = document.querySelector("[mensagem-de-vitoria]");
let TipoDeJogo = "vsplayer"

// Declarando uma variável para mudança de jogador.
let proximajogada = true;

// declaração de caracter para os jogadores.
const jogadorX = {
    simbol: "X",
    isBot: false
}

const jogadorO = {
    simbol: "O",
    isBot: false
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
        jogar(event.target.id);
    }   
});

function IniciarJogo (tipoDeJogo) {
    TipoDeJogo = tipoDeJogo;
    console.log("Iniciando jogo " + tipoDeJogo);
    switch(TipoDeJogo){
        case "vsplayer":
            jogadorX.isBot=false;
            jogadorO.isBot=false;
            break;
        case "vsmaquina":
            jogadorX.isBot=false;
            jogadorO.isBot=true;
            break;
        case "automatico":
            jogadorX.isBot=true;
            jogadorO.isBot=true;
            jogar()
            break;
        }
}

// Função para começar o jogo e ideintificar de quem é a vez de jogar.
function jogar(id) {
    const cell = document.getElementById(id);
    // Mudar a vez do jogador.
    let jogada = proximajogada ? jogadorX.simbol : jogadorO.simbol;
    console.log("Realizando a jogada " + jogada);
    if(jogada === 'X') {
        if(jogadorX.isBot) {
            console.log("Jogador X é um bot")
            sleep(1500);
            Bot(jogadorX.simbol);
        }
    }else {
        if(jogadorO.isBot) {
            console.log("Jogador O é um bot")
            sleep(1500);
            Bot(jogadorO.simbol);
        }
    }   
   
    MensagemVitoria.classList.remove("MostrarMensagem");

    if(id) {
        cell.textContent = jogada;
        cell.classList.add(jogada);
    }
    
    proximajogada = ! proximajogada;
    if(JogoTerminou(jogada) || Velha())  {
        console.log("O jogo terminou");
        jogadorvencedor(jogada);
    }
    sleep(1500);

    jogada = proximajogada ? jogadorX.simbol : jogadorO.simbol;
    if(jogada === 'X') {
        if(jogadorX.isBot) {
            console.log("Jogador X é um bot")
            sleep(1500);
            Bot(jogadorX.simbol);
            proximajogada = ! proximajogada;
        }
    }else {
        if(jogadorO.isBot) {
            console.log("Jogador O é um bot")
            sleep(1500);
            Bot(jogadorO.simbol);
            proximajogada = ! proximajogada;
        }
    }
    if(TipoDeJogo === "automatico") {
        if(JogoTerminou(jogada) || Velha())  {
            console.log("O jogo terminou");
            jogadorvencedor(jogada);
        }else {
            setTimeout(() => jogar(), 1000);
        }
        
    }    
}

function Bot(jogada) {
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
    const cell = document.getElementById(posicoesDisponiveis[posicaoAleatoria]);
  
    cell.textContent = jogada;
    cell.classList.add(jogada);
}

function MostrarJogadorVencedor(jogada) {
    TextoVitoria.innerText = "Vencedor: " + jogada;

    MensagemVitoria.classList.add("MostrarMensagem");
}

function MostrarVelha() {
    TextoVitoria.innerText = "Velha";

    MensagemVitoria.classList.add("MostrarMensagem");
}

function jogadorvencedor(jogada) { // Identidicar quem foi o vencendor 
    if (Velha()) {
        MostrarVelha();   
    } else {
        MostrarJogadorVencedor(jogada);
    }
    setTimeout(() => document.location.reload(true), 10000);
} 

function JogoTerminou(jogada) {
    const vencedor = jogadasvencedoras.some((jogds) => { // analisar dentro das jogadas vencedoras 1 por 1 se houve um vencedor.
        return jogds.every((index) => {
            return cells[index].classList.contains(jogada);
        })        
    });
    return vencedor;
}

function Velha() {
    let x = 0;
    let o = 0;

    for (index in cells) {
        if(!isNaN(index)) {
        if(cells[index].classList.contains(jogadorX.simbol)) {
            x++;
        }
        if (cells[index].classList.contains(jogadorO.simbol)) {
            o++;
        }
    }
}
    return x + o === 9 ? true : false;
}

const sleep = ms => new Promise(r => setTimeout(r, ms)); // fazer a função esperar X segundos