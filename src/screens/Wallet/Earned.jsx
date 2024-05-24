import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';

const Earned = () => {
  const data = [
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
    {
      data1: "+399",
      time: "15:36 | 23 Dec 2022",
      part: "Quiz Reward",
      data2: "Reward for",
      data3: "SBI-PO Current Affairs"
    },
  ]
  const [loading, setLoading] = useState(false)
  const wallet = new WalletApiService()
  useEffect(() => {
    getEarnedData();
  }, [])

  async function getEarnedData() {
    try {
      setLoading(true)
      let res = await wallet.getEarnedMoney()
      if (res.status === 1) {
        console.log(res);
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
            data.map((res) => {
              return (
                <View style={styles.card}>
                  <View style={styles.row}>
                    <Image
                      source={require('../../assets/img/bb.png')}
                      style={styles.icon}
                    />
                    <View style={styles.info}>
                      <Text style={styles.amount}>{res.data1}</Text>
                      <Text style={styles.date}>{res.time}</Text>
                    </View>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.title}>{res.part}</Text>
                    </View>
                  </View>
                  <View style={styles.spentForWrapper}>
                    <Text style={styles.spentFor}>{res.data2}</Text>
                  </View>
                  <View style={styles.containerImg}>
                    <Image
                      source={require('../../assets/img/Rectangle.png')}
                      resizeMode="contain"
                      style={styles.mainImage}
                    />
                    <Text style={styles.textTitle}>{res.data3}</Text>
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
    color: "#16AC72"
  },
  date: {
    color: 'gray',
    fontSize: 10,
  },
  titleWrapper: {
    paddingLeft: 5,
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    paddingRight:5,
    textAlign:"right"

  },
  spentForWrapper: {
    paddingTop: 20,
  },
  spentFor: {
    color: 'lightgray',
    fontSize: 14,
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  mainImage: {
    width: 20,
    height: 20,
  },
  textTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
  },
});
