import { ActivityIndicator, Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '../utils/Translate';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NoDataFound from './NoDataFound';
import QuizCard from './QuizCard';
import { BLOBURL } from '../config/urls';
import styles from '../styles/Home.styles';
import HomeApiService from '../services/api/HomeApiService';
import { useQuery } from '@tanstack/react-query';
import { ColorsConstant } from '../constants/Colors.constant';
import { useQuiz } from '../context/QuizPlayReducer';

export default function HomeEnrolledQuizzes() {

    const navigation = useNavigation()
    const { width } = Dimensions.get('window');
    const CARD_MARGIN = 1; // Adjust this value as needed
    const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width

    const homeServ = new HomeApiService()
    const isFocused = useIsFocused()

    const {quizState, dispatch} = useQuiz()

    useEffect(() => {
        refetch()
    }, [isFocused])

    const getEnrolledHomeQuizzes = async () => {
        const enrolledQuizRes = await homeServ.getEnrolledQuizes(1, 10)
        return enrolledQuizRes
    }

    const { data, isFetching, refetch } = useQuery({ queryKey: ['homeEnrolledQuiz'], queryFn: getEnrolledHomeQuizzes })
    const [enrolledQuizzes, setEnrolledQuizzes] = useState(data?.enrolled_quizes || [])


    useEffect(() => {
        setEnrolledQuizzes(data?.enrolled_quizes || [])
    }, [data])



    return (
        <>
            <View style={styles.LiveView}>
                <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                        <Text style={styles.LiveText}>Enrolled Quizzes</Text>
                        <View style={styles.lotiView}>
                        </View>
                    </View>
                </View>
                <View style={styles.SeeView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AllLiveQuizzes', { type: 'enrolled' })}
                        style={styles.TouchAll}>
                        <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {
                    isFetching
                        ?
                        <ActivityIndicator size={20} color={ColorsConstant.Theme} />
                        :
                        (enrolledQuizzes?.length === 0)
                            ?
                            <NoDataFound scale={0.7} message={"Not Enrolled in any quiz yet"} actionText={"Reload"} />
                            :
                            <FlatList
                                data={enrolledQuizzes}
                                keyExtractor={item => item._id.toString()}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            width: CARD_WIDTH,
                                            margin: CARD_MARGIN,
                                        }}>
                                        <QuizCard
                                            prize={item.reward}
                                            fees={item.entryFees}
                                            title={item.quiz_name}
                                            date={item.sch_time}
                                            image={{ uri: BLOBURL + item.banner }}
                                            alotedslots={item.slot_aloted}
                                            totalslots={item.slots}
                                            type={'enrolled'}
                                            onPress={() => {
                                                dispatch({type:"change", state:{id:item._id}})
                                                navigation.navigate('StartExam', { id: item._id });
                                            }}
                                        />
                                    </View>
                                )}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                // snapToInterval={width}
                                snapToAlignment="center"
                                decelerationRate="fast"
                                contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
                            />
                }
            </View>
        </>
    )
}