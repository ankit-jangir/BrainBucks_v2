import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Rooms.styles';
import { Button, Text } from '../../utils/Translate';
import styles2 from '../../styles/Studymaterials.styles';
import CreatedRooms from './CreatedRooms';
import JoinedRooms from './JoinedRooms';
import { ColorsConstant } from '../../constants/Colors.constant';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Overlay } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { deleteRoomInController } from '../../controllers/RoomsController';
import RoomsApiService from '../../services/api/RoomsApiService';
import { useQuery } from '@apollo/client';
import NoDataFound from '../../components/NoDataFound';
import Share from '../Wallet/Share';

const RoomSetting = ({ navigation, route }) => {
  const [selected, setSelected] = useState('Public');
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [search, setSearch] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [members, setMembers] = useState([])

  const timeoutRef = useRef()

  let ras = new RoomsApiService();
  const room_data = route.params.room_data;


  let { loading, error, data, refetch } = useQuery(ras.GETROOMMEMBERS, {
    variables: {
      room_id: room_data._id, page: currentPage
    }
  })

  useEffect(() => {
    if (data?.get_enrl_participants_of_quiz.error) {
      Toast.show({
        type: 'error',
        text1: data?.get_enrl_participants_of_quiz.error
      })
      return;
    }

    if (data && data.get_enrl_participants_of_quiz) {

      if (data.get_enrl_participants_of_quiz.totalPages) {
        setTotalPages(data.get_enrl_participants_of_quiz.totalPages)
      }

      if (currentPage === 1) {
        if (data.get_enrl_participants_of_quiz.response) {
          setMembers(data.get_enrl_participants_of_quiz.response)
        }
      } else {
        if (data.get_enrl_participants_of_quiz.response) {
          setMembers([...members, ...data.get_enrl_participants_of_quiz.response])
        }
      }
    }
  }, [data])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  useEffect(() => {
    if (currentPage <= totalPages) {
      refetch()
    }
  }, [currentPage])


  async function deleteRoom() {
    let res = await deleteRoomInController(room_data._id, Toast)
    if (res) {
      Toast.show({ type: "success", text1: "Room Deleted Successfully" })
      navigation.pop(2)
    }
  }

  function toggleOverlay() {
    setVisible(!visible)
    setModalVisible(!modalVisible)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://brainbucks.in/rooms?id=${room_data.room_hash?room_data.room_hash:room_data.room_name}&type=${room_data.room_hash?"private":"public"}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };


  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.Hview2}>
          <View style={styles.Hviews}>
            <View style={styles.THead1}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/img/arrows.png')}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.TextMy1, { marginLeft: -50 }]}>Settings</Text>
            </View>
            <View>
              {/* <Button
                buttonStyle={{
                  backgroundColor: '#F2F2F2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
                titleStyle={{ color: '#606060' }}
                title={'save'}
              /> */}
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <View>
            <Text
              style={{
                color: '#8A8A8A',
                fontfamily: 'Work Sans',
                fontWeight: '500',
                fontSize: 16,
              }}>
              Name
            </Text>
          </View>
          <View style={styles.RasContainer}>
            <Text style={styles.RasContainerText}>{room_data.room_name}</Text>
          </View>

          <View style={styles.HistoryV}>
            <View style={styles.HistoryV1}>
              <Image
                source={require('../../assets/img/time2.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                tintColor={'white'}
              />
              <Button
                title={'History'}
                buttonStyle={{ backgroundColor: '#8D4AE2' }}
                onPress={() => navigation.navigate('roomhistory', { room_data: room_data })}
              />
            </View>
            <View style={styles.HistoryV2}>
              <Image
                source={require('../../assets/img/redbin.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                tintColor={'#D92828'}
                titleStyle={{ color: '#D92828' }}
              />
              <Button
                onPress={() => { deleteRoom() }}
                title={'Delete Room'}
                buttonStyle={{ backgroundColor: '#FFF4F4' }}
                titleStyle={{ color: '#D92828' }}
              />
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <Button
              icon={
                <Image
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  source={require('../../assets/img/whatsapp.png')}
                />
              }
              buttonStyle={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#129C73',
                borderRadius: 5,
              }}
              titleStyle={{ color: '#129C73' }}
              title={'Invite Participants'}
            />
          </View>
        </View>

        <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontfamily: 'Work Sans',
              color: 'black',
              fontWeight: '500',
              textAlignVertical: "center",
            }}>
            Room Type:
          </Text>
          <Text style={{
            color: "#000",
            padding: 10,
            fontSize: 18,
            textAlignVertical: "center",
            color: ColorsConstant.Theme
          }}>{room_data.room_hash ? "Private" : "Public"}</Text>
        </View>

        <View style={{ margin: 10, flex: 1 }}>
          <Text style={styles.memberText1}>
            Members: <Text key={room_data?.enrolled_participants_count} style={{ color: '#129C73' }}>{room_data.enrolled_participants_count}</Text>
            {/* <Text style={{color: '#000000'}}>/30</Text> */}
          </Text>
          {
            loading
              ?
              <ActivityIndicator size={30} color={ColorsConstant.Theme} />
              :
              members.length === 0
                ?
                <NoDataFound scale={0.8} message={"No Members Found"} />
                :
                <FlatList
                  data={members}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.container1}>
                        <View style={styles.container}>
                          <View style={styles.imageContainer}>
                            <Image
                              source={require('../../assets/img/boy.png')}
                              style={styles.image}
                              resizeMethod="cover"
                            />
                          </View>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Text style={styles.nameText}>{item.name}</Text>
                              {item.isCurrentUser && (
                                <Text style={{ color: '#7E7E7E' }}>Me</Text>
                              )}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              {/* <Text style={styles.roleText}>
                                {item.isleader === 'online' ? 'Leader' : 'Member'}
                              </Text>
                              <Text
                                style={
                                  item.isleader === 'online'
                                    ? styles.onlineStatus
                                    : styles.offlineStatus
                                }>
                              </Text> */}
                            </View>
                          </View>
                        </View>
                        {/* <TouchableOpacity
                          style={styles.kickOutButton}
                          onPress={toggleOverlay}>
                          <Text style={styles.kickOutButtonText}>Kick Out</Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  )}
                />
          }
        </View>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.logoutView}>
            <Text style={styles.welcomeText}>
              Kick out{' '}
              <Text style={{ color: 'balck', fontWeight: '600', fontSize: 21 }}>
                Vikaram Singhvi
              </Text>{' '}
              from{' '}
              <Text style={{ color: 'balck', fontWeight: '600', fontSize: 21 }}>
                IAS Warriors
              </Text>
            </Text>
            <View style={styles.logoutbuttons}>
              <Button
                title="Yes"
                color={'#eb1313'}
                titleStyle={{
                  color: 'white',
                  fontSize: 15,
                  padding: 15,
                  paddingHorizontal: 30,
                }}
                buttonStyle={styles.logoutyesbutton}
                onPress={() => {

                }}
              />
              <Button
                color={'#129C73'}
                title="No"
                buttonStyle={styles.logoutyesbutton}
                titleStyle={{ color: 'white', fontSize: 15, padding: 15 }}
                onPress={toggleOverlay}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </>
  );
};

export default RoomSetting;
