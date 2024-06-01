import React, { useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Image,  StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
export default function ScoreCard({ navigation, route }) {

  const QuizId = route.params.quiz_id;
  const [Data, setData] = useState([])
  const [Re, setRe] = useState("")


  return (
    <>
      <View style={styles.ScoreCardV}>
        <View style={styles.ScoreCardV1}>
          <View style={styles.ScoreCardV2}>
            <View style={styles.ScoreCardV3} >
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.ScoreCardTouchable} >
              <Image source={require('../../assets/img/arrows.png')} resizeMode='center' tintColor={'#fff'} style={{width:25,height:25}} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.MyText} >My Scorecard</Text>
            </View>
            <View style={styles.ScoreCardV4} >
              <TouchableOpacity onPress={() => navigation.navigate('CustomerSupport')} style={styles.ScoreCardTouchable1} >
                <Image source={require('../../assets/img/headphone.png')} style={styles.ScoreCardImg} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ScoreCardV5} >
            <Text style={styles.RewardText} >Reward</Text>
            <Image source={require('../../assets/img/bbcoin.png')} resizeMode='contain' style={styles.RewardImg} />
            <BBText style={styles.RewardText} >{Re}</BBText>
          </View>
          <TouchableOpacity onPress={() => { downLoadExcel() }} style={styles.AnswerkeyV} >
            <Text style={styles.AnswerSheetText} >Download Answer Sheet</Text>
            <Image source={require('../../assets/img/download.png')} resizeMode='contain' style={styles.RewardImg} />
          </TouchableOpacity>
        </View>
        <View style={AnswerSheetV} >
          <View style={styles.AnswerSheetV1} >
            <View style={styles.AnswerSheetV2} >
            </View>
          </View>
          <Text style={styles.AnswerSheetText1}>Answer Sheet</Text>
          <View style={styles.QNoView}>
            <View style={styles.QNoView1}>
              <View style={styles.QNoView2}>
                <Text style={styles.QNoText}>QNo.</Text>
              </View>
              <View style={{ flex: 0.7, borderRightWidth: 1, borderRightColor: '#CFCFCF', alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: '#CFCFCF', borderBottomWidth: 1, borderBottomColor: '#CFCFCF', }}>
                <Text style={styles.QNoText}>My Answer</Text>
              </View>
              <View style={styles.CoorectAView}>
                <Text style={styles.CoorectAText}>Correct Answer</Text>
              </View>
              <View style={styles.MarksV}>
                <Text style={styles.CoorectAText}>Marks</Text>
              </View>
            </View>
            {
              Data?.map((item, index) => {
                return (
                  <Answerkey item={item} index={index} />
                )
              })
            }
          </View>
        </View>
      </View>
    </>
  )
}


function Answerkey(props) {

  return (
    <View style={styles.AnswersView}>
      <View style={styles.AnswersView1}>
        <View style={styles.AnswersView2}>
          <BBText style={styles.BtextAnswer}>{props.item.index}</BBText>
        </View>
        <View style={[styles.AnswersView2, { flex: 0.7 }]}>
          <BBText style={{ fontSize: 16, fontFamily: 'WorkSans-Medium', color:'red' }}>{props.item.user_ans}</BBText>
        </View>
        <View style={[styles.AnswersView2, { flex: 0.8 }]}>
          <BBText style={styles.BtextAnswer}>{props.item.correct_ans}</BBText>
        </View>
        <View style={[styles.AnswersView2, { flex: 0.5 }]}>
          <BBText style={styles.BtextAnswer}>{props.item.marks}</BBText>
        </View>
      </View>
    </View>
  )
}

const ls = StyleConstants, s = StyleConstants, styles = StyleSheet.create({
  ScoreCardV:
  {
    flex: 1,
    backgroundColor: ColorsConstant.Theme,
  },
  ScoreCardV1:
  {
    paddingHorizontal: 10,
    height: 230,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ScoreCardV2:
  {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
  },
  ScoreCardV3:
  {
    width: 45,
    height: 45,
  },
  ScoreCardTouchable:
  {
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#ffffff30"
  },
  MyText:
  {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 24,
    color: '#fff'
  },
  ScoreCardV4:
  {
    width: 45,
    height: 45,
    marginTop: 20
  },
  ScoreCardTouchable1:
  {
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#ffffff30"
  },
  ScoreCardImg:
  {
    width: 20,
    height: 20
  },
  ScoreCardV5:
  {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff40',
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: ColorsConstant.White,
    borderWidth: 1,
  },
  RewardText:
  {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: "#fff"
  },
  RewardImg:
  {
    width: 20,
    height: 20,
    marginHorizontal: 15
  },
  AnswerkeyV:
  {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: ColorsConstant.White,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  AnswerSheetText:
  {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: "#000"
  },
  AnswerSheetV:
  {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 0
  },
  AnswerSheetV1:
  {
    width: "100%",
    height: 40,
    justifyContent: 'center',
    alignItems: "center"
  },
  AnswerSheetV2:
  {
    width: 45,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#D9D9D9'
  },
  AnswerSheetText1:
  {
    textAlign: "center",
    fontFamily: "WorkSans-SemiBold",
    fontSize: 24
  },
  QNoView:
  {
    flex: 1,
    backgroundColor: "#F1F1F1",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CFCFCF',
    marginTop: 20
  },
  QNoView1:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
  },
  QNoView2:
  {
    flex: 0.4,
    borderRightWidth: 1,
    borderRightColor: '#CFCFCF',
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    alignItems: "center",
    justifyContent: "center"
  },
  QNoText:
  {
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  CoorectAView:
  {
    flex: 0.8,
    borderRightWidth: 1,
    borderRightColor: '#CFCFCF',
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
  },
  CoorectAText:
  {
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  MarksV:
  {
    flex: 0.5,
    borderRightWidth: 1,
    borderRightColor: '#CFCFCF',
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
  },
  AnswersView:
  {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: '#CFCFCF'
  },
  AnswersView1:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
  },
  AnswersView2:
  {
    flex: 0.4,
    borderRightWidth: 1,
    borderRightColor: '#CFCFCF',
    alignItems: "center",
    justifyContent: "center"
  },
  BtextAnswer:
  {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium'
  },

})