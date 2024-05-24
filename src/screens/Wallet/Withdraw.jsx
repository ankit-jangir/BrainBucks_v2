import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, TextInput} from '../../utils/Translate';
import {ScrollView} from 'react-native-gesture-handler';

const Withdraw = ({navigation}) => {
  const data = [
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
    {
      bankname: 'Federal Bank',
      HolName: 'Holder Name',
      Acc: 'xxx xxx xxx xxx',
      ifc: '122 asdf qwer fgb',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 80}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('wallet');
          }}>
          <Image
            tintColor="gray"
            source={require('../../assets/img/radic.png')}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Withdraw Money</Text>
          <Text style={{fontSize: 14, color: '#D92828'}}>
            Transaction fees = 10/Transaction
          </Text>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text>Total Redeemable Balance</Text>
        <Text style={styles.balanceAmount}>₹ 15,600</Text>
      </View>
      <View style={styles.amountInputContainer}>
        <Text style={styles.amountLabel}>Enter Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Type Here..."
          style={styles.inputs}
        />
        <Text>
          Entered amount should be less{' '}
          <Text style={{color: '#D92828'}}>₹ 15,600</Text>{' '}
        </Text>
      </View>
      <Text style={styles.balanceAmount1}>Select Bank account</Text>

      <ScrollView>
        {data.map((res, index) => {
          return (
            <>
              <TouchableOpacity>
                <View key={index} style={styles.bankDetailsContainer}>
                  <View style={styles.bankDetailsHeader}>
                    <View style={styles.bankIconContainer}>
                      <Image
                        source={require('../../assets/img/bb.png')}
                        resizeMode="contain"
                        style={styles.bankIcon}
                      />
                    </View>
                    <Text style={styles.bankName}>{res.bankname}</Text>
                  </View>
                  <Text style={styles.bankHolder}>{res.HolName}</Text>
                  <View style={styles.bankAccountDetails}>
                    <Text style={styles.accountText}>{res.Acc}</Text>
                    <Text style={styles.ifscText}>{res.ifc}</Text>
                  </View>
                  <View style={{margin: 0}}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Remove Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={() => {
          navigation.navigate('withdrawMoney');
        }}>
        <Text style={styles.payNowText}>Withdraw Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  balanceContainer: {
    margin: 10,
    marginBottom: 0,
    borderColor: '#EFEFEF',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
  },
  balanceAmount1: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 20,
  },
  amountInputContainer: {
    padding: 15,
  },
  amountLabel: {
    color: 'black',
    fontSize: 17,
  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    fontSize: 17,
  },
  bankDetailsContainer: {
    marginTop: 5,
    margin: 10,
    // padding: 10,
    // backgroundColor:'#EFEFEF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
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
    paddingTop: 20,
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  accountText: {
    color: 'black',
  },
  ifscText: {
    color: 'black',
  },
  payNowButton: {
    position: 'absolute',
    bottom: 10,
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
  button: {
    backgroundColor: '#FFF2F2',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    color: '#D92828',
    fontSize: 14,
    fontWeight: '400',
  },
});
