import React from 'react';
import { View, ImageBackground, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    try {
      firebase.authsignInWithEmailAndPassword(email, password)
    }
    catch (error) {

      console.log(error)
    }

  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/backgroundMap.jpg')} style={styles.backgroundImage}>
        <View style={styles.card}>
          <Image source={require('./assets/LogoG.png')} style={styles.logo} />
          <TextInput placeholder="Login" onChange={(e) => setEmail(e.nativeEvent.text)} style={styles.input} />
          <TextInput placeholder="Senha" onChange={(e) => setPassword(e.nativeEvent.text)} secureTextEntry style={styles.input} />
          <TouchableOpacity style={styles.linkButton} onPress={login}>
            <Text style={styles.linkButtonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login com Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login com Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Primeiro acesso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  linkButton: {
    padding: 10,
    marginBottom: 10,
  },
  linkButtonText: {
    color: '#3498db',
    textAlign: 'center',
  },
});

export default LoginScreen;