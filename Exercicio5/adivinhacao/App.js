import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroSecreto: Math.floor(Math.random() * 101),
      palpite: '',
      mensagem: '',
      tentativas: 0,
      acertou: false,
    };
  }

  verificarPalpite = () => {
    const { palpite, numeroSecreto, tentativas, acertou } = this.state;
    if (acertou || palpite === '') return;

    const numDigitado = parseInt(palpite, 10);
    const totalTentativas = tentativas + 1;

    if (numDigitado === numeroSecreto) {
      this.setState({
        mensagem: 'Parabéns! Você Acertou!',
        tentativas: totalTentativas,
        acertou: true,
      });
    } else if (numDigitado > numeroSecreto) {
      this.setState({
        mensagem: 'O número sorteado é MENOR que seu palpite.',
        tentativas: totalTentativas,
      });
    } else {
      this.setState({
        mensagem: 'O número sorteado é MAIOR que seu palpite.',
        tentativas: totalTentativas,
      });
    }
  };

  reiniciarJogo = () => {
    this.setState({
      numeroSecreto: Math.floor(Math.random() * 101),
      palpite: '',
      mensagem: '',
      tentativas: 0,
      acertou: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Jogo da Adivinhação</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite um número de 0 a 100"
          keyboardType="numeric"
          value={this.state.palpite}
          onChangeText={(texto) => this.setState({ palpite: texto })}
        />

        <View style={styles.botao}>
          <Button
            title="Chutar"
            onPress={this.verificarPalpite}
            disabled={this.state.acertou}
          />
        </View>

        {this.state.mensagem !== '' && (
          <Text style={styles.resultado}>{this.state.mensagem}</Text>
        )}

        <Text style={styles.tentativas}>
          Tentativas realizadas: {this.state.tentativas}
        </Text>

        {this.state.acertou && (
          <View style={styles.botao}>
            <Button title="Jogar Novamente" onPress={this.reiniciarJogo} color="green" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  botao: {
    width: '80%',
    marginVertical: 5,
  },
  resultado: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  tentativas: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
});