import WheelPickerExpo from 'react-native-wheel-picker-expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Month = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
const Year = '2023,2024'.split(',');
export default function App() {
    return (
      <View  style={styles.container}>
        <View style={styles.whel_container}>
          <WheelPickerExpo
            height={150}
            width={80}
            initialSelectedIndex={3}
            items={Year.map(name => ({ label: name, value: '' }))}
            selectedStyle={ {borderColor: '#437C90', borderWidth: 3 }}
            // onChange={({ item }) => setCity(item.label)}
            />
        </View>
        <View style={styles.whel_container}>         
          <WheelPickerExpo
          height={150}
          width={80}
          initialSelectedIndex={3}
          items={Month.map(name => ({ label: name, value: '' }))}
          selectedStyle={ {borderColor: '#437C90', borderWidth: 3 }}
          // onChange={({ item }) => setCity(item.label)}
          />
        </View> 
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical:0,
    width: 'auto',
    // height: 60,
    borderRadius: 10,
  },
  whel_container:{
    width: 100, // Adjust the width as needed
    alignItems: 'center',
    justifyContent: 'center',

  },
})