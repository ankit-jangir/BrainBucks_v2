import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { useIsFocused } from '@react-navigation/native';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import { useQuiz } from '../../context/QuizPlayReducer';
import Toast from 'react-native-toast-message';
import BasicServices from '../../services/BasicServices';

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

export default function Rewards({ id }) {

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)

    const focus = useIsFocused()
    const quizServ = new ActiveQuizApiService()
    const { quizState, dispatch } = useQuiz()
    const [data, setData] = useState([])

    useEffect(() => {
        getRewards();
      }, [focus]);

    function getDataHelper(page) {
        return async () => {
            let quizId = quizState.id || id
          let res = await quizServ.getActiveQuizRewards(quizState.id, page);
          return res;
        }
      }
    
      async function getRewards(page) {
        if (!page) {
          page = 1
        }

        if (page <= totalPages) {
          setCurrentPage(page)
          let func = setLoadingMore
          let res = await BasicServices.apiTryCatch(getDataHelper(page), Toast, () => { func(true) }, () => { func(false) })
          if (res) {
            setTotalPages(res.totalPages)
            if (page === 1)
              setData(res.send_rewards)
            else
              setData([...data, ...res.send_rewards])
          }
        }
      }


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
                        onEndReachedThreshold={0.8}
                        onEndReached={() => { getRewards(currentPage + 1) }}
                        renderItem={({ item, index }) => <ParticipantsData item={item} index={index} />}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                    {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme}/>}
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
