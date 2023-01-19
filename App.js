/**
 * 
 */
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";

//lista Fictícia
let tasks = [
  { key: '1', nome: 'Comprar pão' },
  { key: '2', nome: 'Comprar leite' },
]

export default function App() {

  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');

  //se nao tiver nada dentro de usuario cairá no IF
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} /> //quando o changeStatus for chamado em Login, ele passará o user, que será alterado pelo setUser
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          placeholder="O que vai fazer hoje?"
          style={styles.input}
          value={newTask}
          onChangeText={(texto) => setNewTask(texto)}
        />

        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks} //recebe a lista
        keyExtractor={(item) => item.key}  //cria um item que recebe o valor da key da lista
        renderItem={({ item }) => (  //as TaskList serão definidas de acordo com o numero de componentes da lista, ou seja passou duas vezes do TaskList
          <TaskList data={item} />  //o TaskList terá todas as propriedades da lista
        )}
      />
    </SafeAreaView>
  )
}