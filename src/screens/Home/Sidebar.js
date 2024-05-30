import React, {act, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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

  useEffect(() => {
    try {
      auth.getUserProfile().then(res => {
        if (res.status === 1) {
          setUserData(res.user_details);
          if (res.user_details.image) {
            setImage1(BLOBURL + res.user_details.image);
          }
          setTotalPlayed(res.totalquizplayed);
        } else {
          Toast.show({type: 'error', text1: res.Backend_Error});
        }
      });
    } catch (err) {
      console.log('Error in Fetching User Profile', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
      });
    }
  }, [status]);

  async function logOut() {
    setLoggingOut(true);
    try {
      let response = await auth.logout();
      if (response.status === 1) {
        BasicServices.setJwt('').then(() => {
          AsyncStorage.removeItem('language').then(() => {
            navigation.reset({index: 0, routes: [{name: 'Splash'}]});
          });
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in Logging out', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
      });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Toast />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <Text style={{color: '#000'}}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image
            source={{uri: image1}}
            resizeMode="contain"
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewProfile', {
                  userData: userData,
                  totalPlayed: totalPlayed,
                })
              }>
              <Text style={styles.profileName}>{userData.name}</Text>
              <Text style={styles.profileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <MenuItem
          action={() => {
            navigation.navigate('dailyupdates');
          }}
          image={require('../../assets/img/dailyupdate.png')}
          text="Daily Updates"
        />
        <MenuItem
          action={() => {
            navigation.navigate('RulesRegulations');
          }}
          image={require('../../assets/img/rulesregulation.png')}
          text="Rules & Regulations"
        />
        <MenuItem
          action={() => {
            navigation.navigate('privacypolice');
          }}
          image={require('../../assets/img/privacypolicy.png')}
          text="Privacy Policy"
        />
        <MenuItem
        action={() => {
          navigation.navigate('study');
        }}
          image={require('../../assets/img/myexamimg.png')}
          text="My Exams"
          imageStyle={{width: 25, height: 25}}
        />
        <MenuItem
          action={() => {
            navigation.navigate('myhistory');
          }}
          image={require('../../assets/img/historyimg.png')}
          text="History"
        />
        <MenuItem
          action={() => {
            navigation.navigate('coursesplanhistory');
          }}
          image={require('../../assets/img/ebook.png')}
          text="Course Plan History"
        />
        <MenuItem
          action={() => {}}
          image={require('../../assets/img/audit.png')}
          text="Refer & Earn"
        />

        <MenuItem
          action={toggleOverlay}
          beingPerformmed={loggingOut}
          image={require('../../assets/img/logout.png')}
          text="Logout"
        />
      </ScrollView>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.logoutView}>
          <Text style={styles.welcomeText}>Do You Want To Log Out</Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Yes"
              color={'#eb1313'}
              titleStyle={{
                color: 'white',
                fontSize: 15,
                padding: 15,
                paddingHorizontal: 30,
              }}
              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                logOut().then(toggleOverlay);
              }}
            />
            <Button
              color={'#e6e3e8'}
              title="Cancel"
              buttonStyle={styles.logoutyesbutton}
              titleStyle={{color: 'black', fontSize: 15, padding: 15}}
              onPress={toggleOverlay}
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
