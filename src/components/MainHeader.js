import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const MainHeader = ({ name, showBackButton = true, backIcon }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backButton}
            accessible={true}
            accessibilityLabel="Go Back"
          >
            <Image
              source={
                backIcon
                  ? backIcon
                  : require('../assets/img/backcopy.png') // default
              }
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{name}</Text>
        </View>

        {/* Invisible view to balance the back button space */}
        {showBackButton ? <View style={styles.fakeSpace} /> : <View style={{ width: 40 }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: '#000',
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  fakeSpace: {
    width: 40,
    height: 40,
  },
});

export default MainHeader;
