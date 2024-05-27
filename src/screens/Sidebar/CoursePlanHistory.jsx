import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  RefreshControl,
  Text as BBText,
  TouchableOpacity,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();
import {ActivityIndicator} from 'react-native-paper';
import {Image} from 'react-native';
import {Text} from '../../utils/Translate';

export default function CoursePlanHistory({navigation}) {
  useEffect(() => {
    CoursePlanHistory();
  }, []);

  const [livequiz, setLivequiz] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [isData, setData] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
  };

  const CoursePlanHistory = async () => {
    setLoad(true);
    const myHeaders = new Headers();
    const token = await AsyncStorage.getItem('token');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://prerec.brainbucks.in/participant/buycourseplan/history',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('Response All Api>>>>>>>>>>', result);
        if (result.status == 1) {
          setLivequiz(result.transactions);
          setLoad(false);
        } else {
          setData(true);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('../../assets/img/back.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
              Rules
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/img/homedark.png')}
                tintColor={'balck'}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {load ? (
        <ActivityIndicator size={24} color={'#2188E7'} />
      ) : (
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          style={{flex: 1,backgroundColor:"white"}}>
          {livequiz.map(res => {
            // const momentDate = moment(parseInt(res.payment_datetime));
            // const formattedDate = momentDate.format('DD-MM-YYYY HH:mm:ss');

            return (
              <>
                <View
                  style={{
                    borderWidth: 0.3,
                    borderColor: '#d9d5ca',
                    margin: 12,
                    borderRadius: 10,
                    elevation: 10,
                    padding: 5,
                    backgroundColor:'white',
                  }}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: '#e3b51e',
                        fontSize: 21,
                        fontWeight: '600',
                      }}>
                      {res.course_name}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        Payment Date Time :
                      </Text>
                      <Text style={{color: 'gray'}}>
                        {res.registor_time}
                        {/* {new Date(parseInt(res.payment_datetime)).toLocaleString()} */}
                        {/* {formattedTime} */}
                        {/* {formattedDate} */}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        Expire Time:{' '}
                      </Text>
                      <Text style={{color: 'gray'}}>{res.expire_time}</Text>
                    </View>
                  </View>
                  <View style={{padding: 10}}>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        Amount:{' '}
                        <Text style={{color: 'gray'}}>{res.amount}</Text>{' '}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#e3b51e',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: '400',
                          }}>
                          Instructor Name:{' '}
                        </Text>{' '}
                        {res.instructor_name}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}
