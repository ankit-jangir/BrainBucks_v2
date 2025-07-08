import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Text} from '../../utils/Translate';
import {StyleConstants} from '../../constants/Style.constant';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import {BLOBURL} from '../../config/urls';
import {FlatList} from 'react-native';
import styles from '../../styles/Home.styles';
import MainHeader from '../../components/MainHeader';
import {ColorsConstant} from '../../constants/Colors.constant';

export default function MyExams({navigation, route}) {
  const exams = route.params.exams;

  return (
    <>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>
      <View style={[StyleConstants.safeArView]}>
        <MainHeader
          name={'My Exams'}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'),
            onPress: () => {
              navigation.goBack();
            },
          }}
        />
        {!exams || exams.length === 0 ? (
          <NoDataFound
            message={'No Exams Found'}
            action={() => {
              navigation.goBack();
            }}
            actionText={'Go Back'}
          />
        ) : (
          <FlatList
            data={exams}
            scrollEnabled
            numColumns={2}
            keyExtractor={item => item._id.toString()}
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
                  <Text style={styles.cardTitle}>{item.category_name}</Text>
                  <Text style={styles.cardSubtitle}>
                    {item.quizCount}
                    <Text
                      style={{
                        color: '#7E7E7E',
                        fontWeight: '400',
                        fontSize: 12,
                      }}>
                      {' '}
                      Active Quizzes
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </>
  );
}
