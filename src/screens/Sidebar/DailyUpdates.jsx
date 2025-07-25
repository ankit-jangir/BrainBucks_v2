import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Share,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {DrawerActions, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLRender from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {ColorsConstant} from '../../constants/Colors.constant';
import BasicServices from '../../services/BasicServices';
import Toast from 'react-native-toast-message';
import {screenWidth} from '../../constants/Sizes.constant';
import {AUTHMICRO, QUIZMICRO} from '../../config/urls';
import MainHeader from '../../components/MainHeader';

export default function DailyUpdate() {
  const isFocused = useIsFocused();
  const [isLoad, setLoad] = useState(false);
  const [blog, setBlog] = useState([]);
  const [blogCount, setBlogCount] = useState(2);
  const [index, setIndex] = useState(1);
  const [Name, setName] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    GetName();
    getUpdate();
  }, [isFocused, index]);

  const GetName = async () => {
    try {
      let localObj = await BasicServices.getLocalObject();
      setName(localObj.name);
    } catch (err) {
      console.log('ERROR IN GETTING LOCAL OBJ', err);
    }
  };
  const stripHtmlTags = (html) => {
  return html?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};
const onShare = async () => {
  if (!currentItem) return;

  const message = `📢 *${currentItem?.headline}*\n\n🗓️ ${currentItem?.scheduled_time}\n\n📝 ${stripHtmlTags(currentItem?.details)?.slice(0, 200)}...\n\nRead more on our app!`;

  try {
    const result = await Share.share({ message });
  } catch (error) {
    ToastAndroid.show('Unable to share content', ToastAndroid.SHORT);
  }
};

  const getUpdate = async () => {
    const token = await BasicServices.getBearerToken();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    setLoad(true);

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
          ToastAndroid.show(result.Backend_Error, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoad(false));
  };

  const onNextButtonClick = () => {
    setIndex(prevIndex => prevIndex + 1);
  };

  const onPreButtonClick = () => {
    setIndex(prevIndex => prevIndex - 1);
  };

  const currentItem = blog[0];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{zIndex: 200}}>
        <Toast />
      </View>

      <MainHeader
        name="Daily Update"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.reset({index: 0, routes: [{name: 'Splash'}]});
            }
          },
        }}
      />

      {
      // isLoad ? (
      //   <ActivityIndicator size={28} color={'gray'} />
      // ) : 
       
      blog.length === 0 ? (
        <Text style={styles.textNo}>No Update Today</Text>
      ) : (
        <>
          <View style={styles.indexView}>
            <View style={styles.indexViewInner}>
              <TouchableOpacity
                onPress={onPreButtonClick}
                disabled={index === 1}>
                <Image
                  source={require('../../assets/img/backq.png')}
                  style={{height: 15, width: 15}}
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
                  style={{height: 15, width: 15}}
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
                <TouchableOpacity style={styles.shareButton}  onPress={onShare}>
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
                  key={index + currentItem?.headline}
                  contentWidth={screenWidth}
                  style={styles.texthtml}
                  source={{html: currentItem?.details}}
                  baseStyle={{color: 'gray'}}
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
    backgroundColor: '#F2F2F2',
  },
  textNo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginTop: 150,
  },
  indexView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indexViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
    elevation: 2,
  },
  counterView: {
    flexDirection: 'row',
    marginHorizontal: 14,
    alignItems: 'center',
  },
  textIndex: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  textCount: {
    fontSize: 16,
    color: '#888',
    marginLeft: 4,
  },
  scrollViewContent: {
    backgroundColor: '#fff',
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 6,
    marginTop: 12,
    elevation: 1,
     },
  bannerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor:'#000'
  },
  bannerImage: {
    width: '100%',
    height: 220,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  textTime: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  textShare: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
    marginRight: 6,
  },
  textDetails: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
    color: '#222',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  texthtml: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
});

