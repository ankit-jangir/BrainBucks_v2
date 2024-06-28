import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
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

export default function RoomsQuizHistory({ navigation }) {

    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)
    const { quizState, dispatch } = useQuiz();
    const history = new HistoryApiService()
    const order = 1;

    useEffect(() => {
        getQuizzes()
    }, [])

    function helper(page) {
        return async () => {
            let res = await history.getWonQuizzes(order, page)
            return res
        }
    }

    async function getQuizzes(page) {
        let total = totalPages;
        if (!page) {
            page = 1
            setTotalPages(2)
            total = 2
        }

        if (page > total) {
            return
        }


        let func = setLoadingMore
        if (page === 1) {
            func = setLoading
        }

        let res = await BasicServices.apiTryCatch(helper(page), Toast, () => { func(true) }, () => { func(false) })

        if (res) {
            setQuizzes(res.subActiveQuizz)
            setTotalPages(res.totalpages)
            setCurrentPage(page)
        }
    }



    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            <View style={styles.maincontainer}>
                <View style={styles.Hview}>
                    <View style={styles.Hview1}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.THead}>
                            <Image
                                source={require('../../assets/img/arrow-left.png')}
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                        <View style={styles.ViewMy}>
                            <Text style={styles.TextMy}>Quiz History</Text>
                        </View>
                    </View>
                </View>

                {
                    loading
                        ?
                        <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                        :
                        quizzes.length === 0
                            ?
                            <NoDataFound message={"No Data Found"} action={() => { get() }} actionText={"Refresh"} />
                            :
                            <FlatList
                                onEndReached={() => { getQuizzes(currentPage + 1) }}
                                onEndReachedThreshold={0.6}
                                data={quizzes}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <QuizCard
                                            title={item.quiz_name}
                                            prize={item.prize}
                                            type={'active'}
                                            minper={item.min_reward_per}
                                            totalslots={item.slots}
                                            alotedslots={item.slot_aloted}
                                            image={{ uri: BLOBURL + item.banner }}
                                            fees={item.entryFees}
                                            date={item.sch_time}
                                            onPress={() => {
                                                dispatch({ type: 'change', state: { id: item._id } })
                                                navigation.navigate("RoomsResult")
                                            }
                                            }
                                            btntxt={"View Result"}
                                            roomname={"Room Name"}
                                        />)
                                }
                                }
                            />
                }
                {loadingMore && <ActivityIndicator size={25} style={{ height: 30 }} />}

            </View>
        </>

    )
}