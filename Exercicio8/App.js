import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// --- FUNÇÃO AUXILIAR PARA GRAVAR RECORDES NO ASYNCSTORAGE ---
async function salvarScore(nome, tipoJogo, pontuacao) {
  try {
    const dadosAntigos = await AsyncStorage.getItem('scores_lab08');
    const lista = dadosAntigos ? JSON.parse(dadosAntigos) : [];
    lista.push({
      id: Date.now().toString(),
      nome: nome || 'Anônimo',
      tipoJogo,
      pontuacao,
      data: new Date().toLocaleTimeString(),
    });
    await AsyncStorage.setItem('scores_lab08', JSON.stringify(lista));
  } catch (e) {
    Alert.alert('Erro', 'Não foi possível gravar o score.');
  }
}

// ==========================================
// 1. TELA DE LOGIN
// ==========================================
function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Validação de login simples solicitada no laboratório
    if (usuario.trim().toLowerCase() === 'admin' && senha === '1234') {
      navigation.navigate('Menu', { jogador: usuario });
    } else {
      Alert.alert('Acesso Negado', 'Usuário ou senha incorretos! (Dica: admin / 1234)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Laboratório 08</Text>
      <Text style={styles.subtitulo}>Acesso aos Jogos</Text>

      <Text style={styles.label}>Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botaoPrincipal} onPress={handleLogin}>
        <Text style={styles.textoBotao}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 2. MENU PRINCIPAL
// ==========================================
function MenuScreen({ route, navigation }) {
  const { jogador } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>Bem-vindo, {jogador}!</Text>
      <Text style={styles.instrucao}>Selecione um jogo ou confira o ranking:</Text>

      <TouchableOpacity
        style={styles.menuBotao}
        onPress={() => navigation.navigate('Adivinhacao', { jogador })}
      >
        <Text style={styles.menuBotaoTexto}>🎯 Jogo da Adivinhação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuBotao}
        onPress={() => navigation.navigate('Jokenpo', { jogador })}
      >
        <Text style={styles.menuBotaoTexto}>✂️ Pedra, Papel ou Tesoura</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuBotao, { backgroundColor: '#4CAF50' }]}
        onPress={() => navigation.navigate('Score')}
      >
        <Text style={styles.textoBotao}>🏆 Ver Placar (Score)</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 3. JOGO DA ADIVINHAÇÃO
// ==========================================
function AdivinhacaoScreen({ route, navigation }) {
  const { jogador } = route.params;
  const [numeroSecreto, setNumeroSecreto] = useState(Math.floor(Math.random() * 101));
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const verificarPalpite = async () => {
    if (!palpite.trim() || finalizado) return;

    const num = parseInt(palpite, 10);
    const totalTentativas = tentativas + 1;
    setTentativas(totalTentativas);

    if (num === numeroSecreto) {
      setMensagem(`Parabéns! Você acertou em ${totalTentativas} tentativas!`);
      setFinalizado(true);
      // Pontuação: quanto menos tentativas, maior o score (máx 100)
      const pontuacao = Math.max(10, 100 - (totalTentativas - 1) * 10);
      await salvarScore(jogador, 'Adivinhação', pontuacao);
      Alert.alert('Fim de Jogo', `Pontuação registrada: ${pontuacao} pts!`);
    } else if (num > numeroSecreto) {
      setMensagem('O número sorteado é MENOR.');
    } else {
      setMensagem('O número sorteado é MAIOR.');
    }
    setPalpite('');
  };

  const reiniciar = () => {
    setNumeroSecreto(Math.floor(Math.random() * 101));
    setPalpite('');
    setMensagem('');
    setTentativas(0);
    setFinalizado(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloJogo}>Adivinhe o Número (0 a 100)</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu palpite"
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        editable={!finalizado}
      />

      {!finalizado ? (
        <TouchableOpacity style={styles.botaoPrincipal} onPress={verificarPalpite}>
          <Text style={styles.textoBotao}>Chutar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.botaoPrincipal, { backgroundColor: '#FF9800' }]} onPress={reiniciar}>
          <Text style={styles.textoBotao}>Jogar Novamente</Text>
        </TouchableOpacity>
      )}

      {mensagem !== '' && <Text style={styles.resultadoTexto}>{mensagem}</Text>}
      <Text style={styles.tentativasTexto}>Tentativas: {tentativas}</Text>
    </View>
  );
}

