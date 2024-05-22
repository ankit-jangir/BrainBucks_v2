import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../Home/SearchBar';
import {List} from 'react-native-paper';
import PaidCourses from './PaidCourses';
import { Text } from '../../utils/Translate';
import FreeCourses from './FreeCourses';
import MyCourses from './MyCourses';

const BuyCourses = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Paid Courses');

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      imagePath: require('../../assets/img/banner.png'),
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },

    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      imagePath: require('../../assets/img/banner.png'),
      title: 'Third Item',
    },
  ];

  const handleTabPress = tab => {
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
          onPress={() => handleTabPress('Paid Courses')}>
          <Text style={styles.tabText}>Paid Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Free Courses' && styles.activeTab]}
          onPress={() => handleTabPress('Free Courses')}>
          <Text style={styles.tabText}>Free Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'My Courses' && styles.activeTab]}
          onPress={() => handleTabPress('My Courses')}>
          <Text style={styles.tabText}>My Courses</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Paid Courses' && (
        <PaidCourses navigation={navigation} data={DATA} />
      )}
      {activeTab === 'Free Courses' && (
        <FreeCourses navigation={navigation} data={DATA} />
      )}
      {activeTab === 'My Courses' && (
        <MyCourses navigation={navigation} data={DATA} />
      )}
    </>
  );
};


const TabContent2 = ({navigation, data}) => {
    const [expanded, setExpanded] = useState(false);
    const [innerExpanded, setInnerExpanded] = useState(false);
  
    const handlePress = () => setExpanded(!expanded);
  const handleInnerPress = () => setInnerExpanded(!innerExpanded);

  return (
    <>
          <List.Section> 
        <List.Accordion
      title={
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>1.</Text>
          <Text style={{ color: '#000' }}>Courses name</Text>
        </View>
      }
      expanded={expanded}
      onPress={handlePress} 
     
      right={props => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            </View>
           <TouchableOpacity onPress={handlePress}>
           <Image
              source={require('../../assets/img/down-arrow.png')}
              style={{ width: 24, height: 24, margin: 8 }}
            />
           </TouchableOpacity>
          </View>
      )}
    >
      <View>
        <List.Accordion
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/img/play-button.png')}
                style={{ width: 15, height: 15, margin: 8 }}
              />
              <Text style={{ color: '#000' }}>Courses name</Text>
            </View>
          }
          expanded={innerExpanded}
          onPress={handleInnerPress} // This ensures the internal logic is consistent
          right={props => (
            <TouchableOpacity onPress={handleInnerPress}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ backgroundColor: 'rgba(112, 29, 219, 1)', padding: 5, borderRadius: 5, color: '#fff', fontSize: 14 }}>Play Now</Text>
                </View>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  style={{ width: 24, height: 24, margin: 8 }}
                />
              </View>
            </TouchableOpacity>
          )}
        >
          <View>
            <Text></Text>
          </View>
        </List.Accordion>
      </View>
    </List.Accordion>

      </List.Section>
    </>
  );
};

const TabContent3 = ({navigation, data}) => {
    const [expanded, setExpanded] = useState(false);
    const [innerExpanded, setInnerExpanded] = useState(false);
  
    const handlePress = () => setExpanded(!expanded);
  const handleInnerPress = () => setInnerExpanded(!innerExpanded);

  return (
    <>
              <List.Section> 
        <List.Accordion
      title={
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>1.</Text>
          <Text style={{ color: '#000' }}>Courses name</Text>
        </View>
      }
      expanded={expanded}
      onPress={handlePress} 
     
      right={props => (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            </View>
           <TouchableOpacity onPress={handlePress}>
           <Image
              source={require('../../assets/img/down-arrow.png')}
              style={{ width: 24, height: 24, margin: 8 }}
            />
           </TouchableOpacity>
          </View>
      )}
    >
      <View>
        <List.Accordion
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/img/play-button.png')}
                style={{ width: 15, height: 15, margin: 8 }}
              />
              <Text style={{ color: '#000' }}>Courses name</Text>
            </View>
          }
          expanded={innerExpanded}
          onPress={handleInnerPress} // This ensures the internal logic is consistent
          right={props => (
            <TouchableOpacity onPress={handleInnerPress}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ backgroundColor: 'rgba(112, 29, 219, 1)', padding: 5, borderRadius: 5, color: '#fff', fontSize: 14 }}>Play Now</Text>
                </View>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  style={{ width: 24, height: 24, margin: 8 }}
                />
              </View>
            </TouchableOpacity>
          )}
        >
          <View>
            <Text></Text>
          </View>
        </List.Accordion>
      </View>
    </List.Accordion>

      </List.Section>
    </>
  )
};

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
    color: '#000',
    // borderWidth: 1,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(46, 46, 46, 1)',
    fontFamily: 'WorkSans-Bold',

  },
  mainV: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding:10
  },
  mainImage: {
    height: 180,
    width: '100%',
    borderRadius: 5,
  },
  mainText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#000',
  },
  mainText1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  mainImage1: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  mainTouchable: {
    backgroundColor: '#8e3cbd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  mainText2: {
    fontSize: 15,
    paddingTop: 3,
    color: 'gray',
  },
  mainText3: {
    fontSize: 21,
    color: 'white',
  },
});
