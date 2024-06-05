import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import {ColorsConstant} from '../../constants/Colors.constant';

export default function WinnerBoard({navigation, modelData}) {
  useEffect(() => {
    setData(modelData);
  }, []);

  const data = [
    {
      name: 'Yogesh Jangid',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Chetan Jangid',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Sunil Malhotra',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Sunil Malhotra',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Sunil Malhotra',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Sunil ',
      image: require('../../assets/img/myimage.jpg'),

      que: '09',
      tque: 10,
      time: '05:45',
    },
    {
      name: 'Sunil ',
      image: require('../../assets/img/myimage.jpg'),
      que: '09',
      tque: 10,
      time: '05:45',
    },
  ];
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff', marginTop: 10}}>
        <FlatList
          data={data}
          //renderItem={(props) => <Particpantsdata {...props} navigation={navigation} />}
          renderItem={item => {
              <View style={styles.Container}>
              <TouchableOpacity style={styles.touch}>
                <Text style={styles.TextIn}>ytr.</Text>
                <View style={styles.imgView}>
                  <Image
                    source={{uri: item.image}}
                    resizeMode="contain"
                    style={styles.img}
                  />{' '}
                </View>

                <View style={styles.TotView}>
                  <Text style={styles.TextTo}>uyytfv</Text>
                  <View style={styles.tymView}>
                    <Text style={styles.textTym}>
                      00/99
                    </Text>
                    <Text style={[styles.textTym, {color: '#367CFF'}]}>
                     -09876r Sec.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    Container: {
      width: '100%',
      height: 80,
      paddingHorizontal: 10,
      marginTop: 20,
    },
    touch: {
      flex: 1,
      backgroundColor: ColorsConstant.White,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderWidth: 1,
      borderColor: ColorsConstant.LightGray,
      borderRadius: 10,
    },
    TextIn: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 22,
    },
    imgView: {
      width: 60,
      height: 60,
      borderRadius: 100,
      flex: 0.25,
    },
    img: {
      width: 60,
      height: 60,
      borderRadius: 100,
    },
    TotView: {
      width: 65,
      height: 65,
      flex: 0.65,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    TextTo: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 20,
    },
    tymView: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    textTym: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: ColorsConstant.GreenColor,
    },
  });
