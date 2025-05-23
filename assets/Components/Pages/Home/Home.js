import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, Image, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Header/Header';

const Home = ({ navigation, route }) => {
  const { nomeProfessor } = route.params;
  return (
    <>
      <View style={styles.container_logo}>
        <Image source={require('../../../logo-horizontal.png')} resizeMode='contain' style={styles.logo_img} />
      </View>
      <View style={styles.container_home}>
        <Text>
          {nomeProfessor}
        </Text>
        <TouchableOpacity
          style={styles.button_iniciar}
          onPress={() => navigation.navigate('Escola')}
        >
          <Text style={styles.text_button_iniciar}>
            Fluência
          </Text>
          <MaterialIcons name="keyboard-voice" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    paddingBottom: 5,
    marginVertical: 2,
    alignItems: 'left',
  },
  menu: {
    backgroundColor: 'blue',
    flex: 1,
    padding: '10%',
  },
  buttonText: {
    color: '#fff',
  },
  container_login: {
    flex: 1,
    padding: '10%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
  },
  logo: {
    flex: 2,
    width: '80%',
    alignSelf: 'center',
  },
  container_logo: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logo_img: {
    width: '50%',
  },
  text: {
    fontSize: 20,
  },
  button_iniciar: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
    width: 150,
  },
  container_home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
  },
  text_button_iniciar: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_escola: {
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  text_button_escola: {
    textTransform: 'uppercase',
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
  container_button_modal: {
    flexDirection: 'row',
    gap: 10,
  },
  box_input: {
    borderBottomWidth: 1,
    width: '100%',
    height: 50,
    marginBottom: '10%',
    fontSize: 20,
  },
  container_turma: {
    padding: '5%',
  },
  container_escola: {
    padding: '5%',
  },
});