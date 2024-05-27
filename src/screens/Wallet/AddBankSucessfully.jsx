import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native-elements'
import { useAddBank } from '../../context/AddBankReducer'

const AddBankSucessfully = ({ navigation }) => {
  const { addBankState, dispatch } = useAddBank()

  function removeDetails(type) {
    dispatch({ type: 'empty' })

    if (type === 'hardware')
      navigation.pop(2)
    else
      navigation.pop(3)
  }

  useEffect(() => {
    let eh = BackHandler.addEventListener('hardwareBackPress', ()=>{removeDetails('hardware')})
    return () => eh.remove()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#610ECD" }}>
      <View>
        <TouchableOpacity onPress={removeDetails}>
          <Image source={require('../../assets/img/radic.png')} style={{ height: 30, width: 30, margin: 20 }} tintColor={"white"} />

        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60, padding: 40 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "600", textAlign: "center" }}>Added following Bank account </Text>
      </View>
      <TouchableOpacity>
        <View style={styles.bankDetailsContainer}>
          <View style={styles.bankDetailsHeader}>
            <View style={styles.bankIconContainer}>
              <Image
                source={require('../../assets/img/bb.png')}
                resizeMode="contain"
                style={styles.bankIcon}
              />
            </View>
            <Text style={styles.bankName}>{addBankState.bankName}</Text>
          </View>
          <Text style={styles.bankHolder}>{addBankState.holderName}</Text>
          <View style={styles.bankAccountDetails}>
            <Text style={styles.accountText}>{addBankState.accnum}</Text>
            <Text style={styles.ifscText}>{addBankState.ifsc}</Text>
          </View>

        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeDetails} style={styles.payNowButton}>
        <Text style={styles.payNowText}>Back To Adding bank</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddBankSucessfully

const styles = StyleSheet.create({
  bankDetailsContainer: {
    margin: 20,
    paddingTop: 10,
    backgroundColor: '#EFEFEF',
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 50,
    paddingBottom: 15
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
    fontSize: 21,
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black',
  },
  bankHolder: {
    paddingLeft: 10,
    fontWeight: '400',
    color: '#7E7E7E',
    paddingTop: 20,
    fontSize: 17
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  payNowButton: {
    marginTop: 70,
    borderColor: "white",
    borderWidth: 1,
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  payNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "500"
  },
  accountText: {
    color: 'black',
    fontSize: 17

  },
  ifscText: {
    color: 'black',
    fontSize: 17

  },
})