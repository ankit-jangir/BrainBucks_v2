import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import NoDataFound from '../../components/NoDataFound'
import { Button, Text } from '../../utils/Translate'
import styles from '../../styles/Rooms.styles'
import QuizCard from '../../components/QuizCard'

export default function LiveQuizzes() {

    const [loading, setLoading] = useState(false)
    const [liveQuizzes, setLiveQuizzes] = useState([
        {
            _id: "sds",
            name: 'First Name',
            totalMember: 29,
            capacity: 70,
            type: 'private'
        }
    ])

    async function getLiveQuizzes() {
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    liveQuizzes.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Live Quizzes Found"} action={getLiveQuizzes} actionText={"Load Again"} />
                        :
                        <FlatList
                            data={liveQuizzes}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <QuizCard
                                        onPress={()=>{}}
                                        image={require('../../assets/img/facebook.png')}
                                        title={item.name}
                                        fees={200}
                                        prize={200}
                                        date={"01/02/2004 09:09:09"}
                                        totalslots={22}
                                        alotedslots={23}
                                        type={'active'}
                                        btntxt={"Enter Lobby"}
                                        invitebtn={true}
                                    />
                                )

                            }}
                        />
            }
        </View>
    )
}