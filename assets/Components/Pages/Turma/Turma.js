import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Header/Header';

const Turma = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { nomeProfessor, nomeEscola } = route.params;
  var turmaSelecionada = "";
  
  return (
    <>
      <Header nome_professor={nomeProfessor} style={styles.headerTop}/>
      <View>
        <TouchableOpacity 
          style={styles.buttonEscola} 
          onPress={() => {setModalVisible(true); turmaSelecionada="D0204 - 2º ano - 2EF - Matutino (01)";}}>
          <MaterialIcons 
            name="school" 
            size={24} 
            color="black"
          />
          <Text style={styles.textButtonEscola}>
            D0204 - 2º ano - 2EF - Matutino (01)
          </Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={styles.buttonEscola} 
          onPress={() => navigation.navigate('Turma', { nomeProfessor })}>
          <MaterialIcons 
            name="school" 
            size={24} 
            color="black"
          />
          <Text style={styles.textButtonEscola}>
            Outro Texto
          </Text>
        </TouchableOpacity> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Digite o código do instrumento</Text>
            <TextInput style={styles.boxInput} autoCapitalize="characters" keyboardType='numeric'/>
            <View style={styles.containerButtonModal}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#2196F3', alignItems: 'center' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Alunos', { nomeProfessor, nomeEscola, turmaSelecionada });
                }}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    marginBottom: '10%'
  },
  textButtonEscola: {
    textTransform: 'uppercase',
    padding: 8,
  },
  buttonEscola: {
    borderRadius : 10,
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
    marginTop: '10%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    width: '100%',
  },
  containerButtonModal: {
    flexDirection: 'row',
    gap: 10,
  },
  boxInput: {
    borderBottomWidth: 1,
    width: '100%',
    height: 50,
    marginBottom: '10%',
    fontSize: 20,
  },
});

export default Turma;
