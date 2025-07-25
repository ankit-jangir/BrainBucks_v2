import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
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
import {useRoom} from '../../utils/store';
import MainHeader from '../../components/MainHeader';

export default function RoomNotifications({navigation}) {
  const room_data = useRoom(state => state.currentRoom);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const timeoutRef = useRef();

  async function action(user_id, type) {
    const res =
      type === 'reject'
        ? await rejectJoinRequestInController(room_data._id, user_id, Toast)
        : await acceptJoinRequestInController(room_data._id, user_id, Toast);

    if (res) {
      const newArr = requests.filter(item => item._id !== user_id);
      setRequests([...newArr]);
      setModalVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }

  const ras = new RoomsApiService();

  const {loading, error, data, refetch} = useQuery(ras.GETROOMJOINREQUESTS, {
    variables: {
      room_id: room_data._id,
      page: currentPage,
    },
  });

  useEffect(() => {
    if (data?.get_req_participants_of_quiz.error || error) {
      ToastAndroid.show(
        error ? error.message : data?.get_req_participants_of_quiz.error,
        ToastAndroid.SHORT,
      );
      return;
    }

    if (data && data.get_req_participants_of_quiz) {
      if (data.get_req_participants_of_quiz.totalPages) {
        setTotalPages(data.get_req_participants_of_quiz.totalPages);
      }

      if (currentPage === 1) {
        setRequests(data.get_req_participants_of_quiz.response || []);
      } else {
        setRequests(prev => [
          ...prev,
          ...(data.get_req_participants_of_quiz.response || []),
        ]);
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

      <MainHeader
        name={'Inbox'}
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

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
          contentContainerStyle={{gap: 16, padding: 10}}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image
                source={
                  item.image
                    ? {uri: BLOBURL + item.image}
                    : require('../../assets/img/gengirl.png')
                }
                style={styles.avatar}
              />
              <View style={styles.cardContent}>
                <Text style={styles.notificationText}>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text> has requested to join your room
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={() => action(item._id, 'accept')}
                    style={[styles.button, styles.acceptButton]}>
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => action(item._id, 'reject')}
                    style={[styles.button, styles.rejectButton]}>
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <LottieView
          source={require('../../assets/img/check.json')}
          autoPlay
          style={styles.modalLottie}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 0.6,
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    flex: 1,
    gap: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#D1FADF',
  },
  rejectButton: {
    backgroundColor: '#FEE4E2',
  },
  acceptText: {
    color: '#027A48',
    fontWeight: 'bold',
  },
  rejectText: {
    color: '#B42318',
    fontWeight: 'bold',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalLottie: {
    width: 200,
    height: 200,
  },
});
