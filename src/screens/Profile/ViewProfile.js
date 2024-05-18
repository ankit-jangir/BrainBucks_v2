import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, SafeAreaView, Share, StyleSheet,ScrollView } from 'react-native';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/ViewProfile.styles';



export default function ViewProfile({ navigation }) {
  const [image1, setImage1] = useState('https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png')

  return (
    <SafeAreaView style={StyleConstants.safeArView}>
            <View style={styles.HeaderView} >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={StyleConstants.H2Nd} >
                  <Image source={require('../../assets/img/arrows.png')} style={{height:20,width:20}}/>
                </TouchableOpacity>
                <TouchableOpacity style={StyleConstants.TocHead} >
                <Image source={require('../../assets/img/logout.png')} tintColor={'red'} style={{height:20,width:20}}/>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={styles.MainView} >
                <View style={{ flexDirection: "row", }} >
                  <View style={styles.MainView1} >
                    {/* <View style={styles.MainView2} >
                      <Image source={{ uri: image }} style={styles.img} />
                    </View> */}
                  </View>
                  <View style={{ flex: 1, }} >
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.EditT}>
                     <Text style={styles.EditText}>Edit Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={{ uri: image1 }} resizeMode='contain' style={styles.ProfileImg} />
               
                <Text style={[styles.Textmobile,{marginTop:10}]}>sonu</Text>

                  <Text style={styles.Textmobile}>98765432234</Text>
                
                <View style={styles.totalView} >
                  <ImageBackground source={require('../../assets/img/background1.png')} resizeMode="contain" style={styles.bgImg} >
                    <View style={styles.RfrView} >
                      <Text style={styles.quizText}>Total Quiz Participated</Text>
                      <Text style={[styles.quizText, { fontSize: 36 }]}>98765</Text>
                    </View>
                  </ImageBackground>
                </View>
                <TouchableOpacity onPress={() => { Url() }} style={{ width: '100%', paddingHorizontal: 10, marginBottom: 10, }} >
                  <ImageBackground source={require('../../assets/img/background2.png')} resizeMode="contain" style={styles.bgImg} >
                    <View style={styles.RfrView} >
                      <Text style={styles.quizText}>Refer & Earn upto </Text>
                      <Text style={[styles.quizText, { fontSize: 36 }]}>50,000</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <View style={styles.HelpView} >
                  <TouchableOpacity onPress={() => navigation.navigate('CustomerSupport')} style={styles.touchH} >
                    <View style={styles.CkrView} >
                      <Image source={require('../../assets/img/chakr.png')} resizeMode='contain' style={styles.Ckrimg} />
                    </View>
                    <View style={styles.SupportV} >
                      <Text style={styles.TextSupport}>Help and Support</Text>
                    </View>
                    <Text>arrowright</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.HelpView} >
                  <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} style={styles.touchH} >
                    <View style={styles.CkrView} >
                      <Image source={require('../../assets/img/privacypolicyblack.png')} resizeMode='contain' style={styles.Ckrimg} />
                    </View>
                    <View style={styles.SupportV} >
                      <Text style={styles.TextSupport}>Privacy Policy</Text>
                    </View>
                      <Text>arrowright</Text>

                  </TouchableOpacity>
                </View>
                <View style={styles.HelpView} >
                  <TouchableOpacity onPress={() => navigation.navigate("BbRules")} style={styles.touchH} >
                    <View style={styles.CkrView} >
                      <Image source={require('../../assets/img/SecurityBlack.png')} resizeMode='contain' style={styles.Ckrimg} />
                    </View>
                    <View style={styles.SupportV} >
                      <Text style={styles.TextSupport}>Rules & Regulations</Text>
                    </View>
                      <Text>arrowright</Text>

                  </TouchableOpacity>
                </View>
                <View style={styles.HelpView} >
                  <TouchableOpacity onPress={() => navigation.navigate('AboutBB')} style={styles.touchH} >
                    <View style={styles.CkrView} >
                      <Image source={require('../../assets/img/bbimg.png')} resizeMode='contain' style={{ width: 60, height: 60 }} />
                    </View>
                    <View style={styles.SupportV} >
                      <Text style={styles.TextSupport}>About Brain Bucks</Text>
                    </View>
                                        <Text>arrowright</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
    </SafeAreaView>
  )
}
