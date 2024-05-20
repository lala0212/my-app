import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const MyCalendar = ({ selected, setSelected }) => {
  return (
    <Calendar
      onDayPress={(day) => {
        setSelected(day.dateString);
        console.log(day.dateString);
      }}
      markedDates={{
        [selected]: { selected: true, marked: true, selectedColor: '#3f5226', dotColor: 'transparent' }
      }}
      theme={{
        calendarBackground: '#c3d59f',
        //colors
        monthTextColor: '#D96941',
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
