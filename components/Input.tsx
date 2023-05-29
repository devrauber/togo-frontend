import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface InputProps {
    errorMessage?: string;
    password?: boolean;
    placeholder: string;
    onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ errorMessage, password, placeholder, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={isFocused ? '#FF0000' : '#888888'}
                secureTextEntry={password && !showPassword}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={onChangeText}
            />
            {password && (
                <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
                    {/* Aqui você pode usar ícones ou texto para alternar a exibição da senha */}
                    <MaterialIcons
                        name={showPassword ? 'visibility-off' : 'visibility'}
                        size={24}
                        color="#999"
                    />
                </TouchableOpacity>
            )}
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    inputContainerFocused: {
        borderColor: '#FF0000',
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: "100%",
    },
    showPasswordButton: {
        position: 'absolute',
        top: 0,
        right: 10,
        bottom: 8,
        justifyContent: 'center',
        paddingRight: 10,
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 14,
        marginTop: 5,
    },
});

export default Input;