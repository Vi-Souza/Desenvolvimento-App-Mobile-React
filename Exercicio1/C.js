// 1. Função comum
function saudarComum(nome, sobrenome) {
  console.log(`Olá ${nome} ${sobrenome}, eu sou uma função!`);
}

// 2. Arrow function
const saudarArrow = (nome, sobrenome) => {
  console.log(`Olá ${nome} ${sobrenome}, eu sou uma função!`);
};

// Execução
saudarComum("Vitor", "Souza");
saudarArrow("Vitor", "Souza");