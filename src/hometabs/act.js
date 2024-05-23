import React, { useEffect, useState,useContext } from 'react';
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
import { ThemeContext } from '../themeContext';
export default function App() {
  const { theme } = useContext(ThemeContext);
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
      <View style={[styles.listItem,{backgroundColor:theme.lighttext}]}>
        <View style={{flex:9}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: theme.darktext,
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
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={{flex:1}}></View>
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
          <TouchableOpacity onPress={Addtesk} style={[styles.btn,{backgroundColor:theme.darkblue}]}>
            <Text style={[styles.btnText,{color:theme.lighttext}]}>+</Text>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnx: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  btnText: {
    top:-1,
    fontSize: 45,
  },
  listItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height:'auto',
    borderRadius: 10,
    marginBottom: 15
  }
});
