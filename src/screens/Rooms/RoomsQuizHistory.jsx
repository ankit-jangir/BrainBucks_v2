import { ActivityIndicator, Alert, FlatList, Image, ToastAndroid, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Rooms.styles';
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

const RoomSetting = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [members, setMembers] = useState([]);

  const ras = new RoomsApiService();
  const room_data = useRoom(state => state.currentRoom);

  const { loading, data, refetch } = useQuery(ras.GETROOMMEMBERS, {
    variables: { room_id: room_data._id, page: currentPage }
  });

  useEffect(() => {
    if (data?.get_enrl_participants_of_quiz?.error) {
      ToastAndroid.show(data.get_enrl_participants_of_quiz.error, ToastAndroid.SHORT);
      return;
    }
    if (data?.get_enrl_participants_of_quiz) {
      const { totalPages, response } = data.get_enrl_participants_of_quiz;
      setTotalPages(totalPages || 2);
      setMembers(currentPage === 1 ? response || [] : [...members, ...(response || [])]);
    }
  }, [data]);

  useEffect(() => { setCurrentPage(1); }, []);
  useEffect(() => { if (currentPage <= totalPages) refetch(); }, [currentPage]);

  const deleteRoom = async () => {
    let res = await deleteRoomInController(room_data._id, Toast);
    if (res) {
      ToastAndroid.show('Room Deleted Successfully', ToastAndroid.SHORT);
      navigation.pop(2);
    }
  };

  const toggleOverlay = () => setVisible(!visible);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${APPURL}/rooms?id=${room_data.room_hash || room_data.room_name}&type=${room_data.room_hash ? 'private' : 'public'}`
      });
      if (result.action === Share.dismissedAction) return;
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
          onPress: () => navigation.goBack()
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.label}>Room Name</Text>
        <View style={styles.roomInfoBox}>
          <Text style={styles.roomName}>{room_data.room_name}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('roomhistory')}>
            <Image source={require('../../assets/img/time2.png')} style={styles.actionIcon} />
            <Text style={styles.historyText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={deleteRoom}>
            <Image source={require('../../assets/img/redbin.png')} style={styles.actionIcon} />
            <Text style={styles.deleteText}>Delete Room</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={onShare}
          icon={<Image style={styles.shareIcon} source={require('../../assets/img/whatsapp.png')} />}
          buttonStyle={styles.inviteBtn}
          titleStyle={styles.inviteBtnText}
          title="Invite Participants"
        />

        <View style={styles.roomTypeRow}>
          <Text style={styles.label}>Room Type:</Text>
          <Text style={styles.roomType}>{room_data.room_hash ? 'Private' : 'Public'}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.memberText1}>
            Members: <Text style={styles.memberCount}>{room_data.enrolled_participants_count}</Text>
          </Text>

          {loading ? (
            <ActivityIndicator size={30} color={ColorsConstant.Theme} style={{ marginTop: 20 }} />
          ) : members.length === 0 ? (
            <NoDataFound scale={0.8} message="No Members Found" />
          ) : (
            <FlatList
              data={members}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.memberCard}>
                  <Image source={require('../../assets/img/boy.png')} style={styles.memberImage} />
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{item.name}</Text>
                    {item.isCurrentUser && <Text style={styles.meTag}>Me</Text>}
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.logoutView}>
          <Text style={styles.welcomeText}>
            Kick out <Text style={styles.highlightText}>Vikaram Singhvi</Text> from <Text style={styles.highlightText}>IAS Warriors</Text>
          </Text>
          <View style={styles.logoutbuttons}>
            <Button title="Yes" buttonStyle={styles.logoutyesbutton} titleStyle={styles.logoutButtonText} onPress={() => {}} />
            <Button title="No" buttonStyle={styles.logoutyesbutton} titleStyle={styles.logoutButtonText} onPress={toggleOverlay} />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default RoomSetting;
