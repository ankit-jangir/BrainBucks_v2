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
            source={require('../assets/drawerr.png')}
            style={{height: 25, width: 25}}></Image>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}
        style={styles.SearchBar}>
        <TouchableOpacity style={{flex: 0.15}}>
          <Image source={require('../assets/search.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <TextInput style={styles.TextSearch}  placeholder="Search for Exams" placeholderTextColor={'#7E7E7E'}></TextInput>
      </TouchableOpacity>

      <View style={styles.ShareView}>
        <TouchableOpacity onPress={() => Url()} style={{alignItems: 'center'}}>
          {/* <AntDesign name="sharealt" size={24} color={ColorsConstant.GrayyColor} /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.BellView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/notification.png')}
            style={{height: 25, width: 25}}></Image>
          {/* <FontAwesome5 name="bell" size={25} color={ColorsConstant.GrayyColor} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

