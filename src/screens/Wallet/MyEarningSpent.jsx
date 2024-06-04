import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native-elements';
import {Text} from '../../utils/Translate';
import {ScrollView} from 'react-native-gesture-handler';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';
import {ColorsConstant} from '../../constants/Colors.constant';

const MyEarningSpent = () => {
  const [loading, setLoading] = useState(false);
  const wallet = new WalletApiService();
  const [Spent, setSpentData] = useState([]);
  useEffect(() => {
    getSpentData();
  }, []);

  async function getSpentData() {
    try {
      setLoading(true);
      let res = await wallet.getSpentMoney();
      if (res.status === 1) {
        setSpentData(res.mashup);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting earned data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <View style={{zIndex:1}}>
    <Toast />
    </View>
      <ScrollView>
        <View style={styles.wrapper}>
          {loading ? (
            <ActivityIndicator color={ColorsConstant.Theme} size={35} />
          ) : Spent.length === 0 ? (
            <NoDataFound
              action={getSpentData}
              actionText={'Reaload'}
              message={'No Data Found'}
            />
          ) : (
            Spent.map(res => {
              return (
                <View key={res._id} style={styles.card}>
                  <View style={styles.row}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('../../assets/img/bb.png')}
                          style={styles.icon}
                        />
                        <View style={styles.info}>
                          <Text style={styles.amount}>- {res.amount}</Text>
                          <Text style={styles.date}>{res.date}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.titleWrapper}>
                      <Text style={styles.title}>{res.type}</Text>
                    </View>
                  </View>
                  <View style={styles.spentForWrapper}>
                    <Text style={styles.spentFor}>Spent for</Text>
                  </View>
                  <View style={styles.containerImg}>
                    <View style={styles.containerImg1}>
                      <Image
                        source={{uri: BLOBURL + res.banner}}
                        resizeMode="contain"
                        style={styles.mainImage}
                      />
                    </View>

                    <Text style={styles.textTitle}>{res.name}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default MyEarningSpent;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    margin: 8,
    paddingLeft: 20,
    borderRadius: 5,
    elevation: 3,
    padding: 8,
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
    color: '#DC1111',
    fontFamily: 'Work Sans',
  },
  date: {
    color: 'gray',
    fontSize: 10,
    fontFamily: 'Work Sans',
  },
  titleWrapper: {
    paddingLeft: 5,
    flex: 1,
  },
  title: {
    color: '#2E2E2E',
    fontSize: 17,
    fontWeight: '400',
    paddingRight: 5,
    textAlign: 'right',
    fontFamily: 'Work Sans',
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
  containerImg1: {
    borderWidth: 0.2,
    borderColor: 'lightgray',
    padding: 8,
    borderRadius: 50,
    objectFit: 'cover',
  },

  mainImage: {
    width: 20,
    height: 20,
  },
  textTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#2E2E2E',
  },
});
