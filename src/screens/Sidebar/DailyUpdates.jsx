import React, { useState, useEffect } from 'react';
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
import { DrawerActions, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLRender from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { ColorsConstant } from '../../constants/Colors.constant';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import { screenWidth } from '../../constants/Sizes.constant';
import { AUTHMICRO, QUIZMICRO } from '../../config/urls';

export default function DailyUpdate() {
  const isFocused = useIsFocused();
  const [isLoad, setLoad] = useState(false);
  const [blog, setBlog] = useState([]);
  const [blogCount, setBlogCount] = useState(2);
  const [index, setIndex] = useState(1);
  const [Name, setName] = useState('');

  const navigation = useNavigation()

  useEffect(() => {
    GetName();
    getUpdate();
  }, [isFocused, index]);

  const GetName = async () => {
    try {
      let localObj = await BasicServices.getLocalObject()
      setName(localObj.name);
    } catch (err) { console.log("ERROR IN GETTING LOCAL OBJ", err) }
  };

  const getUpdate = async () => {
    const token = await BasicServices.getBearerToken()
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    setLoad(true)

    fetch(
      `${QUIZMICRO}/participants/get/daily/updates?page=${index}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 1) {
          setBlog(result.data);
          setBlogCount(result.totalPages);
        } else {
          Toast.show({
            type: 'error',
            text1: result.Backend_Error
          })
        }
      })
      .catch(error => {
        console.error(error)
        // Toast.show({ type: "error", text1: "Something went wrong." })
      }).finally(() => setLoad(false))

  };

  const onNextButtonClick = () => {
    setIndex(prevIndex => (prevIndex + 1));
  };

  const onPreButtonClick = () => {
    setIndex(prevIndex => (prevIndex - 1));
  };



  const currentItem = blog[0];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ zIndex: 200 }}><Toast /></View>
      <View style={styles.Hview}>
        <View style={styles.Hview1}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
              }
            }}
            style={styles.THead}>
            <Image
              source={require('../../assets/img/arrows.png')}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <View style={styles.ViewMy}>
            <Text style={styles.TextMy}>Daily Update</Text>
          </View>
        </View>
      </View>

      {isLoad ? (
        <ActivityIndicator size={28} color={'gray'} />
      ) : blog.length === 0 ? (
        <Text style={styles.textNo}>No Update Today</Text>
      ) : (
        <>
          <View style={styles.indexView}>
            <View style={styles.indexViewInner}>
              <TouchableOpacity
                onPress={onPreButtonClick}
                disabled={index === 1}>
                <Image
                  source={require('../../assets/img/arrow-left.png')}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
              <View style={styles.counterView}>
                <Text style={styles.textIndex}>{index}</Text>
                <Text style={styles.textCount}>/{blogCount}</Text>
              </View>
              <TouchableOpacity
                onPress={onNextButtonClick}
                disabled={index === blogCount}>
                <Image
                  source={require('../../assets/img/next.png')}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.scrollViewContent}>
              <View style={styles.bannerContainer}>
                <Image
                  source={{
                    uri: `${AUTHMICRO}/stream/get/public?blobname=${currentItem?.banner_image}`,
                  }}
                  resizeMode="contain"
                  style={styles.bannerImage}
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.textTime}>
                  {currentItem?.scheduled_time}
                </Text>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.textShare}>Share</Text>
                  <Image
                    source={require('../../assets/img/share.png')}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textDetails}>{currentItem?.headline}</Text>
              <View style={styles.detailsContainer}>
                <HTMLRender
                  key={index + currentItem?.headline}
                  contentWidth={screenWidth}
                  style={styles.texthtml}
                  source={{ html: currentItem?.details }}
                  baseStyle={{ color: 'gray' }}
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
    color: ColorsConstant.Black
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
    paddingHorizontal: 10,
    color: ColorsConstant.Black
  },
  detailsContainer: {
    paddingHorizontal: 8,
    color: "black"
  },
  texthtml: {
    fontSize: 12,
    color: 'black',
  },
  textDescription: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
