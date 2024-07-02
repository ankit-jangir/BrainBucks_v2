import { View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Studymaterials.styles'
import { Button, Text, TextInput } from '../../utils/Translate'
import Toast from 'react-native-toast-message'
import { createRoomInController } from '../../controllers/RoomsController'
import { ColorsConstant } from '../../constants/Colors.constant'

export default function CreateRoom({navigation}) {

    const [name, setName] = useState('')
    const [selected, setSelected] = useState("Public")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    async function createRoom(){
        let type = selected==="Public"?1:0;
        let res = await createRoomInController(type,name,setErrorMessage,setLoading)
        if(res){
            navigation.navigate('roomcreatedsuccess',{name:name})
            setName("")
        }
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <View style={{ zIndex: 20 }}><Toast /></View>
            <View style={{ paddingVertical: 10, paddingHorizontal:20 }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.backimg, { padding: 20 }]}>
                    <Image style={styles.backimg} source={require('../../assets/img/arrow-left.png')} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text style={styles.createroomtext}>Create Room & Compete with your Friends</Text>
                    <View>
                        <Image style={styles.createroomimg} source={require('../../assets/img/createroom.png')} />
                    </View>

                    <View>
                        <Text style={styles.createRoomOptionText}>Select Room Type</Text>
                        <View style={[styles2.container, { marginHorizontal: 0 }]}>
                            <TouchableOpacity
                                style={[
                                    styles2.button1,
                                    selected === 'Public' ? { backgroundColor: '#701DDB' } : { backgroundColor: 'rgba(239, 239, 239, 1)' },
                                    { flex: 1, paddingHorizontal: 0, alignItems: 'center' }
                                ]}
                                onPress={() => setSelected('Public')}
                            >
                                <Text style={[
                                    styles2.text,
                                    selected === 'Public' ? styles2.selectedText : styles2.deselectedText
                                ]}>
                                    Public
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles2.button,
                                    selected === 'Private' ? { backgroundColor: '#701DDB' } : { backgroundColor: 'rgba(239, 239, 239, 1)' },
                                    { flex: 1, paddingHorizontal: 0, alignItems: 'center' }
                                ]}
                                onPress={() => setSelected('Private')}
                            >
                                <Text style={[
                                    styles2.text,
                                    selected === 'Private' ? styles2.selectedText : styles2.deselectedText
                                ]}>
                                    Private
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.createRoomOptionText}>Enter the name of Room</Text>
                        <TextInput
                            style={[styles.createRoomInput, errorMessage&&{borderWidth:1,borderColor:"red"}]}
                            placeholder={"Ex. My UPSC Room"}
                            placeholderTextColor={"gray"}
                            value={name}
                            onChangeText={text=>{setErrorMessage(null), setName(text)}} />
                        {errorMessage&&<Text key={errorMessage} style={{color:"red", fontSize:15, marginTop:10}}>*{errorMessage}</Text>}
                    </View>

                </View>
            </ScrollView>

            <Button
                loading={loading}
                loadingProps={{color:ColorsConstant.Theme, size:26}}
                onPress={()=>{createRoom()}}
                title={"Create Room"}
                buttonStyle={styles.createRoomBtn}
                containerStyle={{alignSelf:"flex-end", width:"100%"}}
            />
        </SafeAreaView>
    )
}