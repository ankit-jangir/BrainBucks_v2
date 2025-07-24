import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from '../../utils/Translate';
import WalletApiService from '../../services/api/WalletApiService';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import {Overlay} from '@rneui/themed';
import {useIsFocused} from '@react-navigation/native';
import {ColorsConstant} from '../../constants/Colors.constant';
import {color} from '@rneui/base';
import {useAddBank} from '../../context/AddBankReducer';
import MainHeader from '../../components/MainHeader';

const AddBanks = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  console.log(banks)
  const [visible, setVisible] = useState(false);
  const [delId, setDelId] = useState('');
  const isFocused = useIsFocused();
  const {addBankState, dispatch} = useAddBank();

  const wallService = new WalletApiService();

  async function removeAccount() {
    try {
      setLoading(true);
      let res = await wallService.deleteBank(delId);
      if (res.status === 1) {
        ToastAndroid.show('Bank Deleted Succesfully', ToastAndroid.SHORT);
        await getBanks();
      }
    } catch (err) {
      console.log('Error in deleting bank', err.message);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  }

  useEffect(() => {
    dispatch({type: 'empty'});
    getBanks();
  }, [isFocused]);

  async function getBanks() {
    try {
      setLoading(true);
      let res = await wallService.getAllBanks();
      if (res.status === 1) {
        setBanks(res.data);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('error in loading all banks in add bank', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>
      <MainHeader
        name={'Bank Account'}
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.navigate('wallet'),
        }}
      />

      <ScrollView>
        {loading ? (
          <ActivityIndicator size={30} />
        ) : banks.length === 0 ? (
          <NoDataFound
            message={'No Bank Added Yet'}
            action={getBanks}
            actionText={'Load Again'}
          />
        ) : (
          banks.map((res, index) => {
            return (
              <View key={res._id}>
                <View>
                  <View key={index} style={styles.bankDetailsContainer}>
                    <View style={styles.bankDetailsHeader}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                      <View style={styles.bankIconContainer}>
                        <Image
                          source={require('../../assets/img/bank.png')}
                          resizeMode="contain"
                          style={styles.bankIcon}
                        />
                      </View>
                      <Text style={styles.bankName}>{res.bank_name}</Text>
                      
                      </View>
                      <View style={[styles.data, {
                            backgroundColor:
                              res.status === 'pending'
                                ? '#FFEDD5'
                                : res.status === 'accepted'
                                  ? '#DCFCE7'
                                  : '#dcfce7',
                          }]}>
                      <Text
                        style={[
                          styles.verified,
                          {
                            color:
                              res.status === 'pending'
                                ? 'orange'
                                : res.status === 'accepted'
                                  ? 'green'
                                  : 'red',
                          },
                        ]}>
                        {res.status}
                      </Text>
                      </View>
                      
                    </View>
                    <View style={{paddingBottom:20}}>
                    <Text style={[styles.bankHolder1]}>
                      Account Holder
                    </Text>
                    <Text style={styles.bankHolder}>
                      {res.account_holder_name}
                    </Text>
                    <Text style={[styles.bankHolder1]}>
                      Account Number
                    </Text>
                    <Text style={styles.bankHolder}>
                      {res.account_number}
                    </Text>
                    <Text style={[styles.bankHolder1]}>
                     IFSC Code
                    </Text>
                    <Text style={styles.bankHolder}>
                      {res.ifsc}
                    </Text>
                    </View>
                    {/*<View style={{margin: 0}}>
                      <TouchableOpacity
                        onPress={() => {
                          setDelId(res._id), setVisible(true);
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Remove Account</Text>
                      </TouchableOpacity>
                    </View>*/}
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <View style={styles.logoutView}>
          <Text style={styles.deletebanktext}>Press Delete to Confirm</Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Delete"
              color={'#eb1313'}
              titleStyle={{color: 'white', fontSize: 15, padding: 15}}
              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                removeAccount();
                setVisible(!visible);
                getBanks();
              }}
            />
            <Button
              titleStyle={{color: 'black', fontSize: 15, padding: 15}}
              color={'#e6e3e8'}
              title="Cancel"
              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                setVisible(!visible);
              }}
            />
          </View>
        </View>
      </Overlay>

      <TouchableOpacity
        onPress={() => navigation.navigate('addbankAccount')} // Replace with your actual screen
        style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBanks;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#701DDB',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  backImage: {
    height: 25,
    width: 25,
    marginRight: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  TouchableButton: {
    backgroundColor: '#EFF4FA',
    padding: 7,
    borderRadius: 8,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  ViewText: {
    fontSize: 13,
    color: '#367CFF',
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  bankDetailsContainer: {
    margin: 10,
    padding: 10,
    backgroundColor:'#fff',
    borderRadius: 10,
  },
  bankDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
    paddingRight:10
  },
  bankIconContainer: {
    height:40,
    width: 40,
    justifyContent:"center"
  },
  bankIcon: {
    height: '80%',
    width: '80%',
  },
  bankName: {
    fontSize: 17,
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black',
  },

  bankHolder1: {
    fontWeight: '400',
    color: '#666262ff',
    paddingTop:10,
    fontSize:14,
    fontFamily:"Inter"
  },
  bankHolder: {
    fontWeight: '500',
    color: '#000000',
    paddingTop:5,
    fontSize:16,
    fontFamily:"Inter",
  },
  bankAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  accountText: {
    color: 'black',
  },
  ifscText: {
    color: 'black',
  },
  button: {
    backgroundColor: '#FFF2F2',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    color: '#D92828',
    fontSize: 14,
    fontWeight: '400',
  },
  logoutView: {
    height: 170,
    width: 300,
    borderRadius: 5,
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutbuttons: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutyesbutton: {
    borderRadius: 10,
  },
  deletebanktext: {
    color: ColorsConstant.Black,
    fontSize: 21,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    fontWeight: '600',
  },
  verified: {
    color: '#367CFF',
    textAlign: 'right',
  },
  data:{paddingVertical:5,backgroundColor:"red",paddingHorizontal:15,borderRadius:50}
});
