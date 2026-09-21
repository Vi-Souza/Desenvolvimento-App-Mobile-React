import './App.css'
import livro1 from './assets/livro1.png'
import livro2 from './assets/livro2.png'
import livro3 from './assets/livro3.png'
import html5 from './assets/html5.png'
import css3 from './assets/css3.png'

function App() {
  return (
    <div className="pagina">

      <header>
        <h1>APRENDENDO REACT PARA DESENVOLVIMENTO WEB</h1>
      </header>

      <nav>
        <a href="#">HOME</a>
        <a href="#">LIVROS</a>
        <a href="#">VÍDEOS</a>
        <a href="#">CONTATOS</a>
      </nav>

      <main>
        <section className="introducao">
          <h2>Introdução</h2>

          <p>
            Com o React, você cria interfaces organizadas em componentes
            reutilizáveis, que controlam tanto a exibição quanto o
            comportamento da aplicação. Ele permite atualizar elementos de
            forma dinâmica, sem recarregar a página inteira, além de
            facilitar a aplicação de estilos, animações e recursos
            interativos de maneira escalável. (Fonte Usada: SansSerif, tamanho 20pt)
          </p>

          <p>
            O React é uma das bibliotecas mais populares do ecossistema
            JavaScript e tornou-se referência no desenvolvimento de interfaces
            modernas. Sua principal força está na criação de componentes
            reutilizáveis, que tornam o código mais organizado e facilitam a
            construção de aplicações escaláveis e de fácil manutenção.
            (Fonte Usada: SansSerif, tamanho 20pt)
          </p>
        </section>

        <section className="livros">

          <h2>Livros</h2>

          <div className="lista-livros">

            <img src={livro1}/>

            <img src={livro2}/>

            <img src={livro3}/>

          </div>

        </section>

        <section className="videos">

          <h2>Aprenda REACT na FEI.</h2>

          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4MHAOPxcnsQ"
              title="FEI - Há 80 anos formando os profissionais do futuro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

        </section>
        <section className="mapa">

          <h2>Localização</h2>

          <div className="mapa-container">
            <iframe
              width="600"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Av.+Humberto+de+Alencar+Castelo+Branco,+3972+-+Assun%C3%A7%C3%A3o,+S%C3%A3o+Bernardo+do+Campo+-+SP&output=embed"
            ></iframe>
          </div>

        </section>

          <section className="contatos">

            <h2>Contatos</h2>

            <table className="tabela-contatos">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Prof. Dr. Isaac</td>
                  <td>isaacjesus@fei.edu.br</td>
                </tr>
              </tbody>
            </table>

          </section>

          <section className="sites-consulta">
            <div className="caixa-amarela">
              <p><strong>Sites para consulta:</strong></p>
              <ul>
                <li>REACT - <a href="https://www.w3schools.com/REACT/" target="_blank" rel="noreferrer">https://www.w3schools.com/REACT/</a></li>
                <li>HTML - <a href="https://www.w3schools.com/html/" target="_blank" rel="noreferrer">https://www.w3schools.com/html/</a></li>
                <li>CSS - <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">https://www.w3schools.com/css/</a></li>
                <li>JavaScript - <a href="https://www.w3schools.com/js/" target="_blank" rel="noreferrer">https://www.w3schools.com/js/</a></li>
              </ul>
            </div>
          </section>

          <footer className="rodape">
            <img src={html5} alt="HTML5" className="logo-rodape" />

            <div className="texto-rodape">
              <p>Desejamos um excelente semestre a todos.</p>
              <p>(Fonte Usada: Comic Sans MS, tamanho 15pt)</p>
            </div>

            <img src={css3} alt="CSS3" className="logo-rodape" />
          </footer>
      </main>

    </div>
  )
}

export default App