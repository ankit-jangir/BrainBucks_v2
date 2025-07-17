import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import WalletApiService from '../../services/api/WalletApiService';
import MainHeader from '../../components/MainHeader';

const History = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const wallet = new WalletApiService();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [datahistory, setDataHistory] = useState([]);

  useEffect(() => {
    getWalletHistoryData(1);
  }, []);

  async function getWalletHistoryData(page = 1) {
    try {
      if (page > totalPages && page !== 1) return; // Prevent fetching beyond total pages
      setLoading(page === 1);
      setLoadingMore(page > 1);

      const response = await wallet.withdrawTranctions(page);
      const newData = response.data.map(item => ({
        ...item,
        // Map API status to success field for compatibility
        success: item.status === 'Pending' ? -1 : item.status === 'Accepted' ? 1 : 0,
        // Use createdAt as order_datetime, format if needed
        order_datetime: new Date(item.createdAt).toLocaleString(),
        // Assuming type is always 'debit' for withdrawals, adjust if needed
        type: 'debit',
        // Ensure _id is a string to avoid object-related issues
        _id: String(item._id),
      }));

      // Filter out duplicates by _id when appending new data
      setDataHistory(prevData => {
        const existingIds = new Set(prevData.map(item => item._id));
        const filteredNewData = newData.filter(item => !existingIds.has(item._id));
        return page === 1 ? newData : [...prevData, ...filteredNewData];
      });

      // Update totalPages based on API response or data length
      if (response.totalPages) {
        setTotalPages(response.totalPages);
      } else if (newData.length < 25) {
        setTotalPages(page); // Assume last page if fewer than limit items
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch transaction history',
      });
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
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
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ zIndex: 20 }}>
        <Toast />
      </View>

      <View style={{ flex: 0.1 }}>
        <MainHeader name={'Transaction History'} />
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size={40} color={ColorsConstant.Theme} />
        ) : datahistory.length === 0 ? (
          <NoDataFound
            scale={0.8}
            message={'No Transaction History Yet..'}
            actionText={'Go back'}
            action={() => {
              navigation.goBack();
            }}
          />
        ) : (
          <FlatList
            onEndReachedThreshold={0.8}
            onEndReached={() => {
              if (currentPage < totalPages) {
                setCurrentPage(prev => prev + 1);
                getWalletHistoryData(currentPage + 1);
              }
            }}
            data={datahistory}
            keyExtractor={item => item._id} // Ensure _id is a string
            renderItem={({ item }) => (
              <View style={styles.historyContainer}>
                <View
                  // onPress={() => {
                  //   navigation.navigate('transactionDetails', { res: item });
                  // }}
                >
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
                      ]}
                    >
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
                          style={styles.icon}
                        />
                      </View>
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(item.success, item.type) },
                        ]}
                      >
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
                </View>
              </View>
            )}
          />
        )}
        {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  transactionEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 18,
    alignSelf: 'center',
  },
  transactionAmount: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  timestamp: {
    color: '#8A8A8A',
    fontSize: 11,
    fontFamily: 'Work Sans',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon2: {
    height: 12,
    width: 12,
  },
});