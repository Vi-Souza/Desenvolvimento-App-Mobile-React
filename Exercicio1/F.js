// Classe Data
class Data {
  #dia;
  #mes;
  #ano;

  constructor(dia, mes, ano) {
    this.#dia = dia;
    this.#mes = mes;
    this.#ano = ano;
  }

  toString() {
    const d = String(this.#dia).padStart(2, "0");
    const m = String(this.#mes).padStart(2, "0");
    return `${d}/${m}/${this.#ano}`;
  }
}

// Classe Pessoa
class Pessoa {
  #nome;
  #cpf;
  #nascimento;

  constructor(nome, cpf, nascimento) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#nascimento = nascimento;
  }

  getNome() {
    return this.#nome;
  }

  toString() {
    return `Nome: ${this.#nome}, CPF: ${this.#cpf}, Nascimento: ${this.#nascimento.toString()}`;
  }
}

// Classe Funcionario (herda de Pessoa)
class Funcionario extends Pessoa {
  #admissao;
  #salario;

  constructor(nome, cpf, nascimento, admissao, salario) {
    super(nome, cpf, nascimento);
    this.#admissao = admissao;
    this.#salario = salario;
  }

  getSalario() {
    return this.#salario;
  }

  toString() {
    return `${super.toString()}, Admissão: ${this.#admissao.toString()}, Salário: R$ ${this.#salario.toFixed(2)}`;
  }
}

// Classe Gerente (herda de Funcionario)
class Gerente extends Funcionario {
  #departamento;
  #promocaoGerente;

  constructor(nome, cpf, nascimento, admissao, salario, departamento, promocaoGerente) {
    super(nome, cpf, nascimento, admissao, salario);
    this.#departamento = departamento;
    this.#promocaoGerente = promocaoGerente;
  }

  getDepartamento() {
    return this.#departamento;
  }

  toString() {
    return `${super.toString()}, Depto: ${this.#departamento}, Promoção Gerente: ${this.#promocaoGerente.toString()}`;
  }
}

// Testes práticos do Diagrama UML
const dtNasc = new Data(15, 4, 1988);
const dtAdm = new Data(1, 2, 2018);
const dtProm = new Data(10, 8, 2022);

const gerente = new Gerente("Carlos Silva", 98765432100, dtNasc, dtAdm, 18500.0, 101, dtProm);

console.log(gerente.toString());
console.log(`Nome do Gerente: ${gerente.getNome()}`);
console.log(`Salário: R$ ${gerente.getSalario()}`);
console.log(`Departamento: ${gerente.getDepartamento()}`);