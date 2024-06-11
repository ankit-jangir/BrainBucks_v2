import { View, Image } from 'react-native'
import React from 'react'
import styles from '../../styles/Rooms.styles'
import { Button, Text } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'

export default function RoomCreatedSuccesfully({ navigation, route }) {
    let roomname = 'Name'
    return (
        <View style={[styles.maincontainer, { padding: 10, justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{ flex: 0.6, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require("../../assets/img/hutimg.png")} resizeMethod='contain' style={{ width: '70%', objectFit: 'contain' }} />
            </View>
            <View style={{ gap: 20 }}>
                <Text style={{ margin: 'auto', textAlign: 'center', color: ColorsConstant.Black, fontFamily: "WorkSans-Regular", padding: 10, fontSize: 20 }}>New Room “{roomname}” Created Successfully </Text>
                <Button
                    icon={<Image style={{height:25, width:25, marginRight:10, marginLeft:-10}} 
                    source={require('../../assets/img/whatsapp.png')} />}
                    buttonStyle={{ backgroundColor: '#16AC72', alignItems:'center', justifyContent:'center' }}
                    title={"Invite Friend"} />
                <Button onPress={() => navigation.pop(2)} title={"View Room"} />
            </View>
        </View>
    )
}