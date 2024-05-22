import React, { useEffect, useState,useRef } from 'react';
import {  StyleSheet,FlatList, View, Image, Text,TouchableOpacity} from 'react-native';
import Monthpicker from '../monthselector';
import moment from 'moment';
import {GetDiaryData} from '../getdata.js';
const Month = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
import MyCard from '../myCd'
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
      setFlatdata(Data.filter(entry => entry.time.startsWith(targetPrefix)));
    }
    main();
  },[Y,M]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card_all}  onPress={() => {setSelect(item.time),setShowCard(!showCard)}}>
        <View style={styles.date}>
         <Text style={styles.datetext}>{item.time.slice(8, 10)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardtext} numberOfLines={2} ellipsizeMode="tail">{item.diary}</Text>
        </View>
    </TouchableOpacity>
);
  return (
    <View style={styles.container}>
      <View style={styles.toptext}>
        <Text style={styles.dateText}>
          {M} {Y} 
        </Text>
        <TouchableOpacity  onPress={() => setShow(!show)}>
          <Image source={require('../../assets/select.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}/>
      <View style={styles.flat} >
        <FlatList
          data={flatdata}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        {showCard&&<View style={{paddingVertical:0}} >
          <View  style={{height:40}}></View>
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
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#c3d59f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat:{
    flex:4,
    alignItems: 'center',
    
  },
  separator:{
    top:-20,
    height: 2,
    width:350,
    backgroundColor: '#3f5226',
    marginVertical:5, // 上下间距
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ab4622',

  },
  image:{
    tintColor: '#3f5226',
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
    backgroundColor:"#fff",
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
  cardtext:{
    color:"#3f5226"
  },
  date:{
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor:"#437C90",
    margin:10,
    padding:8,
  },
  datetext:{
    fontSize:18,
    color:"#fff",
  },
});
