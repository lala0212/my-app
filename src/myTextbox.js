import React, { useState } from 'react';
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
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical:0,
    width: 'auto',
    height: 60,
    borderRadius: 28,
    fontSize: 25,
  },
});

export default MyTextInput;