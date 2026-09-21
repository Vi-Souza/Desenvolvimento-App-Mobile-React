class VideoGame {
  constructor(marca, nControles, tipoMidia) {
    this.marca = marca;
    this.nControles = nControles;
    this.tipoMidia = tipoMidia;
    this.ligado = false; // Atributo booleano indicando o estado inicial
  }

  ligar(estado) {
    this.ligado = estado;
    console.log(`Video-game ${this.ligado ? "ligado" : "desligado"}.`);
  }

  jogar() {
    if (this.ligado) {
      console.log("Iniciando a partida...");
    } else {
      console.log("O console precisa estar ligado para poder jogar!");
    }
  }

  salvarJogo() {
    if (this.ligado) {
      console.log("Progresso salvo com sucesso!");
    } else {
      console.log("Não é possível salvar: o console está desligado.");
    }
  }
}

// Teste de instanciação e invocação
const playstation = new VideoGame("Sony", 2, "DVD");
console.log(playstation);

playstation.ligar(true);
playstation.jogar();
playstation.salvarJogo();
playstation.ligar(false);