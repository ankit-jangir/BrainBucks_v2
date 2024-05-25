import React, { useEffect } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';

export default function Rewards({ navigation, quizzes, rewards }) {

    return (
        <>
            <View style={StyleConstants.safeArView}>
                <View style={styles.RankV}>
                    <View style={styles.RankV1}>
                        <View style={styles.RankV2}>
                            <Text style={styles.RankV3}>Rank</Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.RankV3}>Reward</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RankV4}>
                    <FlatList
                        data={rewards}
                        renderItem={Particpantsdata}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    )
}

const Particpantsdata = (props) => {
    return (
        <View style={styles.RewardsV}>
            <View style={styles.RewardsV1}>
                <View style={styles.RewardsV2}>
                    <Image source={require('../../assets/img/crown.png')} style={styles.RewardImg} />
                    <Text style={styles.Btext}>{props.item+1}.</Text>
                </View>
                <View style={styles.RewardsV3}>
                    <View style={styles.RewardsV4}>
                        <Image source={require('../../assets/img/bbcoin.png')} style={styles.RewardImg} />
                        <Text style={styles.Btext}>{props.item.name}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
    RankV:
    {
        width: "100%",
        height: 30,
        paddingHorizontal: 15,
        justifyContent: "center"
    },
    RankV1:
    {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    RankV2: {
        flex: 1,
        justifyContent: "flex-start"
    },
    RankV3:
    {
        fontFamily: 'WorkSans-Medium',
        fontSize: 18,
        color: "#2E2E2E"
    },
    RewardsV:
    {
        width: '100%',
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15
    },
    RankV4:
    {
        flex: 1,
        backgroundColor: '#fff',
    },
    RewardsV1:
    {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    RewardsV2:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    Btext: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 16,
        paddingLeft: 10,
        color:'#000'
    },
    RewardImg:
    {
        width: 18,
        height: 18,
    },
    RewardsV3: {
        flex: 2,
        justifyContent: "flex-start"
    },
    RewardsV4:
    {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start'

    }
})