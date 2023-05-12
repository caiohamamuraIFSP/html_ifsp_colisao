class Logo {
    constructor(ctx, x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.ctx = ctx;
        this.angulo = 0;
        this.velocidadeRotacao = velocidadeRotacao * (Math.random() < 0.5 ? 1 : -1);
    }
    
    desenha(ctx) {
        // // Centraliza a âncora de rotação
        ctx.translate(largura/2, altura/2);

        // Rotaciona
        ctx.rotate(this.angulo);

        // Retorna a âncora para posição inicial
        ctx.translate(-largura/2, -altura/2);

        // Calcula x e y rotacionados
        let xr = (this.x * Math.cos(this.angulo) + this.y * Math.sin(this.angulo));
        let yr = (this.y * Math.cos(this.angulo) - this.x * Math.sin(this.angulo));
    
        ctx.drawImage(logo, xr, yr, largura, altura);
        ctx.setTransform();
    }

    xmax = () => this.x + largura;
    ymax = () => this.y + altura;


    ehBateu(outroLogo) {
        if (
            this.x > outroLogo.xmax() ||
            this.xmax() < outroLogo.x ||
            this.y > outroLogo.ymax() ||
            this.ymax() < outroLogo.y) {
                return false;
            }
            return true;
    }

    bateu(outroLogo) {
        if (
            this.x > outroLogo.xmax() ||
            this.xmax() < outroLogo.x ||
            this.y > outroLogo.ymax() ||
            this.ymax() < outroLogo.y) {
                return false;
            }

        if (this.velocidadeRotacao == outroLogo.velocidadeRotacao)
            this.velocidadeRotacao *= -1;
        let diffX = Math.min(Math.abs(this.x - outroLogo.xmax()),Math.abs(this.xmax() - outroLogo.x));
        let diffY = Math.min(Math.abs(this.y - outroLogo.ymax()),Math.abs(this.ymax() - outroLogo.y));
        if (diffX < diffY) {
            this.inverteX();
            outroLogo.inverteX();
            if (this.x > outroLogo.x) {
                this.x += diffX/2 + 1;
                outroLogo.x -= diffX/2;
            } else {
                this.x -= diffX/2 - 1;
                outroLogo.x += diffX/2;
            }
        } else {
            this.inverteY();
            outroLogo.inverteY();
            if (this.y > outroLogo.y) {
                this.y += diffY/2 + 1;
                outroLogo.y -= diffY/2;
            } else {
                this.y -= diffY/2 - 1;
                outroLogo.y += diffY/2;
            }
        }
        return true;
    }


    inverteX = () => this.velX *= -1;

    inverteY = () => this.velY *= -1;

    atualiza() {
        // Incrementa movimento e rotação
        this.x += this.velX;
        this.y += this.velY;

        this.angulo += this.velocidadeRotacao * Math.PI/180;

        if (this.x < 0) {
            this.x *= -1;
            this.velX *= -1;
            this.velocidadeRotacao *= -1;
        }
        if (this.y < 0) {
            this.y *= 1;
            this.velY *= -1;
            this.velocidadeRotacao *= -1;
        }

        if ((this.x + largura+1) > canvas.width) {
            this.x -= ((this.x + largura) - canvas.width);
            this.velX *= -1;
            this.velocidadeRotacao *= -1;
        }
        if ((this.y + altura) > canvas.height) {
            // Inverte a velocidade Y e rotação
            this.velY *= -1;
            this.y -= (this.y + altura) - canvas.height;
            this.velocidadeRotacao *= -1;
        }
    }
}
