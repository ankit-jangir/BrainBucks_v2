import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/Saved.styles';

const FreeTrivia = () => {

  const triviadata = [
    {
      exam: 'SBI-PO Current Affairs',
      fees: 0,
      prize: 500,
      width: 45,
      image: require('../../assets/img/sbi.png')
    },
    {
      exam: 'SBI-PO Current Affairs',
      fees: 0,
      prize: 500,
      width: 45,
      image: require('../../assets/img/sbi.png')
    }
  ]
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Image source={require('../../assets/img/banner.png')} style={styles.bannerImage} />
          </View>
          <View>
            <Text style={styles.title}>SBI-PO Current Affairs</Text>
          </View>
        </View>

        <View style={[styles.row, styles.feeAndDateRow]}>
          <View style={styles.row}>
            <Text style={styles.feeLabel}>Fees</Text>
            <View style={styles.feeAmountContainer}>
              <Image source={require('../../assets/img/bbcoin.png')} resizeMode='contain' style={styles.coinImage} />
              <Text style={styles.feeAmount}>99</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={require('../../assets/img/time2.png')} resizeMode='contain' tintColor={'rgba(138, 138, 138, 1)'} style={styles.iconImage} />
            <Text style={styles.date}>12/10/2002</Text>
          </View>
        </View>

        <View style={[styles.row, styles.prizeAndDateRow]}>
          <View style={styles.row}>
            <Text style={styles.prizeLabel}>Prize</Text>
            <View style={styles.prizeAmountContainer}>
              <Image source={require('../../assets/img/bbcoin.png')} resizeMode='contain' style={styles.coinImage} />
              <Text style={styles.prizeAmount}>99</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image source={require('../../assets/img/calendar.png')} resizeMode='contain' tintColor={'rgba(138, 138, 138, 1)'} style={styles.iconImageSmall} />
            <Text style={styles.date}>12/10/2002</Text>
          </View>
        </View>

        <View style={styles.PerView} >
        <Image source={require('../../assets/img/cup.png')} resizeMode='contain' style={styles.cupPic} />
        <View style={styles.PerView1}>
          <Text style={styles.textPer} >99 %</Text>
        </View>
      </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            colors={['#DD74EE', '#A715BE']}
            style={{ borderRadius: 8, height: 10 }}>
          </LinearGradient>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('TriviaRules',)}
        style={styles.touchPar} >
        <Text style={styles.textPar} >Participate Now</Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

export default FreeTrivia;


