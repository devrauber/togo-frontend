import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Card from "../components/Card";
import colors from "../global";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Separator from "../components/Separator";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from "../components/Input";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUp: React.FC = () => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
    });
    const { handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: any) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    console.log(errors)

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./assets/backgroundMap.jpg")}
                style={styles.backgroundImage}
            >
                <Card>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Faça seu cadastro abaixo!</Text>
                    </View>
                    <Input
                        placeholder="Como você gostaria de ser chamado?"
                        onChangeText={(text) => setValue('name', text)}
                        errorMessage={errors?.name?.message}
                    />
                    <Input
                        placeholder="E-mail"
                        onChangeText={(text) => setValue("email", text)}
                    />
                    <Input
                        placeholder="Senha"
                        password
                    />
                    <Input
                        placeholder="Confirmar senha"
                        password
                        onChangeText={(text) => setValue("password", text)}
                    />
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.button}>Cadastrar</Text>
                    </TouchableOpacity>
                    <Separator hasOr />
                    <View style={styles.viewSocialButtons}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                <AntDesign name="google" size={24} color="white" />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                <AntDesign name="facebook-square" size={24} color="white" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
    },
    title: {
        alignSelf: "center",
        justifyContent: "center",
        color: colors.orangeLogo,
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
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
    button: {
        backgroundColor: colors.orangeLogo,
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
    },
    linkButton: {
        padding: 5,
    },
    password: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        right: 20,
        top: 8,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    linkButtonText: {
        color: colors.orangeLogo,
        textAlign: "center",
    },
    viewSocialButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
});

export default SignUp;
