import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {ColorsConstant} from '../../constants/Colors.constant';
import styles from '../../styles/SingUp.styles';

export default function SignupGender({navigation, route}) {
  const [gender, setGender] = useState('No Say');

  const choosegender = [
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <View style={styles.mainView}>
        <View style={styles.mainView1}>
          <View style={styles.mainView2}>
            <View style={styles.mainView3}>
              <Text style={styles.WelcomeText}>Welcome</Text>
              <Image
                source={require('../../assets/img/arrowtoright.png')}
                resizeMode="contain"
                style={styles.ArrowPic}
              />
            </View>
            <View style={styles.mainView3}>
              <Text style={styles.WelcomeText}>Buddy</Text>
              <Image
                source={require('../../assets/img/hand.png')}
                resizeMode="contain"
                style={styles.HandPic}
              />
            </View>
            <View style={styles.LookView}>
              <Text style={styles.LooksText}>
                Looks like you are {'\n'}
                new to our Family
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <LottieView
            autoPlay
            style={styles.lottiView}
            source={require('../../assets/img/leaf.json')}
          />
        </View>
        <Image
          source={require('../../assets/img/shadow.png')}
          resizeMode="contain"
          style={{width: '100%', flex: 1}}
        />
      </View>
      <View style={{paddingHorizontal: 30}}>
        <View style={styles.letView}>
          <Text style={styles.TextEach}>Tell us about your gender</Text>
        </View>
        <View style={styles.viewIam}>
          <Text style={styles.TextIam}>I am a</Text>
          <View style={styles.GenderView}>
            {choosegender.map((item, index) => (
              <SelectGender
                key={index} 
                item={item}
                selected={gender === item.gen}
                onPress={() => setGender(item.gen)}
              />
            ))}
          </View>
        </View>
        <View style={styles.TouchView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpExam', {...route.params, gender:gender.toLocaleLowerCase()})}>
            <Text style={styles.btntex}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const SelectGender = ({item, selected, onPress}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{borderRadius: 100, padding: 2}}>
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
            uncheckedColor={ColorsConstant.lightWhite}
            color={ColorsConstant.White}
            value={item.gen}
            label="Carto Base MAp"
            status={
              item.checked === item.gen ? 'checked' : 'unchecked'
            }></Image>
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              color: selected ? '#12D95B' : '#8A8C94',
              paddingTop: 5,
              alignItems: 'center',
              textAlign: 'center',
            }}>
            {item.gen === "No Say" ? "Other": item.gen}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
