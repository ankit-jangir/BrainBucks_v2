import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '../../utils/Translate';
import All from './All';
import Win from './Win';
import Lost from './Lost';
import Free from './Free';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const MyHistory = ({navigation}) => {

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          marginBottom: 5,
          borderColor:"lightgray",
          borderWidth:0.2
        }}>
        <View>
          <Image
            source={require('../../assets/img/menu.png')}
            tintColor={'black'}
            style={{height: 25, width: 25}}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View>
          <Text style={styles.heading}>My History</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/img/homedark.png')}
            tintColor={'balck'}
            style={{height: 25, width: 25}}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
      <View style={styles.RView} >
      <Tab.Navigator style={{}} screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarLabelStyle: { fontSize: 16, textTransform: "none", },
        tabBarStyle: { width: "100%", },
        tabBarIndicatorStyle: { backgroundColor: "#000000", },
      }} >
        <Tab.Screen style={{fontSize:17}} name="All">{(props) => <All/>}</Tab.Screen>
        <Tab.Screen name="Win">{(props) => <Win/>}</Tab.Screen>
        <Tab.Screen name="Lost">{(props) => <Lost/>}</Tab.Screen>
        <Tab.Screen name="Free">{(props) => <Free/>}</Tab.Screen>

      </Tab.Navigator>
      <Image source={require('../../assets/img/CalederUp.png')} style={{height:20,width:20}}/>

    </View>

    </View>
  );
};

export default MyHistory;

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  RView: {
    flex: 1,
    margin:0,
  },
});
