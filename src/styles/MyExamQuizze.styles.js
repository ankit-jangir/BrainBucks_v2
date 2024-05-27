// styles.js
import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../constants/Colors.constant';
import { StyleConstants } from '../constants/Style.constant';


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
      fontSize: 13,
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
      fontSize: 13,
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
      fontSize: 15,
    },
    earningAmount: {
      color: '#333333',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 14,
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