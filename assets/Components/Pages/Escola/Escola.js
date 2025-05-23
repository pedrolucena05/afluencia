import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Header/Header';

const Escola = ({ navigation, route }) => {
  const { nomeProfessor, nomeEscola, codTurma } = route.params;
  
  return (
    <View>
      <Header nome_professor={nomeProfessor}/>
      <Text style={styles.textButtonEscola}>
      </Text>
      <View>
        <TouchableOpacity 
          style={styles.buttonEscola} 
          onPress={() => navigation.navigate('Turma', { nomeProfessor, nomeEscola, codTurma })}>
          <MaterialIcons 
            name="school" 
            size={24} 
            color="black"
          />
          <Text style={styles.textButtonEscola}>
            {nomeEscola}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={styles.buttonEscola} 
          onPress={() => navigation.navigate('Turma')}>
          <MaterialIcons 
            name="school" 
            size={24} 
            color="black"
          />
          <Text style={styles.textButtonEscola}>
            {nomeEscola}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default Escola;
