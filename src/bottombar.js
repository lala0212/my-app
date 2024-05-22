import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet,Text,View,Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Act from './hometabs/act'; // Corrected component names
import Home from './hometabs/home';
import Home2 from './hometabs/home2';
import Pin from './hometabs/pin';
import Setting from './hometabs/setting';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [selectedComponent, setSelectedComponent] = useState('Home');
    const [popup, setpopup] = useState(true);
    const tc = useRef("");
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { position:"absolute",
                    bottom: 25,
                    left:20,
                    height:75,
                    right:20,
                    elevation: 0,
                    backgroundColor:'#ffffffff',
                    borderRadius: 28,
                    ...styles.shadow
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
            name={selectedComponent === 'Home' ? "Home" : "Home2"}
            component={selectedComponent === 'Home' ?  () => <Home/> : () => <Home2/>}
            options={{
                tabBarIcon: ({ focused }) => (
                <TouchableOpacity
                    onPress={() => {
                        setSelectedComponent(selectedComponent === 'Home' ? 'Home2' : 'Home');
                    }} // 根据当前选中的页面进行切换
                    activeOpacity={1}
                    style={{ alignItems: 'center', justifyContent: 'center', top: 0, left: 4 }}
                >
                    <Image
                    source={selectedComponent === 'Home' ? require('../assets/list.png') : require('../assets/calendar.png')} // 根据当前选中的页面选择图标
                    resizeMode='contain'
                    style={{
                        width: 27,
                        height: 27,
                        tintColor: focused ? '#3f5226' : '#748c94'
                    }}
                    />
                </TouchableOpacity>
                )
            }}
            />

            <Tab.Screen name="Pin" component={Pin} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                        <Image
                        source={require('../assets/pin.png')}
                        resizeMode='contain'
                        style={{
                            width:32,
                            height:32,
                            tintColor:focused?'#3f5226':'#748c94'

                        }}/>
                    </View>
                )
            }}/> 
            <Tab.Screen
                name="Blank"
                component={selectedComponent === 'Home' ?  () => <Home/> : () => <Home2/>}
                options={{
                    tabBarButton: () => <View style={{ flex: 1 }} />, // 这里使用一个空的 View 作为占位符
                }}
            />
           
            <Tab.Screen name="Act" component={Act} options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top:1}}>
                        <Image
                        source={require('../assets/check.png')}
                        resizeMode='contain'
                        style={{
                            width:32,
                            height:32,
                            tintColor:focused?'#3f5226':'#748c94',

                        }}/>
                    </View>
                )
            }}/> 
            <Tab.Screen name="Set" component={Setting}  options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center',justifyContent:'center',top:1,right:3}}>
                        <Image
                        source={require('../assets/setting.png')}
                        resizeMode='contain'
                        style={{
                            width:28,
                            height:28,
                            tintColor:focused?'#3f5226':'#748c94',

                        }}/>
                    </View>
                )
            }}/>
        </Tab.Navigator>
        
    );
}

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
export default Tabs;
