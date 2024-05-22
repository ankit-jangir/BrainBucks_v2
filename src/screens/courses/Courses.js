import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../Home/SearchBar';
import { ListItem } from '@rneui/themed';


const BuyCourses = ({ navigation }) => { 
  const [activeTab, setActiveTab] = useState('Paid Courses');
  
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      imagePath: require("../../assets/img/banner.png"),
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      imagePath: require("../../assets/img/banner.png"),
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },

    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      imagePath: require("../../assets/img/banner.png"),
      title: "Third Item",
    },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <View style={styles.container}>
        <SearchBar />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Paid Courses' && styles.activeTab]}
          onPress={() => handleTabPress('Paid Courses')}
        >
          <Text style={styles.tabText}>Paid Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Free Courses' && styles.activeTab,]}
          onPress={() => handleTabPress('Free Courses')}
        >
          <Text style={styles.tabText}>Free Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'My Courses' && styles.activeTab]}
          onPress={() => handleTabPress('My Courses')}
        >
          <Text style={styles.tabText}>My Courses</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Paid Courses' && <TabContent1 navigation={navigation} data={DATA} />}
      {activeTab === 'Free Courses' && <TabContent2 navigation={navigation} data={DATA}/>}
      {activeTab === 'My Courses' && <TabContent3 navigation={navigation} data={DATA}/>}
    </>
  );
};

const TabContent1 = ({ navigation, data }) => {

  return (
    <View style={{ height: 600 }}>
       <ListItem.Accordion
  content={
    <>
      <Icon name="place" size={30} />
      <ListItem.Content>
        <ListItem.Title>List Accordion</ListItem.Title>
      </ListItem.Content>
    </>
  }
  isExpanded={expanded}
  onPress={() => {
    setExpanded(!expanded);
  }}
>
  {list2.map((l, i) => (
    <ListItem key={i} onPress={log} bottomDivider>
      <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} />
      <ListItem.Content>
        <ListItem.Title>{l.name}</ListItem.Title>
        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  ))}
</ListItem.Accordion>
    </View>
  );
};



const TabContent2 = ({navigation, data}) => {
  return (
  <>
<Text>xcfgvhbjnkm</Text>
  </>
  )
}
const TabContent3 = ({navigation, data}) => {
  return (
<Text>xcfgvhbjnkm</Text>
  );
}

export default BuyCourses;

const styles = StyleSheet.create({
  container: {
    // Add styles for the container if needed
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:'#000',
    // borderWidth: 1,
  },
  activeTab: {
      borderBottomWidth:1,
      borderColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
    color:'rgba(46, 46, 46, 1)',
  },
  mainV:
  {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10
  },
  mainImage:
  {
    height: 180,
    width:'100%',
    borderRadius: 5
  },
  mainText:
  {
    fontSize: 21,
    fontWeight: '600',
    color:'#000'
  },
  mainText1:
  {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 3
  },
  mainImage1:
  {
    height: 15,
    width: 15,
    marginRight: 5
  },
  mainTouchable:
  {
    backgroundColor: "#8e3cbd",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom:5  
  },
   mainText2:
  {
    fontSize: 15,
    paddingTop: 3,
    color:"gray"
  },
  mainText3:
  {
    fontSize: 21,
    color: 'white'
  }
});