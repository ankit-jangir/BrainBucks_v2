import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../../utils/Translate';
import WalletApiService from '../../services/api/WalletApiService';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import NoDataFound from '../../components/NoDataFound';
import {useSignal} from '@preact/signals-react';
import Toast from 'react-native-toast-message';
import { useWithdraw } from '../../context/WithdrawReducer';
import { ColorsConstant } from '../../constants/Colors.constant';
import basic from '../../services/BasicServices';

import MainHeader from '../../components/MainHeader';
import BasicServices from '../../services/BasicServices';
import { RefreshControl } from 'react-native';

export default function Wallet({navigation}) {
  const walletData = useSignal({
    investmoney: 0,
    wallet: 0,
    redemmoney: 0,
    transactions: [],
    currentPage: 1,
    totalPages: 1,
  });

  const [userType, setUserType] = useState(null);
  console.log(userType)
  useEffect(() => {
    if (isFocused) {
      basic.getBearerToken().catch(err => {
        console.log('Error fetching JWT token:', err);
      });

      basic
        .getUserType()
        .then(type => {
          console.log('User Type (is_edu):', type);
          setUserType(type);
        })
        .catch(err => {
          console.log('Error fetching user type:', err);
        });
    }
  }, [isFocused]);
  const [loading, setLoading] = useState(false);
  const wallet = new WalletApiService();
  const isFocused = useIsFocused();
  const {withdrawState, dispatch} = useWithdraw();

  const getArrowImage = type => {
    return type === 'debit'
      ? require('../../assets/img/arrowdown.png')
      : require('../../assets/img/uparrowss.png');
  };

  const getStatusIcon = success => {
    if (success === 1) return require('../../assets/img/arrowright.png');
    else if (success === -1) return require('../../assets/img/pending.png');
    else return require('../../assets/img/cancel.png');
  };

  const getStatusText = success => {
    if (success === 1) return 'Success';
    else if (success === -1) return 'Pending';
    else return 'Failed';
  };

  const getStatusColor = success => {
    if (success === 1) return '#129C73';
    else if (success === -1) return 'orange';
    else return '#B71C1C';
  };

  useEffect(() => {
    walletData.value.transactions = [];
    walletData.value.currentPage = 1;
    getWalletData();
    getTransactions(1);
  }, [isFocused]);

  function getDataHelper(page) {
    return async () => {
      let res = await wallet.getTransactions(page);
      return res;
    };
  }

  async function getTransactions(page = 1) {
    const func = setLoading;
    const res = await BasicServices.apiTryCatch(
      getDataHelper(page),
      Toast,
      () => func(true),
      () => func(false),
    );

    if (res) {
      let newTransactions = res.transactions || [];
      walletData.value = {
        ...walletData.value,
        transactions:
          page === 1
            ? newTransactions
            : [...walletData.value.transactions, ...newTransactions],
        currentPage: page,
        totalPages: res.totalPages || walletData.value.totalPages,
      };
    }
  }

  async function getWalletData() {
    try {
      setLoading(true);
      let res = await wallet.getTransactions(1, 10);
      if (res.status === 1) {
        walletData.value = {...walletData.value, ...res};
        dispatch({type: 'details', withdrawDetails: {balance: res.wallet}});
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
        console.log('====================================');
        console.log(res.Backend_Error);
        console.log('====================================');
      }
    } catch (err) {
      console.log('Error while getting wallet data', err.message);
    } finally {
      setLoading(false);
    }
  }

  function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }



  return (
    <View style={styles.container}>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>
      <View style={styles.stdView1}>
        <MainHeader
          name={'My Wallet'}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              navigation.navigate("Home");
            },
          }}
        />
      </View>
      <View style={styles.container1}>
        <LinearGradient
          style={{width: '100%', borderRadius: 10}}
          colors={['#E34F4F', '#D64A7B', '#C143BC']}>
          <View style={styles.containerImg1}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../../assets/img/wallet.png')}
                style={styles.walletIcon}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}> My Wallet </Text>
            </View>
          </View>

          <View>
            <Text
              key={walletData.value.wallet + 'balance'}
              style={styles.balanceText}>
              ₹ {walletData.value.wallet}
            </Text>
          </View>

          <View style={styles.containerImg1}>
            <View style={styles.growthContainer}>
              <Text style={styles.growthText}>Balance</Text>
            </View>

            <View style={styles.investedContainer}>
              <Text style={styles.investedText}>Invested</Text>
              <Text
                key={walletData.value.investmoney}
                style={styles.investedAmount}>
                ₹ {walletData.value.investmoney}
              </Text>
            </View>
          </View>

          <View style={styles.containerImg2}>
            <View style={styles.redeemableContainer}>
              <Text
                style={styles.redeemableText}
                key={walletData.value.redemmoney + 'redeem'}>
                Total Transactions ₹ {walletData.value.redemmoney}
              </Text>
            </View>

            {userType === false ? (
              <TouchableOpacity
                style={styles.detailsContainer}
                onPress={() => navigation.navigate('myEarning')}>
                <Text style={styles.detailsText}>Details</Text>
                <Image
                  tintColor="white"
                  source={require('../../assets/img/rightarrow1.png')}
                  style={styles.detailsIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}

          </View>
        </LinearGradient>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('Deposit')}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/arrowdown.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('withdraw')}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/uparrow.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              navigation.navigate('history', {
                data: walletData.value.transactions,
              })
            }>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/updown.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionText}>Withdraw History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              navigation.navigate('addbankDetails');
            }}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/plus.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionText}>Add Bank</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer1}>
          <Text style={styles.RecentText}>Deposit Transactions</Text>
        </View>
      </View>

      <ScrollView
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getWalletData} />}
        onScroll={({ nativeEvent }) => {
          if (
            isCloseToBottom(nativeEvent) &&
            !loading &&
            walletData.value.currentPage < walletData.value.totalPages
          ) {
            getTransactions(walletData.value.currentPage + 1);
          }
        }}
        scrollEventThrottle={400}>
        {loading && walletData.value.transactions.length === 0 ? (
          <ActivityIndicator size={30} color={ColorsConstant.Theme} />
        ) : walletData.value.transactions.length === 0 ? (
          <NoDataFound
            message={'No Transactions yet'}
            action={() => getTransactions(1)}
            actionText={'Load Again'}
          />
        ) : (
          <>
            {walletData.value.transactions.map((res, index) => (
              <View key={res._id} style={styles.historyContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('transactionDetails', {res})
                  }>
                  <View style={styles.transactionEntry}>
                    <View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor:
                            res.success === -1
                              ? '#fff9ef'
                              : res.success === 1
                                ? '#EFFFF6'
                                : '#FFEFEF',
                        },
                      ]}>
                      <Image
                        source={getArrowImage(res.type)}
                        style={styles.icon}
                        tintColor={res.success === 1 ? '#129C73' : '#DC1111'}
                      />
                    </View>
                    <View>
                      <Text style={styles.transactionAmount}>
                        ₹ {res.amount}
                      </Text>
                      <Text style={styles.timestamp}>{res.order_datetime}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Image
                        source={getStatusIcon(res.success)}
                        style={styles.icon1}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          {color: getStatusColor(res.success)},
                        ]}>
                        {getStatusText(res.success)}
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
            ))}
            {loading && (
              <ActivityIndicator
                size="small"
                color={ColorsConstant.Theme}
                style={{marginVertical: 10}}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    padding: 8,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Work Sans',
  },
  containerImg1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginTop: 10,
    paddingVertical: 10,
  },
  containerImg2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff50',
    borderBottomRightRadius: 5,
    borderBottomStartRadius: 5,
    // marginTop: 10,
    padding: 10,
  },
  // Header Section
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  walletIcon: {
    height: 25,
    width: 25,
  },
  headerTitle: {
    marginLeft: 10,
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Work Sans',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  shareText: {
    color: 'white',
    fontFamily: 'Work Sans',
    fontSize: 14,
  },
  shareIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  // Balance Section
  balanceText: {
    marginHorizontal: 20,
    fontSize: 23,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Work Sans',
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    padding: 4,
    backgroundColor: '#ffffff50',
    borderRadius: 5,
  },
  growthText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Work Sans',
  },
  investedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  investedText: {
    color: 'white',
    fontFamily: 'Work Sans',
  },
  investedAmount: {
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Work Sans',
  },
  // Redeemable Section
  redeemableContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  redeemableText: {
    color: 'white',
    fontFamily: 'Work Sans',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailsText: {
    color: 'white',
    fontFamily: 'Work Sans',
  },
  detailsIcon: {
    height: 15,
    width: 15,
    marginLeft: 10,
  },
  // Actions Section
  actionsContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  actionsContainer1: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    paddingLeft: 7,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#edebeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    height: 15,
    width: 15,
  },
  actionText: {
    textAlign: 'center',
    color: '#8A8C94',
    padding: 2,
    fontFamily: 'Work Sans',
    fontSize: 12,
  },
  // Recent Transactions Section
  actionsContainer1: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    paddingLeft: 7,
  },
  RecentText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  TouchableButton: {
    padding: 6,
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
  },
  ViewText: {
    color: '#0552b5',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  // Transactions Section
  historyContainer: {
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    elevation: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  transactionEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  statusIcon: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#8A8C94',
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon2: {
    height: 15,
    width: 15,
  },
  stdView1: {
    width: '100%',
    height: 60,
    backgroundColor: '#f7f7f7',
  },
});
