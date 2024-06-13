import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import NoDataFound from '../../components/NoDataFound'
import { ActivityIndicator } from 'react-native'
import { ColorsConstant } from '../../constants/Colors.constant'
import QuizCard from '../../components/QuizCard'

export default function ScheduledQuizzes() {
    const [loading, setLoading] = useState(false)
    const [scheduledQuizzes, setScheduledQuizzes] = useState([
        {
            _id: "sds",
            name: 'First Name',
            totalMember: 29,
            capacity: 70,
            type: 'private'
        }
    ])

    async function getScheduledQuizzes() {
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                loading
                    ?
                    <ActivityIndicator size={40} color={ColorsConstant.Theme} />
                    :
                    scheduledQuizzes.length === 0
                        ?
                        <NoDataFound scale={0.7} message={"No Scheduled Quizzes"} action={getScheduledQuizzes} actionText={"Load Again"} />
                        :
                        <FlatList
                            data={scheduledQuizzes}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <QuizCard
                                        onPress={() => { }}
                                        image={require('../../assets/img/facebook.png')}
                                        title={item.name}
                                        fees={200}
                                        prize={200}
                                        date={"01/02/2004 09:09:09"}
                                        totalslots={22}
                                        alotedslots={20}
                                        type={'active'}
                                        btntxt={"Register"}
                                        invitebtn={true}
                                    />
                                )

                            }}
                        />
            }
        </View>
    )
}