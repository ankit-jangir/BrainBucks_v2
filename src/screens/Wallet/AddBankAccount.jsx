import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, Text, TextInput } from '../../utils/Translate';
import WalletApiService from '../../services/api/WalletApiService';
import { useAddBank } from '../../context/AddBankReducer';
import { ColorsConstant } from '../../constants/Colors.constant';
import MainHeader from '../../components/MainHeader';

const AddBankAccount = ({ navigation }) => {
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);
  const { addBankState, dispatch } = useAddBank();
  const wallServ = new WalletApiService();

  let inputstyle = [styles.inputs, errMsg && { borderColor: '#FF3B30' }];

  function addIfsc(text) {
    if (text.length <= 11) {
      dispatch({ type: 'details', bankDetails: { ifsc: text.trim() } });
    }
  }

  async function next() {
    setErrMsg(null);
    if (
      !addBankState.bankName.trim() ||
      !addBankState.holderName.trim() ||
      !addBankState.accnum.trim() ||
      !addBankState.ifsc
    ) {
      setErrMsg('All fields are mandatory');
      return;
    }

    if (addBankState.accnum.length < 11 || addBankState.accnum.length > 16) {
      setErrMsg('Account number length must be between 11-16');
      return;
    }

    if (addBankState.ifsc.length !== 11) {
      setErrMsg('IFSC code must be 11 characters long');
      return;
    }

    try {
      setLoading(true);
      let ifscres = await wallServ.checkIfsc(addBankState.ifsc.toUpperCase());
      if (ifscres.data.IFSC) {
        navigation.navigate('AccountDeatils');
      } else {
        console.log('Something went wrong in IFSC checking: ', ifscres);
      }
    } catch (err) {
      console.log('ERROR in fetching IFSC: ', err.message);
      setErrMsg('Enter a valid IFSC code. No bank found with given IFSC code');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <MainHeader
        name={'Add Bank Account'}
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter Bank Name</Text>
            <TextInput
              placeholder="Enter Bank Name"
              value={addBankState.bankName}
              onChangeText={(text) =>
                dispatch({ type: 'details', bankDetails: { bankName: text } })
              }
              style={inputstyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Beneficiary Name</Text>
            <TextInput
              placeholder="Name of Account Holder"
              style={inputstyle}
              value={addBankState.holderName}
              onChangeText={(text) =>
                dispatch({ type: 'details', bankDetails: { holderName: text } })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Account Number</Text>
            <TextInput
              placeholder="Enter 16 Digit Account number"
              style={inputstyle}
              value={addBankState.accnum}
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={(text) =>
                text.length <= 16 &&
                /^\d*$/.test(text) &&
                dispatch({ type: 'details', bankDetails: { accnum: text } })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>IFSC Code</Text>
            <TextInput
              placeholder="Enter 11 character IFSC Code"
              style={inputstyle}
              value={addBankState.ifsc}
              onChangeText={addIfsc}
              autoCapitalize="characters"
            />
          </View>

          {errMsg && (
            <Text style={styles.errmsg} key={errMsg}>
              * {errMsg}
            </Text>
          )}
        </View>

        {/* ✅ BUTTON INSIDE SCROLLVIEW */}

      </ScrollView>
      <View style={styles.addButtonWrapper}>
        <Button
          onPress={next}
          title="Add Account"
          loading={loading}
          titleStyle={styles.addButtonText}
          buttonStyle={styles.addButton}
          loadingProps={{ size: 25, color: '#fff' }}
        />
      </View>
    </View>
  );
};

export default AddBankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal:10,
    paddingTop: 20,
    paddingBottom: 50,
  },
  formCard: {
    borderRadius: 12,

  },
  inputContainer: {
    marginTop: 15,
  },
  inputLabel: {
    color: '#2E2E2E',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 3,
    fontFamily: 'Work Sans',
  },
  inputs: {
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 13,
    fontFamily: 'Work Sans',
    color: ColorsConstant.Black,
    backgroundColor: '#fff',
  },
  addButtonWrapper: {
    position: "absolute",
    bottom: 50,
    width: "93%",
    left: 15,
    right: 10
  },
  addButton: {
    backgroundColor: '#701DDB',
    paddingVertical: 14,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Work Sans',
  },
  errmsg: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 16,
    fontFamily: 'Work Sans',
    paddingHorizontal: 5,
  },
});
