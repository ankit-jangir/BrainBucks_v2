import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SearchBar from '../Home/SearchBar';
import styles from '../../styles/Rooms.styles';
import {TextInput, Text, Button} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import {useQuery} from '@apollo/client';
import Toast from 'react-native-toast-message';
import RoomsApiService from '../../services/api/RoomsApiService';
import {
  joinPublicRoomInController,
  withdrawJoinRequestInController,
} from '../../controllers/RoomsController';
import {Modal} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';

export default function PendingRequests({navigation}) {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const timeoutRef = useRef();

  const isFocused = useIsFocused();

  let ras = new RoomsApiService();

  async function withdrawRequest(room_id) {
    let res = await withdrawJoinRequestInController(room_id, Toast);
    if (res) {
      let newArr = rooms.filter(item => item._id !== room_id);
      setRooms([...newArr]);

      setModalVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }

  let {loading, error, data, refetch} = useQuery(ras.Get_pending_rooms);

  useEffect(() => {
    if (data?.get_pending_rooms.error) {
      ToastAndroid.show(data?.get_pending_rooms.error, ToastAndroid.SHORT);

      return;
    }

    if (data && data.get_pending_rooms) {
      setRooms(data.get_pending_rooms.response);
    }
  }, [data]);

  // useEffect(() => {
  //     setCurrentPage(1)
  // }, [search])

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  // console.log(loading, error, (data?.get_pending_rooms?.response?.length), data?.get_pending_rooms?.totalPages)

  return (
    <View style={[styles.maincontainer, {paddingHorizontal: 10}]}>
      {/* <View style={styles2.inputView}>
                <View style={styles2.inputView1}>
                    <TextInput
                        value={search}
                        onChangeText={(text) => { setSearch(text) }}
                        style={styles2.inputText}
                        placeholder="Search for Rooms"
                        placeholderTextColor={'#7E7E7E'}
                    >
                    </TextInput>
                    <TouchableOpacity style={styles2.touchSearch}>
                        <Image
                            source={require('../../assets/img/search.png')}
                            resizeMode="contain"
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View> */}
      <FlatList
        ListEmptyComponent={() => {
          return (
            <NoDataFound
              scale={0.7}
              message={'No Rooms Found'}
              action={() => {}}
              actionText={'Load Again'}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={() => {
          refetch();
        }}
        data={rooms}
        keyExtractor={item => item._id}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.roomContainer,{borderWidth:0.3,borderColor:"gray",elevation:0}]}>
              <Text style={styles.roomNameText}>{item.room_name}</Text>
              <View style={styles.memberHolder}>
                <Text style={styles.memberText}>
                  Members:{' '}
                  <Text
                    key={item.enrolled_participants_count}
                    style={{color: ColorsConstant.GreenColor}}>
                    {item.enrolled_participants_count}
                  </Text>
                </Text>
                <Text
                  style={{color: '#000', marginRight: 20, fontWeight: '600'}}>
                  {'Public'}
                </Text>
              </View>
              <Button
                onPress={() => {
                  withdrawRequest(item._id);
                }}
                buttonStyle={{
                  backgroundColor: 'rgb(255, 148, 112)',
                  margin: 6,
                  borderRadius: 10,
                }}
                title={'Withdraw Request...'}
              />
            </View>
          );
        }}
      />
      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../../assets/img/check.json')}
          autoPlay={true}
          style={{width: 200, height: 200}}
        />
      </Modal>
    </View>
  );
}
