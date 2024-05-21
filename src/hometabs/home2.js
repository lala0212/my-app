import React, { useEffect, useState,useRef } from 'react';
import {  StyleSheet,  View, Image, Text,TouchableOpacity} from 'react-native';
import Monthpicker from '../monthselector';
import moment from 'moment';
export default function App() {
  const currentY = moment().format('YYYY');
  const currentM = moment().format('MMM');
  const [Y, setY] = useState(currentY);
  const [show, setShow] = useState(false);
  const [M, setM] = useState(currentM);

  return (
    <View style={styles.container}>
      <View style={styles.toptext}>
        <Text style={styles.dateText}>
          {M} {Y} 
        </Text>
        <TouchableOpacity  onPress={() => setShow(!show)}>
          <Image source={require('../../assets/select.png')} style={styles.image} />
        </TouchableOpacity >
      </View>
      <View style={{top:200}}>
      {show&&<Monthpicker Y={Y}M={M} setY={setY} setM={setM} setShow={setShow}/>}
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
    justifyContent: 'flex-start',
  },
  toptext:{
    flexDirection: 'row',
    top: 40,

  },
  dateText:{
    fontSize: 16.5,
    fontWeight: 'bold',
    color: '#D96941',

  },
  image:{
    tintColor: '#3f5226',
    position: 'absolute',
    right: -23, // 调整偏右的位置，根据需要更改
    top: 6,
    width: 13, 
    height: 13,
  }
});
