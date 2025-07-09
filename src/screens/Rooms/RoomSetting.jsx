import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { Overlay } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { deleteRoomInController } from '../../controllers/RoomsController';
import RoomsApiService from '../../services/api/RoomsApiService';
import { useQuery } from '@apollo/client';
import NoDataFound from '../../components/NoDataFound';
import Share from '../Wallet/Share';
import { useRoom } from '../../utils/store';
import { APPURL } from '../../config/urls';
import MainHeader from '../../components/MainHeader';
import { color } from '@rneui/base';

const RoomSetting = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [members, setMembers] = useState([])

  const ras = new RoomsApiService();
  const room_data = useRoom(state => state.currentRoom);

  const { loading, data, refetch } = useQuery(ras.GETROOMMEMBERS, {
    variables: {
      room_id: room_data._id, page: currentPage
    }
  });

  useEffect(() => {
    if (data?.get_enrl_participants_of_quiz?.error) {
      ToastAndroid.show(data?.get_enrl_participants_of_quiz?.error, ToastAndroid.SHORT);
    } else if (data?.get_enrl_participants_of_quiz?.response) {
      setTotalPages(data.get_enrl_participants_of_quiz.totalPages || 1);
      if (currentPage === 1) {
        setMembers(data.get_enrl_participants_of_quiz.response);
      } else {
        setMembers(prev => [...prev, ...data.get_enrl_participants_of_quiz.response]);
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
      const result = await Share.share({
        message: `${APPURL}/rooms?id=${room_data.room_hash || room_data.room_name}&type=${room_data.room_hash ? "private" : "public"}`
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

 return (
  <View style={{ flex: 1, backgroundColor: ColorsConstant.White }}>
    <MainHeader
      name="Settings"
      leftIcon={{
        type: 'image',
        source: require('../../assets/img/backq.png'),
        onPress: () => navigation.goBack(),
      }}
    />

    {/* Fixed Content ScrollView */}
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Room Name */}
      <Text style={{ fontSize: 16, color: '#8A8A8A', marginBottom: 5 }}>Name</Text>
      <View style={styles.RasContainer}>
        <Text style={styles.RasContainerText}>{room_data?.room_name}</Text>
      </View>

      {/* History / Delete Room */}
      <View style={styles.HistoryV}>
        <TouchableOpacity style={styles.HistoryV1} onPress={() => navigation.navigate('roomhistory')}>
          <Image source={require('../../assets/img/time2.png')} style={{ width: 20, height: 20, marginRight: 10 }} tintColor="white" />
          <Text style={{ color: 'white', fontWeight: '500' }}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.HistoryV2} onPress={deleteRoom}>
          <Image source={require('../../assets/img/redbin.png')} style={{ width: 20, height: 20, marginRight: 10 }} tintColor="#D92828" />
          <Text style={{ color: '#D92828', fontWeight: '500' }}>Delete Room</Text>
        </TouchableOpacity>
      </View>

      {/* Invite Button */}
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={onShare}
          icon={
            <Image
              style={{ height: 25, width: 25, marginRight: 10 }}
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
          titleStyle={{ color: '#129C73', fontWeight: '500' }}
          title="Invite Participants"
        />
      </View>

      {/* Room Type */}
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '500',color:"#000" }}>Room Type:</Text>
        <Text style={{ fontSize: 18, color: ColorsConstant.Theme, marginLeft: 10 }}>
          {room_data?.room_hash ? 'Private' : 'Public'}
        </Text>
      </View>

      {/* Member Count */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.memberText1}>
          Members: <Text style={{ color: '#129C73' }}>{room_data?.enrolled_participants_count || 0}</Text>
        </Text>
      </View>
    </ScrollView>

    {/* Member List - FlatList BELOW scrollview */}
<View style={{ flex: 1, paddingHorizontal: 15 }}>
  {loading ? (
    <ActivityIndicator size={30} color={ColorsConstant.Theme} />
  ) : members.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <NoDataFound scale={0.8} message="No Members Found" />
    </View>
  ) : (
    <FlatList
      data={members}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: 30 }}
      renderItem={({ item }) => (
        <View style={styles.container1}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/img/boy.png')} style={styles.image} />
            </View>
            <View>
              <Text style={styles.nameText}>
                {item.name}
                {item.isCurrentUser && <Text style={{ color: '#7E7E7E' }}> (Me)</Text>}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  )}
</View>


    {/* Kick Out Modal */}
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.logoutView}>
        <Text style={styles.welcomeText}>
          Kick out <Text style={{ fontWeight: '700' }}>Vikaram Singhvi</Text> from{' '}
          <Text style={{ fontWeight: '700' }}>IAS Warriors</Text>?
        </Text>
        <View style={styles.logoutbuttons}>
          <Button
            title="Yes"
            buttonStyle={[styles.logoutyesbutton, { backgroundColor: '#eb1313' }]}
            titleStyle={{ color: 'white', fontSize: 15 }}
            onPress={() => {}}
          />
          <Button
            title="No"
            buttonStyle={[styles.logoutyesbutton, { backgroundColor: '#129C73' }]}
            titleStyle={{ color: 'white', fontSize: 15 }}
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
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 6,
    backgroundColor: '#FAFAFA',
  },

  RasContainerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  HistoryV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  HistoryV1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8D4AE2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
    elevation: 2,
  },

  HistoryV2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4F4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D92828',
    flex: 1,
    marginLeft: 10,
    elevation: 2,
  },

  memberText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  container1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    paddingHorizontal: 10,
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

  kickOutButton: {
    backgroundColor: '#FFF4F4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D92828',
    marginVertical: 10,
  },

  kickOutButtonText: {
    color: '#D92828',
    fontWeight: '500',
    textAlign: 'center',
  },

  roleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7E7E7E',
  },

  onlineStatus: {
    color: '#129C73',
    backgroundColor: '#EFFFF6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },

  offlineStatus: {
    color: '#8A8A8A',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
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

