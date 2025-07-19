import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  BackHandler,
  StatusBar,
} from 'react-native';
import SearchBar from './SearchBar';
import LottieView from 'lottie-react-native';
import {StyleConstants} from '../../constants/Style.constant';
import {Text} from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import {ColorsConstant} from '../../constants/Colors.constant';
import {useIsFocused} from '@react-navigation/native';
import basic from '../../services/BasicServices';
import {getHomeData} from '../../controllers/HomeController';
import {
  getHomeBanners,
  getLiveQuizzes,
  getTriviaQuizzes,
  getExamList,
  getEnrolledQuizzes,
} from '../../services/api/HomeApiService';

import HomeBanners from '../../components/HomeBanners';
import HomeActiveQuizzes from '../../components/HomeActiveQuizzes';
import HomeTriviaQuizzes from '../../components/HomeTriviaQuizzes';
import HomeExams from '../../components/HomeExams';
import HomeEnrolledQuizzes from '../../components/HomeEnrolledQuizzes';
import HomeReelPlayer from './HomeReelPlayer';
import HomeReels from '../../components/HomeReels';
import Dashboard from './Dashboard';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isReelsPlaying, setReelsPlaying] = useState(false);
  const [currentReel, setCurrentReel] = useState();

  // Data states
  const [bannerData, setBannerData] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);
const [userType, setUserType] = useState(null); 
  const isFocused = useIsFocused();
  const backRef = useRef();

  // Handle back for reels
  useEffect(() => {
    if (isFocused) {
      backRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (isReelsPlaying) {
            setReelsPlaying(false);
            return true;
          }
          return false;
        },
      );
    }

    return () => {
      if (backRef.current) backRef.current.remove();
    };
  }, [isReelsPlaying]);
  

 useEffect(() => {
    if (isFocused) {
      basic.getBearerToken()
        .catch(err => {
          console.log("Error fetching JWT token:", err);
        });

      basic.getUserType()
        .then(type => {
          console.log("User Type (is_edu):", type);
          setUserType(type);  
        })
        .catch(err => {
          console.log("Error fetching user type:", err);
        });
    }
  }, [isFocused]);

  // Fetch all data in parallel
  const fetchData = async () => {
    setLoading(true);
    try {
      const [bannersRes, liveQuizzesRes, triviaRes, examsRes, enrolledRes] =
        await Promise.all([
          getHomeBanners(),
          getLiveQuizzes(),
          getTriviaQuizzes(),
          getExamList(),
          getEnrolledQuizzes(),
        ]);

      setBannerData(bannersRes?.data || []);
      setActiveQuizzes(liveQuizzesRes?.data || []);
      setTriviaData(triviaRes?.data || []);
      setExamData(examsRes?.data || []);
      setEnrolledQuizzes(enrolledRes?.data || []);
    } catch (err) {
      console.log('API error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefresh(true);
    fetchData().then(() => setRefresh(false));
  };

  return (
 <>
  <StatusBar
           animated={true}
           backgroundColor="#61dafb"
         />
  {userType===true?<>
    <View style={{flex:1,}}>
     <Dashboard/>
    </View>
  </>:
  <>
       <>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>

      {isReelsPlaying ? (
        <HomeReelPlayer
          setParentModalVisible={setReelsPlaying}
          firstReel={currentReel}
        />
      ) : (
        <SafeAreaView style={StyleConstants.safeArView}>
          <View>
            <SearchBar />
          </View>

          {loading ? (
            <View style={{flex: 1}}>
              <LottieView
                autoPlay
                style={{flex: 0.8, padding: 10}}
                source={require('../../assets/img/homeloading.json')}
              />
              <Text
                style={{
                  flex: 0.2,
                  fontSize: 20,
                  color: ColorsConstant.Theme,
                  textAlign: 'center',
                }}>
                Loading...
              </Text>
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }>
              <View style={{marginBottom: 20}}>
                <HomeBanners data={bannerData} />
                <HomeActiveQuizzes data={activeQuizzes} />
                <HomeTriviaQuizzes data={triviaData} />
                <HomeExams data={examData} />
                <HomeEnrolledQuizzes data={enrolledQuizzes} />

                {/* ********************************************courses**************************************** */}
                {/* <View>
                      <HomeCourses />
                    </View> */}

                {/* **********************************Reels******************************* */}
                <HomeReels
                  setCurrentReel={setCurrentReel}
                  setParentModalVisible={setReelsPlaying}
                />
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      )}
    </>
  </>}
 </>
  );
}
