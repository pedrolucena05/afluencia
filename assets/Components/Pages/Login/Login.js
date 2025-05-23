import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, Image, Modal } from 'react-native';
import { useState } from 'react';
import userData from './userData.json'
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const user = userData.find(user => user.email === email && user.password === password);

    if (user) {
      Alert.alert('Login bem-sucedido', `Bem-vindo, ${user.nome_professor}!`)
      navigation.navigate('Escola', { nomeProfessor: user.nome_professor, nomeEscola: user.escola });
    } else {
      Alert.alert('Usuário ou senha inválido');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('RedefinirSenha');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container_login}>
        <View style={styles.container_logo}><Image style={styles.logo} source={require('../../../logo.gif')} resizeMode='contain' /></View>
        <Text style={[styles.text , styles.userText]}>Usuário</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="black" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Digite seu CPF'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <Text style={styles.text}>Senha</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="black" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder='Digite sua senha'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.bottomText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container_login: {
    padding: '10%',
    marginTop: '10%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
  },
  container_logo: {
    width: '100%',
    height: '40%',
    border: '1px solid black',
    marginBottom: '15%'
  },
  logo: {
    flex: 2,
    width: '90%',
    alignSelf: 'center',
    
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  userText: {
    marginBottom: 5 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#d3d3d3'
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '60%',
    marginLeft: '20%',
    marginTop: '10%'

  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: 14,
    marginBottom: '10%',
    marginTop: 20
  }
})

export default Login;
