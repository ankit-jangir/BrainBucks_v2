import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Text, TextInput} from '../../utils/Translate';

const {height} = Dimensions.get('window');

const AddBankAccount = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('addbankDetails')}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Bank Account</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Bank Name</Text>
          <TextInput placeholder="Enter Bank Name" style={styles.inputs} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Beneficiary Name</Text>
          <TextInput
            placeholder="Name of Account Holder"
            style={styles.inputs}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            placeholder="Enter 16 Digit Account number"
            style={styles.inputs}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>IFSC Code</Text>
          <TextInput
            placeholder="Enter 11 character IFSC Code"
            style={styles.inputs}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AccountDeatils');
        }}>
        <Text style={styles.addButtonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 20,
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    color: '#2E2E2E',
    fontWeight: '400',
    fontSize: 18,
  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    fontSize: 17,
  },
  addButton: {
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
  addButtonText: {
    color: 'white',
    fontSize: 21,
  },
});
