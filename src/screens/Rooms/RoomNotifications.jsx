import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import RoomsApiService from '../../services/api/RoomsApiService';
import {
  acceptJoinRequestInController,
  rejectJoinRequestInController,
} from '../../controllers/RoomsController';
import {useQuery} from '@apollo/client';
import Toast from 'react-native-toast-message';
import {ColorsConstant} from '../../constants/Colors.constant';
import {BLOBURL} from '../../config/urls';
import {Button} from '../../utils/Translate';
import {Modal} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import NoDataFound from '../../components/NoDataFound';
import {StyleSheet} from 'react-native';
import {useRoom} from '../../utils/store';

export default function RoomNotifications({navigation, route}) {
  let room_data = useRoom(state => state.currentRoom);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const timeoutRef = useRef();

  async function action(user_id, type) {
    let res =
      type === 'reject'
        ? await rejectJoinRequestInController(room_data._id, user_id, Toast)
        : await acceptJoinRequestInController(room_data._id, user_id, Toast);
    if (res) {
      let newArr = requests.filter((item, index) => item._id !== user_id);
      setRequests([...newArr]);
      setModalVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }

  let ras = new RoomsApiService();

  let {loading, error, data, refetch} = useQuery(ras.GETROOMJOINREQUESTS, {
    variables: {
      room_id: room_data._id,
      page: currentPage,
    },
  });

  useEffect(() => {
    if (data?.get_req_participants_of_quiz.error || error) {
                   ToastAndroid.show( error ? error : data?.get_req_participants_of_quiz.error, ToastAndroid.SHORT);

      return;
    }

    if (data && data.get_req_participants_of_quiz) {
      if (data.get_req_participants_of_quiz.totalPages) {
        setTotalPages(data.get_req_participants_of_quiz.totalPages);
      }

      if (currentPage === 1) {
        if (data.get_req_participants_of_quiz.response) {
          setRequests(data.get_req_participants_of_quiz.response);
        }
      } else {
        if (data.get_req_participants_of_quiz.response) {
          setRequests([
            ...requests,
            ...data.get_req_participants_of_quiz.response,
          ]);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage <= totalPages) {
      refetch();
    }
  }, [currentPage]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>
      <View style={styles.notifiView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Image
            style={{width: 20, height: 20}}
            resizeMethod="contain"
            source={require('../../assets/img/backq.png')}
          />
        </TouchableOpacity>
        <Text style={styles.notifiText}>Notifications</Text>
      </View>
      {loading ? (
        <ActivityIndicator color={ColorsConstant.Theme} size={30} />
      ) : requests.length === 0 ? (
        <NoDataFound
          scale={0.9}
          actionText={''}
          action={() => {}}
          message={'No Requests'}
        />
      ) : (
        <FlatList
          onEndReached={() => {
            if (currentPage <= totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          onEndReachedThreshold={0.6}
          data={requests}
          keyExtractor={item => item._id}
          contentContainerStyle={{gap: 20, padding: 10}}
          renderItem={({item, index}) => {
            return (
              <View style={styles.requestView}>
                <View style={{width: '20%'}}>
                  <Image
                    source={{uri: BLOBURL + item.image}}
                    style={styles.requestImage}
                  />
                </View>
                <View style={{width: '80%', gap: 20}}>
                  <Text style={styles.requesetName}>
                    {item.name} Requested to join your room
                  </Text>
                  <View style={styles.requestBtnView}>
                    <Button
                      color={'success'}
                      title={'Accept'}
                      buttonStyle={{borderRadius: 5}}
                      onPress={() => {
                        action(item._id, 'accept');
                      }}
                    />
                    <Button
                      color={'error'}
                      title={'Decline'}
                      buttonStyle={{borderRadius: 5}}
                      onPress={() => {
                        action(item._id, 'reject');
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        contentContainerStyle={styles.modalContainer}>
        <LottieView
          source={require('../../assets/img/check.json')}
          autoPlay={true}
          style={styles.modalLottie}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalLottie: {
    width: 200,
    height: 200,
  },
  requestView: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  requestImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  requestBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  requesetName: {
    color: '#000',
    fontWeight: '700',
    fontSize: 17,
  },
  notifiText: {
    color: '#000',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    flexGrow: 1,
  },
  notifiView: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
  },
  backBtn: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
  },
});
