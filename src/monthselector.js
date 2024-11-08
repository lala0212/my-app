import WheelPickerExpo from 'react-native-wheel-picker-expo';
import React ,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {GetDiaryData} from './getdata.js';
const Month = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
const Month_num = '01,02,03,04,05,06,07,08,09,10,11,12'.split(',');

export default function App({Y,M,setY,setM,setShow,setModalVisible}) {
  const [Year, setYear] = useState([Y]);
  const [stmpM, setStmpM] = useState(M);
  const [stmpY, setStmpY] = useState(Y);
  useEffect(() => {
    const main = async () => {
      const datar = await GetDiaryData();
      if (datar !=""){
        const minYear = new Date(datar[0].time).getFullYear();
        setYear(Array.from({ length: Y - minYear + 1 }, (_, index) => minYear + index));
      }
    }
    main();
  }, []); 
  const okbtn = ()=>{
    setY(stmpY);
    setM(stmpM);
    setShow(false);
    setModalVisible(false)
  }
  return (
    <View  style={styles.container_top}>
      <View style={styles.container}>
        <View style={styles.whel_container}>         
          <WheelPickerExpo
          height={170}
          width={50}
          initialSelectedIndex={Month.indexOf(M)}
          items={Month.map(name => ({ label: name}))}
          selectedStyle={ {borderColor: '#c3d59f', borderWidth: 3 }}
          onChange={({ item }) => setStmpM(item.label)}
          />
        </View> 
        <View style={styles.whel_container}>
          <WheelPickerExpo
            height={170}
            width={60}
            initialSelectedIndex={Year.length-1}
            items={Year.map(name => ({ label: name}))}
            selectedStyle={ {borderColor: '#c3d59f', borderWidth: 3 }}
            onChange={({ item }) => setStmpY(item.label)}
            />
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#c3d59f'}]}
          onPress={() => {setShow(false),setModalVisible(false)}}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#3f5226' }]}
        onPress={() => okbtn()}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  container_top: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderColor: '#fff',
    paddingVertical:0,
    width: 'auto',
    // height: 60,
    borderRadius: 12,
  },
  whel_container:{
    width: 80, // Adjust the width as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    alignItems: 'center',
   
    // padding: 18,
    paddingVertical: 6,
    margin:8,
    marginTop:0,
    marginBottom:20,
    width:75,
    borderRadius: 8,
  },
  buttonText:{
    color: '#fff',
    fontSize: 16,
  }
})