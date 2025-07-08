import {StyleSheet, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import React, { useState } from 'react';
import {Text} from '../../utils/Translate';
import { useAddBank } from '../../context/AddBankReducer';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';
import MainHeader from '../../components/MainHeader';

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
      ToastAndroid.show( res.Backend_Error, ToastAndroid.SHORT);
    }
  }catch(err){
    console.log("Errir in dispatching in accounddetails: ",err);
  }finally{
    setLoading(false)
  }
}


  return (

    <>
        <MainHeader
          name={"Bank Account Details"}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              navigation.goBack()
            },
          }}
        />
    <View style={styles.container}>
      <View style={{zIndex:100}}>
      <Toast/>
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
    </>

  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backImage: {
    height: 40,
    width: 40,
    marginRight: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankImage: {
    height: 28,
    width: 28,
  },
  bankName: {
    color: '#111',
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: '600',
  },
  value: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#701DDB',
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
