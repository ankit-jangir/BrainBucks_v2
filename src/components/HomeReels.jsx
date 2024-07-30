import { View, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { BLOBURL } from '../config/urls'
import { Text } from '../utils/Translate'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import NoDataFound from './NoDataFound'
import styles from '../styles/Home.styles'
import { screenWidth } from '../constants/Sizes.constant'
import HomeApiService from '../services/api/HomeApiService'
import { useQuery } from '@tanstack/react-query'
import { ColorsConstant } from '../constants/Colors.constant'

const HomeReels = ({ setParentModalVisible, setCurrentReel }) => {
    const navigation = useNavigation()
    const { width } = Dimensions.get('window');
    const CARD_MARGIN = 1; // Adjust this value as needed
    const CARD_WIDTH = width - 7 * CARD_MARGIN; // Subtract margins from total width
    const homeServ = new HomeApiService()

    const { data, isFetching, refetch } = useQuery({ queryKey: ['homeReels'], queryFn: homeServ.getReels })
    const reels = (data?.reels || [])

    const isFocused = useIsFocused()

    useEffect(() => {
        refetch()
    }, [isFocused])

    return (
        <>
            <View style={styles.LiveView}>
                <View style={styles.LiveView1}>
                    <View style={styles.LiveView2}>
                        <Text style={styles.LiveText}>Brain Boosters</Text>
                        <View style={styles.lotiView}>
                        </View>
                    </View>
                </View>
                <View style={styles.SeeView}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Reels') }}
                        style={styles.TouchAll}>
                        <Text style={styles.SeeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, margin: 20 }}>
                {
                    isFetching
                        ?
                        <ActivityIndicator size={20} color={ColorsConstant.Theme} />
                        :
                        (reels.length === 0)
                            ?
                            <NoDataFound scale={0.7} message={"No Reels Found"} actionText={"Reload"} />
                            :
                            <FlatList
                                data={reels}
                                keyExtractor={item => item._id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ borderWidth: 0.1, borderRadius: 3 }}
                                        onPress={() => { setCurrentReel(item), setParentModalVisible(true) }}>
                                        <Image
                                            style={{ width: screenWidth / 3, height: 200, borderRadius: 5, objectFit: 'cover' }}
                                            source={{ uri: BLOBURL + item.banner }}
                                            controls={false}
                                        />
                                    </TouchableOpacity>
                                )}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                // snapToInterval={width}
                                snapToAlignment="center"
                                decelerationRate="fast"
                                contentContainerStyle={{ paddingHorizontal: CARD_MARGIN, gap: 14 }}
                            />
                }
            </View>
        </>
    )
}

export default HomeReels