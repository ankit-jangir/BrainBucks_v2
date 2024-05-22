import React, {useEffect, useState} from 'react';
import {
  View,
  Text ,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function FreePdf({navigation, getstudy}) {
  
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
      onPress={() =>
        navigation.navigate('QuestionPaperList',)
      }
      style={{
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 35,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0.18,
            backgroundColor: '#EFEFEF',
            borderRadius: 100,
          }}>
          {/* <Image source={{uri :props.item.logo}} resizeMode='contain' style={{width:25,height:25}} /> */}
          <Image
            source={require('../../assets/img/banner.png')}
            style={{width: 50, height: 50, borderRadius: 25}}></Image>
        </View>
        <View
          style={{
            flex: 0.65,
            width: '100%',
            height: 60,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 20,
              paddingLeft: 10,
            }}>
            name
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Text
              style={{
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
                color: '#7E7E7E',
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
                color: '#D92828',
                paddingHorizontal: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
                color: '#7E7E7E',
              }}>
              PDFs
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Text>xdfcgvhbjn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
      </View>
    </>
  );
}
