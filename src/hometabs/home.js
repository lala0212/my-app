import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated } from 'react-native';
import MyCalendar from '../myCalendar';
import MyCard from '../myCd';
import { GetDiaryData } from '../getdata.js';
import { ThemeContext } from '../themeContext';

export default function App() {
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(" ");
  const [showCard, setShowCard] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const filterData = async () => {
      const data = await GetDiaryData();
      const datanow = data.filter(item => item.time === selected);
      if (datanow.length > 0) {
        setFilteredData(datanow[0]); // 访问第一个项目的日记
        setShowCard(true);

        // 动画效果
        Animated.timing(opacity, {
          toValue: 0.7, // 先消失
          duration: 50, // 动画时长
          useNativeDriver: true, // 使用原生驱动
        }).start(() => {
          Animated.timing(opacity, {
            toValue: 1, // 再出现
            duration: 100, // 动画时长
            useNativeDriver: true, // 使用原生驱动
          }).start();
        });
      } else {
        setFilteredData(" ");
        setShowCard(false);
      }
    };
    
    if (selected !== " ") {
      filterData();
    }
  }, [selected]);
 
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ height: 50 }}></View>
      <View style={{ paddingTop: 30, paddingBottom: 30 }}>
        <MyCalendar selected={selected} setSelected={setSelected} />
      </View>
      {showCard && (
        <Animated.View style={{ opacity }}>
          <MyCard data={filteredData} />
        </Animated.View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
