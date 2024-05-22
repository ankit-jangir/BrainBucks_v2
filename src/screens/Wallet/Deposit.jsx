import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text, TextInput} from '../../utils/Translate';

const Deposit = () => {
  const [amout, setAmount] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          tintColor="gray"
          source={require('../../assets/img/radic.png')}
          style={styles.actionIcon}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Deposit Money</Text>
          <Text>In my Brain Bucks Wallet</Text>
        </View>
      </View>
      <View style={styles.amountInputContainer}>
        <Text style={styles.amountLabel}>Enter Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Type Here..."
          style={styles.inputs}
          value={amout}
        />
      </View>
      <View style={styles.quickAmountContainer}>
        <TouchableOpacity
          onPress={() => setAmount('50')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 50</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('100')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('500')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAmount('1000')}
          style={styles.quickAmountButton}>
          <Text style={styles.quickAmountText}>₹ 1000</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.payNowButton}>
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  amountInputContainer: {
    margin: 20,
    marginTop: 40,
  },
  amountLabel: {
    color: 'black',
    fontSize: 17,
  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 21,
  },
  quickAmountContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#8258B8',
    height: 35,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  quickAmountText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
  },
  payNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    color: 'white',
    fontSize: 21,
  },
});
