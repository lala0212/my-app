import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const MyTextInput = ({ text, setText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 25,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical:0,
    width: 'auto',
    height: 56,
    borderRadius: 28,
    fontSize: 20,
  },
});

export default MyTextInput;