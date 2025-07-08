import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'react-native-elements';
import { useAddBank } from '../../context/AddBankReducer';

const AddBankSucessfully = ({ navigation }) => {
  const { addBankState, dispatch } = useAddBank();

  const removeDetails = (type) => {
    dispatch({ type: 'empty' });
    if (type === 'hardware') {
      navigation.pop(2);
    } else {
      navigation.pop(3);
    }
  };

  useEffect(() => {
    const eh = BackHandler.addEventListener('hardwareBackPress', () => {
      removeDetails('hardware');
      return true;
    });
    return () => eh.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={removeDetails} style={styles.backButton}>
        <Image
          source={require('../../assets/img/radic.png')}
          style={styles.backIcon}
          tintColor="white"
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Added following Bank account</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.bankHeader}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/img/bank.png')}
              resizeMode="contain"
              style={styles.bankIcon}
            />
          </View>
          <Text style={styles.bankName}>{addBankState.bankName}</Text>
        </View>

        <Text style={styles.holderName}>{addBankState.holderName}</Text>

        <View style={styles.accountDetails}>
          <Text style={styles.accountText}>{addBankState.accnum}</Text>
          <Text style={styles.ifscText}>{addBankState.ifsc}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Wait for the bank to be verified</Text>
      </View>

      <TouchableOpacity onPress={removeDetails} style={styles.backButtonMain}>
        <Text style={styles.backButtonText}>Back To Add Bank</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBankSucessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#610ECD',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Work Sans',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 15,
    marginVertical: 20,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  bankName: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  holderName: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: '500',
    color: '#777',
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  accountText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#444',
  },
  ifscText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#444',
  },
  statusContainer: {
    marginTop: 10,
    paddingLeft: 5,
  },
  statusText: {
    color: 'orange',
    fontSize: 17,
    fontWeight: '600',
  },
  backButtonMain: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
});
