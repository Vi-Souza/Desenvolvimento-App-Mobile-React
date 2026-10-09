import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horaAlarme: '',
      minutoAlarme: '',
      horaAtual: '',
      dataAtual: '',
      despertando: false,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.atualizarRelogio();
    // Inicia o timer para atualizar a cada 1 segundo (1000ms)
    this.timer = setInterval(() => {
      this.atualizarRelogio();
    }, 1000);
  }

  componentWillUnmount() {
    // Limpa o timer para evitar vazamento de memória ao desmontar
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  formatarDoisDigitos = (numero) => {
    return numero < 10 ? `0${numero}` : `${numero}`;
  };

  atualizarRelogio = () => {
    const agora = new Date();

    const h = agora.getHours();
    const m = agora.getMinutes();
    const s = agora.getSeconds();

    const dia = agora.getDate();
    const mes = agora.getMonth() + 1;
    const ano = agora.getFullYear();

    const horaFormatada = `${this.formatarDoisDigitos(h)}:${this.formatarDoisDigitos(m)}:${this.formatarDoisDigitos(s)}`;
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const horaAlarmeNum = parseInt(this.state.horaAlarme, 10);
    const minutoAlarmeNum = parseInt(this.state.minutoAlarme, 10);

    // Ativa quando a hora e o minuto coincidirem exatamente
    const alarmeAtivo =
      this.state.horaAlarme !== '' &&
      this.state.minutoAlarme !== '' &&
      horaAlarmeNum === h &&
      minutoAlarmeNum === m;

    this.setState({
      horaAtual: horaFormatada,
      dataAtual: dataFormatada,
      despertando: alarmeAtivo,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Entrada: Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          value={this.state.horaAlarme}
          onChangeText={(texto) => this.setState({ horaAlarme: texto })}
        />

        {/* Entrada: Minuto */}
        <Text style={styles.label}>Minuto</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          value={this.state.minutoAlarme}
          onChangeText={(texto) => this.setState({ minutoAlarme: texto })}
        />

        {/* Imagem / GIF do Despertador (Renderização Condicional) */}
        <View style={styles.areaImagem}>
          {this.state.despertando && (
            <Image
              source={{
                uri: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
              }}
              style={styles.imagem}
            />
          )}
        </View>

        {/* Relógio Digital e Data Atual */}
        <Text style={styles.relogio}>{this.state.horaAtual}</Text>
        <Text style={styles.data}>{this.state.dataAtual}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 60,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0022cc',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    width: '90%',
    height: 44,
    borderWidth: 2,
    borderColor: '#0022cc',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  areaImagem: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  imagem: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  relogio: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0022cc',
    marginTop: 10,
  },
  data: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0022cc',
    marginTop: 4,
  },
});