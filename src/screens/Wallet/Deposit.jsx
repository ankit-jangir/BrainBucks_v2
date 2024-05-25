import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Button, Text, TextInput } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import RazorpayCheckout from 'react-native-razorpay';

const Deposit = ({navigation}) => {
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState()

  let walletService = new WalletApiService()

  async function createOrder(){
    if(loading){
      return;
    }
    setErrMsg(null)
    if(!amount){
      setErrMsg("Enter a valid amount first")
      return;
    }
    try{
      setLoading(true)
      let res = await walletService.createOrder(amount)
      if(res.status===1){
        RazorpayCheckout.open(res.option2).then((data) => {
         navigation.navigate('paymentpopup',{
          status:1
         })
        }).catch((error) => {
          navigation.navigate('paymentpopup',{
            status:0
           })
        })
      }else{
        Toast.show({
          type:'error',
          text1:res.Backend_Error
        })
      }
    }catch(err){
      console.log("Error while creating order",err.message);
      Toast.show({
        type:'error',
        text1:"Something went wrong"
      })
    }finally{
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <Toast/>
      <View style={styles.header}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Wallet")}}>
      <Image
          tintColor="gray"
          source={require('../../assets/img/radic.png')}
          style={styles.actionIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Deposit Money</Text>
          <Text style={{fontSize: 14}}>In my Brain Bucks Wallet</Text>
        </View>
      </View>
      <View style={styles.amountInputContainer}>
        <Text style={styles.amountLabel}>Select Amount {'(₹)'}</Text>
        <TextInput
          placeholderTextColor='gray'
          keyboardType="numeric"
          placeholder="Type Here..."
          style={[styles.inputs, errMsg&&{borderWidth:1, borderColor:'red'}]}
          value={amount}
          editable={false}
        />
        {errMsg && <Text style={styles.errmsg} key={errMsg}>*{errMsg}</Text>}
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
      <TouchableOpacity onPress={createOrder} style={styles.payNowButton}>
        {loading?<ActivityIndicator size={30}/>:<Text style={styles.payNowText}>Pay Now</Text>}
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
    paddingTop: 50,
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
    color:ColorsConstant.Black
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
  errmsg:{
    color:"red",
    fontSize:13,
    marginTop:6 
  }
});
