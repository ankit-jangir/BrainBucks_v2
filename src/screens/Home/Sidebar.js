import React, { act, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import styles from '../../styles/Sidebar.styles';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';

const Sidebar = ({ navigation }) => {
  const auth = new AuthenticationApiService();
  const [name, setName] = useState("User Name")
  const [phone, setPhone] = useState("Contact Number")
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    try {
      auth.getUserProfile().then((res) => {
        if (res.status === 1) {
          setName(res.user_details.name)
          setPhone(res.user_details.phone)
        } else {
          Toast.show({ type: "error", text1: res.Backend_Error })
        }
      })
    } catch (err) {
      console.log("Error in Fetching User Profile",err.message);
      Toast.show({
        type: "error",
        text1: "Something Went Wrong"
      })
    }
  }, [])

  async function logOut() {
    setLoggingOut(true)
    try {
      let response = await auth.logout()
      if (response.status === 1) {
        BasicServices.setJwt("").then(() => {
          navigation.reset({ index: 0, routes: [{ name: "signup" }] });
        })
      } else {
        Toast.show({
          type: "error",
          text1: response.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in Logging out",err.message);
      Toast.show({
        type: "error",
        text1: "Something Went Wrong"
      })
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Toast />

        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={{ color: '#000' }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image source={require('../../assets/img/boy.png')} resizeMode="contain" style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewProfile')}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <MenuItem
          image={require('../../assets/img/dailyupdate.png')}
          text="Daily Updates"
        />
        <MenuItem
          image={require('../../assets/img/rulesregulation.png')}
          text="Rules & Regulations"
        />
        <MenuItem
          image={require('../../assets/img/privacypolicy.png')}
          text="Privacy Policy"
        />
        <MenuItem
          image={require('../../assets/img/myexamimg.png')}
          text="My Exams"
          imageStyle={{ width: 25, height: 25 }}
        />
        <MenuItem
          image={require('../../assets/img/historyimg.png')}
          text="History"
        />
        <MenuItem
          image={require('../../assets/img/ebook.png')}
          text="Course Plan History"
        />
        <MenuItem
          image={require('../../assets/img/audit.png')}
          text="Refer & Earn"
        />

        <MenuItem
          action={logOut}
          beingPerformmed={loggingOut}
          image={require('../../assets/img/logout.png')}
          text="Logout"
        />
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ image, text, imageStyle, placeholder, action, beingPerformmed }) => {
  if(!action){
    action = ()=>{}
  }
  return(
  <TouchableOpacity onPress={() => { if (!beingPerformmed) { action() } }} style={styles.menuItem}>
    <View style={styles.menuItemIcon}>
      {placeholder ? <Text>**</Text> : <Image source={image} resizeMode="contain" style={[styles.menuItemImage, imageStyle]} />}
    </View>
    {beingPerformmed ? <ActivityIndicator style={styles.menuItemText} /> : <Text style={styles.menuItemText}>{text}</Text>}
  </TouchableOpacity>
);}


export default Sidebar;
