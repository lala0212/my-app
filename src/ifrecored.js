import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const checkIfClickedToday = async () => {
    try {
      const data = await AsyncStorage.getItem('diary');
      const currentDate = moment().format('YYYY-MM-DD');
      const parsedData = JSON.parse(data);
      const isDatePresent = parsedData.filter(item => item.time ===currentDate);
      if (isDatePresent !='') {
        return true;
      }else{
        return false;
      }
    } catch (error) {

      console.log(error);
      return false;
    }
  };



  