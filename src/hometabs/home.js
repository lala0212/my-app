import React ,{ useState,useEffect  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Animated ,ImageBackground} from 'react-native';
import moment from 'moment';
import MyCalendar from '../myCalendar';
import MyCard from '../myCd'
const currentDate = moment().format('YYYY-MM-DD');
import {GetDiaryData} from '../getdata.js';
export default function App() {
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
    console.log("selected",selected);
    main();
    console.log("diary",data!= " ")
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
    <View style={styles.container}>
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
    backgroundColor: '#c3d59f',
    
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#fff',
    padding: 20,
    borderRadius: 0,
    width: 350,
    height: '45%',
  },
  cardText: {
    backgroundColor: 'transparent', // 设置 Text 的背景色为白色
  },
});
