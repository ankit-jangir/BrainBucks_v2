import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Saved.styles'
import { ActivityIndicator } from 'react-native'
import NoDataFound from '../../components/NoDataFound'
import { Button } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'
import { Text } from '../../utils/Translate'
import RoomsApiService from '../../services/api/RoomsApiService'
import { useQuery } from '@apollo/client'
import { exitRoomInController } from '../../controllers/RoomsController'
import Toast from 'react-native-toast-message'
import { Modal } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useRoom } from '../../utils/store'
import { useIsFocused } from '@react-navigation/native'

export default function JoinedRooms({ navigation }) {
    const [rooms, setRooms] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const timeoutRef = useRef()

    const isFocused = useIsFocused()

    let ras = new RoomsApiService();

    const setCustomRoom = useRoom((state) => state.setCurrentRoom)

    let { loading, error, data, refetch } = useQuery(ras.Get_joined_rooms)

    async function exitRoom(room_id) {
        let res = await exitRoomInController(room_id, Toast)
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

    useEffect(() => {
        if (data?.get_joined_rooms.error) {
            Toast.show({
                type: 'error',
                text1: data?.get_joined_rooms.error
            })
            return;
        }

        if (data && data.get_joined_rooms) {

            if (data.get_joined_rooms.response) {
                setRooms(data.get_joined_rooms.response)
            }
        }
    }, [data])

    useEffect(() => {
        if (isFocused)
            refetch()
    }, [isFocused])


    return (
        <View style={styles.maincontainer}>
            {
                <FlatList
                    refreshing={loading}
                    onRefresh={() => { refetch() }}
                    ListEmptyComponent={() => (
                        <NoDataFound scale={0.7} message={"No Rooms Joined Yet"} />
                    )}
                    data={rooms}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.roomContainer}>
                                <Text style={styles.roomNameText}>{item.room_name}</Text>
                                <View style={styles.memberHolder}>
                                    <Text style={styles.memberText}>Members: <Text key={item.enrolled_participants_count} style={{ color: ColorsConstant.GreenColor }}>{item.enrolled_participants_count}</Text></Text>
                                    <Text style={{ color: '#000', marginRight: 20 }}>{item.type}</Text>
                                </View>
                                <View>
                                    <View style={[styles2.textP, { flexDirection: "row", justifyContent: "auto", gap: 25, }]}>
                                        <View
                                            style={[
                                                styles2.Cview,
                                                { justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent" },
                                            ]}>
                                            <Text style={[styles2.textC, { color: "#000" }]}>Room hash: </Text>
                                            <TouchableOpacity>
                                                <Text
                                                    style={[
                                                        styles2.textC,
                                                        { fontFamily: 'WorkSans-SemiBold', color: "#000" },
                                                    ]}>
                                                    {item.room_hash ? item.room_hash : "NA"}
                                                </Text>
                                            </TouchableOpacity>
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
                                    <Button
                                        onPress={() => {
                                            setCustomRoom(item)
                                            navigation.navigate('roomenter', { type: 'joined' })
                                        }}
                                        titleStyle={styles.enterbtn}
                                        containerStyle={styles.enterbtncontainer}
                                        title={"Enter Room"} />
                                    <TouchableOpacity onPress={() => { exitRoom(item._id) }} style={styles.exitview}>
                                        <Image style={styles.exitimg} source={require('../../assets/img/exit.png')} />
                                        <Text style={styles.exitbtn}>Leave Room</Text>
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