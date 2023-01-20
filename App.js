/**
 * 
 */
import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard } from "react-native";
import { styles } from "./styles";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from './src/services/firebaseConnection';


export default function App() {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState('');  //é responsável pelo +
  const [newTask, setNewTask] = useState('');  //é responsável pelo que foi digitado dentro do campo
  const [key, setKey] = useState('');  // passa a chave da key que será editada, para armazenar quando for alterada function handleEdit
  const inputRef = useRef(null);


  //Mostra a lista mesmo apos fechar o app
  useEffect(() => {

    function getUser() {
      if (!user) {  //se o usuario não tiver um user para aqui
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {  //once busca apenas uma vez, snapshot para armazenar o resultado
        setTasks([]);  //a lista começa vazia

        snapshot?.forEach((childItem) => { //?para nao parar a aplicacao, forEach percorre toda a lista, childItem armazena o resultado
          let data = {
            key: childItem.key,  //armazena em key o valor de key
            nome: childItem.val().nome  //armazena em nome o valor da tarefa
          }

          setTasks(oldTasks => [...oldTasks, data])  //a lista que era vazia oldTasks passa a receber o valor de oldTasks que vem de data
        })
      })
    }

    getUser(); //retorna todos os valores definidos na função

  }, [user])  //retorna de acordo com o user

  //função adicionar
  function handleAdd() {
    if (newTask === '') {
      return;
    }

    //usuário quer editar uma tarefa
    if (key !== '') {  //se a key que recebe o valor do item clicado for diferente de vazio, cai no if
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask  //o nome passara a ter o valor de newTask que é o valor digitado no campo
      })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key === key) //procura o index conforme o valor que é dado para ele, procura em toda lista onde o item.key é igual a key
          const taskClone = tasks; //clona toda a lista de tarefas
          taskClone[taskIndex].nome = newTask  //taskClone[taskIndex].nome é a tarefa que vc quer editar irá receber o valor que tem em newTask, que é a onde o pessoa digitou para alterar

          setTasks([...taskClone])  //passa para setTasks o valor da tarefa atualizada pelo taskClone
        })

      Keyboard.dismiss();
      setNewTask('');  //o campo digitado volta a ficar vazio
      setKey('');  //a key volta a ficar vazia
      return;  //para aqui, afim de não fazer outra tarefa nova do let tarefas abaixo
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

  function handleDelete(key) {  //função deletar, recebendo o key da lista tasks
    firebase.database().ref('tarefas').child(user).child(key).remove()  //busca no banco a key da tarefa
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)  //retorna todos os itens, menos aquele que vc clicou
        setTasks(findTasks)  //agora setTasks tera toda a lista atualizada conforme findTasks
      })
  }

  //função editar
  function handleEdit(data) {  //pega os dados a lista com o data
    setKey(data.nome) //tambem ira receber os valores do nome
    setNewTask(data.nome)  //ao clicar na tarefa, ela irá subir para o campo de preenchimento
    inputRef.current.focus();  //da foco no teclado 
  }

  //se nao tiver nada dentro de usuario cairá no IF
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} /> //quando o changeStatus for chamado em Login, ele passará o user, que será alterado pelo setUser
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
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