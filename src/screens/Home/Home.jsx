import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  BackHandler,
} from 'react-native';
import SearchBar from './SearchBar';
import LottieView from 'lottie-react-native';
import { StyleConstants } from '../../constants/Style.constant';
import { Button, Text } from '../../utils/Translate';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../../styles/Home.styles';
import { styles as styles2 } from '../Courses/PaidCourses';
import basic from '../../services/BasicServices';
import QuizCard from '../../components/QuizCard';
import Toast from 'react-native-toast-message';
import { getHomeData } from '../../controllers/HomeController';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import CourseApiService from '../../services/api/CourseApiService';
import { Modal as PaperModal } from 'react-native-paper';
import HomeCourses from '../../components/HomeCourses';
import HomeBanners from '../../components/HomeBanners';
import HomeActiveQuizzes from '../../components/HomeActiveQuizzes';
import HomeTriviaQuizzes from '../../components/HomeTriviaQuizzes';
import HomeExams from '../../components/HomeExams';
import HomeEnrolledQuizzes from '../../components/HomeEnrolledQuizzes';
import HomeReels from '../../components/HomeReels';
import HomeReelPlayer from './HomeReelPlayer';

export default function Home({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false)
  const [isReelsPlaying, setReelsPlaying] = useState(false)
  const [currentReel, setCurrentReel] = useState();
  const backRef = useRef()

  const isFocused = useIsFocused()

  useEffect(() => {
    basic.getBearerToken().then(res => {
      console.log("jwt token: " + res);
    });

  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      backRef.current = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isReelsPlaying) {
          setReelsPlaying(false)
          return true;
        } else {
          return false;
        }
      })
    }

    if (backRef.current) {
      return () => backRef.current.remove()
    }
  }, [isReelsPlaying])

  const onRefresh = () => {
  };





  return (
    <>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      {
        isReelsPlaying ?
          <HomeReelPlayer setParentModalVisible={setReelsPlaying} firstReel={currentReel} />
          :
          <SafeAreaView style={StyleConstants.safeArView}>

            <View>
              <SearchBar />
            </View>
            {
              loading ?
                <View style={{ flex: 1 }}>
                  <LottieView autoPlay style={{ flex: 0.8, padding: 10 }} source={require("../../assets/img/homeloading.json")} />
                  <Text style={{ flex: 0.2, fontSize: 20, color: ColorsConstant.Theme, textAlign: 'center' }}>Loading...</Text>
                </View>
                :
                <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
                  <View style={{ marginBottom: 20 }}>

                    {/* ********************************************Banners**************************************** */}
                    <HomeBanners />

                    {/* ********************************************courses**************************************** */}
                    <View>
                      <HomeCourses />
                    </View>

                    {/* **********************************livequizes******************************* */}
                    <HomeActiveQuizzes />

                    {/* ******************************freeTrivia****************************** */}
                    <HomeTriviaQuizzes />

                    {/* **********************************exam******************************* */}
                    <HomeExams />

                    {/* **********************************Enrolledquizes******************************* */}
                    <HomeEnrolledQuizzes />

                    {/* **********************************Reels******************************* */}
                    <HomeReels setCurrentReel={setCurrentReel} setParentModalVisible={setReelsPlaying} />

                  </View>
                </ScrollView>
            }


          </SafeAreaView>
      }
    </>
  );
}


// import { View, Text, ScrollView } from 'react-native'
// import React from 'react'
// import { screenHeight } from '../../constants/Sizes.constant'

// export default function Home() {
//   return (
//     <ScrollView contentContainerStyle={{flexGrow:1}}>
//       <Text style={{height:screenHeight}}>Home1</Text>
//       <Text style={{height:screenHeight}}>Home2</Text>
//     </ScrollView>
//   )
// }