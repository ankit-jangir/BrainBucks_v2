import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ColorsConstant } from '../../constants/Colors.constant'
import { TextInput } from '../../utils/Translate'
import ChatSockService from '../../services/api/ChatSockService'
import BasicServices from '../../services/BasicServices'
import Toast from 'react-native-toast-message'
import { ActivityIndicator } from 'react-native-paper'
import Animated from 'react-native-reanimated'


export default function Chat({ navigation, route }) {

    const chatServ = new ChatSockService()
    const chat_id = route.params.chat_id
    const is_active = route.params.is_active
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [user_id, setUserId] = useState('')
    const scrollRef = useRef()
    const backRef = useRef()
    const [isNewMessage, setIsNewMessage] = useState(false)


    //todo: handle back press
    useEffect(() => {
        getMessages()
        backRef.current = navigation.addListener('beforeRemove', (e) => {
            ChatSockService.keepOnlyOneListener()
          })
        return () => { backRef.current() }
    }, [])


    function getMessageHelper() {
        return async () => {
            let res = await chatServ.getChatByTicket(chat_id)
            return res;
        }
    }
    async function getMessages() {
        let res = await BasicServices.apiTryCatch(getMessageHelper(), Toast, () => { setLoading(true) }, (() => { setLoading(false) }))
        if (res) {
            let loc = await BasicServices.getLocalObject()
            setUserId(loc.id)
            setMessages(res.messages)
            if (is_active) {
                ChatSockService.listen((msg) => {
                    msg = JSON.parse(msg)
                    setMessages(pre => [...pre, msg])
                    if(scrollRef.current){
                        scrollRef.current.scrollToEnd();
                    }
                })
            }
            if (scrollRef.current) {
                setTimeout(() => {scrollRef.current.scrollToEnd()}, 700)
            }
        }
    }

    async function sendMessage() {
        if (!message.trim()) {
            return;
        }
        try {
            let res = await ChatSockService.sendMessage(chat_id, message)
            if (res.status === 1) {
                setMessages(prev => [...prev, res])
                setMessage('')
                if (scrollRef.current) {
                    scrollRef.current.scrollToEnd()
                }
            } else {
                Toast.show({
                    type: "info",
                    text1: res.Backend_Error
                })
            }
        } catch (err) {
            console.log("Error in creating ticket", err);
            // Toast.show({
            //     type: 'error',
            //     text1: "Something went wrong"
            // })
        }
    }

    return (
        <View style={styles.chatview}>
            <View style={{ zIndex: 200 }}><Toast /></View>
            <View style={styles.stdView1}>
                <View style={styles.stdView2}
                >
                    <TouchableOpacity
                        onPress={() => {
                            backRef.current()
                            navigation.goBack()
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 4,
                            borderWidth: 1,
                            borderRadius: 100,
                            width: 50,
                            height: 50,
                            borderColor: '#F5F5F5',
                        }}>
                        <Image
                            source={require('../../assets/img/back.png')}
                            style={{ height: 50, width: 50 }}></Image>
                    </TouchableOpacity>
                    <View style={styles.examView}>
                        <Text style={styles.textMy}>Chat Support</Text>
                        {isNewMessage && <Text style={{borderWidth:1, borderColor:'transparent', color: 'green', paddingRight:20}}>New Message</Text>}
                    </View>
                </View>
            </View>
            {
                loading
                    ?
                    <ActivityIndicator style={[styles.chats, { alignItems: 'center', justifyContent: 'center' }]} size={40} />
                    :
                    <FlatList
                        scrollEnabled
                        ref={scrollRef}
                        style={styles.chats}
                        data={messages}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            return (
                                <Text style={item.sender_id !== user_id ? styles.adminMsg : styles.userMsg}>
                                    {item.content}
                                </Text>
                            )
                        }}
                    />
            }
            {
                is_active
                &&
                <View style={styles.messageview}>
                    <TextInput value={message} placeholder="Enter message..." placeholderTextColor="gray" onChangeText={setMessage} style={styles.messageinput} />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendbtnView}>
                        <Image style={styles.sendbtnImg} source={require('../../assets/img/rightarrow1.png')} />
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    stdView1: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: ColorsConstant.LightGray,
        marginBottom: 5
    },
    stdView2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    examView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textMy: {
        fontSize: 18,
        fontFamily: 'WorkSans-SemiBold',
        color: "#000",
        textAlign: 'center'
    },
    chatview: {
        flex: 1,
        backgroundColor: 'white',
    },
    chats: {
        height: '90%',
        width: '95%',
        margin: 'auto',
        marginVertical: 10,
    },
    messageview: {
        width: '96%',
        paddingVertical: 10,
        borderRadius: 10,
        margin: 'auto',
        flexDirection: 'row',
        backgroundColor: '#f0f0fa',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 3,
        padding: 10
    },
    messageinput: {
        width: '85%',
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        color: 'gray'
    },
    sendbtnView: {
        backgroundColor: ColorsConstant.Theme,
        padding: 20,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    sendbtnImg: {
        objectFit: 'cover',
        height: 20,
        width: 20,
        tintColor: 'white'
    },
    adminMsg: {
        maxWidth: '80%',
        padding: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        color: '#000',
        marginVertical: 5,
        borderRadius: 10
    },
    userMsg: {
        maxWidth: '80%',
        padding: 10,
        alignSelf: 'flex-end',
        backgroundColor: ColorsConstant.Theme,
        color: '#fff',
        borderRadius: 10,
        marginVertical: 5
    },
})