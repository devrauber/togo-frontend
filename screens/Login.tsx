import React from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { View, ImageBackground, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { app } from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import colors from '../global';
import Separator from '../components/Separator';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const auth = getAuth(app);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/backgroundMap.jpg')} style={styles.backgroundImage}>
        <Card>
          <Image source={require('./assets/LogoG.png')} style={styles.logo} />
          <TextInput placeholder="Login" onChange={(e) => setEmail(e.nativeEvent.text)} style={styles.input} />
          <TextInput placeholder="Senha" onChange={(e) => setPassword(e.nativeEvent.text)} secureTextEntry style={styles.input} />
          <TouchableOpacity style={styles.linkButton} onPress={handleLogin}>
            <Text style={styles.button}>Entrar</Text>
          </TouchableOpacity>
          <Separator hasOr />
          <View style={styles.viewSocialButtons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}><AntDesign name="google" size={24} color="white" /></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}><AntDesign name="facebook-square" size={24} color="white" /></Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkButtonText}>Primeiro acesso</Text>
          </TouchableOpacity>
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 130,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.orangeLogo,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold'

  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  linkButton: {
    padding: 5,
  },
  linkButtonText: {
    color: colors.orangeLogo,
    textAlign: 'center',
  },
  viewSocialButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  }
});

export default LoginScreen;