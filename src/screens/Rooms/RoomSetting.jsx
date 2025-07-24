import {
  ActivityIndicator,
  Alert,
  Share,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import {Overlay} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {deleteRoomInController} from '../../controllers/RoomsController';
import RoomsApiService from '../../services/api/RoomsApiService';
import {useQuery} from '@apollo/client';
import NoDataFound from '../../components/NoDataFound';
import {useRoom} from '../../utils/store';
import {APPURL} from '../../config/urls';
import MainHeader from '../../components/MainHeader';

const RoomSetting = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [members, setMembers] = useState([]);
  
  const ras = new RoomsApiService();
  const room_data = useRoom(state => state.currentRoom);

  const {loading, data, refetch} = useQuery(ras.GETROOMMEMBERS, {
    variables: {
      room_id: room_data._id,
      page: currentPage,
    },
  });

  useEffect(() => {
    if (data?.get_enrl_participants_of_quiz?.error) {
      ToastAndroid.show(
        data?.get_enrl_participants_of_quiz?.error,
        ToastAndroid.SHORT,
      );
    } else if (data?.get_enrl_participants_of_quiz?.response) {
      setTotalPages(data.get_enrl_participants_of_quiz.totalPages || 1);
      if (currentPage === 1) {
        setMembers(data.get_enrl_participants_of_quiz.response);
      } else {
        setMembers(prev => [
          ...prev,
          ...data.get_enrl_participants_of_quiz.response,
        ]);
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const deleteRoom = async () => {
    const res = await deleteRoomInController(room_data._id, Toast);
    if (res) {
      ToastAndroid.show('Room Deleted Successfully', ToastAndroid.SHORT);
      navigation.pop(2);
    }
  };

  const toggleOverlay = () => setVisible(!visible);

  const onShare = async () => {
    try {
      await Share.share({
        message: `${APPURL}/rooms?id=${room_data.room_hash || room_data.room_name}&type=${room_data.room_hash ? 'private' : 'public'}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderHeader = () => (
    <View style={{paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20}}>
      {/* Room Name */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.RasContainer}>
        <Text style={styles.RasContainerText}>{room_data?.room_name}</Text>
      </View>

      {/* History / Delete Room */}
      <View style={styles.HistoryV}>
        <TouchableOpacity
          style={styles.HistoryV1}
          onPress={() => navigation.navigate('roomhistory')}>
          <Image
            source={require('../../assets/img/time2.png')}
            style={{width: 20, height: 20}}
            tintColor="white"
            resizeMode="contain"
          />
          <Text style={{color: 'white', fontWeight: '500'}}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.HistoryV2} onPress={deleteRoom}>
          <Image
            source={require('../../assets/img/redbin.png')}
            style={{width: 20, height: 20}}
            tintColor="#D92828"
            resizeMode="contain"
          />
          <Text style={{color: '#D92828', fontWeight: '500'}}>Delete Room</Text>
        </TouchableOpacity>
      </View>

      {/* Invite Button */}
      <View style={{marginTop: 20}}>
        <Button
          onPress={onShare}
          icon={
            <Image
              style={{height: 25, width: 25, marginRight: 10}}
              source={require('../../assets/img/whatsapp.png')}
            />
          }
          buttonStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#129C73',
            borderRadius: 6,
            paddingVertical: 12,
          }}
          titleStyle={{color: '#129C73', fontWeight: '500'}}
          title="Invite Participants"
        />
      </View>

      {/* Room Info */}
      <View style={{marginTop: 20}}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Room Type:</Text>
          <Text style={{fontSize: 16, color: ColorsConstant.Theme}}>
            {room_data?.room_hash ? 'Private' : 'Public'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Members:</Text>
          <Text style={{fontSize: 16, color: '#129C73'}}>
            {room_data?.enrolled_participants_count || '0'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: ColorsConstant.White}}>
      <MainHeader
        name="Settings"
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />
      <FlatList
        data={members}
        keyExtractor={item => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container1}>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/img/boy.png')}
                  style={styles.image}
                />
              </View>
              <View>
                <Text style={styles.nameText}>
                  {item.name}
                  {item.isCurrentUser && (
                    <Text style={{color: '#7E7E7E'}}> (Me)</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size={30} color={ColorsConstant.Theme} />
          ) : (
            <NoDataFound scale={0.8} message="No Members Found" />
          )
        }
      />

      {/* Kick Out Modal */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.logoutView}>
          <Text style={styles.welcomeText}>
            Kick out <Text style={{fontWeight: '700'}}>Vikaram Singhvi</Text>{' '}
            from <Text style={{fontWeight: '700'}}>IAS Warriors</Text>?
          </Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Yes"
              buttonStyle={[styles.logoutyesbutton, {backgroundColor: '#eb1313'}]}
              titleStyle={{color: 'white', fontSize: 15}}
              onPress={() => {}}
            />
            <Button
              title="No"
              buttonStyle={[styles.logoutyesbutton, {backgroundColor: '#129C73'}]}
              titleStyle={{color: 'white', fontSize: 15}}
              onPress={toggleOverlay}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default RoomSetting;

const styles = StyleSheet.create({
  RasContainer: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  RasContainerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7E7E7E',
    fontFamily: 'WorkSans-Bold',
  },
  HistoryV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 25,
  },
  HistoryV1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D4AE2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    gap: 8,
  },
  HistoryV2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4F4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D92828',
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#8A8A8A',
    marginBottom: 5,
    fontWeight: '500',
    fontFamily: 'Work Sans',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E2E2E',
    marginRight: 6,
  },
  memberText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  container1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 0.9,
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  logoutView: {
    width: 320,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    color: ColorsConstant.Black,
    lineHeight: 24,
  },
  logoutbuttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  logoutyesbutton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
