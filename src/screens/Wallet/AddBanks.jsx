import { StyleSheet, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Text } from '../../utils/Translate'
import WalletApiService from '../../services/api/WalletApiService'
import Toast from 'react-native-toast-message'
import NoDataFound from '../../components/NoDataFound'
import { Overlay } from '@rneui/themed'
import { useIsFocused } from '@react-navigation/native'
import { ColorsConstant } from '../../constants/Colors.constant'
import { color } from '@rneui/base'
import { useAddBank } from '../../context/AddBankReducer'

const AddBanks = ({ navigation }) => {

  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState([])
  const [visible, setVisible] = useState(false)
  const [delId, setDelId] = useState('')
  const isFocused = useIsFocused()
  const {addBankState, dispatch} = useAddBank()

  const wallService = new WalletApiService()

  async function removeAccount() {
    try {
      setLoading(true)
      let res = await wallService.deleteBank(delId)
      if (res.status === 1) {
        Toast.show({
          type: 'success',
          text1: "Bank Deleted Succesfully"
        })
        await getBanks()
      }
    } catch (err) {
      console.log("Error in deleting bank", err.message);
      // Toast.show({
      //   type: "error",
      //   text1: "Something went wrong"
      // })
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  useEffect(() => {
    dispatch({type:'empty'})
    getBanks()
  }, [isFocused])

  async function getBanks() {
    try {
      setLoading(true)
      let res = await wallService.getAllBanks()
      if (res.status === 1) {
        setBanks(res.banks)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("error in loading all banks in add bank", err.message);
    } finally {
      setLoading(false)
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ zIndex: 100 }} >
        <Toast />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}>
          <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "600" }}>Your Banks</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('addbankAccount')}
          style={styles.TouchableButton}>
          <Text style={styles.ViewText}>+Add</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        {
          loading ?
            <ActivityIndicator size={30} />
            :
            banks.length === 0 ?
              <NoDataFound message={"No Bank Added Yet"} action={getBanks} actionText={"Load Again"} />
              :
              banks.map((res, index) => {
                return (
                  <View key={res._id}>
                    <TouchableOpacity>
                      <View key={index} style={styles.bankDetailsContainer}>
                        <View style={styles.bankDetailsHeader}>
                          <View style={styles.bankIconContainer}>
                            <Image
                              source={require('../../assets/img/bank.png')}
                              resizeMode="contain"
                              style={styles.bankIcon}
                            />
                          </View>
                          <Text style={styles.bankName}>{res.bank_name}</Text>
                          <Text style={styles.verified}>{res.is_verifed ? 'verified' : 'not verified'}</Text>
                        </View>
                        <Text style={styles.bankHolder}>{res.acc_holder_name}</Text>
                        <View style={styles.bankAccountDetails}>
                          <Text style={styles.accountText}>{res.bank_acc_no}</Text>
                          <Text style={styles.ifscText}>{res.ifsc_code}</Text>
                        </View>
                        <View style={{ margin: 0 }}>
                          <TouchableOpacity onPress={() => { setDelId(res._id), setVisible(true) }} style={styles.button}>
                            <Text style={styles.buttonText}>Remove Account</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>

                  </View>
                );
              })}
      </ScrollView>

      <Overlay   isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <View style={styles.logoutView}>
          <Text style={styles.deletebanktext}>
            Press Delete to Confirm 
          </Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Delete"
              color={"#eb1313"}
            titleStyle={{color:"white",fontSize:15,padding:15,}}

              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                removeAccount()
                setVisible(!visible)
                getBanks()
              }
              }
            />
            <Button
            titleStyle={{color:"black",fontSize:15,padding:15,}}
              color={"#e6e3e8"}
              title="Cancel"
              buttonStyle={styles.logoutyesbutton}

              onPress={() => { setVisible(!visible) }} />
              
          </View>
        </View>
      </Overlay>
      
    

    </View>
  )
}

export default AddBanks

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 10,
    justifyContent: "space-between"
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
  TouchableButton: {
    backgroundColor: '#EFF4FA',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  ViewText: {
    fontSize: 13,
    color: '#367CFF',
    fontWeight: '500',
    fontFamily:"Work Sans"

  },
  bankDetailsContainer: {
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
  logoutView: {
    height: 170,
    width: 300,
    borderRadius:5,
    gap: 40,
    alignItems:"center",
    justifyContent:"center",
    
  },
  logoutbuttons: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logoutyesbutton: {
    borderRadius:10
  },
  deletebanktext: {
    color: ColorsConstant.Black,
    fontSize: 21,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    fontWeight:"600"
  },
  verified:{
    color:'#367CFF',
    textAlign:"right",
    flex:1,
    paddingRight:13,
  }
})