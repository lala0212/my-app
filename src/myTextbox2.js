import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const AddTextInput = ({ text, setText }) => {
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
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical:0,
    width: 350,
    height: 150,
    borderRadius: 28,
    fontSize: 25,
  },
});

export default AddTextInput;