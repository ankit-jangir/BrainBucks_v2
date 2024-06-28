import { View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/Rooms.styles'
import { Button, Text } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'
import styles2 from '../../styles/Studymaterials.styles'
import { MyTabBar } from './Rooms'
import LiveQuizzes from './LiveQuizzes'
import ScheduledQuizzes from './ScheduledQuizzes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

export default function RoomEnter({ navigation, route }) {

    const room_data = route.params.room_data;
    const [selected, setSelected] = useState('Quizzes')
    const type = route.params.type;

    return (
        <View style={styles.enterRoomMainContainer}>
            <View style={styles.firstEnter}>

                <View style={styles.backandhistory}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backimg, { padding: 20, backgroundColor: '#8D4AE2' }]}>
                        <Image style={[styles.backimg]} resizeMethod='contain' tintColor={"white"} source={require('../../assets/img/arrow-left.png')} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        {
                            type === 'created' &&
                            <Button
                                icon={<Image style={styles.histImg}
                                    source={require('../../assets/img/mail.png')} />
                                }
                                onPress={() => {navigation.navigate("RoomNotification",{
                                    room_data:room_data
                                })}}
                                buttonStyle={{ backgroundColor: '#8D4AE2', alignItems: 'center', justifyContent: 'center', borderRadius: 15, paddingHorizontal: 20 }}
                                title={"9+"}
                                titleStyle={{ fontSize: 14 }}
                            />
                        }

                        <Button
                            icon={<Image style={styles.histImg}
                                source={type === 'created' ? require('../../assets/img/setting.png') : require('../../assets/img/historywatch.png')} />
                            }
                            onPress={() => { type==='created'&& navigation.navigate('roomsetting', {room_data:room_data, type:type})  }}
                            buttonStyle={{ backgroundColor: '#8D4AE2', alignItems: 'center', justifyContent: 'center', borderRadius: 15, paddingHorizontal: 20 }}
                            title={type === 'created' ? "Settings" : "History"}
                            titleStyle={{ fontSize: 14 }}
                        />
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={[styles.roomNameText, { color: ColorsConstant.White }]}>{room_data.room_name}</Text>
                    <Text style={[styles.memberText, { color: ColorsConstant.White }]}>Members: <Text style={{ color: ColorsConstant.GreenColor }}>{room_data.enrolled_participants_count}</Text><Text style={{ color: ColorsConstant.White }}>{}</Text></Text>
                    <View style={styles.invitePrev}>
                        <Button
                            icon={
                                <Image
                                    style={styles.backRoomEnterImg}
                                    tintColor={"white"}
                                    source={require('../../assets/img/share.png')}
                                />
                            }
                            buttonStyle={styles.roomEnterShareBtn}
                            titleStyle={{ fontSize: 12 }}
                            title={"Invite"}
                        />
                        <Text style={{ fontSize: 12, color:"white" }}>{room_data.room_hash ? "Private": "Public" }</Text>
                    </View>

                    <View style={[styles2.container, { marginHorizontal: 0 }]}>
                        {
                            type === 'created'
                                ?
                                <View style={styles.roomContainerBtns}>
                                    <Button
                                        onPress={()=>{navigation.navigate('createlivequiz')}}
                                        titleStyle={[styles.enterbtn, {color:ColorsConstant.Theme}]}
                                        containerStyle={styles.enterbtncontainer}
                                        buttonStyle={{backgroundColor:'#fff'}}
                                        title={" + Live Quiz"}
                                    />
                                    <Button
                                        titleStyle={[styles.enterbtn]}
                                        containerStyle={styles.enterbtncontainer}
                                        buttonStyle={{backgroundColor:'#0CBC8B'}}
                                        title={" + Schedule Quiz"}
                                    />
                                </View>
                                :
                                <>
                                    <TouchableOpacity
                                        style={[
                                            styles2.button1,
                                            selected === 'Quizzes' ? { backgroundColor: '#FFF' } : { backgroundColor: '#8D4AE2' },
                                            { flex: 1, paddingHorizontal: 0, alignItems: 'center', marginHorizontal: 0 }
                                        ]}
                                        onPress={() => setSelected('Quizzes')}
                                    >
                                        <Text style={[
                                            styles2.text,
                                            selected === 'Quizzes' ? { color: "#701DDB" } : { color: "#FFF" }
                                        ]}>
                                            Quizzes
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles2.button,
                                            selected === 'Participants' ? { backgroundColor: '#FFF' } : { backgroundColor: '#8D4AE2' },
                                            styles.typebtn
                                        ]}
                                        onPress={() => setSelected('Participants')}
                                    >
                                        <Text style={[
                                            styles2.text,
                                            selected === 'Participants' ? { color: "#701DDB" } : { color: "#FFF" }
                                        ]}>
                                            Participants
                                        </Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </View>

                </View>

            </View>

            <View style={styles.secondEnter}>
                <Tab.Navigator tabBar={props => <MyTabBar {...props} imgNeeded={false} width={100} />}>
                    <Tab.Screen name="Live Quizzes" component={LiveQuizzes} initialParams={{room_data:room_data}} />
                    <Tab.Screen name="Scheduled Quizzes" component={ScheduledQuizzes} initialParams={{room_data:room_data}}  />
                </Tab.Navigator>

            </View>

        </View>
    )
}