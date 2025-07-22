import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Text} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import WalletApiService from '../../services/api/WalletApiService';
import MainHeader from '../../components/MainHeader';
import Toast from 'react-native-toast-message';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

const History = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const wallet = new WalletApiService();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [datahistory, setDataHistory] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [tempStatusFilter, setTempStatusFilter] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['45%'];

  const statusOptions = [
    {
      id: '1',
      label: 'Accepted',
      color: '#129C73',
      icon: require('../../assets/img/mark.png'),
    },
    {
      id: '2',
      label: 'Pending',
      color: 'orange',
      icon: require('../../assets/img/wall-clock.png'),
    },
    {
      id: '3',
      label: 'Rejected',
      color: ColorsConstant.RedLight,
      icon: require('../../assets/img/multiply.png'),
    },
  ];

  useEffect(() => {
    getWalletHistoryData(1);
  }, [statusFilter]);

  async function getWalletHistoryData(page = 1) {
    try {
      if (page > totalPages && page !== 1) return;
      setLoading(page === 1);
      setLoadingMore(page > 1);

      const response = await wallet.withdrawTranctions(
        page,
        15,
        statusFilter || '',
      );
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid API response: data is not an array');
      }

      const newData = response.data.map(item => ({
        ...item,
        success:
          item.status === 'Pending' ? -1 : item.status === 'Accepted' ? 1 : 0,
        order_datetime: new Date(item.createdAt).toLocaleString(),
        type: 'debit',
        _id: String(item._id),
      }));

      setDataHistory(prevData => {
        const existingIds = new Set(prevData.map(item => item._id));
        const filteredNewData = newData.filter(
          item => !existingIds.has(item._id),
        );
        return page === 1 ? newData : [...prevData, ...filteredNewData];
      });

      if (response.pagination && response.pagination.totalPages) {
        setTotalPages(response.pagination.totalPages);
      } else if (newData.length < 15) {
        setTotalPages(page);
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

  const handleStatusSelect = status => {
    setTempStatusFilter(status);
  };

  const handleApplyFilter = () => {
    setStatusFilter(tempStatusFilter);
    setCurrentPage(1);
    bottomSheetRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

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
    else return 'Rejected';
  };

  const getStatusColor = success => {
    if (success === 1) return '#129C73';
    else if (success === -1) return 'orange';
    else return ColorsConstant.RedLight;
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{zIndex: 20}}>
          <Toast />
        </View>

        <View style={{flex: 0.1}}>
          <MainHeader
            name={'Transaction History'}
            rightIcon={{
              source: require('../../assets/img/filter.png'),
              onPress: () => bottomSheetRef.current?.present(),
            }}
          />
        </View>

        <View style={{flex: 1}}>
          {loading ? (
            <ActivityIndicator size={40} color={ColorsConstant.Theme} />
          ) : datahistory.length === 0 ? (
            <NoDataFound
              scale={0.8}
              message={'No Transaction History Yet..'}
              actionText={'Go back'}
              action={() => navigation.goBack()}
            />
          ) : (
            <FlatList
              onEndReachedThreshold={0.8}
              onEndReached={() => {
                if (currentPage < totalPages && !loadingMore) {
                  setCurrentPage(prev => prev + 1);
                  getWalletHistoryData(currentPage + 1);
                }
              }}
              data={datahistory}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View style={styles.historyContainer}>
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
                      <Text style={styles.transactionAmount}>
                        {item.amount}
                      </Text>
                      <Text style={styles.timestamp}>
                        {item.order_datetime}
                      </Text>
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
                          {color: getStatusColor(item.success)},
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
                </View>
              )}
            />
          )}
          {loadingMore && (
            <ActivityIndicator size={30} color={ColorsConstant.Theme} />
          )}
        </View>

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onDismiss={() => setTempStatusFilter(statusFilter)}>
          <BottomSheetView style={styles.sheetContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Status</Text>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.dismiss()}>
                <Image
                  source={require('../../assets/img/multiply.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>

            {statusOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => handleStatusSelect(option.label)}>
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: option.color},
                    ]}>
                    <Image
                      source={option.icon}
                      style={{height: 20, width: 20}}
                      tintColor={'#fff'}
                    />
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    tempStatusFilter === option.label && {
                      borderColor: option.color,
                    },
                  ]}>
                  <View
                    style={[
                      styles.radioInner,
                      tempStatusFilter === option.label && {
                        backgroundColor: option.color,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setTempStatusFilter(null);
                  setStatusFilter(null);
                  setCurrentPage(1);
                  // bottomSheetRef.current?.dismiss();
                }}>
                <Text style={styles.clearButtonText}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilter}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
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
    shadowOffset: {width: 0, height: 2},
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
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Work Sans',
    marginLeft: 10,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginRight: 10,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Work Sans',
    color: '#000',
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: ColorsConstant.Theme,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Work Sans',
    color: '#fff',
  },
});
