/**
 * 
 */
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard } from "react-native";
import { styles } from "./styles";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from './src/services/firebaseConnection';


export default function App() {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState('');  //é responsável pelo +
  const [newTask, setNewTask] = useState('');  //é responsável pelo que foi digitado dentro do campo

  //função adicionar
  function handleAdd(){
    if(newTask === ''){
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);  //cria uma tarefa de acordo com o id unico gerado por user
    let chave = tarefas.push().key;  //cria uma chave unica para cada item ao ser adicionado

    tarefas.child(chave).set({  //tarefas receberá o chave unica gerada em let chave
      nome: newTask  //colocando com o nome a tarefa gerada com o id unico de let chave
    })
    .then(() => {  //quando der certo o tarefas.child cai aqui
      const data = {  //cria o objeto data 
        key: chave,  //key recebera a chade unica que foi criada para o item
        nome: newTask  //nome recebe a tabefa que ja foi alterada 
      };

      setTasks(oldTasks => [...oldTasks, data])  //setTasks recebe as atigas tarefas oldTasks, e todas as antigas tarefas ...oldTasks + a tarefa digitada agora
    })

    Keyboard.dismiss();  //garante que o teclado ira fechar
    setNewTask('')  //o campo volta a ficar vazio
  }

  function handleDelete(key){  //função deletar, recebendo o key da lista tasks
    alert(key)
  }

  //função editar
  function handleEdit(data){  //pega os dados a lista com o data
    console.log("Item clicado", data)
  }

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

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks} //recebe a lista
        keyExtractor={(item) => item.key}  //cria um item que recebe o valor da key da lista
        renderItem={({ item }) => (  //as TaskList serão definidas de acordo com o numero de componentes da lista, ou seja passou duas vezes do TaskList
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />  //o TaskList terá todas as propriedades da lista, deleteItem={handleDelete} recebe a funcao de deletar, passando ela tbem para o components\TaskList
        )}
      />
    </SafeAreaView>
  )
}