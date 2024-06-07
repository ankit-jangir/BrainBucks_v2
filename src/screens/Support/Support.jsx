import { View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorsConstant } from '../../constants/Colors.constant'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Button, Text, TextInput } from '../../utils/Translate'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import ChatSockService from '../../services/api/ChatSockService'
import BasicServices from '../../services/BasicServices'
import { Overlay } from '@rneui/themed'
import NoDataFound from '../../components/NoDataFound'

export default function Support({ navigation }) {


    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [visible, setVisible] = useState(false)
    const [tickets, setTickets] = useState([])

    const chatServ = new ChatSockService()

    useEffect(() => {
        getTickets()
    }, [])

    function getTicketsHelper() {
        return async () => {
            let res = await chatServ.getAllTickets()
            return res;
        }
    }
    async function getTickets() {
        let res = await BasicServices.apiTryCatch(getTicketsHelper(), Toast, () => { setLoading(true) }, (() => { setLoading(false) }))
        if (res) {
            setTickets(res.Tickets)
        }
    }

    function createTicketHelper() {
        return async () => {
            let res = await chatServ.createTicket(title)
            return res;
        }
    }
    async function createTicket() {
        if (!title.trim()) {
            return;
        }

        let res = await BasicServices.apiTryCatch(createTicketHelper(), Toast)
        if (res) {
            getTickets()
        }
        setVisible(false)
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ zIndex: 200 }}><Toast /></View>
            <View style={styles.topview}>
                <View style={styles.backandimgview}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image style={styles.backimage} source={require('../../assets/img/arrow-up.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setVisible(true) }}>
                        <Text style={styles.createtext}>Create Ticket</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.toptext1}>We're Here For</Text>
                    <Text style={styles.toptext2}>Help & Support</Text>
                </View>
            </View>

            <Text style={styles.bottomtext}>Your Tickets</Text>
            {
                loading
                    ?
                    <View>
                        <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    </View>
                    :
                    tickets.length === 0
                        ?
                        <View style={{ height: 300, backgroundColor: 'transparent' }}>
                            <NoDataFound scale={0.7} message={"No Tickets. Create One To See Here"} actionText={"Refresh"} action={getTickets} />
                        </View>
                        :
                        <FlatList
                            style={styles.bottomview}
                            keyExtractor={(item) => item._id}
                            data={tickets}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('chat', {
                                        chat_id: item._id,
                                        is_active: !item.is_closed
                                    })} style={styles.tickettopview} >
                                        <View style={styles.ticketview}>
                                            <Text style={styles.ticketname}>{item.title}</Text>
                                            <Text style={{ color: 'black', fontSize: 15 }}>Last Updated: {new Date(item.update_on).toUTCString().replace(" GMT", "")}</Text>
                                            <Text style={{ color: !item.is_closed ? 'blue' : 'gray' }}>{!item.is_closed ? "Active" : "Closed"}</Text>
                                        </View>
                                        <Image style={{ width: '8%', height: 30, objectFit:'contain' }} source={require('../../assets/img/rightarrow1.png')} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
            }
            <Overlay isVisible={visible} overlayStyle={{ elevation: 3, paddingHorizontal: 10, gap: 10, width: '80%' }} animationType='slide' onBackdropPress={() => { setVisible(false) }}>
                <Text style={styles.overlaytext}>Enter Title</Text>
                <TextInput value={title} onChangeText={setTitle} placeholder='Enter title...' placeholderTextColor="gray" style={styles.ticketinput} />
                <View style={styles.btns}>
                    <Button onPress={() => { createTicket() }} buttonStyle={styles.createbtn} title="Create" />
                    <Button onPress={() => { setVisible(false) }} titleStyle={{ color: 'black' }} buttonStyle={styles.cancelbtn} title="Cancel" />
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    topview: {
        width: '100%',
        height: '37%',
        backgroundColor: ColorsConstant.Theme,
        padding: 20,
        justifyContent: 'space-between'
    },
    backandimgview: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    toptext1: {
        fontSize: 15,
        color: ColorsConstant.White
    },
    toptext2: {
        fontSize: 29,
        color: ColorsConstant.White,
    },
    createtext: {
        fontSize: 15,
        color: ColorsConstant.White,
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 7,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    backimage: {
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        tintColor: 'white',
        objectFit: 'cover',
        transform: 'rotate(-90deg)'
    },

    bottomview: {
        padding: 10,
        backgroundColor: ColorsConstant.White,
    },
    bottomtext: {
        color: ColorsConstant.GrayyColor,
        fontSize: 25,
        marginHorizontal: 10
    },
    tickettopview: {
        padding: 10,
        elevation: 3,
        backgroundColor: ColorsConstant.BlurWhite,
        paddingLeft: 20,
        borderRadius: 10,
        marginVertical: 19,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    ticketview: {
        gap: 14,
    },
    ticketname: {
        color: ColorsConstant.AshGray,
        fontSize: 20
    },

    //overlay styles:
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    },
    ticketinput: {
        borderWidth: 0.2,
        borderRadius: 5,
        color: ColorsConstant.Black,
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontFamily: 'Work-Sans',
        width: '88%',
        margin: 'auto'
    },
    overlaytext: {
        color: ColorsConstant.Black,
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10
    },
    createbtn: {
        backgroundColor: ColorsConstant.Theme,
        borderRadius: 8,
        paddingHorizontal: 20
    },
    cancelbtn: {
        backgroundColor: ColorsConstant.LightTheme,
        color: 'black',
        borderRadius: 8,
        paddingHorizontal: 20
    }

})