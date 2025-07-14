import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import {ColorsConstant} from '../../constants/Colors.constant';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function SignupName({navigation, route}) {
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState();
const referralCode = route.params?.referCode;
  useEffect(() => {
    console.log('SignupName params:', route.params);
  }, []);

  async function next() {
    if (!name || name.length < 1) {
      setErrorMessage('Please Enter Your Name');
      return;
    }

    setErrorMessage(null);
    navigation.navigate('SignupReferral', {
      ...route.params,
      name: name,
      referCode: referralCode 
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={ColorsConstant.Theme}
      />
      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.topSection}>
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles.backButton}
              accessible={true}
              accessibilityLabel="Go Back">
              <Image
                source={require('../../assets/img/backcopy.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <View style={styles.welcomeRow}>
                <Text style={styles.welcomeText}>Welcome{'\n'}Buddy 👋</Text>
                <Image
                  source={require('../../assets/img/arrowtoright.png')}
                  resizeMode="contain"
                  style={styles.arrowIcon}
                />
              </View>

              <Text style={styles.subText}>
                Looks like you are{'\n'}new to our Family
              </Text>
            </View>

            {/* Fixed Image at Bottom */}
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/img/wlname.png')}
                resizeMode="stretch"
                style={styles.welcomeImage}
              />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.title}>Let’s know each other</Text>

            <Text style={styles.label}>My name is</Text>
            <View
              style={[
                styles.inputContainer,
                errorMessage && {borderColor: 'red', borderWidth: 1},
              ]}>
              <TextInput
                onChangeText={value => setName(value)}
                value={name}
                placeholder="Ex. Rahul Sharma"
                placeholderTextColor={'#8A8C94'}
                style={styles.input}
              />
            </View>
            <Text style={{color:'#A5A5A5',textAlign:'right',fontFamily: 'WorkSans',}}>0/50</Text>
            {errorMessage && (
              <Text style={styles.errorMsg}>*{errorMessage}</Text>
            )}

            <TouchableOpacity onPress={next} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsConstant.White,
  },
  topSection: {
    backgroundColor: ColorsConstant.Theme,
    paddingTop: 2,
    height: 330,
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: '#9856EB',
    marginLeft: 20,
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: '#fff',
  },
  headerContent: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
  },
  welcomeText: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 30,
    textAlign: 'left',
    color: ColorsConstant.White,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: ColorsConstant.White,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: ColorsConstant.White,
    marginTop: 20,
  },
  formSection: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'WorkSans-Bold',
    color: '#8A8C94',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
     fontFamily: 'WorkSans',
    color: '#8A8C94',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: '#000',
     fontFamily: 'WorkSans',

  },
  errorMsg: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  nextButton: {
    backgroundColor: ColorsConstant.Theme,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  nextButtonText: {
    color: ColorsConstant.White,
    fontSize: 16,
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  welcomeImage: {
    width: '100%',
    height: 150, // adjust this height as per design
  },
});
