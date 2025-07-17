import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FreePdf from './FreePdf';
import OnlineClasses from './OnlineClasses';
import {Text} from '../../utils/Translate';
import {StyleConstants} from '../../constants/Style.constant';
import styles from '../../styles/Studymaterials.styles';
import styles2 from '../../styles/Saved.styles';
import MainHeader from '../../components/MainHeader';
import { useNavigation } from '@react-navigation/native';

export default function StudyMaterials({navigation}) {
  const [selected, setSelected] = useState('FreePdf');
const navigate = useNavigation()
  return (
    <View style={StyleConstants.safeArView}>
      <MainHeader
        name={'Study Materials'}
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'), // provide the image source
        onPress: () => {
              navigate.goBack()
            },
        }}
      />

      {selected === 'FreePdf' && <FreePdf navigation={navigation} />}
      {selected === 'OnlineClasses' && (
        <OnlineClasses navigation={navigation} />
      )}
    </View>
  );
}
