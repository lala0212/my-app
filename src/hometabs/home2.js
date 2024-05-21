import React, { useEffect, useState,useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Monthpicker from '../monthselector';

export default function App() {
  return (
    <View style={styles.container}>
      <Monthpicker/>
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
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#437C90',
    backgroundColor: '#437C90',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnx: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  btnText: {
    fontSize: 40,
    color:'#fff',
  },
  listItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height:'auto',
    borderRadius: 10,
    marginBottom: 15
  }
});
