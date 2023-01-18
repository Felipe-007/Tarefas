/**
 * { tipo === 'login' ? 'Acessar' : 'Cadastrar' } se o tipo estiver como login cairá no acessar, se nao vai para o Cadastrar, muda o campo de baixo
 */
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('login')

  function handleLogin() {
    alert('ok')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={(texto) => setPassword(texto)}
      />

      <TouchableOpacity
        style={[styles.handleLogin, { backgroundColor: tipo === 'login' ? '#3ea6f2' : '#141414' }]}  //muda a cor do input
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {tipo === 'login' ? 'Acessar' : 'Cadastrar'  //se o login for igual a Acessar aparece Acessar, se nao Cadastrar
          }
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => setTipo(tipo => tipo === 'login' ? 'cadastrar' : 'login')}  //ao clicar, altera o valor setTipo, alterando tbem o valor do input de cima, se o setTipo for login aparace Cadastrar, se nao Login
      >
        <Text style={styles.signText}>
          {tipo === 'login' ? 'Criar uma conta' : 'Login'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}