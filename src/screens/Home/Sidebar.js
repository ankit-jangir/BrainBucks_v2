import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import styles from '../../styles/Sidebar.styles';

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={{color:'#000'}}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image source={require('../../assets/img/boy.png')} resizeMode="contain" style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewProfile')}>
            <Text style={styles.profileName}>sonu</Text>
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
          image={require('../../assets/img/logout.png')} 
          text="Logout" 
        />
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ image, text, imageStyle, placeholder }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemIcon}>
      {placeholder ? <Text>**</Text> : <Image source={image} resizeMode="contain" style={[styles.menuItemImage, imageStyle]} />}
    </View>
    <Text style={styles.menuItemText}>{text}</Text>
  </TouchableOpacity>
);


export default Sidebar;
