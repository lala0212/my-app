import React, { useEffect } from 'react';
import { StyleSheet,Text,View,Image, TouchableOpacity} from 'react-native';
import {saveTextToDatabase} from './savedata';
import {checkIfClickedToday} from './ifrecored';
const CustomTabBarButton = ({popup, setpopup,text, setText,check}) => {

    const handlePressOut=()=>{
      if(!check){
        if (popup){
          saveTextToDatabase(text);
          console.log("btn popup","save");
          setText("");
        }
        setpopup(!popup);
    }
    };
  
    const buttonColor = (!check&&!popup) ?'#ab4622':'#4BAA6A';
  
    return (
      <TouchableOpacity
        style={{
          top: -25,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: buttonColor,
            ...styles.shadow,
            justifyContent: 'center', // 垂直居中
            alignItems: 'center', // 水平居中
        }}>
            <Image
            source={(!check&&!popup)?require('../assets/pen.png'):require('../assets/check2.png') } // 根据当前选中的页面选择图标
            resizeMode='contain'
            style={{
            width: 28,
            height: 28,
            tintColor: '#fff'
          }}
        />
        </View>
      </TouchableOpacity>
    );
  };

  const styles =StyleSheet.create({
    shadow:{
        shadowColor:'#7f5df0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})

export default CustomTabBarButton;