class FuncionariosDoHospital {
  #nome;
  #numeroRestantesDeFerias;

  constructor(nome) {
    this.#nome = nome;
    this.#numeroRestantesDeFerias = 20;
  }

  get nome() {
    return this.#nome;
  }

  get numeroRestantesDeFerias() {
    return this.#numeroRestantesDeFerias;
  }

  tirarFerias(num_dias) {
    if (num_dias <= this.#numeroRestantesDeFerias) {
      this.#numeroRestantesDeFerias -= num_dias;
      console.log(`${this.#nome} tirou ${num_dias} dia(s) de férias. Restam: ${this.#numeroRestantesDeFerias} dia(s).`);
    } else {
      console.log(`Saldo insuficiente! ${this.#nome} tem apenas ${this.#numeroRestantesDeFerias} dia(s) disponíveis.`);
    }
  }
}

class Medico extends FuncionariosDoHospital {
  #cpf;

  constructor(nome, cpf) {
    super(nome);
    this.#cpf = cpf;
  }

  get cpf() {
    return this.#cpf;
  }
}

class Enfermeira extends FuncionariosDoHospital {
  #certificados;

  constructor(nome) {
    super(nome);
    this.#certificados = [];
  }

  get certificados() {
    return this.#certificados;
  }

  adicionarCertificado(certificado) {
    this.#certificados.push(certificado);
    console.log(`Certificado "${certificado}" adicionado para ${this.nome}.`);
  }
}

// Testes
const med = new Medico("Dr. Arnaldo", "123.456.789-00");
med.tirarFerias(5);

const enf = new Enfermeira("Juliana");
enf.adicionarCertificado("UTI Avançada");
enf.tirarFerias(10);