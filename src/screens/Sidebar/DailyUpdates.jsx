import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Share,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {DrawerActions, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLRender from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import { ColorsConstant } from '../../constants/Colors.constant';

export default function DailyUpdate({navigation}) {
  const isFocused = useIsFocused();

  const [isData, setData] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isLoad1, setLoad1] = useState(true);
  const [blog, setBlog] = useState([]);
  const [blogCount, setBlogCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [Name, setName] = useState('');

  useEffect(() => {
    GetName();
    getUpdate();
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setLoad1(false);
    }, 2000);
  }, []);

  const GetName = async () => {
    let name = await AsyncStorage.getItem('userName');
    setName(name);
  };

  const getUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://quiz.brainbucks.in/participants/get/daily/updates?page=1`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 1) {
          setBlog(result.data);
          setBlogCount(result.totalPages);
          setLoad(false);
        } else {
          setData(true);
        }
      })
      .catch(error => console.error(error));
  };

  const onNextButtonClick = () => {
    setIndex(prevIndex => (prevIndex + 1) % blogCount);
  };

  const onPreButtonClick = () => {
    setIndex(prevIndex => (prevIndex - 1 + blogCount) % blogCount);
  };

  const Url = async () => {
    let buo = await branch.createBranchUniversalObject('Invite', {
      title: `${Name} Invited you to join brainbucks`,
      contentDescription: 'Join now and play Room quizzes',
      contentMetadata: {
        customMetadata: {key1: 'value2'},
      },
    });

    try {
      const linkProperties = {
        feature: 'sharing',
        channel: 'facebook',
        campaign: 'content',
      };
      const controlParams = {
        $desktop_url: 'https://brainbucks.co.in',
        $navigate_to: 'DailyUpdate',
      };

      let url = await buo.generateShortUrl(linkProperties, controlParams);
      onShare(url.url);
    } catch (error) {
      console.log('Error generating short URL:', error);
    }
  };

  const onShare = async id => {
    try {
      await Share.share({message: id});
    } catch (error) {
      console.log(error.message);
    }
  };

  const currentItem = blog[index];

  return (
    <SafeAreaView style={styles.safeAreaView}>
    <View style={styles.Hview}>
    <View style={styles.Hview1}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.THead}>
        <Image
          source={require('../../assets/img/arrows.png')}
          resizeMode="contain"
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
      <View style={styles.ViewMy}>
        <Text style={styles.TextMy}>Daily Update</Text>
      </View>
    </View>
  </View>

      {isLoad || isLoad1 ? (
        <ActivityIndicator size={28} color={'gray'} />
      ) : isData ? (
        <Text style={styles.textNo}>No Update Today</Text>
      ) : (
        <>
          <View style={styles.indexView}>
            <View style={styles.indexViewInner}>
              <TouchableOpacity
                onPress={onPreButtonClick}
                disabled={index === 0}>
                <Image
                  source={require('../../assets/img/arrow-left.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
              <View style={styles.counterView}>
                <Text style={styles.textIndex}>{index + 1}</Text>
                <Text style={styles.textCount}>/{blogCount}</Text>
              </View>
              <TouchableOpacity
                onPress={onNextButtonClick}
                disabled={index === blogCount - 1}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.scrollViewContent}>
              <View style={styles.bannerContainer}>
                <Image
                  source={{
                    uri: `https://auth.brainbucks.in/stream/get/public?blobname=${currentItem?.banner_image}`,
                  }}
                  resizeMode="contain"
                  style={styles.bannerImage}
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.textTime}>
                  {currentItem?.scheduled_time}
                </Text>
                <TouchableOpacity onPress={Url} style={styles.shareButton}>
                  <Text style={styles.textShare}>Share</Text>
                  <Image
                    source={require('../../assets/img/share.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textDetails}>{currentItem?.headline}</Text>
              <View style={styles.detailsContainer}>
                <HTMLRender
                  style={[styles.texthtml, {color: 'red'}]}
                  source={{html: currentItem?.details}}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mainView: {
    // height: 70,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textNo: {
    paddingVertical: 200,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  indexView: {
    height: 50,
    backgroundColor: '#fff',
  },
  indexViewInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  Hview: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
  },
  Hview1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  THead: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100,
  },
  ViewMy: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  TextMy: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },

  arrow: {
    fontSize: 24,
    color: 'black',
  },
  counterView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  textIndex: {
    fontSize: 20,
    color: '#2E2E2E',
  },
  textCount: {
    fontSize: 20,
    color: '#8A8A8A',
  },
  scrollViewContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    padding: 0,
  },
  bannerContainer: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 0,
    // backgroundColor: "red",
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 10,
    height: 30,
  },
  textTime: {
    fontSize: 14,
    color: '#8A8A8A',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textShare: {
    fontSize: 16,
    color: '#8A8A8A',
    paddingRight: 5,
  },
  textDetails: {
    fontSize: 24,
    textAlign: 'justify',
    paddingLeft: 10,
  },
  detailsContainer: {
    paddingHorizontal: 8,
  },
  texthtml: {
    fontSize: 12,
    color: 'red',
  },
  textDescription: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
