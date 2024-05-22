import React ,{ useState,useEffect  } from 'react';
import { StyleSheet,ScrollView, Text, View,Image ,ImageBackground,TouchableOpacity} from 'react-native';

export default function App({data}){
    const [mark,setMark] = useState(true);
    // data.mark
    return(
    <View style={{top:-15}}>
        <ImageBackground source={require('../assets/BGlarge.png')} resizeMode="stretch" style={styles.image}>
            <View style={styles.card}>
                    <Text style={{fontSize:18}}>Note</Text>
                    <ScrollView style={styles.contain}>
                    <Text style={styles.text}>{data.diary}</Text>
                </ScrollView>
                <View style={styles.separator} />
                    <Text style={{fontSize:18,marginBottom:3}}>Reflection</Text>
                    <ScrollView style={styles.contain}>
                    <Text style={styles.text}>{data.reflection}</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={require('../assets/pencil.png')} style={[styles.image_icon,{right:0},{tintColor:"#9d9d9d"}]}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMark(!mark)}>
                    <Image source={require('../assets/star.png')} style={[styles.image_icon,{right:30},{tintColor:mark?"#FFD050":"#9d9d9d"}]}></Image>
                </TouchableOpacity>

            </View>
        </ImageBackground>
        
    </View>
    );
}

const styles = StyleSheet.create({
    contain:{
        width:298,
        height:40,
    },
    image: {
      width:350,
      height:188,
    },
    image_icon:{
        position:"absolute",
        top: -65,
        tintColor:"#9d9d9d",
        width:22,
        height:22,
    },
    text:{
        fontSize:16,
    },
    card:{
        justifyContent:'center',
        margin:25,  
        marginVertical:16,
    },
    separator:{
        top:0,
        height: 1,
        backgroundColor: '#9d9d9d', // 可以根据需要调整分隔线的颜色
        marginVertical:5, // 上下间距
        marginBottom:4,
    }
  });