import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Text, TextInput } from '../../utils/Translate';
import WalletApiService from '../../services/api/WalletApiService';
import { useAddBank } from '../../context/AddBankReducer';
import { ColorsConstant } from '../../constants/Colors.constant';

const AddBankAccount = ({ navigation }) => {

  const [errMsg, setErrMsg] = useState()
  const [loading, setLoading] = useState(false)

  const { addBankState, dispatch } = useAddBank()

  const wallServ = new WalletApiService()
  let inputstyle = [styles.inputs, errMsg && { borderWidth: 1, borderColor: "#ff0000",}]

  function addIfsc(text) {
    if (text.length <= 11) {
      dispatch({ type: "details", bankDetails: { 'ifsc': text.trim() } })
    }
  }

  async function next() {
    setErrMsg(null)
    if (!addBankState.bankName.trim() || !addBankState.holderName.trim() || !addBankState.accnum.trim() || !addBankState.ifsc) {
      setErrMsg("All fields are mandatory")
      return
    }

    if (addBankState.accnum.length < 11 || addBankState.accnum.length > 16) {
      setErrMsg("Account number length must be between 11-16")
      return
    }

    if (addBankState.ifsc.length !== 11) {
      setErrMsg("IFSC code must be 11 characters long")
      return
    }

    try {
      setLoading(true)
      let ifscres = await wallServ.checkIfsc(addBankState.ifsc.toLocaleUpperCase());
      if (ifscres.data.IFSC) {
        navigation.navigate('AccountDeatils')
      } else {
        console.log("Something went wrong in ifsc checking. response from api:  ", ifscres)
      }
    } catch (err) {
      console.log("ERROR IN Fetching bank by ifsc code ", err.message);
      setErrMsg("Enter a valid IFSC code. No bank found with given IFSC code")
    } finally {
      setLoading(false)
    }



  }

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
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Bank Name</Text>
          <TextInput placeholder="Enter Bank Name" value={addBankState.bankName} onChangeText={(text) => { dispatch({ type: "details", bankDetails: { 'bankName': text } }) }} style={inputstyle} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Beneficiary Name</Text>
          <TextInput 
            placeholder="Name of Account Holder"
            style={inputstyle}
            value={addBankState.holderName}
            onChangeText={(text) => { dispatch({ type: "details", bankDetails: { 'holderName': text } }) }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            placeholder="Enter 16 Digit Account number"
            style={inputstyle}
            value={addBankState.accnum}
            inputMode='numeric'
            keyboardType='numeric'
            onChangeText={text => { (text.length <= 16 && /^\d*$/.test(text)) && dispatch({ type: "details", bankDetails: { 'accnum': text } }) }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>IFSC Code</Text>
          <TextInput
            placeholder="Enter 11 character IFSC Code"
            style={inputstyle}
            value={addBankState.ifsc}
            onChangeText={addIfsc}
            autoCapitalize='characters'
          />
        </View>
        {errMsg && <Text style={styles.errmsg} key={errMsg}>*{errMsg}</Text>}

      </ScrollView>
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AccountDeatils');
        }}>
        <Text style={styles.addButtonText}>Add Account</Text>
      </TouchableOpacity> */}
      <Button
        onPress={next}
        title="Add Account"
        loading={loading}
        titleStyle={styles.addButtonText}
        buttonStyle={styles.addButton}
        containerStyle={styles.addButtonContainer}
        loadingProps={{
          size: 25,
          color: '#fff',
        }}
      />
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
    // marginBottom: 20,
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
    fontFamily:"Work Sans"

  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 80
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    color: '#2E2E2E',
    fontWeight: '400',
    fontSize: 18,
    fontFamily:"Work Sans"

  },
  inputs: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    fontSize: 17,
    fontFamily:"Work Sans",
    color:ColorsConstant.Black

  },
  addButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#701DDB',
    padding: 10,
    borderRadius: 10,
    width: '90%'
  },
  addButtonText: {
    color: 'white',
    fontSize: 21,
    fontFamily:"Work Sans"

  },
  errmsg: {
    fontSize: 14,
    color: 'red',
    marginTop: 13,
    fontFamily:"Work Sans"

  }
});
