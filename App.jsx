import React, { useEffect } from 'react';
import { Text, Image, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Sidebar from './src/screens/Home/Sidebar';
import Wallet from './src/screens/Wallet/Wallet';
import Study from './src/screens/Study/Study';
import Saved from './src/screens/saved/Saved';
import SearchBar from './src/screens/Home/SearchBar';
import Splash from './src/screens/Login/Splash';
import SingUp from './src/screens/Login/Signup';
import Otp from './src/screens/Login/Otp';
import VideoPlayer from './src/screens/Courses/VideoPlayer';
import SignupName from './src/screens/Login/SignupName';
import SignupGender from './src/screens/Login/SignupGender';
import SignUpExam from './src/screens/Login/SignupExam';
import ViewProfile from './src/screens/Profile/ViewProfile';
import EditProfile from './src/screens/Profile/EditProfile';
import StudyExam from './src/screens/Study/StudyExam';
import FreePdf from './src/screens/Study/FreePdf';
import OnlineClasses from './src/screens/Study/OnlineClasses';
import StudyMaterials from './src/screens/Study/StudyMaterials';
import Courses from './src/screens/Courses/Courses';
import onAppBootstrap from './src/config/FirebaseConfig';
import PaidCourses from './src/screens/Courses/PaidCourses';
import QuestionPapers from './src/screens/Study/QuestionPapers';
import MyEarning from './src/screens/Wallet/MyEarning';
import Deposit from './src/screens/Wallet/Deposit';
import History from './src/screens/Wallet/History';
import Withdraw from './src/screens/Wallet/Withdraw';
import AddBank from './src/screens/Wallet/AddBankAccount';
import BankDetails from './src/screens/Wallet/AddBanks';
import WalletOtp from './src/screens/Wallet/WithdrawOtp';
import AddBankSucessfully from './src/screens/Wallet/AddBankSucessfully';
import WithdrawReq from './src/screens/Wallet/WithdrawReq';
import TransctionDetails from './src/screens/Wallet/TransctionDetails';
import WithdrawMoney from './src/screens/Wallet/WithdrawMoney';
import AccoountDeatils from './src/screens/Wallet/AccountDeatils';
import BankOtp from './src/screens/Wallet/BankOtp';
import BackWithdraw from './src/screens/Wallet/BackWithdraw';
import WithdrawOtp from './src/screens/Wallet/WithdrawOtp';
import AddBanks from './src/screens/Wallet/AddBanks';
import AddBankAccount from './src/screens/Wallet/AddBankAccount';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  useEffect(() => {
    onAppBootstrap();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="signup" component={SingUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Home" component={MyDrawer} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="study" component={Study} />
      <Stack.Screen name="saved" component={Saved} />
      <Stack.Screen name="SearchBar" component={SearchBar} />
      <Stack.Screen name="videoplayer" component={VideoPlayer} />
      <Stack.Screen name="SignupName" component={SignupName} />
      <Stack.Screen name="SignupGender" component={SignupGender} />
      <Stack.Screen name="SignUpExam" component={SignUpExam} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="StudyExam" component={StudyExam} />
      <Stack.Screen name="FreePdf" component={FreePdf} />
      <Stack.Screen name="OnlineClasses" component={OnlineClasses} />
      <Stack.Screen name="StudyMaterials" component={StudyMaterials} />
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="PaidCourses" component={PaidCourses} />
      <Stack.Screen name="QuestionPapers" component={QuestionPapers} />
      <Stack.Screen name="myEarning" component={MyEarning} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="withdraw" component={Withdraw} />
      <Stack.Screen name="addbankAccount" component={AddBankAccount} />
      <Stack.Screen name="addbankDetails" component={AddBanks} />
      <Stack.Screen name="withdrawOtp" component={WithdrawOtp} />
      <Stack.Screen name="addbanksucessfully" component={AddBankSucessfully} />
      <Stack.Screen name="withdrawReq" component={WithdrawReq} />
      <Stack.Screen name="deposit" component={Deposit} />
      <Stack.Screen name="transactionDetails"  component={TransctionDetails} />
      <Stack.Screen name="withdrawMoney" component={WithdrawMoney} />
      <Stack.Screen name="AccountDeatils" component={AccoountDeatils} />
      <Stack.Screen name="bankotp" component={BankOtp} />
      <Stack.Screen name="backwithdraw" component={BackWithdraw} />



    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, paddingBottom: 5 },
          tabBarStyle: { height: 60, backgroundColor: 'white' },
          tabBarShowLabel: true,
          headerShown: false,
          tabBarActiveTintColor: '#000',
        }}>
        <>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/homedark.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/homenormal.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="study"
            component={Study}
            options={{
              tabBarLabel: 'Study',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/bookmarkblack.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/bookmark.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </View>
              ),
            }}
          />
          {/* <Tab.Screen style={{position:'relative ',}} name="Room" component={Rooms} options={{ tabBarLabelStyle:{ fontSize:12, paddingBottom:5 }, 'tabBarLabel':"Rooms", 'tabBarIcon':( ({focused, color}) => (
            <View style={{position:"absolute", justifyContent:"center", bottom:8, alignItems:"center", flex:1, justifyContent:'center', alignItems:'center',backgroundColor:  focused ? '#475B9F' : "#F6F8FF" ,borderRadius:100,borderColor:'#ECECEC',borderWidth:1}}> 
                   <View style={{ borderRadius:100, height:60, width:60, justifyContent:'center', alignItems:'center',}}>
                      {
                        focused ? (<Image source={require('./assets/roomimgwhite.png')} resizeMode='contain' style={{width:30,height:30}} />) : 
                        (<Image source={require('./assets/roomimg.png')} resizeMode='contain' style={{width:35,height:35}} />)
                      }
                   </View>
                   <View style={{position:'absolute',top:50,width:"100%",height:20,backgroundColor:'red',justifyContent:"center",alignItems:'center',borderRadius:3}}>
                     <Text style={{fontFamily:"WorkSans-Regular",fontSize:12,color:'#fff'}}>New</Text>
                   </View>
              </View>   
          ))}}/> */}

          <Tab.Screen
            style={{ position: 'relative ' }}
            name="Courses"
            component={Courses}
            options={{
              tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
              tabBarLabel: 'Courses',
              tabBarIcon: ({ focused, color }) => (
                <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 8,
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: focused ? '#475B9F' : '#F6F8FF',
                    borderRadius: 100,
                    borderColor: '#ECECEC',
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      borderRadius: 100,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {focused ? (
                      <Image
                        source={require('./src/assets/img/roomimgwhite.png')}
                        resizeMode="contain"
                        style={{ width: 30, height: 30 }}
                      />
                    ) : (
                      <Image
                        source={require('./src/assets/img/roomimg.png')}
                        resizeMode="contain"
                        style={{ width: 35, height: 35 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 50,
                      width: '100%',
                      height: 20,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 3,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'WorkSans-Regular',
                        fontSize: 12,
                        color: '#fff',
                      }}>
                      New
                    </Text>
                  </View>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="saved"
            component={Saved}
            options={{
              tabBarLabel: 'Saved',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/heart.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/heartnormal.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Wallet"
            component={Wallet}
            options={{
              tabBarLabel: 'Wallet',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/walletblack.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/walletnormal.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </View>
              ),
            }}
          />
      </>
    </Tab.Navigator>
    </SafeAreaProvider >
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen name="Home" component={MyTabs} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'rgba(112, 29, 219, 1)'} />
      <MyStack />
    </NavigationContainer>
  );
}
