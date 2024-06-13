import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import NoDataFound from '../../components/NoDataFound'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Saved.styles'
import { Button, Text } from '../../utils/Translate'
import { FlatList } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'

export default function CreatedRooms({navigation}) {
  
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([
        {
            _id:"sdkl",
            name: 'First Name',
            totalMember: 29,
            capacity: 70,
            type: 'private',
            live: 20,
            enrolled: 24,
        }
    ])

    async function getCreatedRooms() { }
    async function deleteRoom() { }


    return (
        <View style={styles.maincontainer}>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    rooms.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Rooms Joined Yet"} action={getCreatedRooms} actionText={"Load Again"} />
                        :
                        <FlatList
                            data={rooms}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.roomContainer}>
                                        <Text style={styles.roomNameText}>{item.name}</Text>
                                        <View style={styles.memberHolder}>
                                            <Text style={styles.memberText}>Members: <Text style={{ color: ColorsConstant.GreenColor }}>{item.totalMember}</Text><Text style={{ color: ColorsConstant.Black }}>/{item.capacity}</Text></Text>
                                            <Text style={{ color: '#000', marginRight: 20 }}>{item.type}</Text>
                                        </View>
                                        <View>
                                            <View style={styles2.ActiveView}>
                                                <View style={styles2.ActiveView1}>
                                                    <View style={{ flex: 0.7 }}>
                                                        <View style={styles2.ActiveView2}>
                                                            <Text style={styles2.textAct}>Active Quizzes</Text>
                                                            <Text
                                                                style={[styles2.textAct, { color: '#367CFF' }]}>
                                                                {item.live}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 0.8 }}>
                                                        <View style={styles2.Cview}>
                                                            <Text style={styles2.textC}>Trivia Quizzes</Text>
                                                            <Text
                                                                style={[
                                                                    styles2.textC,
                                                                    { fontFamily: 'WorkSans-SemiBold' },
                                                                ]}>
                                                                {item.trivia}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={[styles2.textP]}>
                                                <View
                                                    style={[
                                                        styles2.Cview,
                                                        { justifyContent: 'center', alignItems: 'center' },
                                                    ]}>
                                                    <Text style={styles2.textC}>Enrolled Quizzes</Text>
                                                    <Text
                                                        style={[
                                                            styles2.textC,
                                                            { fontFamily: 'WorkSans-SemiBold' },
                                                        ]}>
                                                        {item.enrolled}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.roomContainerBtns}>
                                            <Button onPress={()=>{navigation.navigate('roomenter', {type:'created'})}} titleStyle={styles.enterbtn} containerStyle={styles.enterbtncontainer} title={"Enter Room"} />
                                            <TouchableOpacity style={styles.exitview}>
                                                <Image style={styles.exitimg} source={require('../../assets/img/redbin.png')}/>
                                                <Text style={styles.exitbtn}>Delete Room</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )

                            }}
                        />
            }
        </View>
    )
}