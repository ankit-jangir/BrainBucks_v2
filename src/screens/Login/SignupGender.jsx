import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {ColorsConstant} from '../../constants/Colors.constant';

const screenWidth = Dimensions.get('window').width;

export default function SignupGender({navigation, route}) {
  const [gender, setGender] = useState(null);
  useEffect(() => {
    console.log('SignupGender route.params:', route.params);
  }, []);

  const chooseGender = [
    {
      gen: 'Boy',
      image: require('../../assets/img/boy.png'),
    },
    {
      gen: 'Girl',
      image: require('../../assets/img/gengirl.png'),
    },
    {
      gen: 'No Say',
      image: require('../../assets/img/nosay.png'),
    },
  ];

  const handleNext = () => {
    navigation.navigate('SignUpExam', {
      ...route.params,
      gender: gender.toLowerCase(),
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={ColorsConstant.Theme}
      />
      <ScrollView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
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

          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/img/wlname.png')}
              resizeMode="stretch"
              style={styles.welcomeImage}
            />
          </View>
        </View>

        {/* Gender Selection Section */}
        <View style={{paddingHorizontal: 25}}>
          <View style={styles.letView}>
            <Text style={styles.TextEach}>Let’s know each {"\n"}other</Text>
          </View>

          <View style={styles.viewIam}>
            <Text style={styles.TextIam}>I am a</Text>
            <View style={styles.GenderView}>
              {chooseGender.map((item, index) => (
                <SelectGender
                  key={index}
                  item={item}
                  selected={gender === item.gen}
                  onPress={() => setGender(item.gen)}
                />
              ))}
            </View>
          </View>

          {/* Continue Button */}
            <TouchableOpacity onPress={handleNext} disabled={!gender}>
  <View style={[styles.TouchView, {opacity: gender ? 1 : 0.5}]}>
    <Text style={styles.btntex}>Next</Text>
  </View>
</TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Gender Button Component
const SelectGender = ({item, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.genderButton,
        {borderColor: selected ? '#12D95B' : '#fff'},
      ]}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.girlPic}
      />
      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 16,
          color: selected ? '#12D95B' : '#8A8C94',
          paddingTop: 5,
          textAlign: 'center',
        }}>
        {item.gen === 'No Say' ? 'Other' : item.gen}
      </Text>
    </TouchableOpacity>
  );
};

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
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
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  welcomeImage: {
    width: '100%',
    height: 160,
  },
  letView: {
    marginTop: 40,
    marginBottom: 10,
  },
  TextEach: {
    fontSize: 29,
    fontFamily: 'WorkSans-Bold',
    color: '#8A8C94',
  },
  viewIam: {
    marginBottom: 30,
  },
  TextIam: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#8A8C94',
    marginBottom: 10,
  },
  GenderView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  genderButton: {
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#F7F7F7',
    width: (screenWidth - 80) / 3, // responsive 3 buttons in a row
    height: 100,
    marginBottom: 10,
  },
  girlPic: {
    width: 50,
    height: 50,
  },
  TouchView: {
    marginTop: 30,
    backgroundColor: ColorsConstant.Theme,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btntex: {
    color: ColorsConstant.White,
    fontSize: 16,
    fontWeight: '600',
  },
});
