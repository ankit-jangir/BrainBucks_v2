import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReferralCode} from '../../hooks/useReferralListener';

export default function SignupReferral({navigation, route}) {
  const [referralCode1, setReferralCode] = useState(route.params?.referralCode);
  const {phone, otp, userType, referralCode,name,description} = route.params;

  useEffect(() => {
    console.log('SignupName params:', route.params);
  }, []);

  useEffect(() => {
    const getReferralCodeAsync = async () => {
      try {
        let code = route.params?.referralCode;
        if (code) {
          setReferralCode(code);
          await AsyncStorage.setItem('referralCode', code);
          console.log('Referral code from params:', code);
        } else {
          code = await getReferralCode();
          if (code) {
            setReferralCode(code);
            await AsyncStorage.setItem('referralCode', code);
            console.log('Referral code from useReferralListener:', code);
          } else {
            const storedCode = await AsyncStorage.getItem('referralCode');
            if (storedCode) {
              setReferralCode(storedCode);
              console.log('Referral code from AsyncStorage:', storedCode);
            } else {
              console.log('No referral code found');
            }
          }
        }
      } catch (err) {
        console.log('Error fetching referral code:', err.message);
      }
    };
    getReferralCodeAsync();
  }, [route.params?.referralCode1]);

  const next = () => {
    console.log('Navigating to SignupGender with referralCode:', referralCode);
    navigation.navigate('SignupGender', {
      phone,
      otp,
      userType,
      referCode: referralCode1, // 👈 rename if needed
      name,
      description,
    });
  };

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
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.topSection}>
              <TouchableOpacity
                onPress={() => navigation?.goBack()}
                style={styles.backButton}>
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
                  Looks like you’ve got a{'\n'}referral code!
                </Text>
              </View>
              <View style={styles.imageWrapper}>
                <Image
                  source={require('../../assets/img/wlname.png')}
                  resizeMode="stretch"
                  style={styles.welcomeImage}
                />
              </View>
            </View>
            <View style={styles.formSection}>
              <Text style={styles.title}>Let’s use your referral</Text>
              <Text style={styles.label}>Referral Code</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={setReferralCode}
                  value={referralCode1}
                  placeholder="Enter referral code"
                  placeholderTextColor={'#8A8C94'}
                  style={styles.input}
                />
              </View>
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
    marginTop: 10,
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
    fontSize: 29,
    fontFamily: 'WorkSans-Bold',
    color: '#8A8C94',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
    height: 150,
  },
});
