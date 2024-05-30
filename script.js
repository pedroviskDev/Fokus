const html = document.querySelector('html');
const temporizador = document.querySelector('#timer');
const imagem = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const pausar = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');
const finish = new Audio('/sons/beep.mp3');
musica.loop = true;
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPausarOuInicar = document.querySelector('.app__card-primary-butto-icon');

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 
let tempoDecorrido = 1500;
let intervaloId = null;

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');

musicaInput.addEventListener('change', () =>{
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoFoco;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoDescansoCurto;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorrido = duracaoDescansoLongo;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            texto.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            texto.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            texto.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        
    }

}

const contagemRegressiva = () => {
    
    if (tempoDecorrido === 0){
        zerar()
        finish.play();
        iniciarOuPausarBt.textContent = 'Começar';
        imgPausarOuInicar.setAttribute('src', '/imagens/play_arrow.png');
        tempoDecorrido = 5
    }
    else{
        tempoDecorrido -= 1;
    }
    mostrarTempo()
    
}

startBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        imgPausarOuInicar.setAttribute('src', '/imagens/play_arrow.png');
        iniciarOuPausarBt.textContent = 'Continuar';
        pausar.play();
        zerar();
        return
    }
    finish.pause();
    play.play();
    imgPausarOuInicar.setAttribute('src', '/imagens/pause.png');
    iniciarOuPausarBt.textContent ='Pausar';
    intervaloId = setInterval(contagemRegressiva, 1000);

}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo()