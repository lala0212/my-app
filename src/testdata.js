import AsyncStorage from '@react-native-async-storage/async-storage';
export const SaveTextToDatabase = async () => {
    const generateRandomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const generateRandomString = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    try {
      const testData = [];
      const startDate = new Date(2023, 5, 1); // 2023年6月1日
      const endDate = new Date(2024, 4, 31); // 2024年5月31日

      for (let i = 0; i < 100; i++) {
        const randomDate = generateRandomDate(startDate, endDate);
        const randomDiaryLength = Math.floor(Math.random() * 100) + 20; // 随机长度在20到120之间
        const randomReflectionLength = Math.floor(Math.random() * 100) + 20; // 随机长度在20到120之间
        const diary = generateRandomString(randomDiaryLength);
        const reflection = generateRandomString(randomReflectionLength);

        testData.push({
          id: Math.random(),
          time: randomDate,
          diary: diary,
          reflection: reflection,
          reflection_pick: (Math.random() < 0.1),
        });
      }
      // Sort the data by date
      testData.sort((a, b) => new Date(a.time) - new Date(b.time));

      // Save to AsyncStorage
      await AsyncStorage.setItem('diary', JSON.stringify(testData));
      console.log('Test data saved');
    } catch (error) {
      console.error('Error saving test data', error);
    }
  };

export const cleandata = async () => {
  await AsyncStorage.removeItem('diary');
  console.log('Data cleared');
};