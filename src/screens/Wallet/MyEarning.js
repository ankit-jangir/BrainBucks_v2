import { StyleSheet, View,} from 'react-native';
import React from 'react';
import { Image, Tab, TabView, Text } from '@rneui/themed';
import MyEarningSpent from './MyEarningSpent';
import Earned from './Earned';

const MyEarning = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View style={styles.header}>
        <Image source={require('../../assets/img/back.png')} style={styles.backImage} />
        <Text style={styles.headerText}>My Earnings</Text>
      </View>
      
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.indicator}
        style={styles.tabContainer}
      >
        <Tab.Item
          title="Spent"
          titleStyle={styles.tabTitle}
          containerStyle={[
            styles.tabItem,
            index === 0 ? styles.selectedTab : styles.spentTab,
          ]}
        />
        <Tab.Item
          title="My Earning"
          titleStyle={styles.tabTitle}
          containerStyle={[
            styles.tabItem,
            index === 1 ? styles.selectedTab : styles.earningTab,
          ]}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <MyEarningSpent />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <Earned />
        </TabView.Item>
      </TabView>
    </>
  );
}

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
    fontWeight:"600" 
  },
  indicator: {
    backgroundColor: 'white',
    height: 1,
  },
  tabContainer: {
    margin: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  tabTitle: {
    fontSize: 14,
    color: 'white',
  },
  tabItem: {
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
    width: '100%',
  },
});
