import { useState } from 'react';
import './App.css';

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(() => Math.floor(Math.random() * 100));
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('Tente Adivinhar');
  const [status, setStatus] = useState(''); // guarda: '' (inicial), 'vermelho' ou 'verde'

  const verificarPalpite = () => {
    const valor = parseInt(palpite, 10);

    if (isNaN(valor)) {
      setMensagem('Digite um número');
      setStatus('vermelho');
      return;
    }

    if (valor === numeroSecreto) {
      setMensagem('Parabéns, número correto');
      setStatus('verde');
    } else if (valor > numeroSecreto) {
      setMensagem('Número grande');
      setStatus('vermelho');
    } else {
      setMensagem('Número pequeno');
      setStatus('vermelho');
    }
  };

  return (
    <div className="container">
      <input
        type="number"
        value={palpite}
        onChange={(e) => setPalpite(e.target.value)}
        className="input-palpite"
      />

      <button onClick={verificarPalpite} className="btn-verificar">
        Clique Aqui
      </button>

      <div className={`faixa-mensagem ${status}`}>
        <span>{mensagem}</span>
      </div>
    </div>
  );
}