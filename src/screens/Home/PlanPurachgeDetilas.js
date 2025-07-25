import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";
import { useNavigation } from "@react-navigation/native";

const PlanPurchaseDetails = () => {
  const navigation = useNavigation();

  const plan = {
    _id: "6878f46605a7872340f16d9c",
    plan_name: "Elite Partner",
    amount: 9999,
    benefits: ["VIP Badge", "Early Access", "Higher Referral %"],
    createdAt: "2025-07-17T13:02:30.616Z",
  };

  return (
    <View style={styles.container}>
      <MainHeader
        name={"Plan Details"}
        leftIcon={{
          type: "image",
          source: require("../../assets/img/backq.png"),
          onPress: () => navigation.goBack(),
        }}
      />

      <View style={styles.card}>
        <Text style={styles.planName}>{plan.plan_name}</Text>
        <Text style={styles.amount}>₹{plan.amount}</Text>
        <Text style={styles.amount1}>{plan.createdAt}</Text>

        <Text style={styles.label}>Benefits:</Text>

        <FlatList
          data={plan.benefits}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.benefitItem}>
              <Image
                source={require("../../assets/img/checkmark.png")}
                style={styles.checkIcon}
              />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PlanPurchaseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin:13,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop:30
  },
  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    color: "#008000",
    fontWeight: "600",
    marginBottom: 12,
  },
   amount1: {
    fontSize: 15,
    color: "#b4b8b4ff",
    fontWeight: "400",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
marginTop:10  },
  checkIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: "#4CAF50",
  },
  benefitText: {
    fontSize: 15,
    color: "#444",
  },
});
