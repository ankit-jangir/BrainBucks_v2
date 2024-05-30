import React, { useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground, Text as BBText, TextInput, RefreshControl, StyleSheet } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';

export default function MyExams({navigation}) {
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isData, setData] = useState(false)


  const exam = [
    {
      id: '1',
      title: 'SBI-PO Current Affairs',
      fee: '9',
      date: '12/10/2002',
      prize: '90',
      earning: '8',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '6',
      date: '12/10/2002',
      prize: '9',
      earning: '88',
    },
    {
      id: '2',
      title: 'SBI-PO Current Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '988',
    },

    {
      id: '2',
      title: ' Affairs',
      fee: '99',
      date: '12/10/2002',
      prize: '99',
      earning: '88',
    },
    // Add more items as needed
  ];

  return (
    <>
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
        <Text style={styles.headerText}>My Exam Quizzes</Text>
      </View>
        {
          isData ?
            <>
              <View style={styles.DataView}>
                <Text style={styles.TextNo}>No Record Found</Text>
              </View>
            </>
            :
            <ScrollView>
              <View style={styles.LoadView} >
                {loading ?
                  <View style={styles.LoaderVIew}>
                    <ActivityIndicator size={50} color={'#129C73'} />
                  </View>
                  :
                  exam && exam.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MyExamQuizzes',)} style={styles.examView} >
      <View style={styles.CateView} >
        <Image source={require('../../assets/img/image.png')} style={styles.CateImage} />
      </View>
      <View style={styles.CateView} >
        <Text style={styles.TextEdit}>sonu</Text>
      </View>
      <View style={styles.CateView} >
        <Text style={[styles.TextEdit, { color: '#7E7E7E', fontSize: 16 }]}>Active Quizzes</Text>
      </View>
      <View style={styles.CateView} >
        <Text style={[styles.TextEdit, { color: '#DC1111', fontSize: 32 }]}>88</Text>
      </View>
    </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
        }
      </View>
    </>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation:1
  },
  backImage: {
    height: 30,
    width: 45,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Work Sans',
    textAlign:'center'
  },
  DataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextNo: {
    fontSize: 18,
    fontWeight: '500'
  },
  LoadView: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    height:1000
  },
  LoaderVIew: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  examView: {
    width: 160,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10
    
  },
  CateView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  CateImage: {
    width: 40,
    height: 40,
    borderRadius: 100
  },
  TextEdit: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    textAlign: 'center'
  }

})