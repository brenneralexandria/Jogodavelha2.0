// Validação de jogadas, Vencedor e velha. 

const cells = document.querySelectorAll(".cell");
const TextoVitoria = document.querySelector("[texto-de-vitoria]");
const MensagemVitoria = document.querySelector("[mensagem-de-vitoria]");

let TipoDeJogo = "vsmaquina";
let proximajogada = true;

const jogadorX = {
    simbol: "X",
    isBot: false
}

const jogadorO = {
    simbol: "O",
    isBot: false
}

const jogadasvencedoras = [ // Jogadas para possíveis vitórias.

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [6,3,0],
    [8,4,0],
    [6,4,2]  
];


document.addEventListener("click", (event) => { // Para identificar um uvento de clique dentro da célula.
    if(event.target.matches(".cell")) { // Para somente os cliques de dentro da célula serem identficados.
        jogar(event.target.id);
    }   
});

function IniciarJogo (tipoDeJogo) { // Função para iniciar o tipo de jogo selecionado.
    TipoDeJogo = tipoDeJogo;
    console.log("Iniciando jogo " + tipoDeJogo);
    switch(TipoDeJogo){
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


function jogar(id) { // Função para começar o jogo e identificar de quem é a vez de jogar.
    const cell = document.getElementById(id);
        let jogada = proximajogada ? jogadorX.simbol : jogadorO.simbol; // Mudar a vez do jogador.
        console.log("Realizando a jogada " + jogada);
    if(jogada === 'X') { // Para saber se quem está jogadno é um bot.
        if(jogadorX.isBot) {
            console.log("Jogador X é um bot")
            setTimeout(() =>  Bot(jogadorX.simbol), 700); // Determinar o tempo de cada jogada
        }
          
    }else {
        if(jogadorO.isBot) {
            console.log("Jogador O é um bot")
            setTimeout(() =>  Bot(jogadorO.simbol), 1000);
        }
    }   
   
    if(id) {
        cell.textContent = jogada;
        cell.classList.add(jogada);
    }
    
    proximajogada = ! proximajogada;
    if(JogoTerminou(jogada) || Velha())  {
        console.log("O jogo terminou");
        jogadorvencedor(jogada);
        return;
    }

    jogada = proximajogada ? jogadorX.simbol : jogadorO.simbol;
    if(jogada === 'X') {
        if(jogadorX.isBot) {
            console.log("Jogador X é um bot")
            setTimeout(() =>  Bot(jogadorX.simbol), 700);
            proximajogada = ! proximajogada;
        }
    }else {
        if(jogadorO.isBot) {
            console.log("Jogador O é um bot")
            setTimeout(() =>  Bot(jogadorO.simbol), 1000);
            proximajogada = ! proximajogada;
        }
    }

    if(JogoTerminou(jogada) || Velha())  {
        console.log("O jogo terminou");
        jogadorvencedor(jogada);
    }

    if(TipoDeJogo === "automatico") {
        setTimeout(() => jogar(), 1000);       
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

function MostrarVelha() { // Mensagem de empate
    TextoVitoria.innerText = "Velha";
    MensagemVitoria.classList.add("MostrarMensagem");
}

function jogadorvencedor(jogada) { // Mensagem para a vitoria de algum dos players
    if (Velha()) {
        MostrarVelha();   
    }else {
        MostrarJogadorVencedor(jogada);
    }
    setTimeout(() => document.location.reload(true), 8000);
} 

function JogoTerminou(jogada) {
    const vencedor = jogadasvencedoras.some((jogds) => { // analisar dentro das jogadas vencedoras 1 por 1 se houve um vencedor.
        return jogds.every((index) => {
            return cells[index].classList.contains(jogada);
        })        
    });
    return vencedor;
}

function Velha() { // função para detectar se o jogo deu empate
    let x = 0;
    let o = 0;

    for (index in cells) {
        if(!isNaN(index)) {
        if(cells[index].classList.contains(jogadorX.simbol)) {
            o++;
        }
        if (cells[index].classList.contains(jogadorO.simbol)) {
            x++;
        }
    }
}
    return x + o === 9 ? true : false;
}