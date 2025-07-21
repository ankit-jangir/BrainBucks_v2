import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/Home.styles'


export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.mainHeader}>
      {/* Hamburger Icon */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.iconWrapper}>
        <Image
          source={require('../../assets/img/burgerbar.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Search Box */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ExamSearchScreen')}
        style={styles.searchBox}>
        <Image
          source={require('../../assets/img/search.png')}
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceholder}>Search for Exams</Text>
      </TouchableOpacity>

      {/* Bell Icon with Notification */}
      <TouchableOpacity onPress={() => navigation.navigate('wallet')}>
        <View style={styles.bellWrapper}>
          <Image
            source={require('../../assets/img/wallet.png')}
            style={styles.bellIcon}
          />
         
        </View>
      </TouchableOpacity>
    </View>
  );
}


