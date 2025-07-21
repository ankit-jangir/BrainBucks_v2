import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import { useNavigation } from "@react-navigation/native";
import HomeApiService from "../../services/api/HomeApiService";
import { useQuery } from "@tanstack/react-query";

const ReferStudents = () => {
  const navigation = useNavigation();
  const homeServ = new HomeApiService();

  const getActiveHomeQuizzes = async () => {
    console.log("Fetching referral data...");
    const res = await homeServ.ReferEarnData();
    console.log("API response:", res.data);
    return res.data;
  };

  const { data: referralData = [], refetch, isFetching, isError } = useQuery({
    queryKey: ["homeActiveQuizzes"],
    queryFn: getActiveHomeQuizzes,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Trigger initial fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleRefresh = async () => {
    await refetch();
  };

  // Show loading state
  if (isFetching) {
    return (
      <View style={styles.container}>
        <MainHeader
          name={"Refer & Earn"}
          leftIcon={{
            type: "image",
            source: require("../../assets/img/backq.png"),
            onPress: () => navigation.goBack(),
          }}
        />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show error state
  if (isError) {
    return (
      <View style={styles.container}>
        <MainHeader
          name={"Refer & Earn"}
          leftIcon={{
            type: "image",
            source: require("../../assets/img/backq.png"),
            onPress: () => navigation.goBack(),
          }}
        />
        <Text>Error loading data. Please try again.</Text>
      </View>
    );
  }

  // Show empty state
  if (!referralData || referralData.length === 0) {
    return (
      <View style={styles.container}>
        <MainHeader
          name={"Refer & Earn"}
          leftIcon={{
            type: "image",
            source: require("../../assets/img/backq.png"),
            onPress: () => navigation.goBack(),
          }}
        />
        <Text>No referral data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainHeader
        name={"Refer & Earn"}
        leftIcon={{
          type: "image",
          source: require("../../assets/img/backq.png"),
          onPress: () => navigation.goBack(),
        }}
      />
      <FlatList
        data={referralData}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentWrapper}
        refreshing={isFetching}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={require("../../assets/img/FRAME.png")}
                  style={styles.earningsIcon}
                />
              </View>
              <View>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Image
                    source={
                      item.gender === "girl"
                        ? require("../../assets/img/h35.png")
                        : require("../../assets/img/boys.png")
                    }
                    style={styles.verifiedIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
            </View>
            <View style={styles.balanceRow}>
              <Image
                source={require("../../assets/img/wallets.png")}
                style={styles.walletIcon}
                resizeMode="contain"
              />
              <Text style={styles.amountText}>₹ {item.wallet || 0}</Text>
              <Text style={styles.balanceText}> Balance</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ReferStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: 15,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  profileImageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: "hidden",
  },
  earningsIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  nameRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    fontFamily: "Poppins",
    flexShrink: 1,
  },
  verifiedIcon: {
    height: 13,
    width: 13,
  },
  phoneText: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 2,
    fontFamily: "Poppins",
    fontWeight: "400",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 5,
  },
  walletIcon: {
    height: 20,
    width: 20,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 6,
    fontFamily: "Poppins",
  },
  balanceText: {
    fontSize: 16,
    color: "#4B5563",
    marginLeft: 4,
    fontFamily: "Poppins",
    fontWeight: "400",
  },
});