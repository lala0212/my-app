import React,{useState,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Switch,TextInput,Image } from 'react-native';
import {SaveTextToDatabase,cleandata} from '../testdata'
import { ThemeContext } from '../themeContext';
import FeedbackForm from '../sentmail'
export default function App() {
  const { theme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      {/* <View  style={styles.setitem}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
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
      <View style={{height:100}}>

      </View> */}
      <View style={{height:60}}></View>
      <View style={styles.top}>
        <Text style={[styles.texttop,{color:theme.darktext}]}>SETTINGS</Text>
      </View>
      <View  style={styles.setitem}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image source={require('../../assets/moon.png')} style={[styles.image,{tintColor:theme.darktext}]}></Image>
          <Text style={[styles.text,{color:theme.darktext}]}>Dark mode</Text>
        </View>
        <Switch
        trackColor={{false: '#767577', true: theme.darkblue}}
        thumbColor={isDarkMode ? theme.darktext: theme.light}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggle}
        value={isDarkMode}
        />
      
      </View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <Image source={require('../../assets/feedback.png')} style={[styles.image,{height:28,right:-2,tintColor:theme.darktext}]}></Image>
        <Text style={[styles.text,{color:theme.darktext}]}>Feedback</Text>
      </View>
      <View style={{marginVertical:10}}>
        <FeedbackForm/>
        
      </View>

      <View  style={styles.item}>
        <TouchableOpacity onPress={SaveTextToDatabase}>
          <Text style={[styles.text,{color:theme.darktext}]}>test data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cleandata}>
          <Text style={[styles.text,{color:theme.darktext}]}>clear</Text>
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
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  setitem:{
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item:{
    flexDirection:"row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    margin:5,
  },
  image:{
    margin:3,
    width:27,
    height:27,
  },
  texttop:{
    textAlign: 'center',
    fontSize:20,
    fontWeight:"bold",
  },
  top:{
    alignContent:'center',
    justifyContent:'center',
    padding:10,
    margin:10,
  },
});
