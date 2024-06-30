import { View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../Home/SearchBar'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Study.styles'
import { TextInput, Text, Button } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'
import NoDataFound from '../../components/NoDataFound'
import { useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'
import RoomsApiService from '../../services/api/RoomsApiService'
import { joinPublicRoomInController } from '../../controllers/RoomsController'
import { Modal } from 'react-native-paper'
import LottieView from 'lottie-react-native'

export default function Explore() {
    const [search, setSearch] = useState('')
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)
    const [modalVisible, setModalVisible] = useState(false)
    const timeoutRef = useRef();


    let ras = new RoomsApiService();

    async function sendRequest(room_id) {
        let res = await joinPublicRoomInController(room_id, Toast)
        if (res) {
            let newArr = rooms.filter((item) => item._id !== room_id)
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

    let { loading, error, data, refetch } = useQuery(ras.GETPUBLICROOMS, {
        variables: {
            search: search, page: currentPage
        }
    })

    useEffect(() => {
        if (data?.getPublicRoom.error) {
            Toast.show({
                type: 'error',
                text1: data?.getPublicRoom.error
            })
            return;
        }

        if (data && data.getPublicRoom) {

            if (data.getPublicRoom.totalPages) {
                setTotalPages(data.getPublicRoom.totalPages)
            }

            if (currentPage === 1) {
                if (data.getPublicRoom.response) {
                    setRooms(data.getPublicRoom.response)
                }
            } else {
                if (data.getPublicRoom.response) {
                    setRooms([...rooms, ...data.getPublicRoom.response])
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

    return (
        <>
            <View style={{ zIndex: 10 }}>
                <Toast key={"explToast"} />
            </View>
            <View style={[styles.maincontainer, { paddingHorizontal: 10 }]}>
                <View style={styles2.inputView}>
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
                </View>
                {
                    (loading && currentPage === 1)
                        ?
                        <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                        :
                        rooms.length === 0
                            ?
                            <NoDataFound scale={0.7} message={"No Rooms Found"} action={() => { }} actionText={"Load Again"} />
                            :
                            <FlatList
                                data={rooms}
                                keyExtractor={(item) => item._id}
                                onEndReached={() => {
                                    if (currentPage <= totalPages) {
                                        setCurrentPage(pre => pre + 1)
                                    }
                                }
                                }
                                onEndReachedThreshold={0.5}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.roomContainer}>
                                            <Text style={styles.roomNameText}>{item.room_name}</Text>
                                            <View style={styles.memberHolder}>
                                                <Text style={styles.memberText}>Members: <Text style={{ color: ColorsConstant.GreenColor }}>{item.enrolled_participants_count}</Text></Text>
                                                <Text style={{ color: '#000', marginRight: 20, fontWeight: "600" }}>{"Public"}</Text>
                                            </View>
                                            <Button
                                                onPress={() => {
                                                    sendRequest(item._id)
                                                }}
                                                title={"Send Request"} />
                                        </View>
                                    )
                                }}
                            />
                }

                {loading && currentPage > 1 && <ActivityIndicator size={20} color={ColorsConstant.Theme} />}
                <Modal visible={modalVisible} onDismiss={() => { setModalVisible(false) }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }} >
                    <LottieView source={require('../../assets/img/check.json')} autoPlay={true} style={{ width: 200, height: 200 }} />
                </Modal>
            </View>
        </>
    )
}