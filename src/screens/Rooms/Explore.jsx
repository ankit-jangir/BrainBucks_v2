import { View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../Home/SearchBar'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Study.styles'
import { TextInput, Text, Button } from '../../utils/Translate'
import { ColorsConstant } from '../../constants/Colors.constant'
import NoDataFound from '../../components/NoDataFound'

export default function Explore() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([
        {
            _id:"sds",
            name: 'First Name',
            totalMember: 29,
            capacity: 70,
            type: 'private'
        }
    ])

    async function getRooms(){
        
    }

    return (
        <View style={[styles.maincontainer, { paddingHorizontal: 10 }]}>
            <View style={styles2.inputView}>
                <View style={styles2.inputView1}>
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        style={styles2.inputText}
                        placeholder="Search for Exams"
                        placeholderTextColor={'#7E7E7E'}
                    >
                    </TextInput>
                    <TouchableOpacity style={styles2.touchSearch}>
                        <Image
                            source={require('../../assets/img/search.png')}
                            resizeMode="contain"
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    rooms.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Rooms Found"} action={getRooms} actionText={"Load Again"} />
                        :
                        <FlatList
                            data={rooms}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.roomContainer}>
                                        <Text style={styles.roomNameText}>{item.name}</Text>
                                        <View style={styles.memberHolder}>
                                            <Text style={styles.memberText}>Members: <Text style={{color:ColorsConstant.GreenColor}}>{item.totalMember}</Text><Text style={{color:ColorsConstant.Black}}>/{item.capacity}</Text></Text>
                                            <Text style={{color:'#000', marginRight:20}}>{item.type}</Text>
                                        </View>
                                        <Button title={"Send Request"}/>
                                    </View>
                                )

                            }}
                        />
            }
        </View>
    )
}