import React, { useEffect, useState } from 'react';
import FreePdf from './FreePdf';
import  OnlineClasses from './OnlineClasses';
import { View, TouchableOpacity, Image, Text , StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';

const Tab = createMaterialTopTabNavigator();

export default function StudyMaterials({ navigation }) {

  return (
    <>
      <View style={StyleConstants.safeArView}>
        <View style={styles.mainView} >
          <View style={styles.arrowView} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.TouchArrow}>
              <Text style={{color:'#000'}}>arrowleft</Text>
            </TouchableOpacity>
            <View style={styles.StdView} >
              <Text style={styles.TextStd}>Study Materials</Text>
            </View>
          </View>
        </View>

        <View style={styles.titleView} >
          <View style={styles.titleView1} >
            <View style={styles.titleView2} >
              <View style={styles.imgView}>
                <Image source={require('../../assets/img/banner.png')} resizeMode='contain' style={styles.img} />
              </View>
              <View style={styles.vtitle}>
                <Text style={styles.textTitle}>PDF</Text>
              </View>
            </View>
          </View>
          <View style={styles.roomView} >
      <Tab.Navigator style={{ flex: 1, }} screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 16, textTransform: "none", color: '#808080', },
        tabBarStyle: { width: "100%", elevation: 0, height: 50, backgroundColor: "#EFEFEF", justifyContent: "center", borderRadius: 10 },
        tabBarIndicatorStyle: { backgroundColor: "#000000", borderRadius: 10, height: 50 },
      }} >
        <Tab.Screen name="Free PDF">{() => <FreePdf></FreePdf>}</Tab.Screen>
        <Tab.Screen name="Online Classes">{() => <OnlineClasses ></OnlineClasses>}</Tab.Screen>
      </Tab.Navigator>
    </View>
        </View>
      </View>
    </>
  )
}


const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray
  },
  arrowView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  TouchArrow: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.BlurWhite,
    borderWidth: 1,
    borderRadius: 100
  },
  StdView: {
    flex: 0.80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },
  TextStd: {
    fontSize: 22,
    fontFamily: "WorkSans-SemiBold"
  },
  titleView: {
    flex: 1,
    paddingHorizontal: 10
  },
  titleView1: {
    width: "100%",
    height: 70,
    backgroundColor: ColorsConstant.White
  },
  titleView2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imgView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
  },
  img: {
    width: 35,
    height: 35
  },
  vtitle: {
    width: "100%",
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textTitle: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20,
  },
  roomView: {
    flex: 1,
    marginTop: 10,
  }
})