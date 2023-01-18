/**
 * 
 */
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
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
        style={styles.handleLogin}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signText}>Criar uma conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}