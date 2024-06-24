import { View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Studymaterials.styles'
import { Button, Text, TextInput } from '../../utils/Translate'
import Toast from 'react-native-toast-message'

export default function CreateRoom({navigation}) {

    const [name, setName] = useState('')
    const [selected, setSelected] = useState("Public")

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
                            style={styles.createRoomInput}
                            placeholder={"Ex. My UPSC Room"}
                            placeholderTextColor={"gray"}
                            value={name}
                            onChangeText={setName} />
                    </View>

                </View>
            </ScrollView>

            <Button
                onPress={()=>{navigation.navigate('roomcreatedsuccess')}}
                title={"Create Room"}
                buttonStyle={styles.createRoomBtn}
                containerStyle={{alignSelf:"flex-end", width:"100%"}}
            />
        </SafeAreaView>
    )
}