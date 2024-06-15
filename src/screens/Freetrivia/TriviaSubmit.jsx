import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "../../utils/Translate";
import { StyleConstants } from "../../constants/Style.constant";
import { useQuiz } from "../../context/QuizPlayReducer";
import { StackActions } from "@react-navigation/native";

export default function TriviaSubmit({ navigation, route }) {
  let arr = route.params.result.arr;
  let minutes = Math.floor(arr.submit_time_period/60)
  let seconds = Math.floor(arr.submit_time_period%60)
  if(minutes<10){minutes = "0"+minutes}
  if(seconds<10){seconds = "0"+seconds}

  const {quizState, dispatch} = useQuiz()
  return (
    <View style={[StyleConstants.safeArView, { paddingHorizontal: 0 }]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.View1}>Review, before Submission</Text>
        </View>
        <View style={styles.View2}>
          <View style={styles.View3}>
            <View style={styles.View4}>
              <View style={{ flex: 2 }}>
                <Text style={styles.View5}>Total Questions</Text>
                <Text style={[styles.View6, { color: "#2E2E2E" }]}>
                  {quizState.total}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.View5}>Correct</Text>
                <Text style={[styles.View6, { color: "#0CBC8B" }]}>
                  {arr.correct}
                </Text>
              </View>
            </View>
            <View style={styles.View4}>
              <View style={{ flex: 2 }}>
                <Text style={styles.View5}>Unattempted</Text>
                <Text style={[styles.View6, { color: "#7E7E7E" }]}>
                 {arr.unattempt}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.View5}>Incorrect</Text>
                <Text style={[styles.View6, { color: "#DC1111" }]}>
                  {arr.incorrect}
                </Text>
              </View>
            </View>
            <View style={styles.View7}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(
                    StackActions.replace('resultreward')
                  )
                }
                style={styles.View7}
              >
                <LinearGradient
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 0.6, y: 2.0 }}
                  colors={["#54ACFD", "#2289E7"]}
                  style={styles.View9}
                >
                  <Text style={styles.View8}>View Result</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.View12}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={styles.View13}
              >
                <Text style={styles.View14}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.View10}>
          <View style={{ width: "80%" }}>
            <Text style={styles.View11}>Quiz end in </Text>
          </View>
        </View>
        <View style={styles.View15}>
          <View style={styles.View16}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={styles.View17}>{minutes}</Text>
                <Text style={styles.View5}>Mins</Text>
              </View>
              <View style={styles.View21}>
                <Text style={styles.View18}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.View17}>{seconds}</Text>
                <Text style={styles.View19}>Sec</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.View10}>
          <View style={{ width: "80%" }}>
            <Text style={styles.View20}>
              Note : Answers once submitted can not be changed or filled up
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    View1: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 36,
      color: "#2E2E2E",
      textAlign: "center",
    },
    View2: {
      width: "100%",
      height: 350,
      alignItems: "center",
      marginTop: 20
    },
    View3: {
      width: 250,
      height: 330,
      backgroundColor: "#fff",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#efefef",
      alignItems: "center",
    },
    View4: {
      width: "100%",
      height: 100,
      flexDirection: "row",
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    View5: {
      fontFamily: "WorkSans-Regular",
      fontSize: 16,
      color: "#7E7E7E"
    },
    View6: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 24
    },
    View7: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    View8: {
      color: "#ffffff",
      fontSize: 17,
      fontFamily: "WorkSans-Medium"
    },
    View9: {
      width: "90%",
      height: 50,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    View10: {
      width: "100%",
      alignItems: "center",
      marginVertical: 10
    },
    View11: {
      color: "#7E7E7E",
      fontSize: 16,
      fontFamily: "WorkSans-Regular",
      textAlign: "center",
    },
    View12: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
    View13: {
      flexDirection: "row",
      width: "90%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F2F2F2",
      borderRadius: 5,
    },
    View14: {
      fontFamily: "WorkSans-Medium",
      fontSize: 16,
      color: "#8A8C94"
    },
    View15: {
      width: "100%",
      height: 80,
      alignItems: "center"
    },
    View16: {
      width: "70%",
      backgroundColor: "#F5F5F5",
      borderRadius: 5,
      flex: 1,
      alignItems: "center",
    },
    View17: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 36,
      color: "#7E7E7E"
    },
    View18: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 36,
      color: "#7E7E7E",
      paddingBottom: 5,
    },
    View19: {
      fontFamily: "WorkSans-Regular",
      fontSize: 16,
      color: "#7E7E7E"
    },
    View20: {
      color: "#D92828",
      fontSize: 14,
      fontFamily: "WorkSans-Regular",
      textAlign: "center",
    },
    View21: {
      flex: 0.4, alignItems: "center"
    },
  });
