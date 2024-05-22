import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

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
          <Text style={{fontSize:21}}>{actionText}</Text>
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
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  Text1: {
    color: 'black',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:"center"
  },
  buttonS:{
    backgroundColor:"#a8f0bf",
   paddingStart:10,
   paddingEnd:10,
   padding:5,
    borderRadius:5,
    
  }
});
