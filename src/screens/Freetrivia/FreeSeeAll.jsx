import React, { useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Image,StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';
import { ColorsConstant } from '../../constants/Colors.constant';
import {LinearProgress} from '@rneui/themed';
import MainHeader from '../../components/MainHeader';
export default function FreeSeeAll(props) {
  const [isData, setData] = useState(false)
  const [loading, setLoading] = useState(false);

  const trivia = [
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

  const handleBackPress = () => {

    props.navigation.goBack();
  };

  // console.log(trivia)
  return (
    <>
      <View style={StyleConstants.safeArView}>
        <MainHeader
          name={"Free Trivias"}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              handleBackPress()
            },
          }}
        />
        {
          isData ?
            <>
              <View style={styles.NoData}>
                <Text style={styles.TextNo}>No Record Found</Text>
              </View>
            </>
            : <ScrollView>
              <View style={styles.LoadingView} >
                {
                  loading ?
                    <View style={styles.LoaderView}>
                      <ActivityIndicator size={45} color={'#2289E7'} />
                    </View>
                    : trivia && trivia.map((item, index) => {
                      return (<FreeTrivia item={item} key={index} navigation={props.navigation} />);
                    })
                }
              </View>
            </ScrollView>
        }
      </View>
    </>
  )
}

const FreeTrivia = (props) => {
  return (
    <View style={styles.MainView}>
      <View style={styles.MainView1} >
        <View style={styles.MainView2} >

          <View style={styles.picView}>
            <Image source={require('../../assets/img/image.png')} resizeMode='contain' style={{ width: 35, height: 35 }} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.TitleText}>0iuytf</Text>
          </View>
        </View>

        <View style={styles.FeeView}>
          <View style={styles.FeeView1} >
            <View style={{ flex: 6, }} >
              <View style={styles.FeeView2} >
                <Text style={styles.TextFee}>Fees</Text>
                <View style={styles.ZeroView}>
                  <Image source={require('../../assets/img/bbcoin.png')} style={styles.IconPic} />
                  <Text style={styles.TextZero} >0</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center" }} >
                  <Text style={styles.TextFee}>Prize</Text>
                  <View style={styles.ZeroView}>
                    <Image source={require('../../assets/img/bbcoin.png')} style={styles.IconPic} />
                    <Text style={styles.TextZero} >98765</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/img/dollar.png')} // <QuizCard image={{uri:'as;dfl'}} image={require('')}/>>
            resizeMode="contain"
            tintColor={"#C922E4"}
            style={{width: 25, height: 25}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: '#C922E4',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 18,
              }}>
              8/
            </Text>
            <Text
              style={{
                color:'#C922E4',

                fontFamily: 'WorkSans-SemiBold',
                fontSize: 18,
              }}>
             8
            </Text>
          </View>
        </View>
        <View style={styles.LiniView}>
          <View style={{}}>
            <LinearProgress
              style={{marginVertical: 10, height: 8, borderRadius: 10}}
              value={0.4}
              variant="determinate"
              color={'#C922E4'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('FreeRulesParticipation',)} style={styles.TouchPar} >
          <Text style={styles.TextPar} >Participate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  NoData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextNo: {
    fontSize: 18,
    fontWeight: '500'
  },
  LoadingView: {
    flex: 1,
    alignItems: "center",
    marginBottom:240
  },
  LoaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  MainView: {
    flex: 1,
    paddingVertical: 10
  },
  MainView1: {
    width: 340,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    elevation: 2,
    backgroundColor: '#fff',
  },
  MainView2: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: ColorsConstant.White
  },
  picView: {
    width: 50,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: "center",
  },
  titleView: {
    width: "100%",
    height: "auto",
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  TitleText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
    width: "90%",
    color:"#000"
  },
  FeeView: {
    width: '100%',
    height: 40,
    backgroundColor: ColorsConstant.White,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: "center"
  },
  FeeView1: {
    flex: 1,
    flexDirection: "row"
  },
  FeeView2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  TextFee: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    color: '#7E7E7E',
    flex: 0.30
  },
  ZeroView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 0.70,
    alignItems: "center"
  },
  IconPic: {
    width: 20,
    height: 20,
  },
  TextZero: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    color: '#F5B807',
    paddingLeft: 10
  },
  PerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  PerView1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10
  },
  TextBr: {
    color: '#C922E4',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18
  },
  LiniView: {
    width: "100%",
    justifyContent: "center"
  },
  TouchPar: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#C922E4"
  },
  TextPar: {
    color: '#C922E4',
    fontSize: 17,
    fontFamily: 'WorkSans-Medium'
  }
})

