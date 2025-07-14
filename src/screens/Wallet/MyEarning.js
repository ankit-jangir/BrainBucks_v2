import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MyEarningSpent from './MyEarningSpent';
import Earned from './Earned';
import MainHeader from '../../components/MainHeader';

const MyEarning = ({navigation}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
       <MainHeader
          name={"My Earnings"}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              navigation.goBack()
            },
          }}
        />


      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, index === 0 ? styles.selectedTab : styles.spentTab]}
          onPress={() => setIndex(0)}
        >
        <Image source={require("../../assets/img/spent.png")} style={{height:20,width:20,resizeMode:"contain"}}/>
          <Text style={[styles.tabTitle, index === 1 ? styles.selectedTab1 : styles.tabTitle1]}>Spent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, index === 1 ? styles.selectedTab : styles.earningTab]}
          onPress={() => setIndex(1)}
        >
        <Image source={require("../../assets/img/Earned.png")} style={{height:20,width:20,resizeMode:"contain"}}/>
        <Text style={[styles.tabTitle, index === 1 ? styles.tabTitle : styles.selectedTab1]}>Earned</Text>
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
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
  },
  tabTitle: {
    color: 'white',
    fontFamily:"Inter",
    fontSize:16,
    fontWeight:"600"

  },
  selectedTab1:{
color:"gray"
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius:10,
    height:50,
    justifyContent:"center",
    flexDirection:"row",
    gap:10
  },
  spentTab: {
    backgroundColor: '#F2F2F2',
  },
  earningTab: {
    backgroundColor: '#F2F2F2',
  },
  selectedTab: {
    backgroundColor: '#701DDB',
  },
  tabViewItem: {
    flex: 1,
    width: '100%',
  },
});
