import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import NoDataFound from '../../components/NoDataFound'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Saved.styles'
import { Button, Text } from '../../utils/Translate'
import { FlatList } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import RoomsApiService from '../../services/api/RoomsApiService'
import { useQuery } from '@apollo/client'
import { deleteRoomInController } from '../../controllers/RoomsController'
import Toast from 'react-native-toast-message'
import { Modal } from 'react-native-paper'
import LottieView from 'lottie-react-native'

export default function CreatedRooms({ navigation }) {
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)
    const [search, setSearch] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const timeoutRef = useRef()

    async function deleteRoom(room_id) {
        let res = await deleteRoomInController(room_id, Toast)
        if (res) {
            let newArr = rooms.filter((item, index) => item._id !== room_id)
            setRooms([...newArr])

            setModalVisible(true)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                setModalVisible(false)
            }, 3000)
        }
    }

    let ras = new RoomsApiService();

    let { loading, error, data, refetch } = useQuery(ras.Get_created_rooms)

    useEffect(() => {
        if (data?.get_created_rooms.error) {
            Toast.show({
                type: 'error',
                text1: data?.get_created_rooms.error
            })
            return;
        }

        if (data && data.get_created_rooms) {
            if (data.get_created_rooms.response) {
                setRooms(data.get_created_rooms.response)
            }
        }
    }, [data])


    useEffect(() => {
        refetch()
    }, [search])


    return (
        <View style={styles.maincontainer}>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    rooms.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Rooms Joined Yet"} action={() => { }} actionText={"Load Again"} />
                        :
                        <FlatList
                            data={rooms}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                console.log(item);
                                return (
                                    <View style={styles.roomContainer}>
                                        <Text style={styles.roomNameText}>{item.room_name}</Text>
                                        <View style={styles.memberHolder}>
                                            <Text style={styles.memberText}>Members: <Text key={item.enrolled_participants_count} style={{ color: ColorsConstant.GreenColor }}>{item.enrolled_participants_count}</Text><Text style={{ color: ColorsConstant.Black }}>{item.capacity}</Text></Text>
                                            <Text style={{ color: '#000', marginRight: 20 }}>{item.type}</Text>
                                        </View>
                                        <View>
                                            <View style={[styles2.textP, { flexDirection: "row", justifyContent: "auto", gap: 25 }]}>
                                                <View
                                                    style={[
                                                        styles2.Cview,
                                                        { justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" },
                                                    ]}>
                                                    <Text style={[styles2.textC, { color: "#000" }]}>Room hash:</Text>
                                                    <Text
                                                        style={[
                                                            styles2.textC,
                                                            { fontFamily: 'WorkSans-SemiBold', color: "#000" },
                                                        ]}>
                                                        {item.room_hash ? item.room_hash : "NA"}
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={styles.roomContainerBtns}>
                                            <Button onPress={() => { navigation.navigate('roomenter', { type: 'created', room_data: item }) }} titleStyle={styles.enterbtn} containerStyle={styles.enterbtncontainer} title={"Enter Room"} />
                                            <TouchableOpacity style={styles.exitview} onPress={() => { deleteRoom(item._id) }}>
                                                <Image style={styles.exitimg} source={require('../../assets/img/redbin.png')} />
                                                <Text style={styles.exitbtn}>Delete Room</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )

                            }}
                        />
            }
            <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false) }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }} >
                <LottieView source={require('../../assets/img/check.json')} autoPlay={true} style={{ width: 200, height: 200 }} />
            </Modal>
        </View>
    )
}