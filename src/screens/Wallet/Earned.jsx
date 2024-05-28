import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';

const Earned = () => {
 
  const [loading, setLoading] = useState(false)
  const [Earned, setEarned] = useState([])

  const wallet = new WalletApiService()
  useEffect(() => {
    getEarnedData();
  }, [])

  async function getEarnedData() {
    try {
      setLoading(true)
      let res = await wallet.getEarnedMoney()
      if (res.status === 1) {
          setEarned(res.mashup)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error while getting earned data", err.message);
      Toast.show({
        type: 'error',
        text1: "Something went wrong"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toast />
      <ScrollView>
        <View style={styles.wrapper}>
          {
            Earned.map((res) => {
              return (
                <View style={styles.card}>
                  <View style={styles.row}>
                    <Image
                      source={require('../../assets/img/bb.png')}
                      style={styles.icon}
                    />
                    <View style={styles.info}>
                      <Text style={styles.amount}>{res.amount}</Text>
                      <Text style={styles.date}>{res.date}</Text>
                    </View>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.title}>{res.type}</Text>
                    </View>
                  </View>
                  <View style={styles.spentForWrapper}>
                    <Text style={styles.spentFor}>Reward for</Text>
                  </View>
                  <View style={styles.containerImg}>
                  <View style={styles.containerImg1}>
                  <Image
                  source={{uri:BLOBURL+res.banner}}
                    resizeMode="contain"
                    style={styles.mainImage}
                  />
                  </View>
                    <Text style={styles.textTitle}>{res.name}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
      </ScrollView>

    </>
  );
};

export default Earned;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    backgroundColor: "white"
  },
  card: {
    backgroundColor: 'white',
    margin: 8,
    paddingLeft: 20,
    borderRadius: 5,
    elevation: 3,
    padding: 8
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 35,
    width: 35,
  },
  info: {
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#16AC72",
    fontFamily:"Work Sans"

  },
  date: {
    color: 'gray',
    fontSize: 10,
    fontFamily:"Work Sans"

  },
  titleWrapper: {
    paddingLeft: 5,
    flex: 1,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 14,
    fontWeight: '400',
    paddingRight:5,
    textAlign:"right",
    fontFamily:"Work Sans"


  },
  spentForWrapper: {
    paddingTop: 20,
  },
  spentFor: {
    color: 'lightgray',
    fontSize: 14,
    fontFamily:"Work Sans"

  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  containerImg1:{
    borderWidth:0.2,
    borderColor:"lightgray",
    padding:8,
    borderRadius:50,
    objectFit:"cover",

  },
  mainImage: {
    width: 20,
    height: 20,
  },
  textTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    fontFamily:"Inter",
    color:"#2E2E2E"

  },
});