// ==========================================
// 4. JOGO PEDRA, PAPEL OU TESOURA
// ==========================================
function JokenpoScreen({ route }) {
  const { jogador } = route.params;
  const opcoes = ['Pedra', 'Papel', 'Tesoura'];
  const [pontosJogador, setPontosJogador] = useState(0);
  const [rodadas, setRodadas] = useState(0);
  const [status, setStatus] = useState('Escolha uma opção para iniciar');
  const [jogoEncerrado, setJogoEncerrado] = useState(false);

  const jogar = async (escolha) => {
    if (jogoEncerrado) return;

    const escolhaApp = opcoes[Math.floor(Math.random() * 3)];
    let novosPontos = pontosJogador;
    let resultadoRodada = '';

    if (escolha === escolhaApp) {
      resultadoRodada = `Empate! O app escolheu ${escolhaApp}.`;
    } else if (
      (escolha === 'Pedra' && escolhaApp === 'Tesoura') ||
      (escolha === 'Papel' && escolhaApp === 'Pedra') ||
      (escolha === 'Tesoura' && escolhaApp === 'Papel')
    ) {
      novosPontos += 10;
      setPontosJogador(novosPontos);
      resultadoRodada = `Você venceu! O app escolheu ${escolhaApp}. (+10 pts)`;
    } else {
      resultadoRodada = `Você perdeu! O app escolheu ${escolhaApp}.`;
    }

    const novaRodada = rodadas + 1;
    setRodadas(novaRodada);
    setStatus(resultadoRodada);

    // Partida de 5 rodadas
    if (novaRodada >= 5) {
      setJogoEncerrado(true);
      await salvarScore(jogador, 'Pedra, Papel, Tesoura', novosPontos);
      Alert.alert('Fim de Jogo', `Partida finalizada! Pontuação total: ${novosPontos} pts.`);
    }
  };

  const reiniciar = () => {
    setPontosJogador(0);
    setRodadas(0);
    setStatus('Escolha uma opção para iniciar');
    setJogoEncerrado(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloJogo}>Pedra, Papel ou Tesoura</Text>
      <Text style={styles.subtitulo}>Rodada: {rodadas}/5 | Pontos: {pontosJogador}</Text>
      <Text style={styles.resultadoTexto}>{status}</Text>

      {!jogoEncerrado ? (
        <View style={styles.opcoesContainer}>
          {opcoes.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.botaoJokenpo}
              onPress={() => jogar(item)}
            >
              <Text style={styles.textoBotao}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <TouchableOpacity style={[styles.botaoPrincipal, { backgroundColor: '#FF9800', marginTop: 20 }]} onPress={reiniciar}>
          <Text style={styles.textoBotao}>Nova Partida</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ==========================================
// 5. TELA DE SCORE (AsyncStorage)
// ==========================================
function ScoreScreen() {
  const [scores, setScores] = useState([]);

  const carregarScores = async () => {
    try {
      const dados = await AsyncStorage.getItem('scores_lab08');
      if (dados) {
        setScores(JSON.parse(dados).reverse());
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os recordes.');
    }
  };

  const limparScores = async () => {
    await AsyncStorage.removeItem('scores_lab08');
    setScores([]);
  };

  useEffect(() => {
    carregarScores();
  }, []);

  return (
    <View style={styles.containerScore}>
      <Text style={styles.titulo}>Placar de Pontuações</Text>
      {scores.length === 0 ? (
        <Text style={styles.textoVazio}>Nenhuma pontuação registrada ainda.</Text>
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardScore}>
              <Text style={styles.cardTitulo}>{item.tipoJogo}</Text>
              <Text>Jogador: <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text></Text>
              <Text>Pontuação: <Text style={{ fontWeight: 'bold', color: '#1E88E5' }}>{item.pontuacao} pts</Text></Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={[styles.botaoPrincipal, { backgroundColor: '#d32f2f', marginTop: 10 }]} onPress={limparScores}>
        <Text style={styles.textoBotao}>Limpar Placar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// ROTEADOR PRINCIPAL (STACK)
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="Adivinhacao" component={AdivinhacaoScreen} options={{ title: 'Jogo da Adivinhação' }} />
        <Stack.Screen name="Jokenpo" component={JokenpoScreen} options={{ title: 'Pedra, Papel e Tesoura' }} />
        <Stack.Screen name="Score" component={ScoreScreen} options={{ title: 'Tabela de Pontuações' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScore: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0D47A1',
    textAlign: 'center',
  },
  tituloJogo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212121',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
  },
  instrucao: {
    fontSize: 15,
    marginBottom: 25,
    color: '#666',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    width: '80%',
    height: 48,
    borderWidth: 1,
    borderColor: '#BBB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  botaoPrincipal: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '50%',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuBotao: {
    backgroundColor: '#0D47A1',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  menuBotaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  opcoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  botaoJokenpo: {
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resultadoTexto: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tentativasTexto: {
    marginTop: 8,
    color: '#666',
  },
  cardScore: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#1E88E5',
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});