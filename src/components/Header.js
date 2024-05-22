import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from '@rneui/base';

const Header = (props) => {
  const docsNavigate = () => {
    Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`);
  };

  const playgroundNavigate = () => {
    Linking.openURL(`https://@rneui/themed.js.org/#/${props.view}`);
  };

  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={
          <Image source={require('../assets/img/menu.png')} tintColor={"white"} style={{height:25,width:25}} />
        }
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={require('../assets/img/homedark.png')} tintColor={"white"} style={{height:25,width:25}} />
          </View>
        }
        centerComponent={{ text: 'Header', style: styles.heading }}
        containerStyle={styles.headerContainer} 
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#610ECD', 
    marginBottom: 10,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
