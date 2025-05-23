import React from "react";
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Status = () => { 
    return (
    <View style={styles.container_status}>
        <MaterialIcons name="circle" size={24} color="green"/>
        <MaterialIcons name="check-circle" size={24} color="black"/>
        <MaterialIcons name="cancel" size={24} color="black"/>
        <MaterialIcons name="sync" size={24} color="black"/>
        <MaterialIcons name="cloud" size={24} color="black"/>
    </View>
    )
}

export default Status

const styles = StyleSheet.create({
    container_status : {
        display : 'flex',
        flexDirection : 'row',
    },
})