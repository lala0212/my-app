import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // 确保导入 Alert
import moment from 'moment';
export const saveTextToDatabase = async (text) => {
    
    try {
        var previoustext = await AsyncStorage.getItem('diary');
        console.log("pre to database:",previoustext);
        const todaytext = {
            id: Math.random(),
            time: moment().format('YYYY-MM-DD'),
            diary: text,
            reflection: "",
            reflection_pick:false,
        };
        // test
        if (previoustext != null) {
        previoustext = JSON.parse(previoustext);
        await AsyncStorage.setItem('diary', JSON.stringify([...previoustext,todaytext])); // 转换为字符串再保存
        console.log("Text saved to database:",todaytext);
        }
        else{
            await AsyncStorage.setItem('diary', JSON.stringify([todaytext]));
            console.log("Text saved to database:",todaytext); // 转换为字符串再保存
        }
    } catch (error) {
        console.log(error);
    }
};
