import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Image } from '@rneui/base';

const Header = ({
  title = 'Welcome',
  leftIcon,
  rightIcon,
  backgroundColor = '#fff ',
  titleColor = '#1F2937',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        {/* Left Icon */}
        {leftIcon ? (
          <TouchableOpacity
            onPress={leftIcon.onPress}
            style={styles.iconButton}
          >
            <Image
              source={leftIcon.source}
              style={[styles.icon, leftIcon.style]}
              tintColor={leftIcon.tintColor || '#1F2937'}
            />
          </TouchableOpacity>
        ) : <View style={styles.iconPlaceholder} />}

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: titleColor }]}>
            {title}
          </Text>
        </View>

        {/* Right Icon */}
        {rightIcon ? (
          <TouchableOpacity
            onPress={rightIcon.onPress}
            style={styles.iconButton}
          >
            <Image
              source={rightIcon.source}
              style={[styles.icon1, rightIcon.style]}
              tintColor={rightIcon.tintColor || '#000'}
            />
          </TouchableOpacity>
        ) : <View style={styles.iconPlaceholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 18,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
   icon1: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Header;
