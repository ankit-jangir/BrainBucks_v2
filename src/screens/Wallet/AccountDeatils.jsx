import {StyleSheet, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import React, { useState } from 'react';
import {Text} from '../../utils/Translate';
import { useAddBank } from '../../context/AddBankReducer';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

const AccountDetails = ({navigation}) => {

  const [isLoading, setLoading] = useState(false)
  const {addBankState, dispatch} = useAddBank()

  
async function next(){
  let wallServ = new WalletApiService()
  try{
    setLoading(true)
    let res = await wallServ.sendOtp()
    if(res.status===1){
      if(res.otp){
        // dispatch({type:"details", bankDetails:{'otp':res.otp}})
        ToastAndroid.show(res.otp+"", ToastAndroid.LONG)
      }
      navigation.navigate('bankotp')
    }else{
      Toast.show({
        type:'error',
        text1:res.Backend_Error
      })
    }
  }catch(err){
    console.log("Errir in dispatching in accounddetails: ",err);
    // Toast.show({
    //   type:'error',
    //   text1:"Something went wrong"
    // })
  }finally{
    setLoading(false)
  }
}


  return (
    <View style={styles.container}>
      <View style={{zIndex:100}}>
      <Toast/>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("addbank")}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bank Account Details</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name of Bank</Text>
        <View style={styles.bankInfo}>
          <Image
            source={require('../../assets/img/bank.png')}
            style={styles.bankImage}
            resizeMode="contain"
          />
          <Text style={styles.bankName}>{addBankState.bankName}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Beneficiary Name</Text>
        <Text style={styles.value}>{addBankState.holderName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.value}>{addBankState.accnum}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>IFSC Code</Text>
        <Text style={styles.value}>{addBankState.ifsc}</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={next}
      >
        {isLoading?<ActivityIndicator size={25}/>:<Text style={styles.addButtonText}>Add Account</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
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
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  infoContainer: {
    margin: 10,
    paddingTop: 20,
  },
  label: {
    color: '#2E2E2E',
    fontSize: 16,
  },
  bankInfo: {
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
  value: {
    color: '#2E2E2E',
    fontSize: 23,
    paddingTop: 5,
  },
  addButton: {
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
  addButtonText: {
    color: 'white',
    fontSize: 21,
    borderWidth:1,
    borderColor:'transparent'
  },
});
