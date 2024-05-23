import React, { useState, useContext} from 'react';
import { StyleSheet,View,Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Act from './hometabs/act'; // Corrected component names
import Home from './hometabs/home';
import Home2 from './hometabs/home2';
import Pin from './hometabs/pin';
import Setting from './hometabs/setting';
import { ThemeContext } from './themeContext';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { theme } = useContext(ThemeContext);
    const [selectedComponent, setSelectedComponent] = useState('Home');
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
                    backgroundColor:theme.lighttext,
                    borderRadius: 28,
                },
                headerShown: false,
            }}
        >   
            <Tab.Screen
            name={'Home'}
            component={selectedComponent === 'Home' ?  Home : Home2}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{alignItems:'center',justifyContent:'center',left:4}}>
                        <Image
                        source={selectedComponent === 'Home' ? require('../assets/list.png') : require('../assets/calendar.png')} // 根据当前选中的页面选择图标
                        resizeMode='contain'
                        style={{
                            width: 27,
                            height: 27,
                            tintColor: focused ? theme.darkgreen : '#748c94'
                        }}
                        />
                    </View>
                ),
                tabBarButton: (props) => (
                    <TouchableOpacity
                      {...props}
                      onPress={() => {
                        setSelectedComponent(selectedComponent === 'Home' ? 'Home2' : 'Home');
                        props.onPress();
                      }}
                    />
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
                            tintColor:focused?theme.darkgreen:'#748c94'

                        }}/>
                    </View>
                )
            }}/> 
            <Tab.Screen
                name="Blank"
                component={Home}
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
                            tintColor:focused?theme.darkgreen:'#748c94',

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
                            tintColor:focused?theme.darkgreen:'#748c94',

                        }}/>
                    </View>
                )
            }}/>
        </Tab.Navigator>
        
    );
}
export default Tabs;
