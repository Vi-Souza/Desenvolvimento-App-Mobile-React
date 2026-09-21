const processarMensagem = (mensagem, callback) => callback(mensagem);

// a) Junta duas strings
const juntarAviso = (msg) => `*** Atenção: ${msg}! ***`;
console.log(processarMensagem("Sistema instável", juntarAviso));
// Saída: *** Atenção: Sistema instável! ***

// b) Calcula o número de caracteres
const contarCaracteres = (msg) => `Resumo: A mensagem contém ${msg.length} caracteres.`;
// Texto de exemplo configurado para dar exatamente 42 caracteres
const textoExemplo = "Esta frase foi ajustada para conter 42 car";
console.log(processarMensagem(textoExemplo, contarCaracteres));
// Saída: Resumo: A mensagem contém 42 caracteres.

// c) Informa a formatação da caixa (maiúscula, minúscula ou mista)
const verificarCaixa = (msg) => {
  if (msg === msg.toLowerCase()) {
    return `Mensagem em caixa baixa: ${msg}`;
  } else if (msg === msg.toUpperCase()) {
    return `Mensagem em caixa alta: ${msg}`;
  } else {
    return `Mensagem mista: ${msg}`;
  }
};
console.log(processarMensagem("tudo em minúsculas", verificarCaixa));
// Saída: Mensagem em caixa baixa: tudo em minúsculas