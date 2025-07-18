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
  Platform,
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import {ColorsConstant} from '../../constants/Colors.constant';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

export default function SignupName({navigation, route}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const referralCode = route.params?.referCode;

  useEffect(() => {
    console.log('SignupName params:', route.params);
  }, []);

  const next = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your full name to proceed.');
      return;
    }

     if (!description.trim()) {
      setErrorMessage('Please description fill .');
      return;
    }

    setErrorMessage(null);
    navigation.navigate('SignupReferral', {
      ...route.params,
      name,
      description,
      referCode: referralCode,
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
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <View style={styles.container}>
            {/* Top Section */}
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
                <Text style={styles.welcomeText}>Welcome Buddy 👋</Text>
                <Text style={styles.subText}>
                  Let's get started with a few quick details
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

            {/* Form Section */}
            <View style={styles.formSection}>
              <Text style={styles.title}>Let’s know each other</Text>

              {/* Name Input */}
              <Text style={styles.label}>My name is</Text>
              <View
                style={[
                  styles.inputContainer,
                  errorMessage && {borderColor: 'red'},
                ]}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex. Rahul Sharma"
                  placeholderTextColor="#B0B0B0"
                  style={styles.input}
                  maxLength={50}
                />
              </View>
              {errorMessage && (
                <Text style={styles.errorMsg}>* {errorMessage}</Text>
              )}

              {/* Description Input */}
              <Text style={[styles.label, {marginTop: 20}]}>A Short Description About You</Text>
              <View style={[styles.inputContainer, {height: 120, paddingVertical: 10}]}>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Tell us something interesting about yourself..."
                  placeholderTextColor="#B0B0B0"
                  style={[styles.input, {height: '100%', textAlignVertical: 'top'}]}
                  multiline
                  numberOfLines={5}
                  maxLength={150}
                />
              </View>
              <Text style={styles.charCount}>
                {description?.length || 0}/150 characters
              </Text>

              {/* Next Button */}
              <TouchableOpacity onPress={next} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Continue</Text>
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
    paddingTop: 20,
    height: 300,
    position: 'relative',
  },
  backButton: {
    marginLeft: 20,
    marginBottom: 10,
    width: 40,
    height: 40,
    backgroundColor: '#9856EB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  welcomeText: {
    fontSize: 28,
    fontFamily: 'WorkSans-Bold',
    color: ColorsConstant.White,
    marginBottom: 5,
  },
  subText: {
    fontSize: 15,
    color: ColorsConstant.White,
    fontFamily: 'WorkSans-Regular',
    marginTop: 4,
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  welcomeImage: {
    width: '100%',
    height: 130,
  },
  formSection: {
    paddingHorizontal: 25,
    marginTop: 25,
  },
  title: {
    fontSize: 26,
    fontFamily: 'WorkSans-Bold',
    color: '#8A8C94',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: 'WorkSans-SemiBold',
    color: '#8A8C94',
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'WorkSans-Regular',
  },
  errorMsg: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  charCount: {
    textAlign: 'right',
    color: '#888',
    marginTop: 4,
    fontSize: 12,
  },
  nextButton: {
    backgroundColor: ColorsConstant.Theme,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
});
