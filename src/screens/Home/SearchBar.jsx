import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Share,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/Home.styles'

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.MainView}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.TouchImage}>
        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <Image
            source={require('../../assets/img/drawerr.png')}
            style={{height: 25, width: 25}}></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
         
        }}
        style={styles.SearchBar}>
        <TouchableOpacity style={{flex: 0.20,paddingHorizontal:5}}>
          <Image source={require('../../assets/img/search.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={styles.TextSearch}>Search for Exams</Text>
      </TouchableOpacity>
      <View style={styles.BellView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/img/notification.png')}
            style={{height: 25, width: 25}}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

