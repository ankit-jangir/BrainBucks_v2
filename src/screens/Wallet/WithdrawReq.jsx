import { StyleSheet, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Text } from '../../utils/Translate';
import { useWithdraw } from '../../context/WithdrawReducer';

const WithdrawReq = ({ navigation }) => {

  const { withdrawState, dispatch } = useWithdraw()

  function goback(type) {
    dispatch({ type: 'empty' })
    if (type === 'hardware') {
      navigation.pop(2)
    } else {
      navigation.pop(3)
    }
  }

  useEffect(() => {
    let bh = BackHandler.addEventListener('hardwareBackPress', () => { goback('hardware') })
    return () => { bh.remove() }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goback}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>₹ {withdrawState.amount}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Image
          source={require('../../assets/img/righttick.png')}
          style={styles.tickImage}
        />
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>
            Withdrawal Request{'\n'}Placed Successfully
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.beneficiaryLabel}>Beneficiary Details</Text>
        <TouchableOpacity>
          <View style={styles.bankDetailsContainer}>
            <View style={styles.bankDetailsHeader}>
              <View style={styles.bankIconContainer}>
                <Image
                  source={require('../../assets/img/bank.png')}
                  resizeMode="contain"
                  style={styles.bankIcon}
                />
              </View>
              <Text style={styles.bankName}>{withdrawState.bank.bank_name}</Text>
            </View>
            <Text style={styles.bankHolder}>{withdrawState.bank.acc_holder_name}</Text>
            <View style={styles.bankAccountDetails}>
              <Text style={styles.accountText}>{withdrawState.bank.bank_acc_no}</Text>
              <Text style={styles.ifscText}>{withdrawState.bank.ifsc_code}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusButton, styles.pendingButton]}>
            <Text style={[styles.statusText, styles.pendingText]}>pending</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../assets/img/banner1.png')}
            resizeMode="cover"
            style={styles.bannerImage}
          />
        </View>
      </View>
    </View>
  );
};

export default WithdrawReq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#610ECD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  messageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: "center",
    // paddingLeft:80,
    marginTop: 10,
    marginBottom: 10
  },
  tickImage: {
    height: 45,
    width: 45,
  },
  messageTextContainer: {
    alignItems: 'center',

  },
  messageText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    paddingLeft: 7
  },
  detailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,

    marginTop: 30,
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 200,
  },
  transactionLabel: {
    color: '#A1A2AD',
    fontSize: 16,
  },
  transactionId: {
    color: '#A1A2AD',
    fontSize: 19,
  },
  transactionDetails: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerImage: {
    height: 35,
    width: 35,
  },
  transactionDate: {
    paddingLeft: 15,
    fontSize: 17,
    color: '#A1A2AD',
  },
  beneficiaryLabel: {
    paddingTop: 10,
    fontSize: 16,
  },
  bankDetailsContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    paddingBottom: 10,
  },
  bankDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 8,
  },
  bankIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  bankIcon: {
    height: '100%',
    width: '100%',
  },
  bankName: {
    fontSize: 17,
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black',
  },
  bankHolder: {
    paddingLeft: 10,
    fontWeight: '400',
    color: '#7E7E7E',
    paddingTop: 5,
    fontSize: 14,
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  accountText: {
    color: 'black',
    fontSize: 14,

  },
  ifscText: {
    color: 'black',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  statusButton: {
    backgroundColor: '#EFF4FA',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  statusText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  pendingButton: {
    backgroundColor: '#FFF2F2',
  },
  pendingText: {
    color: '#D92828',
  },
  bannerImage: {
    marginTop: 10,
  },
  bannerContainer: {
    height: 200,
    width: '100%',
    marginRight: 20,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20
  },
});
