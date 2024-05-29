import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StyleConstants } from "../../constants/Style.constant";
import { Text } from "../../utils/Translate";

export default function TriviaScoreCard({ navigation, route }) {
  const [isLoad, setLoad] = useState(false);

  const data =[

    {
        id:1,
        marks:'11',
        correct_answer:'11',
        my_answer:'2',
        question_no:'1',

        
    }
  ]

  return (
    <View style={{ flex: 1 }}>
      <View style={[StyleConstants.safeArView, { backgroundColor: "#701DDB" }]}>
        <View style={styles.Container}>
          <View style={styles.Container_View}>
            <View style={styles.mainview}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.mainviewtouc}
              >
         <Image source={require('../../assets/img/back.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Scorecard}>My Scorecard</Text>
            </View>
            <View style={[styles.mainview, { marginTop: 20 }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CustomerSupport")}
                style={styles.mainviewtouc}
              >
                <Image
                  source={require("../../assets/img/headphone.png")}
                  style={styles.img1}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainview1}>
            <Text style={styles.text2}>Fees</Text>
            <Image
              source={require("../../assets/img/bbcoin.png")}
              resizeMode="contain"
              style={styles.img2}
            />
            <Text style={styles.text2}>0</Text>
          </View>
          <TouchableOpacity
            style={styles.download}
          >
            <Text style={styles.textdow}>Download Answer Sheet</Text>
            <Image
              source={require("../../assets/img/download.png")}
              resizeMode="contain"
              style={styles.img2}
            />
          </TouchableOpacity>
        </View>
        <View
          style={styles.View1Q}
        >
          <View
            style={styles.View2Q}
          >
            <View
              style={styles.View3Q}
            ></View>
          </View>
          <Text
            style={styles.View4Q}
          >
            Answer Sheet
          </Text>
          <View
            style={styles.View5Q}
          >
            <View
              style={styles.View6Q}
            >
              <View
                style={styles.View7Q}
              >
                <Text style={styles.View8Q}>
                  QNo.
                </Text>
              </View>
              <View
                style={styles.View9Q}
              >
                <Text style={styles.View8Q}>
                  My Answer
                </Text>
              </View>
              <View
                style={styles.View10Q}
              >
                <Text style={styles.View8Q}>
                  Correct Answer
                </Text>
              </View>
              <View
                style={styles.View11Q}
              >
                <Text style={styles.View8Q}>
                  Marks
                </Text>
              </View>
            </View>
            <ScrollView>
              {isLoad ? (
                <View
                  style={styles.View12Q}
                >
                  <ActivityIndicator size={50} color={"#701DDB"} />
                </View>
              ) : (
                data.map((item, index) => {
                  return <Answerkey item={item} index={index} />;
                })
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

function Answerkey(props) {
  console.log(props,'dfghjkl;');
  return (
    <View style={[StyleConstants.safeArView, { borderColor: "#CFCFCF" }]}>
      <View
        style={styles.View13Q}
      >
        <View
          style={styles.View14Q}
        >
          <Text style={styles.fonttext}>
           {props.item.marks}
          </Text>
        </View>
        <View
          style={styles.View15Q}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "WorkSans-Medium",
              color:'#000',
            }}
          >
                       {props.item.marks}
          </Text>
        </View>
        <View
          style={styles.View16Q}
        >
          <Text style={styles.fonttext}>
          {props.item.marks}
          </Text>
        </View>
        <View
          style={styles.View17Q}
        >
          <Text style={styles.fonttext}>
           {props.item.marks}
          </Text>
        </View>
      </View>
    </View>
  );
}

const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    Container: {
      paddingHorizontal: 10,
      height: 230,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    Container_View: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainview: {
      width: 45,
      height: 45,
    },
    mainviewtouc: {
      flex: 1,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff30",
    },
    Scorecard: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 24,
      color: "#fff",
    },
    img1: {
      width: 20,
      height: 20,
    },
    img2: {
      width: 20,
      height: 20,
      marginHorizontal: 15,
    },
    text2: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 16,
      color: "#fff",
    },
    mainview1: {
      flexDirection: "row",
      width: "100%",
      height: 50,
      backgroundColor: "#ffffff40",
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: "#ffffff",
      borderWidth: 1,
    },
    download: {
      flexDirection: "row",
      width: "100%",
      height: 50,
      backgroundColor: "#ffffff",
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    textdow:{
      fontFamily:'WorkSans-Regular',
      fontSize:16,color:"#000"
    },
    View1Q:{
      flex: 1,
      backgroundColor: "#fff",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: 0,
    },
    View2Q:{
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    View3Q:{
        width: 45,
        height: 6,
        borderRadius: 10,
        backgroundColor: "#D9D9D9",
      
    },
    View4Q:{
       textAlign: "center",
        fontFamily: "WorkSans-SemiBold",
        fontSize: 24,
      color: "#000",

    },
    View5Q:{
      flex: 1,
      backgroundColor: "#F1F1F1",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: "#CFCFCF",
      marginTop: 20,
    },
    View6Q:{
      flexDirection: "row",
      justifyContent: "space-around",
      height: 50,
    },
    View7Q:{
      flex: 0.4,
      borderRightWidth: 1,
      borderRightColor: "#CFCFCF",
      borderTopWidth: 1,
      borderTopColor: "#CFCFCF",
      borderBottomWidth: 1,
      borderBottomColor: "#CFCFCF",
      alignItems: "center",
      justifyContent: "center",
    },
    View8Q:{
       fontSize: 14, 
       fontFamily: "WorkSans-Medium" ,
      color: "#000",

      },
      View9Q:{
        flex: 0.7,
        borderRightWidth: 1,
        borderRightColor: "#CFCFCF",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: "#CFCFCF",
        borderBottomWidth: 1,
        borderBottomColor: "#CFCFCF",
      },
      View10Q: {
          flex: 0.8,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 1,
          borderTopColor: "#CFCFCF",
          borderBottomWidth: 1,
          borderBottomColor: "#CFCFCF",
        },
        View11Q:{
          flex: 0.5,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 1,
          borderTopColor: "#CFCFCF",
          borderBottomWidth: 1,
          borderBottomColor: "#CFCFCF",
        },
        View12Q:{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 50,
        },
        View13Q:{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 50,
        },
        View14Q:{
          flex: 0.4,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
        },
        View15Q:{
          flex: 0.7,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
        },
        View16Q:{
          flex: 0.8,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
        },
        fonttext:{
          fontSize: 16, 
          fontFamily: "WorkSans-Medium",
          color: "#000",
        },
        View17Q:{
          // flex: 0.5,
          borderRightWidth: 1,
          borderRightColor: "#CFCFCF",
          alignItems: "center",
          justifyContent: "center",
        }
      

  });
  
