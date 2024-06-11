import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../../styles/Rooms.styles'
import { Button, Text } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'
import styles2 from '../../styles/Studymaterials.styles'

export default function RoomEnter({ navigation }) {

    let roomName = "Room Name"

    return (
        <View style={styles.enterRoomMainContainer}>
            <View style={styles.firstEnter}>

                <View style={styles.backandhistory}>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backimg, { padding: 20, backgroundColor: '#8D4AE2' }]}>
                            <Image style={[styles.backimg]} tintColor={"white"} source={require('../../assets/img/arrow-left.png')} />
                        </TouchableOpacity>
                        <Button
                            icon={<Image style={{ height: 18, width: 21, marginRight: 10, marginLeft: -10 }}
                                source={require('../../assets/img/historywatch.png')} />}
                            buttonStyle={{ backgroundColor: '#8D4AE2', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                            title={"History"}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.roomNameText}>{roomName}</Text>
                    <Text style={styles.memberText}>Members: <Text style={{ color: ColorsConstant.GreenColor }}>{20}</Text><Text style={{ color: ColorsConstant.Black }}>/{30}</Text></Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            icon={
                                <Image
                                    style={styles.backRoomEnterImg}
                                    source={require('../../assets/img/share.png')}
                                />
                            }
                            buttonStyle={styles.roomEnterShareBtn}
                            titleStyle={{ fontSize: 12 }}
                            title={"Invite"}
                        />
                        <Text style={{ fontSize: 12 }}>Private</Text>
                    </View>

                    <View style={[styles2.container, { marginHorizontal: 0 }]}>
                        <TouchableOpacity
                            style={[
                                styles2.button1,
                                selected === 'Public' ? { backgroundColor: '#FFF' } : { backgroundColor: '#8D4AE2' },
                                { flex: 1, paddingHorizontal: 0, alignItems: 'center', marginHorizontal: 0 }
                            ]}
                            onPress={() => setSelected('Public')}
                        >
                            <Text style={[
                                styles2.text,
                                selected === 'Public' ? { color: "#701DDB" } : { color: "#FFF" }
                            ]}>
                                Public
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles2.button,
                                selected === 'Private' ? { backgroundColor: '#FFF' } : { backgroundColor: '#8D4AE2' },
                                styles.typebtn
                            ]}
                            onPress={() => setSelected('Private')}
                        >
                            <Text style={[
                                styles2.text,
                                selected === 'Private' ? { color: "#701DDB" } : { color: "#FFF" }
                            ]}>
                                Private
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View>

            </View>

        </View>
    )
}