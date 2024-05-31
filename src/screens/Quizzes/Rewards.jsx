import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { useIsFocused } from '@react-navigation/native';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import { useQuiz } from '../../context/QuizPlayReducer';
import Toast from 'react-native-toast-message';

const ParticipantsData = ({ item, index }) => {

    return (
        <View style={styles.RewardsV}>
            <View style={styles.RewardsV1}>
                <View style={styles.RewardsV2}>
                    <Image source={require('../../assets/img/crown.png')} style={styles.RewardImg} />
                    <Text style={styles.Btext}>{item.Rank}.</Text>
                </View>
                <View style={styles.RewardsV3}>
                    <View style={styles.RewardsV4}>
                        <Image source={require('../../assets/img/bbcoin.png')} style={styles.RewardImg} />
                        <Text style={styles.Btext}>{item.reward}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default function Rewards({ rewards }) {

    const focus = useIsFocused()
    const quizServ = new ActiveQuizApiService()
    const { quizState, dispatch } = useQuiz()
    const [data, setData] = useState([])

    useEffect(() => {
        quizServ.getActiveQuizRewards(quizState.id).then(res => {
            if (res) {
                console.log(res);
                setData(res.send_rewards)
            }
        }).catch((err) => {
            console.log("Error in fetching participants: ", err);
            Toast.show({ type: "error", text1: "Something went wrong" })
        })
    }, [focus])

    return (
        <>
            <View style={StyleConstants.safeArView}>
                <View style={styles.RankV}>
                    <View style={styles.RankV1}>
                        <View style={styles.RankV2}>
                            <Text style={styles.RankV3}>Rank</Text>
                        </View>
                        <View style={{ flex: 1.6 }}>
                            <Text style={styles.RankV3}>Reward</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RankV4}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => <ParticipantsData item={item} index={index} />}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    RankV: {
        width: "100%",
        height: 30,
        paddingHorizontal: 15,
        justifyContent: "center"
    },
    RankV1: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    RankV2: {
        flex: 1,
        justifyContent: "flex-start"
    },
    RankV3: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 14,
        color: "#2E2E2E"
    },
    RewardsV: {
        width: '100%',
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15
    },
    RankV4: {
        flex: 1,
        backgroundColor: '#fff',
    },
    RewardsV1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    RewardsV2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    Btext: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 14,
        paddingLeft: 10,
        color: '#000'
    },
    RewardImg: {
        width: 18,
        height: 18,
    },
    RewardsV3: {
        flex: 2,
        justifyContent: "flex-start"
    },
    RewardsV4: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start'
    }
});
