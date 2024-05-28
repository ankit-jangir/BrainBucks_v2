import {
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native-elements';
import {Text} from '../../utils/Translate';
import History from './History';
import WalletApiService from '../../services/api/WalletApiService';
import {
  useNavigation,
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import NoDataFound from '../../components/NoDataFound';
import { useSignal } from '@preact/signals-react';
import Toast from 'react-native-toast-message';
import { useWithdraw } from '../../context/WithdrawReducer';


export default function Wallet({ navigation }) {

  const getArrowImage = (type) => {
    return type === 'debit'
      ? require('../../assets/img/downarrow.png')
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
    else return '#B71C1C';
  };

  const walletData = useSignal({
    investmoney: 0,
    wallet: 0,
    redemmoney: 0,
    transactions: []
  })
  const { withdrawState, dispatch } = useWithdraw()
  const [loading, setLoading] = useState(false)
  const wallet = new WalletApiService()
  const isFocused = useIsFocused()

  useEffect(() => {
    getWalletData();
  }, [isFocused])

  async function getWalletData() {
    try {
      setLoading(true);
      let res = await wallet.getTransactions();
      if (res.status === 1) {
        walletData.value = res;
        dispatch({ type: 'details', withdrawDetails: { balance: res.wallet } })
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
    <View style={styles.container}>
      <View style={{zIndex:100}}>
      <Toast />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          marginBottom: 5,
        }}>
        <View>
          <Image
            source={require('../../assets/img/menu.png')}
            tintColor={'black'}
            style={{height: 25, width: 25}}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View>
          <Text style={styles.heading}>My Wallet</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/img/homedark.png')}
            tintColor={'balck'}
            style={{height: 25, width: 25}}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
      <View style={styles.container1}>
        <LinearGradient
          style={{width: '100%', borderRadius: 10}}
          colors={['#E34F4F', '#D64A7B', '#C143BC']}>
          <View style={styles.containerImg1}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../../assets/img/walletI.png')}
                style={styles.walletIcon}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}> My Wallet </Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.shareText}>Share</Text>
              <TouchableOpacity>
                <Image
                  tintColor="white"
                  source={require('../../assets/img/share.png')}
                  style={styles.shareIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text key={walletData.value.wallet + "balance"} style={styles.balanceText}>₹ {walletData.value.wallet} </Text>
          </View>

          <View style={styles.containerImg1}>
            <View style={styles.growthContainer}>
              <Text style={styles.growthText}>+121.56%</Text>
            </View>

            <View style={styles.investedContainer}>
              <Text style={styles.investedText + "invested"}>Invested</Text>
              <Text key={walletData.value.investmoney} style={styles.investedAmount}>₹ {walletData.value.investmoney}</Text>
            </View>
          </View>

          <View style={styles.containerImg2}>
            <View style={styles.redeemableContainer}>
              <Text style={styles.redeemableText} key={walletData.value.redemmoney + "redeem"}>
                Total Transactions ₹ {walletData.value.redemmoney}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text
                style={styles.detailsText}
                onPress={() => navigation.navigate('myEarning')}>
                Details
              </Text>
              <Image
                tintColor="white"
                source={require('../../assets/img/rightarrow1.png')}
                style={styles.detailsIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('deposit')}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/downarrow.png')}
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
            onPress={() => navigation.navigate('history')}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/updown.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.actionText}>History</Text>
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
          <Text style={styles.RecentText}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('history')}
            style={styles.TouchableButton}>
            <Text style={styles.ViewText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {
          loading
            ?
            <ActivityIndicator />
            :
            walletData.value.transactions.length === 0 ?
              <NoDataFound message={"No Transactions yet"} action={getWalletData} actionText={"Load Again"} />
              :
              walletData.value.transactions.map((res, index) => (
                <View key={res._id} style={styles.historyContainer}>
                  <TouchableOpacity onPress={() => { navigation.navigate('transactionDetails',{id:res._id}) }}>
                    <View style={styles.transactionEntry}>
                      <View
                        style={[
                          styles.iconContainer,
                          {
                            backgroundColor: res.success === -1 ? '#fff9ef' :
                              res.success === 1 ? '#EFFFF6' : '#FFEFEF'
                          },
                        ]}>
                        <Image
                          source={getArrowImage(res.type)}
                          style={styles.icon}
                          tintColor={res.success === 1 ? '#129C73' : '#DC1111'}
                        />
                      </View>
                      <View>
                        <Text style={styles.transactionAmount}>₹ {res.amount}</Text>
                        <Text style={styles.timestamp}>{res.order_datetime}</Text>
                      </View>
                      <View style={styles.statusContainer}>
                        <View style={[styles.statusIcon]}>
                          <Image
                            source={getStatusIcon(res.success)}
                            style={styles.icon1}
                          />
                        </View>
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(res.success, res.type) },
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: 10,
  },
  containerImg2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff50',
    borderBottomRightRadius: 5,
    borderBottomStartRadius: 5,
    marginTop: 15,
    padding: 10,
    marginBottom: 10,
  },
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
  balanceText: {
    margin: 20,
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
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 5
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
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    height: 25,
    width: 25,
  },
  actionText: {
    textAlign: 'center',
    color: '#8A8C94',
    padding: 2,
    fontFamily: 'Work Sans',
    fontSize: 14,
  },
  RecentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Work Sans',
  },
  TouchableButton: {
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  ViewText: {
    fontSize: 12,
    color: '#8A8C94',
    fontWeight: '500',
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  timestamp: {
    color: '#8A8A8A',
    fontFamily: 'Work Sans',
    fontSize: 12,
    fontWeight: '400',
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
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Work Sans',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
