import React, { useEffect } from 'react';
import { Text, Image, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
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
import AddBankSucessfully from './src/screens/Wallet/AddBankSucessfully';
import WithdrawReq from './src/screens/Wallet/WithdrawReq';
import DailyUpdates from './src/screens/Sidebar/DailyUpdates';
import TransctionDetails from './src/screens/Wallet/TransctionDetails';
import WithdrawMoney from './src/screens/Wallet/WithdrawMoney';
import AccoountDeatils from './src/screens/Wallet/AccountDeatils';
import BankOtp from './src/screens/Wallet/BankOtp';
import BackWithdraw from './src/screens/Wallet/BackWithdraw';
import WithdrawOtp from './src/screens/Wallet/WithdrawOtp';
import AddBanks from './src/screens/Wallet/AddBanks';
import AddBankAccount from './src/screens/Wallet/AddBankAccount';
import ExamDetail from './src/screens/saved/ExamDetail';
import Quizze from './src/screens/saved/Quizze';
import Challenges from './src/screens/saved/Challenges';
import FreeTrivia from './src/screens/saved/FreeTrivia';
import PaymentPopup from './src/screens/Wallet/PaymentPopup';
import AllLiveQuizzes from './src/screens/Quizzes/AllLiveQuizzes';
import RulesofParticipation from './src/screens/Quizzes/QuizDetails';
import StartExam from './src/screens/Quizzes/StartExam';
import Rules from './src/screens/Quizzes/Rules';
import Rewards from './src/screens/Quizzes/Rewards';
import Particpants from './src/screens/Quizzes/Particpants';
import MyHistory from './src/screens/Sidebar/MyHistory';
import InsideLobby from './src/screens/Quizzes/InsideLobby';
import ActiveQuizzJoinAnimation from './src/screens/Quizzes/ActiveQuizzJoinAnimation';
import FreeTriviaStarExam from './src/screens/Freetrivia/FreeTriviaStarExam';
import FreeRulesParticipation from './src/screens/Freetrivia/TriviaQuizDetails';
import TriviaAnimationQuizz from './src/screens/Freetrivia/TriviaAnimationQuizz';
import TriviaQuestionPaper from './src/screens/Freetrivia/TriviaQuestionPaper';
import TriviaSubmit from './src/screens/Freetrivia/TriviaSubmit';
import TriviaSubmitConfirmation from './src/screens/Freetrivia/TriviaSubmitConfirmation';
import ResultRewards from './src/screens/Freetrivia/ResultRewards';
import TriviaScoreCard from './src/screens/Freetrivia/TriviaScoreCard';

import AddBankReducer from './src/context/AddBankReducer';
import WithdrawReducer from './src/context/WithdrawReducer';
import PrivacyPolicy from './src/screens/Sidebar/PrivacyPolicy';
import RulesRegulations from './src/screens/Sidebar/RulesRegulations';
import CoursePlanHistory from './src/screens/Sidebar/CoursePlanHistory';
import Share from './src/screens/Wallet/Share';
import QuizCard from './src/components/QuizCard';
import MyExams from './src/screens/Exams/MyExams';
import MyExamQuizzes from './src/screens/Exams/MyExamQuizzes';
import FreeSeeAll from './src/screens/Freetrivia/FreeSeeAll';
import EnrolledQuizesSeelAll from './src/screens/Quizzes/EnrolledQuizesSeeAll';
import IdReducer from './src/context/IdReducer';
import ViewPdf from './src/screens/Courses/ViewPdf';
import QuizPlayReducer from './src/context/QuizPlayReducer';
import AddExamss from './src/screens/Study/AddExamss';
import QuestionsPaper from './src/screens/Quizzes/QuestionsPaper';
import Search from './src/screens/Home/Search';
import Notification from './src/screens/Home/Notification';
import Chat from './src/screens/Support/Chat';
import Support from './src/screens/Support/Support';
import AboutBb from './src/screens/Sidebar/AboutBb';
import CustomerSupport from './src/screens/Profile/CustomerSupport';
import ScoreCard from './src/screens/Quizzes/ScoreCard';
import WinnerBoard from './src/screens/Quizzes/WinnerBoardLive.jsx';
import QuizzesResult from './src/screens/Quizzes/QuizzesResult';
import QuizzesResultRewards from './src/screens/Quizzes/QuizzesResultRewards';
import Reels from './src/screens/Reels/Reels';
import Rooms from './src/screens/Rooms/Rooms';
import CreateRoom from './src/screens/Rooms/CreateRoom';
import RoomCreatedSuccesfully from './src/screens/Rooms/RoomCreatedSuccesfully';
import RoomEnter from './src/screens/Rooms/RoomEnter';
import RoomsQuizHistory from './src/screens/Rooms/RoomsQuizHistory';
import CreateLiveQuiz from './src/screens/Rooms/CreateLiveQuiz';
import CreateLiveSlots from './src/screens/Rooms/CreateLiveSlots';
import CreatedQuizSuccesfully from './src/screens/Rooms/CreatedQuizSuccesfully';
import ScheduleQuiz from './src/screens/Rooms/ScheduleQuiz';
import ScheduleQuizTime from './src/screens/Rooms/ScheduleQuizTime';
import ScheduledSuccessfullyQuiz from './src/screens/Rooms/ScheduledSuccessfullyQuiz';
import RoomSetting from './src/screens/Rooms/RoomSetting';
import { ColorsConstant } from './src/constants/Colors.constant';
import GraphQLProvider from './src/context/GraphQLProvider';
import RoomNotifications from './src/screens/Rooms/RoomNotifications';
import RoomsAnimations from './src/screens/Rooms/RoomsAnimations';
import RoomsDetails from './src/screens/Rooms/RoomsDetails';
import RoomsStart from './src/screens/Rooms/RoomsStart';
import RoomsParticipants from './src/screens/Rooms/RoomsParticipants.js';
import RoomsReward from './src/screens/Rooms/RoomsReward';
import RoomsRules from './src/screens/Rooms/RoomsRules.js';
import RoomsQuestions from './src/screens/Rooms/RoomsQuestions.js';
import RoomsResult from './src/screens/Rooms/RoomsResult.js';
import RoomsScored from './src/screens/Rooms/RoomsScored.js';
import RoomsRewards from './src/screens/Rooms/RoomsRewards.js';




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
      <Stack.Screen name="dailyupdates" component={DailyUpdates} />
      <Stack.Screen name="transactionDetails" component={TransctionDetails} />
      <Stack.Screen name="withdrawMoney" component={WithdrawMoney} />
      <Stack.Screen name="AccountDeatils" component={AccoountDeatils} />
      <Stack.Screen name="bankotp" component={BankOtp} />
      <Stack.Screen name="backwithdraw" component={BackWithdraw} />
      <Stack.Screen name="Quizze" component={Quizze} />
      <Stack.Screen name="Challenges" component={Challenges} />
      <Stack.Screen name="FreeTrivia" component={FreeTrivia} />
      <Stack.Screen name="ExamDetail" component={ExamDetail} />
      <Stack.Screen name="paymentpopup" component={PaymentPopup} />
      <Stack.Screen name="AllLiveQuizzes" component={AllLiveQuizzes} />
      <Stack.Screen name='QuestionsPaper' component={QuestionsPaper} />
      <Stack.Screen name="RulesofParticipation" component={RulesofParticipation} />
      <Stack.Screen name="StartExam" component={StartExam} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="Rewards" component={Rewards} />
      <Stack.Screen name="Particpants" component={Particpants} />
      <Stack.Screen name="myhistory" component={MyHistory} />
      <Stack.Screen name="InsideLobby" component={InsideLobby} />
      <Stack.Screen name="ActiveQuizzJoinAnimation" component={ActiveQuizzJoinAnimation} />
      <Stack.Screen name="FreeTriviaStarExam" component={FreeTriviaStarExam} />
      <Stack.Screen name="FreeRulesParticipation" component={FreeRulesParticipation} />
      <Stack.Screen name="TriviaAnimationQuizz" component={TriviaAnimationQuizz} />
      <Stack.Screen name="TriviaSubmit" component={TriviaSubmit} />
      <Stack.Screen name="TriviaQuestionPaper" component={TriviaQuestionPaper} />
      <Stack.Screen name="TriviaSubmitConfirmation" component={TriviaSubmitConfirmation} />
      <Stack.Screen name="resultreward" component={ResultRewards} />
      <Stack.Screen name="TriviaScoreCard" component={TriviaScoreCard} />
      <Stack.Screen name="QuizCard" component={QuizCard} />
      <Stack.Screen name="privacypolice" component={PrivacyPolicy} />
      <Stack.Screen name="RulesRegulations" component={RulesRegulations} />
      <Stack.Screen name="coursesplanhistory" component={CoursePlanHistory} />
      <Stack.Screen name="viewpdf" component={ViewPdf} />
      <Stack.Screen name="addExamss" component={AddExamss} />
      <Stack.Screen name="MyExamQuizzes" component={MyExamQuizzes} />
      <Stack.Screen name='myexams' component={MyExams} />
      <Stack.Screen name='search' component={Search} />
      <Stack.Screen name="Notification" options={
        { title: 'Notification' }
      } component={Notification} />
      <Stack.Screen name='chat' component={Chat} />
      <Stack.Screen name='support' component={Support} />
      <Stack.Screen name="AboutBB" component={AboutBb} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
      <Stack.Screen name="ScoreCard" component={ScoreCard} />
      <Stack.Screen name="WinnerBoardLive" component={WinnerBoard} />
      <Stack.Screen name="QuizzesResult" component={QuizzesResult} />
      <Stack.Screen name="QuizzesResultRewards" component={QuizzesResultRewards} />
      <Stack.Screen name='reels' component={Reels} options={{ gestureEnabled: false }} />
      <Stack.Screen name='rooms' component={Rooms} />
      <Stack.Screen name='createroom' component={CreateRoom} />
      <Stack.Screen name='roomcreatedsuccess' component={RoomCreatedSuccesfully} />
      <Stack.Screen name='roomenter' component={RoomEnter} />
      <Stack.Screen name='roomhistory' component={RoomsQuizHistory} />
      <Stack.Screen name='createlivequiz' component={CreateLiveQuiz} />
      <Stack.Screen name='createliveslots' component={CreateLiveSlots} />
      <Stack.Screen name='createquizsuccesfully' component={CreatedQuizSuccesfully} />
      <Stack.Screen name='schedulquiz' component={ScheduleQuiz} />
      <Stack.Screen name='schedulquiztime' component={ScheduleQuizTime} />
      <Stack.Screen name='scheduledsuccessfullyQuiz' component={ScheduledSuccessfullyQuiz} />
      <Stack.Screen name='roomsetting' component={RoomSetting} />
      <Stack.Screen name="RoomNotification" component={RoomNotifications}/>
      <Stack.Screen name="Roomanmations" component={RoomsAnimations}/>
      <Stack.Screen name="Roomdetails" component={RoomsDetails}/>
      <Stack.Screen name="Roomstart" component={RoomsStart}/>
      <Stack.Screen name="RoomsParticipants" component={RoomsParticipants}/>
      <Stack.Screen name="RoomsReward" component={RoomsReward}/>
      <Stack.Screen name="RoomsRules" component={RoomsRules}/>
      <Stack.Screen name="Roomsquestions" component={RoomsQuestions}/>
      <Stack.Screen name="RoomsResult" component={RoomsResult}/>
      <Stack.Screen name="RoomsScored" component={RoomsScored}/>
      <Stack.Screen name="RoomsRewards" component={RoomsRewards}/>

</Stack.Navigator>
  );
}


