import React, { useState,useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetDiaryData} from './getdata.js';
const MyCalendar = ({ selected, setSelected }) => {
  const [markedDates, setMarkedDates] = useState({});
  const currentDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const main = async () => {
      const dbDates = await GetDiaryData(); // 获取日记数据
      const newMarkedDates = dbDates.reduce((acc, data) => {
        acc[data.time] = {
          selected: true,        // 标记为选中
          marked: true,          // 标记为已标记
          selectedColor: '#437C90', // 选中颜色
          dotColor: 'transparent'   // 点的颜色
        };
        return acc; // 返回更新后的累加器对象
      }, {});

      setMarkedDates(newMarkedDates); // 更新状态
    };

    main();
  }, []);




  return (
    <Calendar
      markingType='interactive'
      onDayPress={(day) => {
        setSelected(day.dateString);
        console.log(day.dateString);
      }}
      markedDates={{
        [currentDate]: { marked: true, dotColor: '#D96941' },
        ...markedDates,
        [selected]: { selected: true, marked: true, selectedColor: '#3f5226', dotColor: 'transparent' }
        
      }}
      theme={{
        calendarBackground: '#c3d59f',
        //colors
        monthTextColor: '#ab4622',
        textSectionTitleColor: '#3f5226',
        todayTextColor: '#3f5226',
        textDisabledColor: '#748c94',
        dayTextColor: '#3f5226',
        arrowColor: '#3f5226',
        //font
        textMonthFontWeight: '900',
        textDayHeaderFontWeight: '800',
       
      }}
      style={{
        
        borderWidth: 0,
        height: 350,
        width: 350,
        backgroundColor: '#c3d59f',
      }}
      headerContainerStyle={{
        backgroundColor: '#c3d59f', // 设置头部容器的背景色
      }}
      monthFormat="MMM yyyy"
    />
  );
};

export default MyCalendar;
