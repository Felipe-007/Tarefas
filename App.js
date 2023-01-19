/**
 * 
 */
import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./styles";
import Login from "./src/components/Login";

export default function App(){

  const [user, setUser] = useState(null);

  //se nao tiver nada dentro de usuario cairá no IF
  if(!user){
    return <Login changeStatus={ (user) => setUser(user) } /> //quando o changeStatus for chamado em Login, ele passará o user, que será alterado pelo setUser
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text>Tela App</Text>
    </SafeAreaView>
  )
}