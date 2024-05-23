import React,{useState, useEffect,useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native';
import { GetDiaryData } from '../getdata';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../themeContext';
export default function App() {
  const [flatdata,setFlatdata] = useState([]);
  const [data,setData] = useState([]);
  const [mark,setMark] = useState([]);
  const { theme } = useContext(ThemeContext);
  useEffect(()=>{
    const main = async () => {
      const Data = await GetDiaryData(); // 获取日记数据
      setData(Data);
      setFlatdata(Data.filter(entry => entry.reflection_pick==true).reverse());
    }
    main();
  },[]);
  
  const pick = async (item) => {
    try {
      // Retrieve diary data from AsyncStorage
      const storedData = await AsyncStorage.getItem('diary');
      const diaryArray = JSON.parse(storedData) || [];
  
      // Find the index of the item in diaryArray
      const index = diaryArray.findIndex(entry => entry.id === item.id);
  
      if (index !== -1) {
        // Toggle reflection_pick property of the item
        diaryArray[index].reflection_pick = !diaryArray[index].reflection_pick;
  
        // Save the updated diary data back to AsyncStorage
        await AsyncStorage.setItem('diary', JSON.stringify(diaryArray));
  
        // Update the data state with the modified diary data
        setData([...diaryArray]);
  
        // Update the flatdata state by filtering and reversing the data
        setFlatdata(diaryArray.filter(entry => entry.reflection_pick).reverse());
      }
    } catch (error) {
      console.error('Error updating reflection_pick', error);
    }
  };
  
  
  const renderItem = ({ item }) => (
    <View style={[styles.card,{backgroundColor:theme.lighttext}]}>
      <Text style={[styles.text,{color:theme.darktext}]}>{item.diary}</Text>
      <TouchableOpacity onPress={() => pick(item)}>
        <Image
          source={require('../../assets/star.png')}
          style={[styles.image_icon, { tintColor: item.reflection_pick ? "#FFD050" : "#9d9d9d" }]}
        />
      </TouchableOpacity>
    </View>
  );
  
 

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={{flex:0.6}}></View>
      <View style={styles.top}>
        <Text style={[styles.texttop,{color:theme.darktext}]}>- KEEP IN MIND -</Text>
      </View>
      <View style={styles.flat}>
        <FlatList 
            data={flatdata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
      </View>
      <StatusBar style="auto"/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  texttop:{
    fontSize:20,
    fontWeight:"bold",
  },
  top:{
    padding:10,
    margin:10,
  },
  flat:{
    height:600,
  },
  card:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 330,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height:'auto',
    borderRadius: 10,
    marginBottom: 15
  },
  text:{
    fontSize:16,
    width:260,
  },
  image_icon:{
    alignItems: 'center',
    justifyContent: 'center',
    tintColor:"#9d9d9d",
    width:22,
    height:22,
},
});
