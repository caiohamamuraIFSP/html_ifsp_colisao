const QDE = 500;

// Inicializa elementos
let canvas = document.getElementById('meu-quadro');
let ctx = canvas.getContext('2d');
let logo = document.getElementById('logo-ifsp');

// Ajusta o tamanho do canvas para a tela
function ajustaCanvas() {
    canvas.height = window.innerHeight - 4;
    canvas.width = window.innerWidth;
}
window.onresize = ajustaCanvas;
ajustaCanvas();

// Dados da imagem
let largura_original = 64;
let altura_original = 64;
let escala = .5 ** 2;
let largura = largura_original * escala;
let altura = altura_original * escala;

let velX = 1;
let velY = 1;
// Rotacao
let velocidadeRotacao = 6;

logos = [];

for (let index = 0; index < QDE; index++) {
    let logo = new Logo(ctx, Math.random()*(canvas.width - largura), Math.random()*(canvas.height - altura), velX * (Math.random() < 0.5 ? 1 : -1), velY * (Math.random() < 0.5 ? 1 : -1));
    let algumBateu = true;
    while (algumBateu) {
        algumBateu = false;
        for (const logo2 of logos) {
            if (logo2.ehBateu(logo)) {
                logo = new Logo(ctx, Math.random()*(canvas.width - largura), Math.random()*(canvas.height - altura), velX, velY);
                algumBateu = true;
                break;
            }
        }
    }
    logos.push(logo);    
}

// Função principal
function loop(tempo) {
    // Limpa tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let index = 0; index < logos.length; index++) {
        const logo1 = logos[index];
        for (let index2 = (index + 1); index2 < logos.length; index2++) {
            const logo2 = logos[index2];            
            logo1.bateu(logo2);        
        }
        logo1.atualiza();
        logo1.desenha(ctx);
    }

    ctx.setTransform();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);


document.onkeydown = function(evento) {
    if (evento.key == 'ArrowLeft') {
        velocidadeRotacao--;
    } else if (evento.key == 'ArrowRight') {
        velocidadeRotacao++;
    }
}



