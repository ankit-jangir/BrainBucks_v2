import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Share,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Home.styles'

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.MainView}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.TouchImage}>
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <Image
            source={require('../../assets/img/drawerr.png')}
            style={{ height: 25, width: 25 }}></Image>
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <Image
          source={require('../../assets/img/bbcolorlogo.png')}
          style={{width:140, height:30, objectFit:'contain'}}></Image>
      </View>
      <View style={styles.BellView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('wallet')}
          style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/img/walletblack.png')}
            style={{ height: 25, width: 25 }}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

