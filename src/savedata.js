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
            Reflection: "",
        };
        // test
        const testdata1 = {
            id: Math.random(),
            time: '2024-05-14',
            diary: "看電視看到動物紀錄片，覺得很有趣",
            Reflection: "我對生物有興趣(?",
        };
        const testdata2 = {
            id: Math.random(),
            time: '2024-05-16',
            diary: "跟高中同學吃午餐，很開心",
            Reflection: "好像很久沒有見以前的朋友，下次可以主動找他們吃飯",
        };
        const testdata3 = {
            id: Math.random(),
            time: '2024-05-17',
            diary: "睡到中午12.00",
            Reflection: "",
        };
        // test
        if (previoustext != null) {
        previoustext = JSON.parse(previoustext);
        await AsyncStorage.setItem('diary', JSON.stringify([...previoustext,todaytext,testdata1,testdata2,testdata3])); // 转换为字符串再保存
        // await AsyncStorage.setItem('diary', JSON.stringify([...previoustext,todaytext])); // 转换为字符串再保存
        console.log("Text saved to database:",todaytext);
        }
        else{
            await AsyncStorage.setItem('diary', JSON.stringify([todaytext,testdata1,testdata2,testdata3]));
            // await AsyncStorage.setItem('diary', JSON.stringify([todaytext]));
            console.log("Text saved to database:",todaytext); // 转换为字符串再保存
        }
       
                
        
    } catch (error) {
        console.log(error);
    }
};
