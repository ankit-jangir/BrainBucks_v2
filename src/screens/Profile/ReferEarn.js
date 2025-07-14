import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";
import { Card } from "react-native-paper";
import LottieView from "lottie-react-native";
import { ColorsConstant } from "../../constants/Colors.constant";


const ReferEarn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainHeader
        name={"Refer Earn"}
        leftIcon={{
          type: "image",
          source: require("../../assets/img/backq.png"),
          onPress: () => {
            navigation.goBack();
          },
        }}
      />

      <View>
        <Card style={styles.card}>
          <Text style={styles.heading}>Refer & Earn 10% Lifetime</Text>
          <Text style={styles.subheading}>
            Refer our app to your Circle & earn extra 60% on account opening!
          </Text>

          <View style={styles.row}>
            <View style={styles.dashedBorder}>
              <TouchableOpacity style={styles.seeHowButton}>
                <Text style={styles.seeHowText}>See how it works</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.lottieContainer}>
              <LottieView
                source={require("../../assets/img/wallet.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.referralLabel}>Referral Code</Text>
              <Text style={styles.referralCode}>refername</Text>
            </View>

            <TouchableOpacity style={styles.iconButton}>
               <Image source={require("../../assets/img/copy.png")} style={styles.copyIcon} tintColor={"#fff"} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.referNowButton}>
              <Text style={styles.referNowText}>REFER NOW</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: ColorsConstant.Theme,
    borderRadius:10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subheading: {
    fontSize: 14,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dashedBorder: {
    borderBottomWidth: 1,
    borderColor: "white",
    borderStyle: "dashed",
    flex: 0.6,
    justifyContent: "center",
  },
  seeHowButton: {
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: "center",
    width: "80%",
  },
  seeHowText: {
    color: "white",
    fontWeight: "bold",
  },
  lottieContainer: {
    alignItems: "center",
    flex: 0.3,
  },
  lottie: {
    width: 120,
    height: 90,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "white",
    paddingTop: 8,
  },
  referralLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
  },
  referralCode: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    borderColor: "white",
  },
  referNowButton: {
    backgroundColor: "white",
    borderRadius: 24,
    alignSelf: "center",
    padding: 8,
    paddingHorizontal: 13,
  },
  referNowText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  copyIcon:{
    height:20,
    width:20,
    resizeMode:"contain"
  }
});
