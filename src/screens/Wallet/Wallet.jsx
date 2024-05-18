import {StyleSheet, Text, View, Linking} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const Wallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container11}>
        <Header view="someView" />
      </View>
      <View style={styles.container1}>
        <LinearGradient
          style={[{width: '100%', borderRadius: 10}]}
          colors={['#E34F4F', '#D64A7B', '#C143BC']}>
          <View style={styles.containerImg1}>
            <View>
            <Text>dsa</Text>
            <Text></Text>
            </View>

            <View>
            <Text>dasd</Text>
            <Text></Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container11: {
    height: 110,
  },
  container1:{
 padding:8
  },
  containerImg1:{
    justifyContent:"space-between",
    flexDirection:"row"
  }
});
