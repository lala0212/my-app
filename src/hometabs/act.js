import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MyTextInput from '../myTextbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  //save data
  useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  //read data
  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Addtesk = () => {
    if (text === '') {
      Alert.alert('請輸入文字');
    } else {
      const newTodo = {
        id: Math.random(),
        task: text,
        time: new Date(),
      };
      setTodos([...todos, newTodo]);
      console.log("exam",todos)
      setText('');
    }
  };


  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };


  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex:9}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#232020',
            }}>
            {todo?.task}
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)} style={styles.btnx}>
        <Image
            source= {require('../../assets/trash.png')} // 根据当前选中的页面选择图标
            resizeMode='contain'
            style={{
                width: 27,
                height: 27,
                tintColor:'#748c94',
            }}
                    />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex:7}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item}/>}
      />
      </View>
      <View style={styles.container2}>
        <MyTextInput text={text} setText={setText} ></MyTextInput>
        <View style={{ padding: 20,paddingLeft: 0 ,justifyContent: 'center' }}>
          <TouchableOpacity onPress={Addtesk} style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={{ height: 150 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#c3d59f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#437C90',
    backgroundColor: '#437C90',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnx: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  btnText: {
    fontSize: 40,
    color:'#fff',
  },
  listItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height:'auto',
    borderRadius: 10,
    marginBottom: 15
  }
});
