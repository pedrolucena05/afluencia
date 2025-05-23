import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const CadastroAluno = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nomeAluno, setNomeAluno] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');

    const abrirModal = () => {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    const cadastrarAluno = () => {
        // Aqui você pode implementar a lógica para cadastrar o aluno
        console.log("Aluno cadastrado:", nomeAluno, dataNascimento, nomeResponsavel);
        fecharModal(); // Fechar o modal após o cadastro
    };

    return (
        <View>
            <TouchableOpacity style={styles.botao_cadastrar_aluno} onPress={abrirModal}>
                <MaterialIcons name="add-circle" size={24} color="#FFF" />
                <Text style={styles.txt_cadastro_aluno}>Adicionar Aluno</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharModal}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.titulo}>Cadastro de Aluno</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Aluno"
                            value={nomeAluno}
                            onChangeText={setNomeAluno}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data de Nascimento"
                            value={dataNascimento}
                            onChangeText={setDataNascimento}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Responsável"
                            value={nomeResponsavel}
                            onChangeText={setNomeResponsavel}
                        />
                        <View style={styles.botoes}>
                            <Button title="Cancelar" onPress={fecharModal} color="#FF0000" />
                            <Button title="Confirmar" onPress={cadastrarAluno} color="#008000" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CadastroAluno;

const styles = StyleSheet.create({
    botao_cadastrar_aluno: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#355F3A',
        width: '100%',
        gap: 10,
        padding: 5,
    },
    txt_cadastro_aluno: {
        color: '#FFF',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
