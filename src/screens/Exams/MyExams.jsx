import React, { useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';
import { FlatList } from 'react-native';
import styles from '../../styles/Home.styles';

export default function MyExams({ navigation, route }) {
  const exams = route.params.exams;

  return (
    <>
      <View style={{ zIndex: 20 }}>
        <Toast />
      </View>
      <View style={[StyleConstants.safeArView]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/img/back.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Exams</Text>
        </View>
        {
          (!exams || exams.length === 0)
            ?
            <NoDataFound message={"No Exams Found"} action={() => { navigation.goBack() }} actionText={"Go Back"} />
            :
            <FlatList
              data={exams}
              scrollEnabled
              numColumns={2}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.ExamView}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MyExamQuizzes', { id: item._id, imgurl: item.image, title: item.category_name })}
                    style={styles.TouchExam}>
                    <View style={styles.ActiveView}>
                      <Image source={{ uri: BLOBURL + item.image }} style={{ width: 40, height: 40, borderRadius: 100 }} />
                    </View>
                    <View style={styles.ActiveView}>
                      <Text style={styles.TextActive}>{item.category_name}</Text>
                    </View>
                    <View style={styles.ActiveView}>
                      <Text style={[styles.TextActive, { color: 'blue' }]}>Go to exam</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
        }

      </View>
    </>
  )
}
