// Objetos
const jogador1 = {
  nome: "Neymar Jr.",
  clube: "Al-Hilal"
};

const jogador2 = {
  nome: "Lionel Messi",
  clube: "Inter Miami"
};

// Função base utilizando o 'this'
function exibirJogador() {
  console.log(`O jogador ${this.nome} joga atualmente no clube ${this.clube}.`);
}

// Vinculando o contexto com bind
const exibirJ1 = exibirJogador.bind(jogador1);
const exibirJ2 = exibirJogador.bind(jogador2);

// Execuções
exibirJ1();
exibirJ2();