const getHeader = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <MyHeader
      title={title}
      leftButton={
        back ? <MyBackButton onPress={navigation.goBack} /> : undefined
      }
      style={options.headerStyle}
    />
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
          tabBarActiveTintColor: ColorsConstant.Theme,
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
                      tintColor={ColorsConstant.Theme}
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
            name="Saved"
            component={Saved}
            options={{
              tabBarLabel: 'Categories',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/bookmarkblack.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                      tintColor={ColorsConstant.Theme}
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
            name="Rooms"
            component={Rooms}
            options={{
              tabBarLabel: 'Rooms',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/roomsimgs.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                      tintColor={ColorsConstant.Theme}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/roomsimgs.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                      tintColor={ColorsConstant.AshGray}
                    />
                  )}
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Brain Boosters"
            component={Reels}
            options={{
              tabBarLabel: 'Brain Boosters',
              tabBarIcon: ({ focused, color }) => (
                <View>
                  {focused ? (
                    <Image
                      source={require('./src/assets/img/resume.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                      tintColor={ColorsConstant.Theme}
                    />
                  ) : (
                    <Image
                      source={require('./src/assets/img/resume.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                      tintColor={ColorsConstant.AshGray}
                    />
                  )}
                </View>
              ),
            }}
          />
        </>
      </Tab.Navigator>
    </SafeAreaProvider>
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

  const linking = {
    prefixes: ['https://brainbucks.com', 'brainbucks://'],
    config: {
      screens: {
        Splash:'splash'
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <StatusBar backgroundColor={'rgba(112, 29, 219, 1)'} />
      <AddBankReducer>
        <WithdrawReducer>
          <IdReducer>
            <QuizPlayReducer>
              <GraphQLProvider>
                <MyStack />
              </GraphQLProvider>
            </QuizPlayReducer>
          </IdReducer>
        </WithdrawReducer>
      </AddBankReducer>
    </NavigationContainer>
  );
}
