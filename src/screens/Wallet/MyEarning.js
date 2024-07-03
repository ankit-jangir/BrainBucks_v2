import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MyEarningSpent from './MyEarningSpent';
import Earned from './Earned';

const MyEarning = ({navigation}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <View style={styles.header}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
      
      </TouchableOpacity>
        <Text style={styles.headerText}>My Earnings</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, index === 0 ? styles.selectedTab : styles.spentTab]}
          onPress={() => setIndex(0)}
        >
          <Text style={styles.tabTitle}>Spent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, index === 1 ? styles.selectedTab : styles.earningTab]}
          onPress={() => setIndex(1)}
        >
          <Text style={styles.tabTitle}>Earned</Text>
        </TouchableOpacity>
      </View>

      {index === 0 ? (
        <View style={styles.tabViewItem}>
          <MyEarningSpent />
        </View>
      ) : (
        <View style={styles.tabViewItem}>
          <Earned />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyEarning;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
    marginBottom: 20,
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily:"Work Sans",
    color:"black"

  },
  tabContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  tabTitle: {
    color: 'white',
    fontFamily:"Work Sans"

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  spentTab: {
    backgroundColor: 'lightgray',
  },
  earningTab: {
    backgroundColor: 'lightgray',
  },
  selectedTab: {
    backgroundColor: '#701DDB',
  },
  tabViewItem: {
    flex: 1,
    width: '100%',
  },
});
