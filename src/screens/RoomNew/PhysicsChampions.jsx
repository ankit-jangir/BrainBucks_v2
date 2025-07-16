import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScheduledQuizzes from './ScheduledQuizzes';
import LiveQuizzes from './LiveQuizzes';

const Tab = createMaterialTopTabNavigator();

export default function PhysicsChampions() {
  const [selectedTab, setSelectedTab] = useState('Live');

  const quizzes = [
    {
      title: 'General Knowledge',
      coins: 500,
      filled: 12,
      total: 50,
      teacher: 'Dr. Smith',
      color: '#E8F0FF',
    },
    {
      title: 'Science',
      coins: 600,
      filled: 25,
      total: 50,
      teacher: 'Prof. Johnson',
      color: '#E9FFF0',
    },
    {
      title: 'Mathematics',
      coins: 450,
      filled: 18,
      total: 40,
      teacher: 'Dr. Williams',
      color: '#FFF4EB',
    },
  ];

  const scheduledQuizzes = [
    {
      title: 'English (Scheduled)',
      coins: 400,
      filled: 30,
      total: 45,
      teacher: 'Prof. Davis',
      color: '#F3EDFF',
    },
    {
      title: 'Computer Science (Scheduled)',
      coins: 500,
      filled: 22,
      total: 40,
      teacher: 'Dr. Miller',
      color: '#E0F7FA',
    },
  ];

  const activeQuizzes = selectedTab === 'Live' ? quizzes : scheduledQuizzes;

  return (
    <>
      <Header
        title=" "
        leftIcon={{
          source: require('../../assets/img/left-chevron.png'),
          onPress: () => navigation.goBack(),
          tintColor: '#000',
        }}
        rightIcon={{
          source: require('../../assets/img/settings.png'),
          onPress: () => navigation.navigate('CustomerSupport'),
        }}
      />
      <View style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.groupName}>Physics Champions</Text>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            <Image
              source={require('../../assets/img/padlock.png')}
              style={{width: 13, height: 13, tintColor: '#4B5563'}}
            />
            <Text style={[styles.groupDetails, {marginHorizontal: 4}]}>
              Private
            </Text>

            <Image
              source={require('../../assets/img/h39.png')}
              style={{width: 15, height: 15, tintColor: '#4B5563'}}
              resizeMode="contain"
            />
            <Text style={[styles.groupDetails, {marginLeft: 4}]}>
              234 Members
            </Text>
          </View>

          <Text style={[styles.groupDetails, {marginTop: 10}]}>
            Created by Prof. Sarah
          </Text>
        </View>

        {/* Practice Notes */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.contentWrapper}>
            <Image
              source={require('../../assets/img/h2.png')} // Replace with your image or local require
              style={{width: 15, height: 15}}
              resizeMode="contain"
            />
            <Text style={styles.text}>View Practice Notes</Text>
          </View>
          <Image
            source={require('../../assets/img/createroom.png')} // Replace with your image or local require
            style={styles.image}
          />
        </TouchableOpacity>
        {/* Tabs */}

        <Tab.Navigator style={{backgroundColor:'#fff'}}>
  <Tab.Screen name="Live Quizzes" component={LiveQuizzes} />
  <Tab.Screen name="Scheduled Quizzes" component={ScheduledQuizzes} />
</Tab.Navigator>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 16,
    paddingTop: 10,
  },

  groupName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937', // Dark text
    marginBottom: 4,
  },

  groupDetails: {
    fontSize: 13,
    color: '#6B7280', // Muted grey
  },

  card: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginHorizontal: 14,
  },

  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
    resizeMode: 'contain',
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    borderRadius: 12,
    // marginBottom: 16,
  },

  tabText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },

  activeTabText: {
    color: '#7B61FF',
    fontWeight: '700',
    borderBottomWidth: 2,
    borderColor: '#7B61FF',
    paddingBottom: 4,
  },

  listContainer: {
    paddingBottom: 100,
  },

  quizTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  coins: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 6,
  },

  progressBar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    height: 6,
    overflow: 'hidden',
    marginVertical: 6,
  },

  progressFilled: {
    backgroundColor: '#7B61FF',
    height: 6,
    borderRadius: 10,
  },

  seatsText: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 10,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  teacherName: {
    color: '#6B7280',
    fontSize: 13,
  },

  enrollBtn: {
    backgroundColor: '#7B61FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  enrollText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
});
