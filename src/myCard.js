import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArcCard = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Svg style={styles.arc} width="100%" height="100%">
        <Path 
          d="M 20 0
            L 330 0
            Q 350 0, 350 20
            L 350 80
            Q 350 100, 330 100
            L 20 100
            Q 0 100, 0 80
            L 0 20
            Q 0 0, 20 0
          Z"
          fill="#fff" // 背景色
        />
      </Svg>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  arc: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: 20,
  },
});

export default ArcCard;
