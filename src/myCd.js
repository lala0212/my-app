import React, { useState, useEffect,useContext} from 'react';
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './themeContext';
export default function App({ data }) {
    const { theme } = useContext(ThemeContext);
    const [mark, setMark] = useState(data.reflection_pick);
    const [reflection, setReflection] = useState(data.reflection);
    const [modalVisible, setModalVisible] = useState(false);
    const [newReflection, setNewReflection] = useState(reflection);

    useEffect(() => {
        setMark(data.reflection_pick);
        setReflection(data.reflection);
    }, [data]);

    const pick = async () => {
        try {
            const storedData = await AsyncStorage.getItem('diary');
            const diaryArray = JSON.parse(storedData) || [];

            const updatedDiaryArray = diaryArray.map(entry => {
                if (entry.id === data.id) {
                    return { ...entry, reflection_pick: !entry.reflection_pick };
                }
                return entry;
            });

            // 保存更新后的数据回到 AsyncStorage
            await AsyncStorage.setItem('diary', JSON.stringify(updatedDiaryArray));

            // 更新本地状态
            setMark(!mark);
        } catch (error) {
            console.error('Error updating reflection_pick', error);
        }
    };

    const saveReflection = async () => {
        try {
            const storedData = await AsyncStorage.getItem('diary');
            const diaryArray = JSON.parse(storedData) || [];

            const updatedDiaryArray = diaryArray.map(entry => {
                if (entry.id === data.id) {
                    return { ...entry, reflection: newReflection };
                }
                return entry;
            });

            // 保存更新后的数据回到 AsyncStorage
            await AsyncStorage.setItem('diary', JSON.stringify(updatedDiaryArray));

            // 更新本地状态
            setReflection(newReflection);
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating reflection', error);
        }
    };

    return (
        <View style={{ top: -15 }}>
            <ImageBackground source={require('../assets/BGlarge.png')} resizeMode="stretch" style={styles.image}>
                <View style={styles.card}>
                    <Text style={{ fontSize: 18 }}>Note</Text>
                    <ScrollView style={styles.contain} showsVerticalScrollIndicator={false}>
                        <Text style={styles.text}>{data.diary}</Text>
                    </ScrollView>
                    <View style={[styles.separator,{backgroundColor: '#9d9d9d'}]} />
                    <Text style={{ fontSize: 18, marginBottom: 3 }}>Reflection</Text>
                    <ScrollView style={styles.contain} showsVerticalScrollIndicator={false}>
                        <Text style={styles.text}>{reflection}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={() => pick()} activeOpacity={1}>
                        <Image source={require('../assets/star.png')} style={[styles.image_icon, { right: 30 }, { tintColor: mark ? "#FFD050" : "#9d9d9d" }]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={require('../assets/pencil.png')} style={[styles.image_icon, { right: 0 }, { tintColor: "#9d9d9d" }]}></Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >  
                <View style={{backgroundColor:'#000',width:400,height:800,opacity:0.5}}>
                
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >   
                <View style={styles.modalView}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>- Reflection -</Text>
                    <TextInput
                        style={[styles.input]}
                        value={newReflection}
                        onChangeText={setNewReflection}
                        multiline
                    />
                    <View style={{flexDirection:'row', alignContent:"space-around"}}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <View style={[styles.btn,{backgroundColor:theme.darkblue}]}>
                                <Text style={{fontSize:18,color:"#fff",fontWeight:"500"}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={saveReflection}>
                            <View style={[styles.btn,{backgroundColor:theme.darkblue}]}>
                                <Text style={{fontSize:18,color:"#fff",fontWeight:"500"}}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        width: 298,
        height: 40,
    },
    image: {
        width: 350,
        height: 188,
    },
    image_icon: {
        position: "absolute",
        top: -65,
        width: 22,
        height: 22,
    },
    text: {
        fontSize: 16,
    },
    card: {
        justifyContent: 'center',
        margin: 25,
        marginVertical: 16,
    },
    separator: {
        top: 0,
        height: 2.5,
        marginVertical: 5, // 上下间距
        marginBottom: 4,
    },
    modalView: {
        top:200,
        margin: 40,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 30,
        alignItems: "center",
    },
    input: {
        fontSize:20,
        height: 100,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    btn:{
        padding: 10,
        paddingVertical:6,
        marginHorizontal:15,
        borderRadius: 10,
    }
});
