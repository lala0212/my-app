import React, { useState,useEffect,useContext } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {GetDiaryData} from './getdata.js';
import { ThemeContext } from './themeContext';
const MyCalendar = ({ selected, setSelected }) => {
  const [markedDates, setMarkedDates] = useState({});
  const currentDate = moment().format('YYYY-MM-DD');
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const main = async () => {
      const dbDates = await GetDiaryData(); // 获取日记数据
      const newMarkedDates = dbDates.reduce((acc, data) => {
        acc[data.time] = {
          selected: true,        // 标记为选中
          marked: true,          // 标记为已标记
          selectedColor: theme.darkblue, // 选中颜色
          dotColor: 'transparent',  // 点的颜色
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
        [currentDate]: { marked: true, dotColor: theme.red },
        ...markedDates,
        [selected]: { selected: true, marked: true, selectedColor:theme.darkgreen, dotColor: 'transparent',}
        
      }}
      theme={{
        calendarBackground: theme.backgroundColor,
        //colors
        monthTextColor: theme.red,
        textSectionTitleColor: theme.darkgreen,
        todayTextColor: theme.darktext,
        textDisabledColor: theme.gray,
        dayTextColor: theme.darktext,
        arrowColor: theme.darkgreen,
        //font
        textMonthFontSize:18,
        textMonthFontWeight: '900',
        textDayHeaderSize: 16,
        textDayHeaderFontWeight: '800',
       
      }}
      style={{
        
        borderWidth: 0,
        height: 350,
        width: 350,
        backgroundColor:theme.backgroundColor,
      }}
      headerContainerStyle={{
        backgroundColor: theme.backgroundColor, // 设置头部容器的背景色
      }}
      monthFormat="MMM yyyy"
    />
  );
};

export default MyCalendar;
