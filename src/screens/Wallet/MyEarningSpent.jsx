import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';
import { ColorsConstant } from '../../constants/Colors.constant';
import BasicServices from '../../services/BasicServices';

const MyEarningSpent = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const wallet = new WalletApiService();
  const [Spent, setSpentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  useEffect(() => {
    getSpentData();
  }, []);

  function getDataHelper(page) {
    return async () => {
      let res = await wallet.getSpentMoney(page);
      return res;
    }
  }

  async function getSpentData(page) {
    if (!page) {
      page = 1
    }
    if (page <= totalPages) {
      setCurrentPage(page)
      let func = setLoadingMore
      if (page === 1) {
        func = setLoading
      }
      let res = await BasicServices.apiTryCatch(getDataHelper(page), Toast, () => { func(true) }, () => { func(false) })
      if (res) {
        setTotalPages(res.totalPages)
        if (page === 1)
          setSpentData(res.mashup)
        else
          setSpentData([...Spent, ...res.mashup])
      }
    }
  }

  return (
    <>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <View style={styles.wrapper}>
        {loading ? (
          <ActivityIndicator color={ColorsConstant.Theme} size={35} />
        ) : Spent.length === 0 ? (
          <NoDataFound
            action={getSpentData}
            actionText={'Reaload'}
            message={'No Data Found'}
          />
        ) :
          <FlatList
            onEndReachedThreshold={0.8}
            onEndReached={() => { getSpentData(currentPage + 1) }}
            keyExtractor={item => item._id}
            data={Spent}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View>
                      <View style={{ flexDirection: 'row', }}>
                        <Image
                          source={require('../../assets/img/bb.png')}
                          style={styles.icon}
                        />
                        <View style={styles.info}>
                          <Text style={styles.amount}>- {item.amount}</Text>
                          <Text style={styles.date}>{item.date}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.titleWrapper}>
                      <Text style={styles.title}>{item.type}</Text>
                    </View>
                  </View>
                  <View style={styles.spentForWrapper}>
                    <Text style={styles.spentFor}>Spent for</Text>
                  </View>
                  <View style={styles.containerImg}>
                    <View style={styles.containerImg1}>
                      <Image
                        source={{ uri: BLOBURL + item.banner }}
                        resizeMode="cover"
                        style={styles.mainImage}
                      />
                    </View>

                    <Text style={styles.textTitle}>{item.name}</Text>
                  </View>
                </View>
              );
            }}
          />
        }
      </View>
      {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}

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
    paddingLeft: 20,
    borderRadius: 5,
    padding: 8,
    borderWidth:1,
    borderColor:"#F2F2F2",
    marginTop:5
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 35,
    width:35,
    resizeMode:"contain"
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
    fontSize: 14,
    fontWeight: '400',
    paddingRight: 5,
    textAlign: 'right',
    fontFamily: 'Work Sans',
  },
  spentForWrapper: {
    paddingTop: 20,
    paddingLeft:5
  },
  spentFor: {
    color: '#8A8A8A',
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
    borderRadius: 50,
    objectFit: 'cover',
    paddingLeft:5
  },

  mainImage: {
    width: 25,
    height: 25,
    borderRadius: 39
  },
  textTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#2E2E2E',
  },
});
