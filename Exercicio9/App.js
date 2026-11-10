import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { ref, push } from 'firebase/database';
import { auth, db } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Cardápio Mockado (mínimo de 5 itens) ---
const CARDAPIO = [
  {
    id: '1',
    nome: 'Pizza de Mussarela',
    descricao: 'Molho de tomate especial, cebola e mussarela de cura.',
    preco: 39.90,
    foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
  },
  {
    id: '2',
    nome: 'Suco Natural 1L',
    descricao: 'Suco de laranja natural e gelado sem conservantes.',
    preco: 9.90,
    foto: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400'
  },
  {
    id: '3',
    nome: 'Hambúrguer Artesanal',
    descricao: 'Pão brioche, blend 180g, queijo cheddar e bacon crocante.',
    preco: 32.50,
    foto: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
  },
  {
    id: '4',
    nome: 'Batata Frita Rústica',
    descricao: 'Porção crocante temperada com alecrim e páprica.',
    preco: 18.00,
    foto: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400'
  },
  {
    id: '5',
    nome: 'Sobremesa Petit Gâteau',
    descricao: 'Bolo quente recheado de chocolate com sorvete de baunilha.',
    preco: 22.00,
    foto: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'
  }
];

// --- Tela: Login ---
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha o e-mail e a senha.');
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.navigate('RestauranteStack');
      })
      .catch((error) => {
        Alert.alert('Erro de Autenticação', error.message);
      });
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authLabel}>Login:</Text>
      <TextInput
        style={styles.input}
        placeholder="email@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.authLabel}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="******"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Tela: Cadastro ---
function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha o e-mail e a senha.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login na aba Login.');
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        Alert.alert('Erro no Cadastro', error.message);
      });
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authLabel}>Cadastrar usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="email@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.authLabel}>Cadastrar senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Mínimo 6 dígitos"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleCadastro}>
        <Text style={styles.primaryButtonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Navegador Tab: Autenticação ---
function AuthTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen 
        name="LoginTab" 
        component={LoginScreen} 
        options={{ title: 'Login', tabBarLabel: 'Login' }} 
      />
      <Tab.Screen 
        name="CadastroTab" 
        component={CadastroScreen} 
        options={{ title: 'Criar Conta', tabBarLabel: 'Criar Conta' }} 
      />
    </Tab.Navigator>
  );
}

// --- Tela 1: Lista Cardápio ---
function CardapioScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('ConfirmarPedido', { item })}
    >
      <Image source={{ uri: item.foto }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardDesc}>{item.descricao}</Text>
        <Text style={styles.cardPreco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CARDAPIO}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
}

// --- Tela 2: Confirmar Pedido e Quantidade ---
function ConfirmarPedidoScreen({ route, navigation }) {
  const { item } = route.params;
  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => setQuantidade((prev) => prev + 1);
  const diminuir = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.detalhesContainer}>
      <Image source={{ uri: item.foto }} style={styles.detalhesImage} />
      <Text style={styles.detalhesTitle}>{item.nome}</Text>
      <Text style={styles.detalhesDesc}>{item.descricao}</Text>
      <Text style={styles.detalhesPreco}>Preço: R$ {item.preco.toFixed(2)}</Text>

      <View style={styles.qtdContainer}>
        <TouchableOpacity style={styles.qtdButton} onPress={diminuir}>
          <Text style={styles.qtdButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtdText}>{quantidade}</Text>
        <TouchableOpacity style={styles.qtdButton} onPress={aumentar}>
          <Text style={styles.qtdButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('FinalizarPedido', { item, quantidade })}
      >
        <Text style={styles.primaryButtonText}>CONFIRMAR PEDIDO</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Tela 3: Finalizar e Salvar no Firebase ---
function FinalizarPedidoScreen({ route, navigation }) {
  const { item, quantidade } = route.params;
  const total = item.preco * quantidade;
  const [salvando, setSalvando] = useState(false);

  const salvarNoFirebase = () => {
    setSalvando(true);
    const pedidosRef = ref(db, 'pedidos');
    const dadosPedido = {
      prato: item.nome,
      precoUnitario: item.preco,
      quantidade: quantidade,
      valorTotal: total,
      usuarioEmail: auth.currentUser ? auth.currentUser.email : 'anonimo',
      data: new Date().toISOString()
    };

    push(pedidosRef, dadosPedido)
      .then(() => {
        Alert.alert('Sucesso', 'Pedido salvo no Firebase com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Cardapio') }
        ]);
      })
      .catch((error) => {
        Alert.alert('Erro ao Salvar', error.message);
      })
      .finally(() => setSalvando(false));
  };

  return (
    <View style={styles.detalhesContainer}>
      <Text style={styles.detalhesTitle}>Resumo da Compra</Text>
      <View style={styles.resumoBox}>
        <Text style={styles.resumoItem}>Item: {item.nome}</Text>
        <Text style={styles.resumoItem}>Quantidade: {quantidade}</Text>
        <Text style={styles.resumoItem}>Preço unitário: R$ {item.preco.toFixed(2)}</Text>
        <Text style={[styles.resumoItem, styles.resumoTotal]}>
          Total a pagar: R$ {total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, salvando && { backgroundColor: '#888' }]}
        disabled={salvando}
        onPress={salvarNoFirebase}
      >
        <Text style={styles.primaryButtonText}>
          {salvando ? 'SALVANDO...' : 'FINALIZAR PEDIDO'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Stack das Telas do Restaurante ---
function RestauranteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Cardapio" 
        component={CardapioScreen} 
        options={{ title: 'Cardápio' }} 
      />
      <Stack.Screen 
        name="ConfirmarPedido" 
        component={ConfirmarPedidoScreen} 
        options={{ title: 'Pedido' }} 
      />
      <Stack.Screen 
        name="FinalizarPedido" 
        component={FinalizarPedidoScreen} 
        options={{ title: 'Finalizar Pedido' }} 
      />
    </Stack.Navigator>
  );
}

// --- Componente Principal ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthTabs} />
        <Stack.Screen name="RestauranteStack" component={RestauranteStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5'
  },
  authLabel: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6
  },
  input: {
    width: '85%',
    borderWidth: 1.5,
    borderColor: '#002B7F',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 4,
    marginTop: 10,
    elevation: 2
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center'
  },
  cardImage: { width: 90, height: 90, borderRadius: 8 },
  cardDetails: { flex: 1, marginLeft: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  cardDesc: { fontSize: 12, color: '#666', marginVertical: 4 },
  cardPreco: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  detalhesContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF'
  },
  detalhesImage: { width: 220, height: 220, borderRadius: 12, marginBottom: 16 },
  detalhesTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  detalhesDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 12 },
  detalhesPreco: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  qtdButton: {
    backgroundColor: '#EEE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  qtdButtonText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  qtdText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20 },
  resumoBox: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  resumoItem: { fontSize: 16, color: '#333', marginBottom: 8 },
  resumoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#EEE',
    paddingTop: 8
  }
});