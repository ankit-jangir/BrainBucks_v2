import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';

const History = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const wallet = new WalletApiService();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [datahistory, setDataHistory] = useState([])

  useEffect(() => {
    getWalletHistoryData();
  }, []);

  function getDataHelper(page) {
    return async () => {
      let res = await wallet.getTransactions(page);
      return res;
    }
  }

  async function getWalletHistoryData(page) {
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
          setDataHistory(res.transactions)
        else
          setDataHistory([...datahistory, ...res.transactions])
      }
    }
  }




  const getArrowImage = type => {
    return type === 'debit'
      ? require('../../assets/img/arrowdown.png')
      : require('../../assets/img/uparrowss.png');
  };

  const getStatusIcon = success => {
    if (success === 1) return require('../../assets/img/arrowright.png');
    else if (success === -1) return require('../../assets/img/pending.png');
    else return require('../../assets/img/cross.png');
  };

  const getStatusText = success => {
    if (success === 1) return 'Success';
    else if (success === -1) return 'Pending';
    else return 'Failed';
  };

  const getStatusColor = (success, type) => {
    if (success === 1) return '#129C73';
    else if (success === -1) return 'orange';
    else return ColorsConstant.RedLight;
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ zIndex: 20 }}>
        <Toast />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      {
        loading
        ?
        <ActivityIndicator size={40} color={ColorsConstant.Theme}/>
        :
        datahistory.length === 0
          ?
          <NoDataFound scale={0.8} message={"No Transaction History Yet.."} actionText={"Go back"} action={() => { navigation.goBack() }} />
          :
          <FlatList
            onEndReachedThreshold={0.8}
            onEndReached={() => { getWalletHistoryData(currentPage + 1) }}
            data={datahistory}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.historyContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('transactionDetails', { res: item });
                    }}>
                    <View style={styles.transactionEntry}>
                      <View
                        style={[
                          styles.iconContainer,
                          {
                            backgroundColor:
                              item.success === -1
                                ? '#fff9ef'
                                : item.success === 1
                                  ? '#EFFFF6'
                                  : '#FFEFEF',
                          },
                        ]}>
                        <Image
                          source={getArrowImage(item.type)}
                          style={styles.icon}
                          tintColor={item.success === 1 ? '#129C73' : '#DC1111'}
                        />
                      </View>
                      <View>
                        <Text style={styles.transactionAmount}>{item.amount}</Text>
                        <Text style={styles.timestamp}>{item.order_datetime}</Text>
                      </View>
                      <View style={styles.statusContainer}>
                        <View style={[styles.statusIcon]}>
                          <Image
                            source={getStatusIcon(item.success)}
                            style={styles.icon1}
                          />
                        </View>
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(item.success, item.type) },
                          ]}>
                          {getStatusText(item.success)}
                        </Text>
                      </View>
                      <View style={styles.arrowIconContainer}>
                        <Image
                          source={require('../../assets/img/rightarrow1.png')}
                          style={styles.icon2}
                          tintColor={'gray'}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
      }
      {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}

    </View>

  );
};

export default History;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 20,
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
    fontFamily: 'Work Sans',
  },
  historyContainer: {
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  transactionEntry: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#EFFFF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  icon2: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  icon1: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  transactionAmount: {
    color: 'black',
    fontSize: 21,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  timestamp: {
    color: '#8A8A8A',
    fontFamily: 'Work Sans',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    paddingLeft: 8,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
