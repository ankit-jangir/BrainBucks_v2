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
import Clipboard from '@react-native-clipboard/clipboard'
import { useRoom } from '../../utils/store'
import { useIsFocused } from '@react-navigation/native'

export default function CreatedRooms({ navigation }) {
    const [rooms, setRooms] = useState([])
    const [deleteRoomModalVisible, setDeleteBankModalVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const timeoutRef = useRef()
    const [currentRoom, setCurrentRoom] = useState()
    const isFocused = useIsFocused()

    async function handleDeleteRoomClick(room) {
        setCurrentRoom(room)
        setDeleteBankModalVisible(true)
    }

    async function deleteRoom(room_id) {
        setDeleteBankModalVisible(false)
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
        if(isFocused)
        refetch()
    }, [isFocused])


    return (
        <View style={styles.maincontainer}>
            {
                <FlatList
                    refreshing={loading}
                    onRefresh={() => { refetch() }}
                    ListEmptyComponent={() => (
                        <NoDataFound scale={0.7} message={"No Rooms Joined Yet"}/>
                    )}
                    data={rooms}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
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
                                            {item.room_hash && <TouchableOpacity
                                                onPress={() => {
                                                    Clipboard.setString(item.room_hash)
                                                }}
                                            >
                                                <Image style={{ width: 15, height: 15, objectFit: "contain" }} source={require("../../assets/img/copyk.png")} />
                                            </TouchableOpacity>}
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.roomContainerBtns}>
                                    <Button onPress={() => {
                                        setCurrentRoom(item)
                                        navigation.navigate('roomenter', { type: 'created' })
                                    }} titleStyle={styles.enterbtn} containerStyle={styles.enterbtncontainer} title={"Enter Room"} />
                                    <TouchableOpacity style={styles.exitview} onPress={() => { handleDeleteRoomClick(item) }}>
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
            <Modal
                visible={deleteRoomModalVisible}
                onDismiss={() => { setDeleteBankModalVisible(false) }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }} >
                <View style={{ backgroundColor: "#fff", width: 300, minHeight: 150, justifyContent: "space-around" }}>
                    <Text style={{ padding: 20, textAlign: "center", fontSize: 20, color: ColorsConstant.RedLight }}>Delete {currentRoom?.room_name} Room</Text>
                    <View style={{ justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginBottom: 20 }}>
                        <TouchableOpacity
                            onPress={() => { deleteRoom(currentRoom._id) }}
                            style={{ backgroundColor: ColorsConstant.RedLight, paddingVertical: 10, paddingHorizontal: 20 }}>
                            <Text style={{ color: "#fff" }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setDeleteBankModalVisible(false) }}
                            style={{ backgroundColor: ColorsConstant.GrayyColor, paddingVertical: 10, paddingHorizontal: 20 }}>
                            <Text style={{ color: "#fff" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}