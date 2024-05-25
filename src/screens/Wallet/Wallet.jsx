import { StyleSheet, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import History from './History';
import WalletApiService from '../../services/api/WalletApiService';
import {useNavigation,NavigationContainer,useIsFocused} from '@react-navigation/native';



export default function Wallet  ({navigation}) {
  // const isFocused = useNavigation();
  const data = [
    {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      success: 1,
      type: "credit",
    },
    {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      success: -1,
      type: "debit",
    },
    {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      success: 0,
      type: "credit",
    },
    {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      sucess: 1,
      type: "debit",
    }, {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      success: 1,
      type: "debit",
    },
    {
      r: "₹ 15,600",
      s: "12:34 | 20 Dec 2022",
      success: 0,
      type: "credit",
    }
  ];
  const getArrowImage = (type) => {
    return type === 'credit' 
      ? require('../../assets/img/downarrow.png')
      : require('../../assets/img/uparrowss.png');
  };

  const getStatusIcon = (success) => {
    if (success === 1) return require('../../assets/img/arrowright.png');
    else if(success === -1) return require('../../assets/img/pending.png');
    else return require('../../assets/img/cross.png');
  };

  const getStatusText = (success) => {
    if (success === 1) return 'Success';
    else if (success === -1) return 'Pending';
    else return 'Failed';
  };

  const getStatusColor = (success, type) => {
    if (success === 1) return '#129C73'; 
    else if (success === -1) return 'orange'; 
    else if (type === 'credit') return 'red'; 
    else return '#FFEFEF';
  };

  const [walletData, setWalletData] = useState({
    investmoney: 0,
    wallet: 0,
    redemmoney: 0,
    transactions: []
  })
  const [loading, setLoading] = useState(false)
  const wallet = new WalletApiService()
  useEffect(() => {
    getWalletData();
  }, [])

  async function getWalletData() {
    try {
      setLoading(true)
      let res = await wallet.getTransactions()
      if (res.status === 1) {
        console.log(res);
        setWalletData(res)
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
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          marginBottom:5,
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
          style={{ width: '100%', borderRadius: 10 }}
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
            <Text style={styles.balanceText}>₹ {walletData.wallet} </Text>
          </View>

          <View style={styles.containerImg1}>
            <View style={styles.growthContainer}>
              <Text style={styles.growthText}>+121.56%</Text>
            </View>

            <View style={styles.investedContainer}>
              <Text style={styles.investedText}>Invested</Text>
              <Text style={styles.investedAmount}>₹ {walletData.investmoney}</Text>
            </View>
          </View>

          <View style={styles.containerImg2}>
            <View style={styles.redeemableContainer}>
              <Text style={styles.redeemableText}>
                Total Transactions ₹ {walletData.redemmoney}
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

          <TouchableOpacity style={styles.actionItem} onPress={()=>{navigation.navigate('addbankDetails')}}>
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
      {data.map((res, index) => (
        <View key={index} style={styles.historyContainer}>
          <TouchableOpacity onPress={() => { navigation.navigate('transactionDetails') }}>
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
                <Text style={styles.transactionAmount}>{res.r}</Text>
                <Text style={styles.timestamp}>{res.s}</Text>
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
};



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
    fontSize: 22,
    fontWeight: 'bold',
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
    marginBottom:10
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
    fontSize: 21,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  shareText: {
    color: 'white',
  },
  shareIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  balanceText: {
    margin: 20,
    fontSize: 27,
    fontWeight: '700',
    color: 'white',
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
  },
  investedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  investedText: {
    color: 'white',
  },
  investedAmount: {
    marginLeft: 10,
    color: 'white',
  },
  redeemableContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  redeemableText: {
    color: 'white',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailsText: {
    color: 'white',
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
    paddingHorizontal:5
  },
  actionsContainer1: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    paddingLeft:7,
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
  },
  RecentText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  TouchableButton: {
    backgroundColor: '#F5F5F5',
    padding:5,
    borderRadius: 8,
    marginRight: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  ViewText: {
    fontSize: 13,
     color: '#8A8C94', 
     fontWeight: '500'
    },
    historyContainer: {
      margin: 10,
      backgroundColor: "#FFFFFF",
    },
    transactionEntry: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      justifyContent: "space-between",
      padding: 15,
      borderRadius: 10,
      borderWidth:1,
      borderColor:"lightgray"
    },
    iconContainer: {
      height: 40,
      width: 40,
      borderRadius: 50,
      backgroundColor: "#EFFFF6",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      height: 20,
      width: 20,
      alignSelf: "center",
    },
    icon2: {
      height: 15,
      width: 15,
      alignSelf: "center",
    },
    icon1: {
      height: 20,
      width: 20,
      alignSelf: "center",
    },
    transactionAmount: {
      color: "black",
      fontSize: 21,
      fontWeight: "600",
    },
    timestamp: {
      color: "#8A8A8A",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusIcon: {
      height: 25,
      width: 25,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    statusText: {
      paddingLeft: 8,
      fontSize: 17,
      fontWeight: "600",
    },
    arrowIconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
});
