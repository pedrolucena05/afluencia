import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RedefinirSenha = () => {
  const [email, setEmail] = useState('');

  const enviarEmail = () => {

    setTimeout(() => {
      Alert.alert('Sucesso', `Um link para redefinir sua senha foi enviado para ${email}`);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinição de Senha</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Digite seu e-mail"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={enviarEmail}
      >
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    margin: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
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
    paddingHorizontal: 90,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RedefinirSenha;
