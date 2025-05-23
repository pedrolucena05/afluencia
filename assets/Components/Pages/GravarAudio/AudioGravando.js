import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import userData from '../Login/userData.json';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import Header from '../Header/Header/';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const AudioGravando = ({ route }) => {
    const user = userData.find(user => user.nome_professor === nomeProfessor);
    const { nomeProfessor, topico } = route.params;
    const [palavrasAudio, setPalavrasAudio] = useState(null);
    const [pseudoAudio, setPseudoAudio] = useState(null);
    const [textoAudio, setTextoAudio] = useState(null);
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [animation] = useState(new Animated.Value(1));
    const [ gravacao , setGravacao ] = useState(null)
    const navigation = useNavigation();

    useEffect(() => {
        Audio.requestPermissionsAsync();
    }, []);

    const startRecording = async () => {
        try {
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            startAnimation();
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setGravacao(uri);
        stopAnimation();
    };

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    const stopAnimation = () => {
        animation.setValue(1);
        animation.stopAnimation();
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <>
            <Header nome_professor={nomeProfessor} />
            <View style={{ flex: 1, width: '90%', marginLeft: '5%' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 25 }}>{topico}</Text>
                <Text style={{ marginTop: 15, marginBottom: 50 }}>Toque no ícone para iniciar a gravação (Pode tentar quantas vezes quiser antes de confirmar):</Text>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center' }}>
                        {isRecording ? (
                            <Animated.View style={isRecording ? animatedStyle : null}>
                                <Fontisto name="record" size={80} color="red" />
                            </Animated.View>
                        ) : (
                            <FontAwesome5 name="microphone" size={110} color="black" />
                        )}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 90 }}>
                        <TouchableOpacity style={{ width: 150, backgroundColor: '#345E8F', marginRight: 10, paddingTop: 15, paddingBottom: 15, borderRadius: 20 }}>
                            {isRecording ? (
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }} onPress={stopRecording}>Parar</Text>
                            ) : (
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }} onPress={startRecording}>Gravar</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 150, backgroundColor: '#345E8F', marginRight: 10, paddingTop: 15, paddingBottom: 15, borderRadius: 20 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Escutar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ width: 100, backgroundColor: '#D9D9D9', marginTop: 40, paddingTop: 15, paddingBottom: 15, borderRadius: 20 }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 18 }} onPress={() => {navigation.navigate('GravarAudio', { nomeProfessor, topico, gravacao })}}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default AudioGravando;
