import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '../../utils/Translate';

const WithdrawReq = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/back.png')}
          style={styles.backImage}
        />
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>₹ 15,600</Text>
      </View>
      <View style={styles.messageContainer}>
        <Image
          source={require('../../assets/img/righttick.png')}
          style={styles.tickImage}
        />
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>
            Withdrawal Request Placed Successfully
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionLabel}>Transaction ID</Text>
        <Text style={styles.transactionId}>#htnOP1256BHIPOK569822</Text>
        <View style={styles.transactionDetails}>
          <Image
            source={require('../../assets/img/Timer.png')}
            style={styles.timerImage}
          />
          <Text style={styles.transactionDate}>20 Dec 2022 | 12:34 IST</Text>
        </View>
        <Text style={styles.beneficiaryLabel}>Beneficiary Details</Text>
        <TouchableOpacity>
          <View style={styles.bankDetailsContainer}>
            <View style={styles.bankDetailsHeader}>
              <View style={styles.bankIconContainer}>
                <Image
                  source={require('../../assets/img/bb.png')}
                  resizeMode="contain"
                  style={styles.bankIcon}
                />
              </View>
              <Text style={styles.bankName}>Federal Bank</Text>
            </View>
            <Text style={styles.bankHolder}>Holder Name</Text>
            <View style={styles.bankAccountDetails}>
              <Text style={styles.accountText}>xxx xxx xxx xxx</Text>
              <Text style={styles.ifscText}>122 asdf qwer fgb</Text>
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
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  messageContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
  },
  tickImage: {
    height: 45,
    width: 45,
  },
  messageTextContainer: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,

    marginTop: 10,
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
    fontSize: 24,
  },
  transactionDetails: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerImage: {
    height: 35,
    width: 35,
  },
  transactionDate: {
    paddingLeft: 20,
    fontSize: 20,
    color: '#A1A2AD',
  },
  beneficiaryLabel: {
    paddingTop: 30,
    fontSize: 16,
  },
  bankDetailsContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    paddingBottom: 15,
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
    fontSize: 21,
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black',
  },
  bankHolder: {
    paddingLeft: 10,
    fontWeight: '400',
    color: '#7E7E7E',
    paddingTop: 20,
    fontSize: 17,
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  accountText: {
    color: 'black',
    fontSize: 17,
  },
  ifscText: {
    color: 'black',
    fontSize: 17,
  },
  statusContainer: {
    flexDirection: 'row',
    margin: 10,
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
  },
});
