import { StyleSheet, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '../../utils/Translate'
import WalletApiService from '../../services/api/WalletApiService'
import Toast from 'react-native-toast-message'
import NoDataFound from '../../components/NoDataFound'

const AddBanks = ({ navigation }) => {

  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState([])

  const wallService = new WalletApiService()

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


  useEffect(() => {
    getBanks()
  }, [])

  async function getBanks() {
    try {
      setLoading(true)
      let res = await wallService.getAllBanks()
      if (res.status === 1) {
        console.log(res, "RES");
        setBanks(banks)
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
      <Toast />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}>
          <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('addbankAccount')}
          style={styles.TouchableButton}>
          <Text style={styles.ViewText}>+Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "black", fontSize: 17, fontWeight: "600",fontFamily:"Work Sans"
      }}>Your Banks</Text>
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
                          <Text style={styles.bankName}>{res.bankname}</Text>

                        </View>
                        <Text style={styles.bankHolder}>{res.HolName}</Text>
                        <View style={styles.bankAccountDetails}>
                          <Text style={styles.accountText}>{res.Acc}</Text>
                          <Text style={styles.ifscText}>{res.ifc}</Text>
                        </View>
                        <View style={{ margin: 0 }}>
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
})