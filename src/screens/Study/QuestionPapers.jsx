import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text as BBText, TextInput, RefreshControl, ActivityIndicator, Linking, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Image } from '@rneui/base';
import styles from '../../styles/Study.styles';
export default function QuestionPaperList({ navigation, route }) {



  return (
    <>
      <View style={StyleConstants.safeArView}>
        <View style={styles.mainView} >
          <View style={styles.mainView1} >
            <TouchableOpacity onPress={() => navigation.goBack()}
              style={styles.touchView}>
            <Image source={require('../../assets/img/arrows.png')} style={{width:20,height:15}}/>
            </TouchableOpacity>
            <View style={styles.QView} >
              <Text style={styles.textQ}>Question Papers</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputV} >
          <View style={styles.inputV1}>
            <View style={styles.inputv2}>
              <TouchableOpacity style={{ flex: 0.10, }}>
                <Image source={require('../../assets/img/search.png')} style={{width:20,height:20}}/>
              </TouchableOpacity>
              <TextInput style={styles.Inview} placeholder="Search for Previous year papers" placeholderTextColor={'#7E7E7E'}></TextInput>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.PView} >
      <TouchableOpacity style={styles.Ptouch} >
        <Text style={styles.textQue} >fill name</Text>
        <Text style={styles.textQue} >Question Paper</Text>

        <View style={styles.TrView} >
          <View style={styles.TrView1} >
            <View style={{ flex: 0.80, }} >
              <TouchableOpacity style={styles.touchTR} >
                <Text style={styles.TextTrans}>Translation </Text>
                <Text style={[styles.TextTrans, { fontFamily: 'WorkSans-SemiBold' }]}>Enabled</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.80, }} >
              <View style={styles.dateView} >
                <Text style={styles.textDate}>data show</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.downView} >
          <TouchableOpacity 
            style={styles.touchDown} >
            <Text style={styles.textDown} >Download Hindi</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.touchEng} >
            <Text style={styles.textEng} >Download English</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

