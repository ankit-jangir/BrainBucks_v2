import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar, ScrollView, AppState } from 'react-native';
import { Image } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { getactiveQuestion, submitactiveQuiz, updateAnswer } from '../../controllers/ActiveQuizController';
import { useQuiz } from '../../context/QuizPlayReducer';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { ColorsConstant } from '../../constants/Colors.constant';



export default function QuestionsPaper({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [timerCount, setTimerCount] = useState(30);
  const [minute, setMinute] = useState(6);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0)
  const { quizState, dispatch } = useQuiz()
  const [submitData, setSubmitData] = useState({})
  const backRef = useRef()

  let question = quizState.question


  const appState = useRef(AppState.currentState)

  useEffect(() => {
  }, [])

  useEffect(() => {
    getCurrentQuestion(currentQuestionIndex)
  }, [currentQuestionIndex])

  async function getCurrentQuestion(page) {
    await getactiveQuestion(quizState.id, page, Toast, dispatch, setSelectedOption)
  }

  useEffect(() => {
    setMinute(Math.floor(quizState.time / 60))
    setTimerCount(Math.floor(quizState.time % 60))
    backRef.current = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })

    return () => { backRef.current() }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if(Object.keys(submitData).length!==0){
        clearInterval(interval)
        return;
      }
      if (timerCount > 0) {
        setTimerCount(timerCount - 1);
      } else if (minute > 0) {
        setMinute(minute - 1);
        setTimerCount(59);
      } else {
        handleSubmit()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerCount, minute]);

  const handleOptionPress = (optionIndex) => {
    setSelectedOption(optionIndex + 1);
  };

  const handleSaveNext = () => {
    if (currentQuestionIndex < quizState.total) {
      updateAnswer(quizState.id, currentQuestionIndex, selectedOption, Toast).then(() =>
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      )
    } else {
      updateAnswer(quizState.id, currentQuestionIndex, selectedOption, Toast)
      setModalVisible(true)
    }
  }

  const handleClear = () => {
    setSelectedOption(0)
    updateAnswer(quizState.id, currentQuestionIndex, 0, Toast)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizState.total) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    let time = Math.floor(quizState.time - minute * 60 - timerCount)
    submitactiveQuiz(quizState.id, time, Toast).then((r) => {
      if (r) {
        backRef.current()
        setSubmitData(r.arr)
        setModalVisible1(true)
        setModalVisible(false)
      }
    })
  }



  return (
    <>
      <View style={{ zIndex: 200 }}><Toast /></View>
      <View style={styles.container}>
        <StatusBar
          barStyle={"white-content"}
          translucent={false}
          backgroundColor={"#2E2E2E"}
        />
        <View style={styles.quitView1}>
          <View style={styles.quitView2}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.quitView3}
            >
              <Text style={styles.textQuite}>Quit</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: "#2E2E2E",
          }}>
            {/* Placeholder for score */}
            <Text style={{ color: "#fff", fontFamily: "Work Sans", fontSize: 14, fontWeight: '500' }}>Question {currentQuestionIndex}</Text>
          </View>

          <View style={styles.Daview}>
            <Text style={styles.textMinut}>{minute} : {timerCount < 10 ? "0" + timerCount : timerCount}</Text>
          </View>
        </View>

        <View style={styles.quitView}>
          <TouchableOpacity onPress={handlePrevious}>
            <View style={styles.quitView2}>
              <View style={styles.Daview}>
                <Image source={require('../../assets/img/backcopy.png')} tintColor={1 === currentQuestionIndex ? '#a9a9a9' : '#000'} style={{ width: 20, height: 20, }} />
                <Text style={[{ fontFamily: 'inter', fontWeight: "bold" }, 1 !== currentQuestionIndex ? { color: '#000' } : { color: "#a9a9a9" }]}>Previous</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{}}>
            {/* Placeholder for score */}
            <Text style={{ color: "#000", fontFamily: "Work Sans", fontSize: 14, fontWeight: '500' }}>{currentQuestionIndex}/{quizState.total}</Text>
          </View>
          <TouchableOpacity onPress={handleNext}>
            <View style={styles.Daview}>
              <Text style={[{ fontFamily: 'inter', fontWeight: "bold" }, quizState.total !== currentQuestionIndex ? { color: '#000' } : { color: "#a9a9a9" }]}>Next</Text>
              <Image source={require('../../assets/img/right-arr.png')} tintColor={quizState.total === currentQuestionIndex && '#a9a9a9'} style={{ width: 20, height: 20, }} />
            </View>
          </TouchableOpacity>
        </View>



        <ScrollView>
          <View style={styles.questionContainer} key={JSON.stringify(question.question)}>
            {
              question.is_ques_img
                ?
                <>
                  <Text key={question.question} style={styles.questionText}>
                    {question?.question}
                  </Text>

                  <View style={{ width: "100%", height: 180 }}>
                    <Image style={{ width: "100%", height: 150, objectFit: 'contain' }} resizeMode='contain' source={{ uri: BLOBURL + question.question_url }} />
                  </View>
                </>
                :
                <Text key={question.question} style={styles.questionText}>
                  {question?.question}
                </Text>
            }
            {[question?.option1, question?.option2, question?.option3, question?.option4].map((option, index) => (
              <TouchableOpacity
                key={option + "" + index}
                style={[styles.optionButton, selectedOption === index + 1 && styles.selectedOption]}
                onPress={() => handleOptionPress(index)}
              >
                {
                  question.is_opt_img
                    ?
                    <>
                      <Text style={styles.optionText}>{'(' + String.fromCharCode(97 + index) + ") "}</Text>
                      <Image style={{ width: '100%', objectFit: 'contain', height: 150 }} resizeMode='contain' source={{ uri: BLOBURL + option }} />
                    </>
                    :
                    <Text style={styles.optionText}>{'(' + String.fromCharCode(97 + index) + ") "} {option}</Text>
                }
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>


      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleClear} style={styles.navButton}>
          <Text style={styles.navButtonText}>Clear Response</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleSaveNext}>
          <Text style={styles.navButtonText}>Save & Next</Text>
        </TouchableOpacity>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.modalTouh}
        >
          <View style={styles.mView}>
            <Image
              source={require("../../assets/img/file.png")}
              style={styles.emoji}
            />
            <View style={styles.viewQ}>
              <Text style={styles.qText}>Quit from Quiz</Text>
            </View>

            <View style={styles.yesView}>
              <View style={styles.yesView1}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.yesView2}
                >
                  <Text style={styles.textYes}>Yes</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewNo}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.touchNo}
                >
                  <Text style={styles.textNo}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.viewQ}>
              <Text style={styles.YourText}>
                Your result will be declared on behalf of answers you submitted.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
        <TouchableOpacity style={styles.RulesTouchable2}>
          <View style={styles.RulesPV2} >
            <View style={styles.RulesPV3}>
              <Text style={styles.RulesText} >Congratulations!</Text>
              <LottieView
                autoPlay
                style={styles.RulesLott}
                source={require('../../assets/img/upvote.json')}
              />
              <Text style={styles.RegisteredT} >Quiz Successfully Submitted ! </Text>
              <View style={styles.RegisteredV} >
                <View style={styles.RulesName}>
                  {/* {console.log(message,"MESSAGE")} */}
                  <Text style={{ color: ColorsConstant.RedLight, fontFamily: 'inter', textAlign: 'center', }}>Result will be declared {submitData.msg ? "at " + submitData.msg : "soon"}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                backRef.current();
                navigation.navigate('Home'), setModalVisible1(false)
              }} style={styles.continueTouchable} >
                <Text style={styles.continueText}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  continueText:
  {
    fontFamily: 'WorkSans-Medium',
    fontSize: 20,
    color: "#2188E7"
  },
  continueText1:
  {
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    color: "#DC1111",
    paddingTop: 8
  },
  continueText1:
  {
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    color: "#DC1111",
    paddingTop: 8
  },
  continueTouchable:
  {
    width: '100%',
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF5FF",
    borderRadius: 10,
    marginTop: 30
  },
  NameText:
  {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
    textAlign: 'center'
  },
  modalTouh: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  mView: {
    width: "100%",
    height: 400,
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: ColorsConstant.Black,
    backgroundColor: ColorsConstant.White,
    paddingHorizontal: 20,
  },
  emoji: {
    width: 80,
    height: 80,
  },
  viewQ: {
    width: "100%",
    marginTop: 20,
  },
  qText: {
    fontFamily: "WorkSans-Regular",
    fontSize: 20,
    textAlign: "center",
    color: '#000'
  },
  yesView: {
    width: "100%",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    marginTop: 20,
  },
  yesView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  yesView2: {
    width: 130,
    height: 50,
    backgroundColor: "#129C73",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textYes: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 20,
    textAlign: "center",
    color: ColorsConstant.White,
  },
  viewNo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  touchNo: {
    width: 130,
    height: 50,
    backgroundColor: "#D92828",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textNo: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 20,
    textAlign: "center",
    color: ColorsConstant.White,
  },
  YourText: {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#D92828",
  },
  quitView: {
    flex: 1,
    backgroundColor: ColorsConstant.White,
  },
  quitView1: {
    flexDirection: "row",
    flex: 1,
  },
  quitView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quitView3: {
    flexDirection: "row",
    width: "70%",
    height: 35,
    backgroundColor: "#FFFFFF10",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textQuite: {
    fontFamily: "WorkSans-Medium",
    fontSize: 16,
    color: ColorsConstant.White,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  DaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textMinut: {
    fontFamily: "WorkSans-Medium",
    fontSize: 20,
    color: ColorsConstant.White,
  },
  RulesTouchable:
  {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightGray
  },
  RulesTouchable1:
  {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  RulesPText:
  {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 22,
    paddingLeft: 10
  },
  RulesTouchable2:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  },
  RulesPV2:
  {
    width: "100%",
    height: 400,
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: ColorsConstant.Black,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  RulesPV3:
  {
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  RulesText:
  {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 24,
    color: '#000'
  },
  RulesLott:
  {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
  },
  RegisteredT:
  {
    fontFamily: "WorkSans-Medium",
    fontSize: 16,
    color: '#000'
  },
  RegisteredV:
  {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
  },
  RegisteredV1:
  {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
  },
  RegisteredImg:
  {
    width: 35,
    height: 35
  },
  RulesName:
  {
    width: "100%",
    // height:80,
    // margin:"auto",
    // marginRight:25
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  quitView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    paddingHorizontal: 20

  },
  quitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 243, 243, 1)',
    paddingHorizontal: 20,
    paddingVertical: 15

  },
  quitView2: {
  },
  quitView3: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  Daview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMinut: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: "#fff"

  },
  translateButton: {
    flexDirection: 'row',
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateIconContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsConstant.White,
    marginRight: 10,
    borderRadius: 8,
  },
  questionContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 25
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#000"

  },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#D0EFFF',
  },
  optionText: {
    fontSize: 16,
    color: "#000"

  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
  },
  navButtonText: {
    color: ColorsConstant.White,
    fontWeight: 'bold',
  },
});
