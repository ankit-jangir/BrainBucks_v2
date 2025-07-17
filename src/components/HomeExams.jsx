import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {Text} from '../utils/Translate';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BLOBURL} from '../config/urls';
import HomeApiService from '../services/api/HomeApiService';
import {useQuery} from '@tanstack/react-query';
import {color} from '@rneui/base';

export default function HomeExams() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const homeServ = new HomeApiService();

  const {data, refetch} = useQuery({
    queryKey: ['homeExams'],
    queryFn: homeServ.getExams,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (data?.exams?.length) {
      setExams(data.exams);
    }
  }, [data]);

  if (!exams || exams.length === 0) return null;

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Exams</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('myexams', {exams})}>
          <Text style={styles.headerSeeAll}>See All &gt;</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={exams}
        keyExtractor={item => item._id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate('MyExamQuizzes', {
                id: item._id,
                imgurl: item.image,
                title: item.category_name,
              })
            }>
            <Image
              source={{uri: BLOBURL + item.image}}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text
                style={styles.cardTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.category_name}
              </Text>

              <Text style={styles.cardSubtitle}>
                {item.quizCount}
                <Text
                  style={{color: '#7E7E7E', fontWeight: '400', fontSize: 12}}>
                  {' '}
                  Active Quizzes
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerTitle: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    fontWeight: '500',
  },
  headerSeeAll: {
    fontSize: 14,
    color: '#009688',
    fontFamily: 'WorkSans-Regular',
  },
  cardContainer: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 10,
    // marginRight: 12,
    elevation: 0.8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
    width: '100%',
  },

  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    color: '#DC1111',
    marginTop: 4,
  },
});
