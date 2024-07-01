import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import NoDataFound from '../../components/NoDataFound'
import { Button, Text } from '../../utils/Translate'
import styles from '../../styles/Rooms.styles'
import QuizCard from '../../components/QuizCard'
import { useQuery } from '@apollo/client'
import RoomsApiService from '../../services/api/RoomsApiService'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'
import { BLOBURL } from '../../config/urls'

export default function LiveQuizzes({ navigation, route }) {

    const [liveQuizzes, setLiveQuizzes] = useState([])
    const [totalPages, setTotalPages] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)

    const room_data = route.params.room_data;
    const isFocused = useIsFocused()

    useEffect(() => {
        if (currentPage === 1) {
            setCurrentPage(totalPages + 2)
            setTimeout(() => { setCurrentPage(1) }, 300)
        } else {
            setCurrentPage(1)
        }
    }, [isFocused])

    const roomServ = new RoomsApiService()
    let { loading, error, data, refetch } = useQuery(roomServ.GETLIVEQUIZES, {
        variables: {
            room_id: room_data._id
        }
    });

    
    useEffect(() => {
        if (data?.live_quizes.error) {
            Toast.show({
                type: 'error',
                text1: data?.live_quizes.error
            })
            return;
        }

        if (data && data.live_quizes) {

            if (data.live_quizes.totalPages) {
                setTotalPages(data.live_quizes.totalPages)
            }

            if (currentPage === 1) {
                if (data.live_quizes.response) {
                    setLiveQuizzes(data.live_quizes.response)
                }
            } else {
                if (data.live_quizes.response) {
                    setLiveQuizzes([...liveQuizzes, ...data.live_quizes.response])
                }
            }
        }
    }, [data])

    return (
        <>
            <View style={{ zIndex: 20 }}><Toast /></View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    loading
                        ?
                        <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                        :
                        liveQuizzes.length === 0
                            ?
                            <NoDataFound scale={0.7} message={"No Live Quizzes Found"} />
                            :
                            <FlatList
                                data={liveQuizzes}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <QuizCard
                                            onPress={() => { }}
                                            image={{uri: BLOBURL+item.category_image}}
                                            btntxt={"Enter Lobby"}
                                            invitebtn={true}
                                            title={item.category_name}
                                            fees={item.entryFees}
                                            prize={item.prize}
                                            date={item.sch_time}
                                            totalslots={item.slots}
                                            alotedslots={item.slot_aloted}
                                            type={'active'}
                                        />
                                    )

                                }}
                            />
                }
            </View>
        </>
    )
}