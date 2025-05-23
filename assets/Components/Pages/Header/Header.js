import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import userData from '../Login/userData.json';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


const Header = ({ nome_professor }) => {
    const user = userData.find(user => user.nome_professor === nome_professor);

    return (
        <View style={styles.container_header}>
            <View style={styles.containerProfile}>
                <View style={styles.backgroundProfile}><Ionicons name="person" color="#355F3A" style={styles.profile} /></View>
                <Text style={styles.profileName}>{nome_professor}</Text>
            </View>
            <MaterialIcons name="exit-to-app" size={23} color="black" />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container_header: {
        backgroundColor: '#355F3A',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding : '5%',
    },
    containerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundProfile: {
        width: 23,
        height: 23,
        borderRadius: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        
    },
    profileName: {
        marginLeft: '3%',
        fontWeight: 'bold',
        fontSize: 15
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        textTransform : 'uppercase',
    
    },
});
