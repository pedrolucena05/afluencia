

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CadastroAluno from './CadastroAluno';
import Header from '../Header/Header';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const Alunos = ({ route }) => {
  const [nomeAlunoSelecionado, setNomeAlunoSelecionado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [StatusModal, setStatusModal] = useState(false);
  const { nomeProfessor, nomeEscola, turmaSelecionada } = route.params;
  const [gravando, setGravando] = useState(false); // Alterado de isRecording para gravando
  const [gravacao, setGravacao] = useState(); // Alterado
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  
  let audios = [];

  const abrirTelaBotoes = (nomeAluno) => {
    setNomeAlunoSelecionado(nomeAluno);
    setModalVisible(true);
  };

  const fecharTelaBotoes = () => {
    setModalVisible(false);
  };

  const iniciarGravacao = async () => {
    try {
      const { gravacao } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setGravacao(gravacao);
      setGravando(true);
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };
  
  const pararGravacao = async () => {
    setGravando(false);
    if (!gravando) return;
    try {
      await gravacao.stopAndUnloadAsync();
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };

  const AbrirStatusModal = (nomeAluno) => {
    setStatusModal(!StatusModal);
    setNomeAlunoSelecionado(nomeAluno);
  };

  const toggleRecording = async (topico) => {
    try {
      if (gravando) { // Alterado de isRecording para gravando
        // Parar a gravação se já estiver gravando
        await pararGravacao();
      } else {
        // Iniciar a gravação se não estiver gravando
        await iniciarGravacao();
      }
  
      let adicionar = [];
      adicionar.push(nomeAlunoSelecionado);
      adicionar.push(topico);
      adicionar.push(gravacao);
      audios.push(adicionar);
  
      // Alternar o estado de gravação
      setGravando(!gravando); // Alterado de isRecording para gravando
      setGravacao();
    } catch (error) {
      console.log('Erro ao alternar a gravação:', error);
    }
  };

  return (
    <>
      <Header nome_professor={nomeProfessor} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 20 }}>
          <Text style={styles.projetoFluencia}>Projeto Fluência</Text>
          <Text style={styles.paragrafo}><Text style={{ fontWeight: 'bold' }}>Escola:</Text> {nomeEscola}</Text>
          <Text style={styles.paragrafo}>{turmaSelecionada}</Text>
          
          <View style={{ marginLeft: '5%', marginBottom: '1.5%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '1%' }}>
              <FontAwesome name="circle" size={24} color="#90EF45" />
              <Text style={{ marginLeft: '1%', marginRight: '3%', fontSize: 12 }}>= Presente</Text>
              <FontAwesome name="circle" size={24} color="#DD4343" />
              <Text style={{ marginLeft: '1%', marginRight: '3%', fontSize: 12 }}>= Transferido</Text>
              <FontAwesome name="circle" size={24} color="#0A6187" />
              <Text style={{ marginLeft: '1%', fontSize: 12 }}>= Sincronizado</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="circle" size={24} color="#FBB938" />
              <Text style={{ marginLeft: '1%', marginRight: '4.5%', fontSize: 12 }}>= Ausente</Text>
              <FontAwesome name="circle" size={24} color="#53AB1D" />
              <Text style={{ marginLeft: '1%', marginRight: '6.5%', fontSize: 12 }}>= Corrigido</Text>
              <FontAwesome name="circle" size={24} color="#4AABF2" />
              <Text style={{ marginLeft: '1%', fontSize: 12 }}>= Sincronizando</Text>
            </View>
          </View>
    
          <View style={styles.mainContainer}>
            <View style={styles.container_alunos}>
              <TouchableOpacity style={styles.button_aluno} onPress={() => navigation.navigate('GravarAudio', { aluno: 'João Silva Santos' , nomeProfessor, topico: null, gravacao: null })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.text_button_escola}>João Silva Santos</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: '600', marginRight: 5 }}>Status:</Text>
                      <FontAwesome name="circle" size={24} color="#90EF45" />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => AbrirStatusModal('João Silva Santos')}>
                      <AntDesign name="menuunfold" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharTelaBotoes}
              >
                <View style={styles.telaBotoes}>
                  <TouchableOpacity style={styles.botao} onPress={() => toggleRecording('Palavras')}>
                    <Text style={styles.textoBotao}>Palavras</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={() => toggleRecording('Pseudo Palavras')}>
                    <Text style={styles.textoBotao}>Pseudo Palavras</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botao} onPress={() => toggleRecording('Texto')}>
                    <Text style={styles.textoBotao}>Texto</Text>
                  </TouchableOpacity>
                  <Text>Audios Gravados</Text>
                  <TouchableOpacity style={styles.botaoFechar} onPress={fecharTelaBotoes}>
                    <Text style={styles.textoBotao}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <Modal
                transparent={true}
                animationType="fade"
                visible={StatusModal}
                onRequestClose={() => AbrirStatusModal('')}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <View style={{height: '15%' , backgroundColor: '#0A6187', justifyContent: 'center', paddingLeft: '5%'}}><Text style={{ color:'white'}}>{nomeAlunoSelecionado}</Text></View>
                    <RadioButton.Group
                      onValueChange={(newValue) => setValue(newValue)}
                      value={value}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Presente" />
                        <Text>Presente</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Ausente" />
                        <Text>Ausente</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Transferido" />
                        <Text>Transferido</Text>
                      </View>
                    </RadioButton.Group>
                    <TouchableOpacity onPress={AbrirStatusModal}>
                      <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
   
            </View>
          </View>
        </View>
        <View style={{ flex: 26 }}>
          <CadastroAluno />
        </View>
      </View>
    </>
  );
};

export default Alunos;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  paragrafo: {
    marginLeft: '5%'
  },
  statusDemonstracao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container_alunos: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    alignItems: 'center',
  },
  projetoFluencia: {
    alignItems: 'flex-start',
    marginLeft: '5%',
    marginTop: '5%',
    fontWeight: 'bold'
  },
  button_aluno: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10,
    gap: 5,
    marginTop: '5%',
    marginBottom: '5%'
  },
  text_button_escola: {
    textTransform: 'uppercase',
  },
  telaBotoes: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    borderRadius : 10,
    borderBottomColor : '#000',
    borderWidth: 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    alignSelf : 'center',
    paddingStart : '5%',
    paddingEnd : '5%',
    padding: 16,
    marginBottom :'2%',
    backgroundColor : '#FFF',
    gap: 5,
    width : '80%',
  },
  botaoFechar: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '65%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    
  },
  closeText: {
    marginTop: 20,
    color: 'blue',
    marginLeft: '5%'
  }
});

