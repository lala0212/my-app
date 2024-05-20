import AsyncStorage from '@react-native-async-storage/async-storage';
export const GetDiaryData = async () => {
    try {
      const data = await AsyncStorage.getItem('diary');
      if (data !== null) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }