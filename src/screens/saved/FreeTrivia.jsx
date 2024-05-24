import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';

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

const styles = StyleSheet.create({
  cupPic: {
    width: 20,
    height: 20
  },
  container: {
    backgroundColor: '#ffffff',
    margin: 7,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
  },
  touchPar: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#C922E4"
  },
  textPar: {
    color: '#C922E4',
    fontSize: 17,
    fontFamily: 'WorkSans-Medium'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PerView: {
    marginTop:5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  PerView1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10
  },
  textPer: {
    color: '#C922E4',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18
  },
  bannerImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  title: {
    color: '#000',
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: '700',
  },
  feeAndDateRow: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: '500',
  },
  feeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  feeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  date: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 5,
  },
  prizeAndDateRow: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  prizeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: '500',
  },
  prizeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  prizeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5,
  },
  iconImageSmall: {
    width: 17,
    height: 17,
  },
  earningContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  dollarImage: {
    width: 25,
    height: 25,
  },
  earningAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  earningAmountBlue: {
    color: '#2188E7',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
  },
  earningAmount: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
  },
  progressBarContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  progressBar: {
    height: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
});
