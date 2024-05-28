import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from '../../utils/Translate';
import LinearGradient from 'react-native-linear-gradient';

const Quizze = () => {
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

        <View style={[styles.row, styles.earningContainer]}>
          <Image source={require('../../assets/img/dollar.png')} resizeMode='contain' style={styles.dollarImage} />
          <View style={styles.earningAmountContainer}>
            <Text style={styles.earningAmountBlue}>988/</Text>
            <Text style={styles.earningAmount}>88</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
          <LinearGradient
                 start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                 colors={['#54ACFD', '#2289E7']}
                 style={{borderRadius:8, height:10 }}>
         </LinearGradient>
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('RulesParticipation', {id: props.item.id, img:props.item.category_image})} style={{width:'100%',}} >
          <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.6, y: 2.0}} colors={['#54ACFD', '#2289E7']} style={{height:45,borderRadius:5,justifyContent:'center',alignItems:'center',}}>
            <Text style={{color:'#ffffff',fontSize:14,fontFamily:'WorkSans-Medium'}} >Register Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Quizze;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    margin: 7,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  title: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: '600',
  },
  feeAndDateRow: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  date: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 5,
  },
  prizeAndDateRow: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  prizeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: '500',
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
    fontSize: 14,
  },
  earningAmount: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 13,
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
