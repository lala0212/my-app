import React ,{ useState,useEffect,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Animated} from 'react-native';
import MyCalendar from '../myCalendar';
import MyCard from '../myCd'
import {GetDiaryData} from '../getdata.js';
import { ThemeContext } from '../themeContext';
export default function App() {
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(" ");
  const [showCard, setShowCard] = useState(false); // 控制 Card 是否显示
  const opacity = useState(new Animated.Value(0))[0];
  const [showText, setShowText] = useState(" ");
  const [data, setData] = useState(" ");
  const main = async () => {
    const parsedData = await GetDiaryData(); // 获取日记数据
    const datanow = parsedData.filter(item => item.time === selected);
    if (datanow.length > 0) {
      setData(datanow[0]); // 访问第一个项目的日记
      setShowCard(true);
      // 使用 diary 和 reflection 做一些事情
  } else {
      setData(" ")
      setShowCard(false);
      // 处理没有与当前日期匹配的日记数据的情况
  }
  }

  useEffect(() => {
    main();
    if (selected !== " " && (data!= " ")) {
      setShowText(" ");
      // 先触发动画
      Animated.timing(opacity, {
        toValue: 0.7, // 先消失
        duration: 50, // 动画时长
        useNativeDriver: true, // 使用原生驱动
      }).start(() => {
        // Animation completed, set new text and start the appearance animation
        setShowText(showText);
        Animated.timing(opacity, {
          toValue: 1, // 再出现
          duration: 100, // 动画时长
          useNativeDriver: true, // 使用原生驱动
        }).start();
      });
    } else {
      
    }
  }, [selected]);

  return (
    <View style={[styles.container,{backgroundColor: theme.backgroundColor}]}>
      <View style={{height:50}}></View>
      <View style={{ paddingTop: 30,paddingBottom: 30 }}>
        <MyCalendar selected={selected} setSelected={setSelected} /></View>
      {showCard && <Animated.View style={{ opacity }}>
        <MyCard data={data}/>
      </Animated.View>}
      <StatusBar style="auto"/>
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
