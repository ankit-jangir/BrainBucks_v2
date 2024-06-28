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

export default function LiveQuizzes({ navigation, route }) {

    const [liveQuizzes, setLiveQuizzes] = useState([])
    const [totalPages, setTotalPages] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)

    const room_data = route.params.room_data;

    const roomServ = new RoomsApiService()
    let { loading, error, data, refetch } = useQuery(roomServ.GETLIVEQUIZES, {
        variables: {
            room_id: room_data._id
        }
    });

    console.log(loading, error, data);

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
                                            image={require('../../assets/img/facebook.png')}
                                            title={item.name}
                                            fees={200}
                                            prize={200}
                                            date={"01/02/2004 09:09:09"}
                                            totalslots={22}
                                            alotedslots={23}
                                            type={'active'}
                                            btntxt={"Enter Lobby"}
                                            invitebtn={true}
                                        />
                                    )

                                }}
                            />
                }
            </View>
        </>
    )
}