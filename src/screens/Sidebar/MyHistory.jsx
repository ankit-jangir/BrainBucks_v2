import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text} from '../../utils/Translate';
import All from './All';
import Win from './Win';
import Lost from './Lost';
import Free from './Free';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MyHistory = ({navigation}) => {
  const [order, setOrder] = useState(0);

  function changeOrder() {
    order === 1 ? setOrder(0) : setOrder(1);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginBottom: 5,
          borderColor: 'lightgray',
          borderWidth: 0.2,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../../assets/img/backq.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.heading,{fontSize:18}]}>My History</Text>
        </View>
        <TouchableOpacity onPress={changeOrder}>
          {order ? (
            <Image
              key={'caldown'}
              source={require('../../assets/img/calenderdown.png')}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          ) : (
            <Image
              key={'calup'}
              source={require('../../assets/img/CalederUp.png')}
              style={{height: 40, width: 40}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.RView}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {fontSize: 16, textTransform: 'none'},
            tabBarStyle: {width: '100%'},
            tabBarIndicatorStyle: {backgroundColor: '#000000'},
            lazy: false,
            animationEnabled: false,
            tabBarPressColor: 'none',
          }}>
          <Tab.Screen
            key={'allhistory'}
            style={{fontSize: 17, fontFamily: 'WorkSans-Medium'}}
            name="All">
            {props => <All key="allhistorytab" {...props} order={order} />}
          </Tab.Screen>
          <Tab.Screen key={'winhistory'} name="Won">
            {props => <Win key="winhistorytab" {...props} order={order} />}
          </Tab.Screen>
          <Tab.Screen key={'losthistory'} name="Lost">
            {props => <Lost key="losthistorytab" {...props} order={order} />}
          </Tab.Screen>
          <Tab.Screen key={'freehistory'} name="Free">
            {props => <Free key="freehistorytab" {...props} order={order} />}
          </Tab.Screen>
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
    fontFamily: 'Work Sans',
  },
  RView: {
    flex: 1,
    margin: 0,
  },
});
