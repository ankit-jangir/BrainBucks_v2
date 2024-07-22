import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Text } from '../utils/Translate'
import { useNavigation } from '@react-navigation/native'
import styles from '../styles/Home.styles'
import { styles as styles2 } from '../screens/Courses/PaidCourses'

import NoDataFound from './NoDataFound'
import Toast from 'react-native-toast-message'
import CourseApiService from '../services/api/CourseApiService'
import { Modal } from 'react-native-paper'
import { BLOBURL } from '../config/urls'
import { useQuery } from '@tanstack/react-query'
import { ColorsConstant } from '../constants/Colors.constant'

export default function HomeCourses() {
    const [currentCourse, setCurrentCourse] = useState()
    const [buyModalVisible, setBuyModalVisible] = useState(false)
    let navigation = useNavigation()
    const couServ = new CourseApiService();

    const { data, isFetching } = useQuery({ queryKey: ['homePaidCourses'], queryFn: couServ.getPaidCourses })
    const [courses, setCourses] = useState(data?.data || [])

    useEffect(()=>{
        setCourses(data?.data || [])
    },[data])


    async function buyCourse() {
        try {
            let res = await couServ.buyCourse(currentCourse._id);
            if (res.status === 1) {
                // setModalVisible(false);
                let tempCourses = courses.filter((c) => c._id !== currentCourse._id)
                setCourses(tempCourses)

                Toast.show({
                    type: 'success',
                    text1: 'Course bought successfully',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: res.Backend_Error,
                });
            }
        } catch (err) {
            console.log('Error in Buying paid courses on home: ', err.message);
            // Toast.show({
            //   type: 'error',
            //   text1: 'Something went wrong',
            // });
        } finally {
            setBuyModalVisible(false)
        }
    }

    return (
        <>
            <View style={styles.LiveView}>
                <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                        <Text style={styles.LiveText}>Courses</Text>
                        <View style={styles.lotiView}>
                        </View>
                    </View>
                </View>
                <View style={styles.SeeView}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Courses')}
                        style={styles.TouchAll}>
                        <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {
                    isFetching
                    ?
                    <ActivityIndicator size={20} color={ColorsConstant.Theme}/>
                    :
                    (courses?.length === 0 )
                        ?
                        <NoDataFound scale={0.7} message={"No Courses Found"} actionText={"Reload"} />
                        :
                        <FlatList
                            keyExtractor={item => item._id}
                            data={courses}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={(current, index) => {
                                current = current.item
                                return (
                                    <View style={[styles2.centeredView, { margin: 10 }]}>
                                        <View style={[styles2.modalView, { height:"auto", paddingBottom:20, width:"auto", borderWidth:0.15, borderRadius:5 }]}>
                                            <View style={{ height: 150, width: '100%', objfit: 'cover' }}>
                                                <Image
                                                    source={{ uri: BLOBURL + current?.banner }}
                                                    style={{ height: '100%', width: '100%' }}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: 21,
                                                    fontFamily: 'work-Sans',
                                                    fontWeight: '800',
                                                    textAlign: 'center',
                                                }}>
                                                {current?.cou_name}
                                            </Text>
                                            <View
                                                style={[
                                                    styles2.mainv,
                                                    { alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 5 },
                                                ]}>
                                                <Text style={styles2.datatext}>
                                                    Price:
                                                    <Text
                                                        style={[
                                                            styles2.datatext1,
                                                            { textDecorationLine: 'line-through', fontSize: 14 },
                                                        ]}>
                                                        {' '}
                                                        ₹ {current?.amount}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles2.datatext1,
                                                        {
                                                            backgroundColor: '#F6E482',
                                                            padding: 3,
                                                            borderRadius: 5,
                                                            fontSize: 12,
                                                        },
                                                    ]}>
                                                    {' '}
                                                    <Text style={[styles2.datatext, { fontSize: 12 }]}>
                                                        Duration:
                                                    </Text>{' '}
                                                    {current?.Duration}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingTop: 5,
                                                    gap: 10,
                                                }}>
                                                <Text style={styles2.datatext1}>
                                                    <Text style={styles2.datatext}>Offer Price:</Text> ₹{' '}
                                                    {current?.final_amount}
                                                </Text>
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        backgroundColor: 'green',
                                                        padding: 4,
                                                        borderRadius: 5,
                                                        color: 'white',
                                                        fontSize: 14,
                                                    }}>
                                                    {current?.discount}% : off
                                                </Text>
                                            </View>
                                            <View style={styles2.mainv}>
                                                <Text style={styles2.datatext1}>
                                                    <Text style={styles2.datatext}>Videos Count:</Text>{' '}
                                                    {current?.videos_count}
                                                </Text>

                                                <Text style={styles2.datatext1}>
                                                    <Text style={styles2.datatext}>Attachments:</Text>{' '}
                                                    {current?.attachment_count}
                                                </Text>
                                            </View>
                                            <View style={styles2.buttonV}>
                                                <TouchableOpacity
                                                    onPress={() => { setCurrentCourse(current), setBuyModalVisible(true) }}
                                                    style={[styles2.button, styles2.buttonClose, {}]}>
                                                    <Text style={styles2.textStyle}>Buy Course</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles2.button,
                                                        styles2.buttonClose,
                                                        {
                                                            paddingHorizontal: 38,
                                                        },
                                                    ]}
                                                    onPress={() => { setBuyModalVisible(false), navigation.navigate("Courses") }}>
                                                    <Text style={styles2.textStyle}>View Courses</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                }
            </View>
            <Modal contentContainerStyle={{ zIndex: 200 }} visible={buyModalVisible} onDismiss={() => { setBuyModalVisible(false) }} style={{ alignItems: "center" }}>
                <View key={JSON.stringify(currentCourse)} style={styles.buyCourseModalView}>
                    <Text style={styles.buyCourseModalText}>Buy {currentCourse?.cou_name} Course</Text>
                    <View style={styles.buyCourseModalButtonsView}>
                        <Button
                            title="Yes"
                            color={'#eb1313'}
                            titleStyle={{
                                color: 'white',
                                fontSize: 15,
                                padding: 15,
                                paddingHorizontal: 30,
                            }}
                            buttonStyle={styles.logoutyesbutton}
                            onPress={() => {
                                buyCourse()
                            }}
                        />
                        <Button
                            color={'#e6e3e8'}
                            title="Cancel"
                            buttonStyle={styles.logoutyesbutton}
                            titleStyle={{ color: 'black', fontSize: 15, padding: 15 }}
                            onPress={() => { setBuyModalVisible(false) }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}