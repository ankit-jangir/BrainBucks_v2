import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Header = ({ title, leftIcon, rightIcon }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDrawerPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {leftIcon && (
          <TouchableOpacity onPress={leftIcon.onPress}>
            {leftIcon.type === 'image' ? (
              <Image source={leftIcon.source} style={styles.iconImage} />
            ) : (
              <Text style={styles.title}>{leftIcon.text}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={rightIcon.onPress}>
            {rightIcon.type === 'image' ? (
              <Image source={rightIcon.source} style={styles.iconImage} />
            ) : (
              <Text style={styles.iconText}>{rightIcon.text}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 70,
    borderBottomColor:'#EFEFEF',
    // justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth:1,
    
  },

  // header: {
  //   width: "100%",
  //   height: 70,
  //   alignItems: 'center',
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#EFEFEF"

  // },
  leftContainer: {
    marginLeft: 18,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    marginRight: 40,
  },
  title: {
    fontFamily:"WorkSans-SemiBold",
    fontSize:24,
    color:'#000'
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  iconText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Header;
