/**
 * 
 * https://icons.expo.fyi/
 */
import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { styles } from "./styles";

export default function TaskList({ data, deleteItem, editItem }) { //data recebe os valores do App.js conforme o item <TaskList data={item} />

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.lixeira} onPress={ () => deleteItem(data.key) }>
        <Entypo name="trash" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.terefa}>
        <TouchableWithoutFeedback onPress={ () => editItem(data) }>
          <Text style={styles.textTerefa}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

//onPress={ () => deleteItem(data.key) = ao ser clicado chamara o delete deleteItem quem vem do App.js, pegando o a lista data com a key
//onPress={ () => deleteItem(data) = 