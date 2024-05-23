import React, { useState,useContext } from 'react';
import { TextInput, Button, Alert, StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { ThemeContext } from './themeContext';

const FeedbackForm = () => {
    const { theme } = useContext(ThemeContext);
    const [feedback, setFeedback] = useState('');

    const sendFeedback = () => {
        if(feedback.trim() === '') {
        Alert.alert('Error', 'Please enter your feedback.');
        return;
        }

    MailComposer.composeAsync({
      recipients: ['magen00212@gmail.com'], // 将电子邮箱替换为你要发送到的目标邮箱
      subject: 'Feedback',
      body: feedback,
    }).then(result => {
      if (result.status === 'sent') {
        // Alert.alert('Success', 'Feedback sent successfully!');
        setFeedback('');
      } else {
        Alert.alert('Error', 'Failed to send feedback. Please try again later.');
      }
    }).catch(error => {
    //   console.error('Error sending feedback:', error);
      Alert.alert('Error', 'An error occurred while sending feedback.');
    });
  };

  return (
    <>
    <TextInput
          style={[styles.input,{backgroundColor:theme.lighttext}]}
          placeholder="Enter your feedback"
          onChangeText={setFeedback}
          value={feedback}
        />
    <TouchableOpacity style={{ right:-295,top:-37}} onPress={sendFeedback}>
        <Image source={require('../assets/sent.png')} style={{ width:25, height:25,tintColor:theme.darktext}}>

        </Image>

    </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        paddingVertical:0,
        width: 'auto',
        height: 100,
        borderRadius: 25,
        fontSize: 18,
    },
})

export default FeedbackForm;
