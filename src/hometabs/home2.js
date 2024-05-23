import React, { useEffect, useState,useContext } from 'react';
import {  StyleSheet,FlatList, View, Image, Text,TouchableOpacity} from 'react-native';
import Monthpicker from '../monthselector';
import moment from 'moment';
import {GetDiaryData} from '../getdata.js';
const Month = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
import MyCard from '../myCd'
import { ThemeContext } from '../themeContext';
export default function App() {
  const currentY = moment().format('YYYY');
  const currentM = moment().format('MMM');
  const [Y, setY] = useState(currentY);
  const [show, setShow] = useState(false);
  const [M, setM] = useState(currentM);
  const [flatdata, setFlatdata] = useState([]);
  const [selected, setSelect] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [data, setData] = useState(" ");
  const { theme } = useContext(ThemeContext);
  useEffect(()=>{
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
    main();
  },[selected]);
  useEffect(()=>{
    const main = async () => {
      const Data = await GetDiaryData(); // 获取日记数据
      Mnum = (Month.indexOf(M)+1);
      Mfor = Mnum< 10 ? '0' + Mnum : Mnum;
      targetPrefix = Y+"-"+ Mfor;
      setFlatdata(Data.filter(entry => entry.time.startsWith(targetPrefix)).reverse());
    }
    main();
  },[Y,M]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card_all,{backgroundColor:theme.lighttext}]}  onPress={() => {setSelect(item.time),setShowCard(!showCard)}}>
        <View style={[{backgroundColor:theme.darkblue},styles.date]}>
          <Text style={[styles.datetext,{color:theme.lighttext}]}>{item.time.slice(8, 10)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={[styles.cardtext,{color:theme.darktext}]} numberOfLines={2} ellipsizeMode="tail">{item.diary}</Text>
        </View>
    </TouchableOpacity>
);
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={{flex:0.3}}></View>
      <View style={styles.toptext}>
        <Text style={[styles.dateText,{color:theme.red}]}>
          {M} {Y} 
        </Text>
        <TouchableOpacity  onPress={() => setShow(!show)}>
          <Image source={require('../../assets/select.png')} style={[styles.image,{tintColor:theme.darkgreen}]} />
        </TouchableOpacity>
      </View>
      <View style={[styles.separator,{backgroundColor:theme.darkgreen}]}/>
      <View style={styles.flat} >
        <FlatList
          data={flatdata}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        {showCard&&<View style={{height:188}} >
          <View  style={{height:30}}></View>
          <MyCard data={data}/>
      </View>}
      </View>

      <View style={styles.select}>
      {show&&<Monthpicker Y={Y} M={M} setY={setY} setM={setM} setShow={setShow}/>}
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
  flat:{
    flex:4,
    alignItems: 'center',
  },
  separator:{
    top:-23,
    height: 2,
    width:350,
    marginVertical:3,
    marginBottom:0,
},
  toptext:{
    flex:1,
    flexDirection: 'row',
    top: 48,
  },
  dateText:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    position: 'absolute',
    right: -23, // 调整偏右的位置，根据需要更改
    top: 5,
    width: 13, 
    height: 13,
  },
  select:{
    position: 'absolute',
    top: 150,
  },
  card_all:{
    width:330,
    flexDirection: 'row',
    AlignItems:'stretch',
    margin:8,
    padding:0,
    borderRadius: 15,
  },
  card:{
    justifyContent: 'center',
    width: 250,
  },
  date:{
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
    borderRadius:12,
    padding:8,
  },
  datetext:{
    fontSize:18,
  },
});
