import './App.css'
import livro1 from './assets/livro1.png'
import livro2 from './assets/livro2.png'
import livro3 from './assets/livro3.png'

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
      </main>

    </div>
  )
}

export default App