import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from '../utils/Translate'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import NoDataFound from './NoDataFound'
import styles from '../styles/Home.styles'
import { BLOBURL } from '../config/urls'
import { Image } from 'react-native'
import HomeApiService from '../services/api/HomeApiService'
import { useQuery } from '@tanstack/react-query'
import { ColorsConstant } from '../constants/Colors.constant'

export default function HomeExams() {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const homeServ = new HomeApiService()

    const { data, isFetching, refetch } = useQuery({ queryKey: ['homeExams'], queryFn: homeServ.getExams })
    const [exams, setExams] = useState(data?.exams || [])

    useEffect(()=>{
        refetch()
    },[isFocused])

    useEffect(()=>{
        setExams(data?.exams || [])
    },[data])

    return (
        <>
            <View style={styles.LiveView}>
                <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                        <Text style={styles.LiveText}>Exams</Text>
                        <View style={styles.lotiView}>
                        </View>
                    </View>
                </View>
                <View style={styles.SeeView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('myexams', { exams: exams })}
                        style={styles.TouchAll}>
                        <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                isFetching
                ?
                <ActivityIndicator size={20} color={ColorsConstant.Theme}/>
                :
                (exams?.length === 0)
                    ?
                    <NoDataFound scale={0.7} message={"No Exam found"} actionText={"Reload"} />
                    :
                    <FlatList
                        data={exams}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ExamView}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MyExamQuizzes', { id: item._id, imgurl: item.image, title: item.category_name })}
                                    style={styles.TouchExam}>
                                    <View style={styles.ActiveView}>
                                        <Image source={{ uri: BLOBURL + item.image }} style={{ width: 40, height: 40, borderRadius: 100 }} />
                                    </View>
                                    <View style={styles.ActiveView}>
                                        <Text style={styles.TextActive}>{item.category_name}</Text>
                                    </View>
                                    <View style={styles.ActiveView}>
                                        <Text style={[styles.TextActive, { color: 'blue' }]}>Go to exam</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={width}
                        snapToAlignment="center"
                        decelerationRate="fast"
                    />
            }
        </>
    )
}