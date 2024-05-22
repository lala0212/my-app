import React,{useState,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Switch,TextInput,Image } from 'react-native';
import {SaveTextToDatabase,cleandata} from '../testdata'
import { ThemeContext } from '../themeContext';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("");
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={styles.container}>
      <View  style={styles.setitem}>
        {/* <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image source={require('../../assets/bell.png')} style={styles.image}></Image>
          <Text style={styles.text}>Daily reminder</Text>
        </View>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      <View style={{height:100}}> */}

      </View>
      <View  style={styles.setitem}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <Image source={require('../../assets/moon.png')} style={styles.image}></Image>
      <Text style={styles.text}>Dark mode</Text>
      </View>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggle}
        value={isDarkMode}
      />
      
      </View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <Image source={require('../../assets/feedback.png')} style={[styles.image,{height:28}]}></Image>
        <Text style={styles.text}>Feedback</Text>
      </View>
      <View style={styles.feed}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder=""
        />
      </View>

      <View  style={styles.setitem}>
        <TouchableOpacity onPress={SaveTextToDatabase}>
          <Text style={styles.text}>test data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cleandata}>
          <Text style={styles.text}>clear</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:30,
    flex: 1,
    backgroundColor: '#c3d59f',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  setitem:{
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    margin:5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical:0,
    width: 'auto',
    height: 100,
    borderRadius: 25,
    fontSize: 18,
  },
  image:{
    margin:3,
    width:25,
    height:25,
  }
});
