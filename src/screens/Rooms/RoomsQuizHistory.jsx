import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import styles from '../../styles/Rooms.styles'
import Toast from 'react-native-toast-message'
import { Text } from '../../utils/Translate'
import { useQuiz } from '../../context/QuizPlayReducer'
import HistoryApiService from '../../services/api/HistoryApiService'
import BasicServices from '../../services/BasicServices'
import QuizCard from '../../components/QuizCard'
import NoDataFound from '../../components/NoDataFound'
import { ActivityIndicator } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import { BLOBURL } from '../../config/urls'
import RoomsApiService from '../../services/api/RoomsApiService'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { useRoom } from '../../utils/store'
import MainHeader from '../../components/MainHeader'

export default function RoomsQuizHistory({ navigation, route }) {

    const [quizzes, setQuizzes] = useState([])
    const [totalPages, setTotalPages] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const isFocused = useIsFocused()

    const room_data = useRoom(state=>state.currentRoom)
    const roomServ = new RoomsApiService()

    const { quizState, dispatch } = useQuiz()

    let { loading, error, data, refetch } = useQuery(roomServ.GETHISTORYQUIZES, {
        variables: {
            room_id: room_data._id, page: currentPage
        }
    });

    useEffect(() => {
        setCurrentPage(1)
    }, [isFocused])


    useEffect(() => {
        if (data?.history_quizes.error) {
            Toast.show({
                type: 'error',
                text1: data?.history_quizes.error
            })
            return;
        }

        if (data && data.history_quizes) {

            if (data.history_quizes.totalPages) {
                setTotalPages(data.history_quizes.totalPages)
            }

            if (currentPage === 1) {
                if (data.history_quizes.response) {
                    setQuizzes(data.history_quizes.response)
                }
            } else {
                if (data.history_quizes.response) {
                    setQuizzes([...quizzes, ...data.history_quizes.response])
                }
            }
        }
    }, [data])

    useEffect(() => {
        if (currentPage <= totalPages) {
            refetch()
        }
    }, [currentPage])



    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            <View style={styles.maincontainer}>
                    <MainHeader
      name="Quiz History"
      leftIcon={{
        type: 'image',
        source: require('../../assets/img/backq.png'),
        onPress: () => navigation.goBack(),
      }}
    />

                {
                    (loading && currentPage === 1)
                        ?
                        <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                        :
                        quizzes.length === 0
                            ?
                            <NoDataFound message={"No Data Found"} action={() => { }} actionText={"Refresh"} />
                            :
                            <FlatList
                                onRefresh={() => {
                                    if (currentPage === 1) {
                                        setCurrentPage(totalPages + 1)
                                        setTimeout(() => {
                                            setCurrentPage(1)
                                        }, 300);
                                    }
                                    else {
                                        setCurrentPage(1)
                                    }
                                }}
                                refreshing={refreshing}
                                onEndReached={() => { currentPage <= totalPages && setCurrentPage(currentPage + 1) }}
                                onEndReachedThreshold={0.6}
                                data={quizzes}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <QuizCard
                                            title={item.category_name}
                                            prize={item.prize}
                                            type={'active'}
                                            minper={item.min_reward_per}
                                            totalslots={item.slots}
                                            alotedslots={item.slot_aloted}
                                            image={item.image ? { uri: BLOBURL + item.image } : require("../../assets/img/bbimg.png")}
                                            fees={item.entryFees}
                                            date={item.sch_time}
                                            onPress={() => {
                                                if (item.is_res_dec) {
                                                    dispatch({ type: 'change', state: { id: item._id } })
                                                    navigation.navigate("RoomsResult")
                                                }else{
                                                    Toast.show({
                                                        type:"info",
                                                        text1:"Result is not declared yet"
                                                    })
                                                }
                                            }
                                            }
                                            btntxt={item.is_res_dec ? "View Result" : "Declaration Pending"}
                                            roomname={room_data?.room_name}
                                            declareTime={item.crontab_result_time}
                                        />)
                                }
                                }
                            />
                }
                {loading && currentPage > 1 && <ActivityIndicator size={25} style={{ height: 30 }} />}

            </View>
        </>

    )
}