# 📱 Desenvolvimento de Aplicativos Móveis (React Native & Expo)

Repositório dedicado ao registro de projetos e atividades práticas da disciplina **Desenvolvimento de Aplicativos Móveis (CCP150)** do Centro Universitário FEI.

O portfólio documenta a evolução prática desde a construção de interfaces fundamentais e ciclo de vida até arquitetura de navegação nativa híbrida, armazenamento assíncrono local e integração de Backend-as-a-Service (BaaS) em tempo real[cite: 5, 6, 7, 10, 12, 13].

---

## 🛠️ Tecnologias Utilizadas

- **Ecossistema:** [React](https://react.dev/), [React Native](https://reactnative.dev/), [Expo](https://expo.dev/) e Node.js[cite: 5, 6, 12, 13]
- **Linguagem:** JavaScript moderno (ES6+) e JSX[cite: 5]
- **Navegação Mobile:** [React Navigation](https://reactnavigation.org/) (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)[cite: 6, 7, 10]
- **Persistência de Dados Local:** `@react-native-async-storage/async-storage`[cite: 6, 10]
- **Cloud & BaaS:** Firebase SDK [Authentication & Realtime Database](cite: 7)
- **Ambiente de Execução:** Expo Go e Metro Bundler[cite: 13]

---

## 📂 Laboratórios e Projetos Práticos (Lab 01 a Lab 09)

---

### 🎲 Lab 01 — Jogo da Adivinhação

- **Foco:** Fundamentos de componentes visuais, gerenciamento de estados (`state`) e eventos de interface[cite: 5, 8].
- **Descrição:** Aplicação que sorteia internamente um número aleatório de 0 a 100[cite: 8]. O usuário submete palpites numéricos via entrada de texto e recebe dicas contextuais se o segredo é maior ou menor, além de visualizar o contador dinâmico de tentativas realizadas até o acerto[cite: 8].

---

### 🌐 Lab 02 — Introdução ao React & Interface Web Reutilizável

- **Foco:** Componentização, layout responsivo e transposição dos conceitos declarativos do React[cite: 11].
- **Descrição:** Reprodução estruturada de uma interface web com React contendo seções de apresentação institucional, catálogo de referências, mídias integradas, tabelas e rodapés estilizados[cite: 11]. Prática focada em quebra e reutilização de componentes visuais e adaptação dinâmica de resoluções[cite: 11].

---

### ✌️ Lab 03 — Jogo Pedra, Papel ou Tesoura (Jokenpô)

- **Foco:** Lógica condicional na UI, interatividade de botões e estado reativo[cite: 8].
- **Descrição:** Jogo interativo contra a CPU onde o aplicativo realiza o sorteio aleatório de jogadas[cite: 8]. Conta com botões para as escolhas do jogador, feedback instantâneo de rodada (*Vitória*, *Derrota* ou *Empate*) e painel com histórico de placar com suporte para melhor de 5 jogadas e contagem de empates[cite: 8].

---

### 🛠️ Lab 04 — Build Tooling, Estrutura de Projeto e Configurações

- **Foco:** Configuração de ambiente móvel/web, pacotes e ferramentas de suporte.
- **Descrição:** Exploração e configuração do pipeline de desenvolvimento, estrutura modular do projeto, gestão de dependências (`package.json`) e padronização das convenções de código com linting para garantir manutenibilidade do ecossistema React.

---

### ⏱️ Lab 05 — Temporizadores, Estados e Controle Assíncrono

- **Foco:** Operações de tempo assíncronas, manipulação de cronômetros e atualização periódica de dados de tela[cite: 5].
- **Descrição:** Construção de lógicas temporizadas contínuas e acionamento de eventos periódicos, consolidando a separação entre renderização da interface e threads de contagem de tempo.

---

### ⏰ Lab 06 — Despertador & Ciclo de Vida de Componentes

- **Foco:** Componentes baseados em Classe (Orientação a Objetos) e ciclo de vida (`lifecycle`)[cite: 4, 12, 13].
- **Descrição:** Aplicativo de despertador desenvolvido obrigatoriamente através de componentes de classe[cite: 4, 13]. Implementa um relógio digital que se atualiza a cada segundo via `setInterval` no `componentDidMount` (com limpeza no `componentWillUnmount`)[cite: 4]. Ao coincidir o horário configurado com a hora atual, dispara a exibição de uma imagem animada (GIF), que desaparece automaticamente ao virar o minuto[cite: 4, 13].

---

### 🎬 Lab 07 — Catálogo de Filmes com Autenticação e Persistência Local

- **Foco:** Navegação híbrida (`BottomTab` + `Stack`) e armazenamento local com AsyncStorage[cite: 6, 10].
- **Descrição:** Sistema de streaming/catálogo no qual o acesso às obras é protegido por credenciais salvas no dispositivo[cite: 10]. A interface utiliza `BottomTabNavigator` para alternar entre as abas de *Login* e *Criar Usuário*, e `StackNavigator` para navegar para o catálogo de filmes detalhado após autenticação com sucesso via `AsyncStorage`[cite: 10].

---

### 🏆 Lab 08 — Central de Jogos com Autenticação e Scoreboard

- **Foco:** Integração multi-telas, reutilização de módulos e persistência assíncrona serializada[cite: 6].
- **Descrição:** Central de entretenimento que reúne os jogos desenvolvidos nos laboratórios anteriores [Jogo da Adivinhação e Pedra, Papel ou Tesoura](cite: 6). Possui tela de acesso com validação de credenciais, menu central de seleção e um painel de histórico de pontuações máximas (*Scoreboard*) que persiste o nome do jogador, pontuação e jogo no `AsyncStorage`[cite: 6].

---

### 🍽️ Lab 09 — Cardápio de Restaurante com Firebase (Auth & Realtime Database)

- **Foco:** Integração completa de Backend-as-a-Service (BaaS) em nuvem[cite: 7].
- **Descrição:** Solução móvel dividida em controle de pedidos e cardápio interativo[cite: 7]. Implementa autenticação por e-mail e senha com **Firebase Authentication** em abas inferiores, catálogo visual de pratos em lista, configuração de quantidade/resumo financeiro e envio em tempo real dos pedidos registrados para a nuvem utilizando o **Firebase Realtime Database**[cite: 7].

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- Dispositivo com o aplicativo **Expo Go** instalado (Android / iOS) ou emulador local

### Passos

1. Clone este repositório:

   ```bash
   git clone [https://github.com/Vi-Souza/Desenvolvimento-App-Mobile-React.git](https://github.com/Vi-Souza/Desenvolvimento-App-Mobile-React.git)
   ```

2. Entre na pasta do laboratório desejado (exemplo: `Exercicio9`):

   ```bash
   cd Desenvolvimento-App-Mobile-React/Exercicio9
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Inicie o servidor Metro Bundler:

   ```bash
   npx expo start
   ```

   *(Caso utilize rede restrita ou corporativa, adicione a flag de tunelamento: `npx expo start --tunnel`).*
5. Leia o QR Code no terminal através do aplicativo **Expo Go**.

---

## 👨‍💻 Autor

**Vitor Souza**  
Estudante de Ciência da Computação — Centro Universitário FEI  
GitHub: [@Vi-Souza](https://github.com/Vi-Souza)
