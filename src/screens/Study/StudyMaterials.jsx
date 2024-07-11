import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import FreePdf from './FreePdf';
import OnlineClasses from './OnlineClasses';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/Studymaterials.styles';
import styles2 from '../../styles/Saved.styles';


export default function StudyMaterials({ navigation }) {
  const [selected, setSelected] = useState('FreePdf');

  return (
    <View style={StyleConstants.safeArView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding:10
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 4,
            borderWidth: 1,
            borderRadius: 100,
            width: 50,
            height: 50,
            borderColor: '#F5F5F5',
          }}>
          <Image
            source={require('../../assets/img/backcopy.png')}
            style={{ height: 25, width: 25 }}></Image>
        </TouchableOpacity>
        <View style={styles2.examView}>
          <Text style={styles2.textMy}>Study Material</Text>
        </View>
        <View style={styles2.viewAdd}>
        </View>
      </View>
      {selected === 'FreePdf' && (
        <FreePdf navigation={navigation} />
      )}
      {selected === 'OnlineClasses' && (
        <OnlineClasses navigation={navigation} />
      )}
    </View>
  );
}


