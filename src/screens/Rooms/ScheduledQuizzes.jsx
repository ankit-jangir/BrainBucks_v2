import { FlatList, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoDataFound from '../../components/NoDataFound'
import { ActivityIndicator } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import QuizCard from '../../components/QuizCard'
import RoomsApiService from '../../services/api/RoomsApiService'
import { useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'
import { BLOBURL } from '../../config/urls'
import { useRoom } from '../../utils/store'

export default function ScheduledQuizzes({ navigation, route }) {

    const [scheduledQuizzes, setScheduledQuizzes] = useState([])

    const [totalPages, setTotalPages] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const isFocused = useIsFocused()

    const room_data = useRoom(state=>state.currentRoom)
    const roomServ = new RoomsApiService()

    let { loading, error, data, refetch } = useQuery(roomServ.GETSCHEDULEDQUIZES, {
        variables: {
            room_id: room_data._id, page: currentPage
        }
    });


    useEffect(() => {
        if (data?.schedule_quizes.error) {
             ToastAndroid.show(data?.schedule_quizes.error, ToastAndroid.SHORT);
            return;
        }

        if (data && data.schedule_quizes) {

            if (data.schedule_quizes.totalPages) {
                setTotalPages(data.schedule_quizes.totalPages)
            }

            if (currentPage === 1) {
                if (data.schedule_quizes.response) {
                    setScheduledQuizzes(data.schedule_quizes.response)
                }
            } else {
                if (data.schedule_quizes.response) {
                    setScheduledQuizzes([...scheduledQuizzes, ...data.schedule_quizes.response])
                }
            }
        }
    }, [data])

    useEffect(() => {
        if (currentPage <= totalPages) {
            refetch()
        }
    }, [currentPage])

    useEffect(()=>{
        if(currentPage===1){
            setCurrentPage(totalPages+1)
            setTimeout(()=>setCurrentPage(1), 300)
        }else{
            setCurrentPage(1)
        }
    },[isFocused])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    scheduledQuizzes.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Scheduled Quizzes"} />
                        :
                        <FlatList
                            data={scheduledQuizzes}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (currentPage <= totalPages) { setCurrentPage(currentPage + 1) }
                            }
                            }
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <QuizCard
                                        onPress={() => {navigation.navigate('Roomdetails', {quiz_obj: item})}}
                                        image={{uri: BLOBURL+ item.category_image}}
                                        title={item.category_name}
                                        fees={item.entryFees}
                                        prize={item.prize}
                                        date={item.sch_time}
                                        totalslots={item.slots}
                                        alotedslots={item.slot_aloted}
                                        type={'active'}
                                        btntxt={"Register"}
                                        invitebtn={true}
                                    />
                                )

                            }}
                        />
            }
        </View>
    )
}
