import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '../../utils/Translate';
import {color} from '@rneui/base';

const WithdrawMoney = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('withdraw')}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>₹ 15,600</Text>
        <Text style={styles.infoText}>
          will be deposited in the following Bank Account{' '}
        </Text>
        <Text style={styles.warningText}>
          it can take upto 2 Business days for the payment to be credited
        </Text>
      </View>
      <View style={styles.bankInfoContainer}>
        <Text style={styles.bankLabel}>Name of Bank</Text>
        <View style={styles.bankRow}>
          <Image
            source={require('../../assets/img/bb.png')}
            style={styles.bankImage}
            resizeMode="contain"
          />
          <Text style={styles.bankName}>Name of Bank</Text>
        </View>
      </View>
      <View style={styles.accountContainer}>
        <Text style={styles.accountLabel}>Beneficiary Name</Text>
        <Text style={styles.accountValue}>Raghuveer Singh Prajapat</Text>
      </View>
      <View style={styles.accountContainer}>
        <Text style={styles.accountLabel}>Account Number</Text>
        <Text style={styles.accountValue}>1234 4567 8901</Text>
      </View>
      <View style={styles.accountContainer}>
        <Text style={styles.accountLabel}>IFSC Code</Text>
        <Text style={styles.accountValue}>0000FDRB23</Text>
      </View>
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={() => navigation.navigate('withdrawOtp')}
      >
        <Text style={styles.payNowText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  amountContainer: {
    margin: 10,
  },
  amountText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 17,
    color: '#2E2E2E',
  },
  warningText: {
    fontSize: 15,
    color: '#D92828',
    paddingTop: 10,
  },
  bankInfoContainer: {
    margin: 10,
    paddingTop: 20,
  },
  bankLabel: {
    color: '#2E2E2E',
    fontSize: 16,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  bankImage: {
    height: 30,
    width: 30,
  },
  bankName: {
    color: '#2E2E2E',
    fontSize: 23,
    paddingLeft: 10,
  },
  accountContainer: {
    margin: 10,
  },
  accountLabel: {
    color: '#2E2E2E',
    fontSize: 16,
  },
  accountValue: {
    color: '#2E2E2E',
    fontSize: 23,
    paddingTop: 5,
  },
  payNowButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    color: 'white',
    fontSize: 21,
  },
});
