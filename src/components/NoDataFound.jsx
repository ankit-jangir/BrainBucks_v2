import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from '../utils/Translate';

const NoDataFound = ({message, action, actionText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/img/NoData.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.Text1}>{message}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.buttonS} onPress={action}>
          <Text style={styles.buttonText}>{actionText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animationContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 170,
  },
  Text1: {
    color: 'black',
    marginVertical:10,
    fontSize:22
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:"center"
  },
  buttonS:{
   backgroundColor:"#a8f0bf",
   width:150,
   padding:7,
  borderRadius:10,
  },
  buttonText:{
    color:"black",
    fontSize:17,
    textAlign:"center",
  }
});
