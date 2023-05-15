import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface SidebarMenuContentProps {
    handleCloseSideMenu: () => void

}

const SidebarMenuContent = ({ handleCloseSideMenu }: SidebarMenuContentProps) => {
    const navigation = useNavigation()

    const onLoginPress = () => {
        navigation.navigate('Login')
        handleCloseSideMenu()
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Text style={styles.userText}>Usuário não logado</Text>
                <TouchableOpacity onPress={onLoginPress}>
                    <MaterialCommunityIcons name="login" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="settings-helper" size={24} color="black" />
                <Text style={styles.buttonText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />
                <Text style={styles.buttonText}>Tema</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default SidebarMenuContent;
