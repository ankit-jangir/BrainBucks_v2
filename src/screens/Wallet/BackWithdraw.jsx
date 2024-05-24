import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';

const BackWithdraw = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#610ECD'}}>
      <View>
        <Image
          source={require('../../assets/img/radic.png')}
          style={{height: 30, width: 30, margin: 20}}
          tintColor={'white'}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 60,
          padding: 40,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          New Bank Account Added Successfully
        </Text>
      </View>
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
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={() => {
          navigation.navigate('withdraw');
        }}>
        <Text style={styles.payNowText}>Back to Withdrawal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackWithdraw;

const styles = StyleSheet.create({
  bankDetailsContainer: {
    margin: 20,
    paddingTop: 10,
    backgroundColor: '#EFEFEF',
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 50,
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
  payNowButton: {
    marginTop: 70,
    borderColor: 'white',
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  payNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  accountText: {
    color: 'black',
    fontSize: 17,
  },
  ifscText: {
    color: 'black',
    fontSize: 17,
  },
});
