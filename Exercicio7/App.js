import React, { useState } from 'react';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Lista de Filmes e Sinopses
const LISTA_FILMES = [
  {
    id: '1',
    titulo: 'Senhor dos Anéis',
    sinopse:
      'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo tem um caminho árduo pela frente, onde encontra perigo, medo e seres bizarros. Ao seu lado para o cumprimento desta jornada, ele aos poucos pode contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando nove seres que formam a Sociedade do Anel.',
  },
  {
    id: '2',
    titulo: 'Cidadão Kane',
    sinopse:
      'Após a morte de um magnata do jornalismo, um repórter tenta desvendar o mistério por trás de sua última palavra: "Rosebud". A busca revela a ascensão e queda de um homem fascinante e solitário.',
  },
  {
    id: '3',
    titulo: 'O Poderoso Chefão',
    sinopse:
      'Uma família mafiosa ítalo-americana luta para manter seu império e negócios nos Estados Unidos após o patriarca sofrer um atentado contra sua vida.',
  },
  {
    id: '4',
    titulo: 'O Rei Leão',
    sinopse:
      'Traído e exilado de seu reino, o jovem leão Simba precisa reencontrar sua coragem e propósito para recuperar seu lugar de direito como rei da savana.',
  },
  {
    id: '5',
    titulo: 'Vingadores: Ultimato',
    sinopse:
      'Após Thanos eliminar metade dos seres vivos, os heróis sobreviventes reúnem-se para reverter os estragos e restaurar a ordem no universo.',
  },
];

// Tela de Login
function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const dadosCadastrados = await AsyncStorage.getItem('user_data');
      if (!dadosCadastrados) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Acesse a aba Cadastro primeiro.');
        return;
      }

      const { user, pass } = JSON.parse(dadosCadastrados);

      if (usuario === user && senha === pass) {
        setUsuario('');
        setSenha('');
        navigation.navigate('FilmesStack');
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha ao autenticar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login:</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonLoginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Cadastro
function CadastroScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Aviso', 'Preencha usuário e senha!');
      return;
    }

    try {
      await AsyncStorage.setItem('user_data', JSON.stringify({ user: usuario, pass: senha }));
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setUsuario('');
      setSenha('');
      navigation.navigate('LoginTab');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cadastrar usuário:</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Cadastrar senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleCadastro}>
        <Text style={styles.buttonLoginText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela com Lista de Filmes
function FilmesScreen({ navigation }) {
  return (
    <View style={styles.containerFilmes}>
      <FlatList
        data={LISTA_FILMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.filmeItem}
            onPress={() => navigation.navigate('DetalheFilme', { filme: item })}
          >
            <Text style={styles.filmeTexto}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Tela da Sinopse do Filme
function DetalheFilmeScreen({ route }) {
  const { filme } = route.params;

  return (
    <ScrollView style={styles.containerSinopse}>
      <Text style={styles.textoSinopse}>{filme.sinopse}</Text>
    </ScrollView>
  );
}

// Navegação
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        tabBarActiveTintColor: '#2196F3',
      }}
    >
      <Tab.Screen
        name="LoginTab"
        component={LoginScreen}
        options={{ title: 'Login', tabBarLabel: 'Login' }}
      />
      <Tab.Screen
        name="CadastroTab"
        component={CadastroScreen}
        options={{ title: 'Cadastro', tabBarLabel: 'Criar Conta' }}
      />
    </Tab.Navigator>
  );
}

function FilmesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaFilmes"
        component={FilmesScreen}
        options={{ title: 'Filmes', headerBackVisible: false }}
      />
      <Stack.Screen
        name="DetalheFilme"
        component={DetalheFilmeScreen}
        options={({ route }) => ({ title: route.params.filme.titulo })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthTabs} />
        <Stack.Screen name="FilmesStack" component={FilmesNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    width: '80%',
    height: 44,
    borderWidth: 1.5,
    borderColor: '#1e3d7b',
    borderRadius: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonLogin: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  buttonLoginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerFilmes: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  filmeItem: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  filmeTexto: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  containerSinopse: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textoSinopse: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    textAlign: 'justify',
  },
});