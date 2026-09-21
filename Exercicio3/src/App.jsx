import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0',
      primeiroOperando: null,
      operador: null,
      esperandoSegundoOperando: false,
    };
  }

  // Insere os números (0 a 9)
  adicionarDigito = (digito) => {
    const { display, esperandoSegundoOperando } = this.state;

    if (esperandoSegundoOperando) {
      this.setState({
        display: String(digito),
        esperandoSegundoOperando: false,
      });
    } else {
      this.setState({
        display: display === '0' ? String(digito) : display + digito,
      });
    }
  };

  // Define a operação (+, -, *, /)
  definirOperacao = (proximoOperador) => {
    const { display, primeiroOperando, operador } = this.state;
    const valorAtual = parseFloat(display);

    if (primeiroOperando === null) {
      this.setState({
        primeiroOperando: valorAtual,
        operador: proximoOperador,
        esperandoSegundoOperando: true,
      });
    } else if (operador) {
      const resultado = this.calcular(primeiroOperando, valorAtual, operador);
      this.setState({
        display: String(resultado),
        primeiroOperando: resultado,
        operador: proximoOperador,
        esperandoSegundoOperando: true,
      });
    }
  };

  // Executa o cálculo matemático
  calcular = (num1, num2, operador) => {
    switch (operador) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 'Erro';
      default:
        return num2;
    }
  };

  // Botão "="
  executarResultado = () => {
    const { display, primeiroOperando, operador } = this.state;
    const valorAtual = parseFloat(display);

    if (operador && primeiroOperando !== null) {
      const resultado = this.calcular(primeiroOperando, valorAtual, operador);
      this.setState({
        display: String(resultado),
        primeiroOperando: null,
        operador: null,
        esperandoSegundoOperando: false,
      });
    }
  };

  // Botão "C" (Limpar)
  limpar = () => {
    this.setState({
      display: '0',
      primeiroOperando: null,
      operador: null,
      esperandoSegundoOperando: false,
    });
  };

  render() {
    return (
      <div className="calc-container">
        <div className="calc-display">{this.state.display}</div>

        <div className="calc-grid">
          {/* Linha 1 */}
          <button className="calc-button" onClick={() => this.adicionarDigito('7')}>7</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('8')}>8</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('9')}>9</button>
          <button className="calc-button" onClick={() => this.definirOperacao('*')}>*</button>

          {/* Linha 2 */}
          <button className="calc-button" onClick={() => this.adicionarDigito('4')}>4</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('5')}>5</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('6')}>6</button>
          <button className="calc-button" onClick={() => this.definirOperacao('/')}>/</button>

          {/* Linha 3 */}
          <button className="calc-button" onClick={() => this.adicionarDigito('1')}>1</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('2')}>2</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('3')}>3</button>
          <button className="calc-button" onClick={() => this.definirOperacao('-')}>-</button>

          {/* Linha 4 */}
          <button className="calc-button" onClick={this.limpar}>C</button>
          <button className="calc-button" onClick={() => this.adicionarDigito('0')}>0</button>
          <button className="calc-button" onClick={this.executarResultado}>=</button>
          <button className="calc-button" onClick={() => this.definirOperacao('+')}>+</button>
        </div>
      </div>
    );
  }
}

export default App;