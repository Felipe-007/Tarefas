/**
 * 
 */
import React from "react";
import { View, Text } from "react-native";

export default function TaskList({ data }){ //data recebe os valores do App.js conforme o item <TaskList data={item} />

  return(
    <View>
      <Text>A tarefa é: {data.nome}</Text>
    </View>
  )
}