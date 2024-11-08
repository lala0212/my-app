import React,{ useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './src/bottombar';
import CustomTabBarButton from './src/addbtn';
import AddTextInput from './src/myTextbox2'
import {checkIfClickedToday} from './src/ifrecored';
import { ThemeProvider } from './src/themeContext';

export default function App() {
  const [popup, setpopup] = useState(false);
  const [text, setText] = useState('');
  const [check, setcheck] = useState(false);
  const fetchData = async () => {
    try {
      const result = await checkIfClickedToday();
      setcheck(result);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tabs/>
        <View style={styles.text}>
          {!check&&popup && <AddTextInput text={text} setText={setText} />}
        </View>
        <View  style={styles.btn}>
          <CustomTabBarButton popup={popup} setpopup={setpopup} text = {text} setText={setText} checktmp={check}/>
        </View>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 25,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center', // 垂直居中
    width: '100%', // 让按钮容器占满屏幕宽度
  },
  text: {
    position: "absolute",
    bottom: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center', // 垂直居中
    width: '100%', // 让按钮容器占满屏幕宽度
  },
});
