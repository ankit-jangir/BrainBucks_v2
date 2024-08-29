import React, { useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Image, Linking, TextInput, StatusBar, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';

export default function CustomerSupport({ navigation }) {

  const [number, setNumber] = useState('989 654 52365');
  const [email, setEmail] = useState('Support@brainbucks.in');

  useEffect(() => {
    getDetails();
  }, [])

  const getDetails = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch("https://brainbucks.in/api/user/customer-support", requestOptions)
      .then(response => response.json())
      .then(result => {
        setNumber(result.supportContact.value);
        setEmail(result.supportEmail.value);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + number + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + number + '}';
    }
    Linking.openURL(phoneNumber);
  };
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <View style={styles.safeArView}>
        <StatusBar barStyle={'dark-content'} translucent={false} backgroundColor={'transparent'} />
        <View style={styles.Hview}>
        <View style={styles.Hview1}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.THead}>
            <Image
              source={require('../../assets/img/arrows.png')}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <View style={styles.ViewMy}>
            <Text style={styles.TextMy}>Support</Text>
          </View>
        </View>
      </View>

        <ScrollView style={{ flex: 1, }}>
          <View style={styles.GotView} >
            <View style={styles.GotView1} >
              <View style={styles.SomeView} >
                <Text style={styles.TextGot}>Got, some issues ?</Text>
              </View>
              <View style={styles.WEView} >
                <Text style={styles.TextWE}>We are here to Help</Text>
              </View>
            </View>
          </View>
          <View style={styles.lotiView} >
            <LottieView
              autoPlay
              style={styles.lotiImage}
              source={require('../../assets/img/customersupport.json')}
            />
          </View>

          <View style={styles.TalkView} >
            <TouchableOpacity onPress={() => { dialCall() }} style={styles.TalkView1} >
              <View style={styles.IconView} >
              <Image source={require('../../assets/img/support.png')} resizeMode='contain' style={{height:35,width:35}} />

              </View>

              <View style={styles.GetView} >
                <Text style={styles.TextTalk}>Talk to our Representative</Text>
                <View style={{ width: '70%' }} >
                  <Text style={styles.TextAva}>Available from Mon-Sat ( 10:00 am - 6:00 pm )</Text>
                </View>
              </View>
              <Image source={require('../../assets/img/arrowtoright.png')} tintColor={"black"} resizeMode='contain' style={{height:30,width:30,marginRight:15}} />

            </TouchableOpacity>
          </View>

          <View style={styles.TalkView} >
            <TouchableOpacity onPress={() => { Linking.openURL('mailto:' + email) }} style={styles.TalkView1} >
              <View style={styles.IconView} >
              <Image source={require('../../assets/img/email.png')} resizeMode='contain' style={{height:30,width:30}} />
              </View>
              <View style={styles.GetView} >
                <Text style={styles.TextTalk}>Get Email Support</Text>
                <View style={{ width: '70%' }} >
                  <Text style={styles.TextAva}>Available 24*7</Text>
                </View>
              </View>
              <Image source={require('../../assets/img/arrowtoright.png')} tintColor={"black"} resizeMode='contain' style={{height:30,width:30,marginRight:15}} />

            </TouchableOpacity>
          </View>
          <View style={styles.TalkView} >
            <TouchableOpacity style={styles.TouchView} onPress={()=>{navigation.navigate('support')}}>
              <View style={styles.IconView} >
                <Image source={require('../../assets/img/message.png')} resizeMode='contain' style={styles.MsgPic} />
              </View>
              <View style={styles.GetView} >
                <Text style={styles.TextTalk}>Get Chat Support</Text>
                
              </View>
              <Image source={require('../../assets/img/arrowtoright.png')} tintColor={"black"} resizeMode='contain' style={{height:30,width:30,marginRight:15}} />

            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  GotView: {
    width: '100%',
    height: 160,
    paddingHorizontal: 10,
    marginTop: 0,
  },
  GotView1: {
    flex: 1,
    justifyContent: "center"
  },
  SomeView: {
    width: '100%',
    justifyContent: "center"
  },
  TextGot: {
    fontFamily: "WorkSans-Medium",
    fontSize: 20,
    color: ColorsConstant.Black
  },
  WEView: {
    width: '70%',
    justifyContent: "center"
  },
  TextWE: {
    fontFamily: "WorkSans-Medium",
    fontSize: 36,
    color: ColorsConstant.Black
  },
  lotiView: {
    flex: 1,
    alignItems: 'center',
  },
  TalkView: {
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  TalkView1: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: ColorsConstant.Black,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: "center"
  },
  IconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.20
  },
  GetView: {
    flex: 0.80,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextTalk: {
    fontSize: 18,
    fontFamily: "WorkSans-Medium",
    color:ColorsConstant.Black
  },
  TextAva: {
    fontSize: 12,
    fontFamily: "WorkSans-Regular",
    color: ColorsConstant.lightWhite
  },
  TouchView: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: ColorsConstant.LightColor
  },
  TextCome: {
    fontSize: 12,
    fontFamily: "WorkSans-Regular",
    color: ColorsConstant.RedLight
  },
  lotiImage: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
  MsgPic: {
    width: 30,
    height: 30
  },
  safeArView: {
    flex: 1,
    backgroundColor: ColorsConstant.White
},
Hview: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
    backgroundColor:"white"
  },
  Hview1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  THead: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100,
  },
  ViewMy: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
   TextMy: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },
})
