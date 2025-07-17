import React, {act, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import styles from '../../styles/Sidebar.styles';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Overlay} from '@rneui/themed';
import {Button} from '../../utils/Translate';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {BLOBURL} from '../../config/urls';
import ChatSockService from '../../services/api/ChatSockService';

const Sidebar = ({navigation}) => {
  const auth = new AuthenticationApiService();
  const [userData, setUserData] = useState({
    name: 'User Name',
  });
  const [loggingOut, setLoggingOut] = useState(false);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [visible, setVisible] = useState(false);
  const [image1, setImage1] = useState(
    'https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png',
  );

  const status = useDrawerStatus();

  function toggleOverlay() {
    setVisible(!visible);
  }

  async function logOut() {
    setLoggingOut(true);
    try {
      let response = await auth.logout();
      if (response.status === 1) {
        BasicServices.setJwt('').then(() => {
          AsyncStorage.removeItem('language').then(() => {
            toggleOverlay();
            ChatSockService.disconnect();
          });
        });
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in Logging out', err.message);
    } finally {
      navigation.reset({index: 0, routes: [{name: 'Splash'}]});
      setLoggingOut(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Toast /> */}
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <Image
              source={require('../../assets/img/wrong.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <MenuItem
          action={() => {
            navigation.navigate('saved'), navigation.closeDrawer();
          }}
          image={require('../../assets/img/heart.png')}
          text="My Exams"
        />
        <MenuItem
          action={() => {
            navigation.closeDrawer();
            navigation.navigate('reels');
          }}
          image={require('../../assets/img/resume.png')}
          text="Brain Boosters"
        />

        <MenuItem
          action={() => {
            navigation.navigate('myhistory');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/historyimg.png')}
          text="History"
        />
        <MenuItem
          action={() => {
            navigation.navigate('dailyupdates');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/dailyupdate.png')}
          text="Daily Updates"
        />
        <MenuItem
          action={() => {
            navigation.navigate('RulesRegulations');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/rulesregulation.png')}
          text="Rules & Regulations"
        />
        <MenuItem
          action={() => {
            navigation.navigate('wallet');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/privacypolicy.png')}
          text="Refer Earn"
        />
        <MenuItem
          action={() => {
            navigation.navigate('privacypolice');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/privacypolicy.png')}
          text="Privacy Policy"
        />




       <MenuItem
          action={() => {
            navigation.navigate('VirtualRooms');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/privacypolicy.png')}
          text="Virtual Rooms"
        /> 
        {/* <MenuItem
          action={() => {
            navigation.navigate('Study');
          }}
          image={require('../../assets/img/myexamimg.png')}
          text="My Exams"
          imageStyle={{ width: 25, height: 25 }}
        /> */}

        {/* <MenuItem
          action={() => {
            navigation.navigate('coursesplanhistory');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/ebook.png')}
          text="Course Plan History"
        /> */}
        {/* <MenuItem
          action={() => { }}
          image={require('../../assets/img/audit.png')}
          text="Refer & Earn"
        /> */}
        <MenuItem
          action={() => {
            navigation.navigate('CustomerSupport');
            navigation.closeDrawer();
          }}
          image={require('../../assets/img/support.png')}
          text="Help & Support"
        />

        <MenuItem
          action={toggleOverlay}
          beingPerformmed={loggingOut}
          image={require('../../assets/img/logout.png')}
          text="Logout"
        />
      </ScrollView>
     <Overlay
  isVisible={visible}
  onBackdropPress={toggleOverlay}
  overlayStyle={{
    borderRadius: 20,
    padding: 25,
    width: '85%',
    backgroundColor: '#fff',
    elevation: 10,
  }}>
  <View style={{alignItems: 'center'}}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'WorkSans-SemiBold',
      }}>
      Are you sure you want to log out?
    </Text>

    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 15}}>
      <Button
        title="Yes, Logout"
        onPress={logOut}
        buttonStyle={{
          backgroundColor: '#eb1313',
          paddingHorizontal: 25,
          paddingVertical: 12,
          borderRadius: 10,
        }}
        titleStyle={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}
      />
      <Button
        title="Cancel"
        onPress={toggleOverlay}
        buttonStyle={{
          backgroundColor: '#e6e3e8',
          paddingHorizontal: 25,
          paddingVertical: 12,
          borderRadius: 10,
        }}
        titleStyle={{fontSize: 15, color: '#000'}}
      />
    </View>
  </View>
</Overlay>

    </View>
  );
};

const MenuItem = ({
  image,
  text,
  imageStyle,
  placeholder,
  action,
  beingPerformmed,
}) => {
  if (!action) {
    action = () => {};
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (!beingPerformmed) {
          action();
        }
      }}
      style={styles.menuItem}>
      <View style={styles.menuItemIcon}>
        {placeholder ? (
          <Text>**</Text>
        ) : (
          <Image
            source={image}
            resizeMode="contain"
            tintColor={'#7e7e7e'}
            style={[styles.menuItemImage, imageStyle]}
          />
        )}
      </View>
      {beingPerformmed ? (
        <ActivityIndicator style={styles.menuItemText} />
      ) : (
        <Text style={styles.menuItemText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Sidebar;
