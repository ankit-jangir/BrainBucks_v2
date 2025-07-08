import { View, Image, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { BLOBURL } from '../config/urls';
import styles from '../styles/Home.styles';
const { width } = Dimensions.get('window');
import { useQuery } from '@tanstack/react-query';
import HomeApiService from '../services/api/HomeApiService';

export default function HomeBanners() {
  const homeServ = new HomeApiService();

  const { data } = useQuery({
    queryKey: ['homeBanners'],
    queryFn: homeServ.getBanners,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    retry: 1,
  });

  const banners = data?.banners || [];

  // 🔕 First-time loading me kuch bhi show mat karo (blank)
  if (!banners.length) return null;

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width}
        height={width / 2.1}
        autoPlay
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View key={item._id} style={styles.carouselItem}>
            <Image
              source={{ uri: BLOBURL + item.banner }}
              resizeMode="contain"
              style={styles.carouselImage}
            />
          </View>
        )}
      />
    </View>
  );
}
