import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Header from '../Header/Header';
import { useNavigation } from '@react-navigation/native';

const GravarAudio = ({ route }) => {
  const [palavrasAudio, setPalavrasAudio] = useState(null);
  const [pseudoAudio, setPseudoAudio] = useState(null);
  const [textoAudio, setTextoAudio] = useState(null);
  const [ recording, setRecording] = useState(null);
  const [ topic , setTopic ] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { nomeProfessor, gravacao, topico } = route.params;
  const navigation = useNavigation();

  
  useEffect(() => {
    Audio.requestPermissionsAsync();
    if (gravacao != null && topico != null) {
      if (topico === 'Palavras') {
        setPalavrasAudio(gravacao);
      }
      else if (topico === 'Pseudo-Palavras') {
        setPseudoAudio(gravacao);
      }
      else if (topico === 'Texto') {
        setTextoAudio(gravacao);
      }
      console.log(palavrasAudio);
      console.log(pseudoAudio);
      console.log(textoAudio)
    }
  }, [gravacao, topico]);

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    
    if (topic === 1) {
      setPalavrasAudio(uri);
    } 
    
    else if (topic === 2) {
      setPseudoAudio(uri);
    } 
    
    else if (topic === 3) {
      setTextoAudio(uri);
    }

  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (

    <View style={styles.container}>
      <Header nome_professor={nomeProfessor} style={styles.cabecalho} />
      <View style={styles.primeiro}>
        <TouchableOpacity style={styles.optionContainer} onPress={() => {navigation.navigate('AudioGravando', { nomeProfessor, topico: 'Palavras' }); setTopic(1);}}> 
            
            <View>
              <Text style={styles.topico}>Palavras</Text>
              <Text style={styles.status}>{palavrasAudio !== null ? 'Gravado' : 'Não gravado'}</Text>
            </View>
            <View>
              {palavrasAudio != null ? (
                <FontAwesome5 name="check" size={30} color="black" />
                ) : (
                  <FontAwesome5 name="microphone" size={30} color="black" />
                )}
            </View>
          
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.optionContainer} onPress={() => {navigation.navigate('AudioGravando', { nomeProfessor, topico: 'Pseudo-Palavras' }); setTopic(2);}}>
      
        <View>
          <Text style={styles.topico}>Pseudo-Palavras</Text>
          <Text style={styles.status}>{pseudoAudio !== null ? 'Gravado' : 'Não gravado'}</Text>
        </View>
        <View>
          {pseudoAudio != null ? (
            <FontAwesome5 name="check" size={30} color="black" />
            ) : (
              <FontAwesome5 name="microphone" size={30} color="black" />
            )}
        </View>
      
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionContainer} onPress={() => {navigation.navigate('AudioGravando', { nomeProfessor, topico: 'Texto' }); setTopic(3);}}>
        
        <View>
          <Text style={styles.topico}>Texto</Text>
          <Text style={styles.status}>{textoAudio !== null ? 'Gravado' : 'Não gravado'}</Text>
        </View>
        <View>
          {textoAudio != null ? (
            <FontAwesome5 name="check" size={30} color="black" />
            ) : (
              <FontAwesome5 name="microphone" size={30} color="black" />
            )}
        </View>
      
      </TouchableOpacity>
      
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal} style={styles.modalDimens} transparent={true}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Vamos Gravar!</Text>
          {isRecording ? (
            <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopRecording}>
            <FontAwesome5 name="stop-circle" size={40} color="#FF6347" />
            <Text style={styles.buttonText}>Parar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.recordButton]} onPress={startRecording}>
            <FontAwesome5 name="microphone-alt" size={40} color="black" />
            <Text style={styles.buttonText}>Gravar</Text>
          </TouchableOpacity>
          
          )}
        </View>
      </Modal>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  cabecalho: {
    marginBottom: 15
  },
  primeiro: {
    marginTop: 15
  },
  optionContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    marginLeft: '5%' 
  },
  topico: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 1
  },
  status: {
    fontSize: 14,
    color: 'black',
    fontWeight: '200',
    marginBottom: 10,
    
  },
  modalDimens: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    marginTop: -100, // Ajuste verticalmente para centralizar o modal
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  recordButton: {
    backgroundColor: '#90EE90', 
  },
  stopButton: {
    backgroundColor: 'blue', 
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default GravarAudio;
