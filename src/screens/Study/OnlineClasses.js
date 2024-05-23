import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant'
import { ColorsConstant } from '../../constants/Colors.constant';
import { Text } from '../../utils/Translate';


export default function OnlineClasses({ navigation }) {
  return (
    <>
      <View style={StyleConstants.safeArView}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.lottiV} >
            <LottieView
              autoPlay
              style={styles.lottie}
              source={require('../../assets/img/creativeidea.json')}
            />
          </View>
          <View style={styles.IndustryV}>
            <View style={{ width: '80%', }} >
              <Text style={styles.IndustryT} >Learn from Industry Expert Teachers, live from your home, for FREE!!</Text>
            </View>
          </View>
          <View style={styles.comingSoon}>
            <TouchableOpacity style={styles.comingSoonT} >
              <Text style={[styles.IndustryT,{color: ColorsConstant.White}]} >Coming Soon</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  lottiV:
  {
    alignItems: 'center',
    justifyContent: 'center'
  },
  lottie:
  {
    width: 300,
    height: 250,
    backgroundColor: 'transparent',
  },
  IndustryV:
  {
    width: '100%',
    justifyContent: 'center',
    alignItems: "center"
  },
  IndustryT:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 24,
    textAlign: "center"
  },
  comingSoon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 20
  },
  comingSoonT: {
    width: '80%',
    height: 50,
    backgroundColor: "#367CFF",
    borderRadius: 10,
    justifyContent: 'center'
    , alignItems: "center"
  },
 
})