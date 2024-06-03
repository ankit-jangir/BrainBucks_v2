import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text } from '../../utils/Translate';
import All from './All';
import Win from './Win';
import Lost from './Lost';
import Free from './Free';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MyHistory = ({ navigation }) => {

  const [order, setOrder] = useState(0)

  function changeOrder() {
    order === 1 ? setOrder(0) : setOrder(1)
  }


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginBottom: 5,
          borderColor: "lightgray",
          borderWidth: 0.2
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              style={{ height: 35, width: 35 }}
              source={require('../../assets/img/back.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>My History</Text>
        </View>
        <TouchableOpacity onPress={changeOrder}>
          {order
            ?
            <Image key={"caldown"} source={require('../../assets/img/calenderdown.png')} style={{ height: 40, width: 40 }} resizeMode='contain' />
            :
            <Image key={"calup"} source={require('../../assets/img/CalederUp.png')} style={{ height: 40, width: 40 }} resizeMode='contain' />

          }
        </TouchableOpacity>
      </View>
      <View style={styles.RView} >
        <Tab.Navigator style={{}} screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: { fontSize: 16, textTransform: "none", },
          tabBarStyle: { width: "100%", },
          tabBarIndicatorStyle: { backgroundColor: "#000000", },
        }} >
          <Tab.Screen style={{ fontSize: 17, fontFamily: 'WorkSans-Medium', }} name="All">{(props) => <All {...props} order={order}  />}</Tab.Screen>
          <Tab.Screen name="Win">{(props) => <Win {...props} order={order} />}</Tab.Screen>
          <Tab.Screen name="Lost">{(props) => <Lost {...props} order={order} />}</Tab.Screen>
          <Tab.Screen name="Free">{(props) => <Free {...props} order={order} />}</Tab.Screen>
        </Tab.Navigator>

      </View>

    </View>
  );
};

export default MyHistory;

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Work Sans"

  },
  RView: {
    flex: 1,
    margin: 0,
  },
});
