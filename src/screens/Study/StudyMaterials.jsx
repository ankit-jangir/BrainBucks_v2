import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FreePdf from './FreePdf';
import OnlineClasses from './OnlineClasses';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/Study.styles';



export default function StudyMaterials({ navigation }) {
  const [selected, setSelected] = useState('FreePdf');

  return (
    <View style={StyleConstants.safeArView}>
      <View style={styles.mainView}>
        <View style={styles.arrowView}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.TouchArrow}>
            <Image source={require('../../assets/img/arrows.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <View style={styles.StdView}>
            <Text style={styles.TextStd}>Study Materials</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button1,
            selected === 'FreePdf' ? styles.selectedButton : styles.deselectedButton
          ]}
          onPress={() => setSelected('FreePdf')}
        >
          <Text style={[
            styles.text,
            selected === 'FreePdf' ? styles.selectedText : styles.deselectedText
          ]}>
            FreePdf
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'OnlineClasses' ? styles.selectedButton : styles.deselectedButton
          ]}
          onPress={() => setSelected('OnlineClasses')}
        >
          <Text style={[
            styles.text,
            selected === 'OnlineClasses' ? styles.selectedText : styles.deselectedText
          ]}>
            Online Classes
          </Text>
        </TouchableOpacity>
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


