import { View, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Carousel from 'react-native-reanimated-carousel'
import { BLOBURL } from '../config/urls'
import styles from '../styles/Home.styles'
const { width } = Dimensions.get('window');
import { useQuery } from '@tanstack/react-query'
import HomeApiService from '../services/api/HomeApiService'
import { ActivityIndicator } from 'react-native-paper'
import { ColorsConstant } from '../constants/Colors.constant'

export default function HomeBanners({ setLoading }) {

  const homeServ = new HomeApiService()
  const { data, isFetching } = useQuery({ queryKey: ['homeBanners'], queryFn: homeServ.getBanners })
  const banners = data?.banners || [];

  // useEffect(() => {
  //   console.log(isFetching);
  //   setLoading(isFetching)
  // }, [isFetching])

  return (
    <View style={styles.carouselContainer}>
      {
        isFetching
          ?
          <ActivityIndicator size={20} color={ColorsConstant.Theme} />
          :
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={banners}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <View key={item._id} style={styles.carouselItem}>
                <Image source={{ uri: BLOBURL + item.banner }} style={styles.carouselImage} />
              </View>
            )}
          />
      }
    </View>
  )
}