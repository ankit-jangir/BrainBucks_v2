import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import SearchBar from './SearchBar';
import Carousel from 'react-native-reanimated-carousel';
import styles from '../../styles/Home.styles';

const Home = () => {
  const width = Dimensions.get('window').width;

  const banner = [
    {title: 'Image 1', image: require('../../assets/img/banner1.png'),},
    {title: 'Image 2',  image: require('../../assets/img/banner_1.png'),},
    {title: 'Image 3',  image: require('../../assets/img/banner.png'),},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar />
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={banner}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index, item}) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
              {/* <Text style={styles.carouselText}>{item.title}</Text> */}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};


export default Home;
