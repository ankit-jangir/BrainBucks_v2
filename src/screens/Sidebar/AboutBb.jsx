import React, { useEffect,useCallback, useRef, useState} from 'react'
import { ScrollView, View, TouchableOpacity, Image,  Linking, StyleSheet } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { Button, Text } from '../../utils/Translate';
import YoutubePlayer from "react-native-youtube-iframe";
export default function AboutBb({ navigation }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <View style={styles.safeArView} >
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
          <Text style={styles.TextMy}>About Brainbucks</Text>
        </View>
      </View>
    </View>
        <ScrollView style={{ flex: 1, }}>
          <View style={styles.AboutBBVFirst} >
            <Text style={styles.AboutBFirstT}>It takes tremendous efforts in order to provide you with this wholesome experience on Brain Bucks. Kindly Rate Us, and help us become better</Text>
            <Text style={styles.AboutText}>Message from the Desk of CEO</Text>
            <View style={styles.container}>
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={'oZJ2zmronKQ'} 
        onChangeState={onStateChange}
      />
    
    </View>
            <Text style={styles.AboutTextF3}>Dear User,</Text>
            <Text style={styles.AboutTextF6}>It is a matter of pride and honor for having an opportunity to serve such a passionate aspirant like you.</Text>
            <Text style={styles.AboutTextF6}>We at Brain Bucks are working day and night with only single vision of helping young age Government Job Aspirants to provide them with an open source platform, where they can participate in Quiz competitions and get an opportunity to get rewarded for the efforts they have put into the preparation of all the competitive Exams they have been preparing for.</Text>
            <Text style={styles.AboutTextF6}>Our sole vision to empower every single aspirant to be a part of our Brain Bucks family and prove the world that only hitting the final milestone does not means success, even you can be great and eligible in the path which you are following.</Text>
            <Text style={styles.AboutTextF6}>As said, Brain Bucks is always here to help you students to get world class education and preparation methodologies for Free.</Text>
            <Text style={styles.AboutText}>Message from the Desk of COO</Text>
            <Text style={styles.AboutTextF6}>Dear User,</Text>
            <Text style={styles.AboutTextF6}>We at Brain Bucks always tends to deliver the industry standard and highly relevant Quiz Questions and preparation content.</Text>
            <Text style={styles.AboutTextF6}>We at Brain Bucks insures the best level of customer satisfaction, and always tends to keep our services always up to highest marks in the industry.</Text>
            <Text style={styles.AboutTextF6}>One thing that we would like all of our users to always keep in mind that, we are always grateful towards all of you for selecting or dearest baby and making it as one of the biggest community of government job aspirants in India.</Text>
            <Text style={styles.AboutTextF6}>Our Team is always trying to give all of you the best resources in order to help you to get best education and preparation methodologies absolutely free of cost.</Text>
            <Text style={styles.AboutTextF6}>One thing which we are sure about is, no one can provide you with so high quality of education even for a heck load of money.</Text>
            <Text style={styles.AboutTextF6}>Once again thank you user very much for showing your Belief in Us.</Text>
            <Text style={styles.AboutText}>Message from the Desk of CTO</Text>
            <Text style={styles.AboutTextF3}>Dear User,</Text>
            <Text style={styles.AboutTextF3}>We at Brain Bucks always tends to deliver the industry standard and highly relevant Quiz Questions and preparation content.</Text>
            <Text style={styles.AboutTextF3}>We at Brain Bucks insures the best level of customer satisfaction, and always tends to keep our services always up to highest marks in the industry.</Text>
            <Text style={styles.AboutTextF3}>One thing that we would like all of our users to always keep in mind that, we are always grateful towards all of you for selecting or dearest baby and making it as one of the biggest community of government job aspirants in India.</Text>
            <Text style={styles.AboutTextF3}>Our Team is always trying to give all of you the best resources in order to help you to get best education and preparation methodologies absolutely free of cost.</Text>
            <Text style={styles.AboutTextF3}>One thing which we are sure about is, no one can provide you with so high quality of education even for a heck load of money.</Text>
            <Text style={styles.AboutTextF3}>Once again thank you user very much for showing your Belief in Us.</Text>
            <Text style={styles.AboutText}>Message from the Desk of VP HR</Text>
            <Text style={styles.AboutTextF3}>Dear User,</Text>
            <Text style={styles.AboutTextF3}>We at Brain Bucks always tends to deliver the industry standard and highly relevant Quiz Questions and preparation content.</Text>
            <Text style={styles.AboutTextF3}>We at Brain Bucks insures the best level of customer satisfaction, and always tends to keep our services always up to highest marks in the industry.</Text>
            <Text style={styles.AboutTextF3}>One thing that we would like all of our users to always keep in mind that, we are always grateful towards all of you for selecting or dearest baby and making it as one of the biggest community of government job aspirants in India.</Text>
            <Text style={styles.AboutTextF3}>Our Team is always trying to give all of you the best resources in order to help you to get best education and preparation methodologies absolutely free of cost.</Text>
            <Text style={styles.AboutTextF3}>One thing which we are sure about is, no one can provide you with so high quality of education even for a heck load of money.</Text>
            <Text style={styles.AboutTextF3}>Once again thank you user very much for showing your Belief in Us.</Text>
            <Text style={styles.AboutText}>Important Peoples of Brain Bucks</Text>
            <Text style={styles.AboutTextF3}>Dear User,</Text>
            <Text style={styles.AboutTextF3}>It take tremendous efforts of thousands of “ Brain Buskeers” in order to deliver the high quality experience to you. We all should take a moment to thanks and show our gratitude towards the hard work they have put in.</Text>
            <Text style={styles.AboutTextF3}>It take tremendous efforts of thousands of “ Brain Buskeers” in order to deliver the high quality experience to you. We all should take a moment to thanks and show our gratitude towards the hard work they have put in.</Text>
            <Text style={styles.AboutTextF3}>Here is the list of a few key “Brain Buskeers” who have made this platform from scratch and currently taking care of this Platform, where millions of aspirants like you come and carve the initial foundation of their success, and achieving their dreams and converting them into reality.</Text>
            
            <Text style={styles.AboutTextF3}>1. Kapil Sharma - Chief Operating Officer</Text>
            <View style={styles.AboutTextF4} >
              <Text style={styles.AboutTextF5}>a. Setting up new team</Text>
              <Text style={styles.AboutTextF5}>b. Content Management</Text>
              <Text style={styles.AboutTextF5}>c. Internal Business process handling</Text>
              <Text style={styles.AboutTextF5}>d. Corporate Relations</Text>
            </View>

            <Text style={styles.AboutTextF3}>2. Saurav Kumawat - Chief Technology Officer</Text>
            <View style={styles.AboutTextF4} >
              <Text style={styles.AboutTextF5}>a. Managing software Technicalities</Text>
              <Text style={styles.AboutTextF5}>b. Business Process Automation</Text>
            </View>
            <Text style={styles.AboutTextF3}>3. Dharamveer singh nathawat -  Back-End Developer & DevOPS Engineer</Text>
            <Text style={styles.AboutTextF3}>4. Yogesh Poonia - Full-Stack Developer</Text>
            <Text style={styles.AboutTextF7}>5. Sonu Yadav - Front-End Developer</Text>
            <Text style={styles.AboutTextF3}>6. Ayushi Sharma - Full-Stack Developer </Text>
          </View>
        </ScrollView>
        <View style={styles.followV1}>
          <View style={styles.followV2} >
            <Text style={styles.followText}>Follow us on</Text>
            <View style={styles.followV3} >
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/brainbucks_india/')} style={styles.followTochable} >
                <Image source={require('../../assets/img/instagram.png')} resizeMode="contain" style={styles.followImg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/brainbucksindia/')} style={styles.followTochable} >
                <Image source={require('../../assets/img/linkedins.png')} resizeMode="contain" style={styles.followImg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/BrainBucksIndia')} style={styles.followTochable} >
                <Image source={require('../../assets/img/facebook.png')} resizeMode="contain" style={styles.followImg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/it_rns?s=08')} style={styles.followTochable} >
                <Image source={require('../../assets/img/twiter.png')} resizeMode="contain" style={styles.followImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.followTochable} >
                <Image source={require('../../assets/img/youtube.png')} resizeMode="contain" style={styles.followImg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const  styles = StyleSheet.create({
  AboutBBV:
  {
    width: "100%",
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF"
  },
  AboutBBVi:
  {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  AboutBV:
  {
    flex: 0.80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },
  AboutBText:
  {
    fontSize: 24,
    fontFamily: "WorkSans-SemiBold"
  },
  AboutBBVFirst:
  {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  AboutBFirstT:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 16,
    color:"black"
  },
  AboutText:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 16,
    paddingVertical: 10,
    color:"black"

  },
  AboutTextF1:
  {
    width: '100%',
    height: 150,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    color:"black"

  },
  AboutTextF2:
  {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: ColorsConstant.GrayyColor
  },
  AboutTextF3:
  {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    paddingVertical: 10,
    color:"black"
  },
  AboutTextF4:
  {
    width: "100%",
    paddingHorizontal: 20
  },
  AboutTextF5:
  {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    color:"black"

  },
  AboutTextF6:
  {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    paddingVertical: 10,
    textAlign: "justify",
    color:"black"

  },
  AboutBTochable:
  {
    flex: 0.15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderRadius: 100
  },
  AboutTextF7:
  {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    paddingTop: 10,
    color:"black"

  },
  followV1:
  {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  followV2:
  {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  followText:
  {
    fontFamily: "WorkSans-Medium",
    fontSize: 16,
    color:"black"

  },
  followV3:
  {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    flex: 1,
    paddingLeft: 15,
    color:"black"

  },
  followImg:
  {
    width: 25,
    height: 25
  },
  followTochable:
  {
    width: 40,
    height: 40,
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