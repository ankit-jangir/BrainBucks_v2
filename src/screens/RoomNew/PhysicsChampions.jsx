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
        <View>
          <Text style={styles.groupName}>Physics Champions</Text>

          <View style={{flexDirection: 'row', gap: 5}}>
            <Image
              source={require('../../assets/img/padlock.png')}
              style={{width: 13, height: 13}}
              tintColor={'#4B5563'}
            />
            <Text style={styles.groupDetails}>Private •</Text>
            <Image
              source={require('../../assets/img/h39.png')}
              style={{width: 15, height: 15}}
              resizeMode='contain'
              tintColor={'#4B5563'}
            />
            <Text style={styles.groupDetails}>
              234 Members{'\n'}Created by Prof. Sarah
            </Text>
          </View>
        </View>
        {/* Practice Notes */}
        <TouchableOpacity style={styles.practiceNotesBtn}>
          <Text style={styles.notesText}>📖 View Practice Notes</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setSelectedTab('Live')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Live' && styles.activeTabText,
              ]}>
              Live Quizzes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Scheduled')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Scheduled' && styles.activeTabText,
              ]}>
              Scheduled Quizzes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quizzes */}
        <ScrollView contentContainerStyle={styles.listContainer}>
          {activeQuizzes.map((item, index) => (
            <View
              key={index}
              style={[styles.card, {backgroundColor: item.color}]}>
              <View style={styles.cardHeader}>
                <Text style={styles.quizTitle}>{item.title}</Text>
                <TouchableOpacity>
                  <Text style={styles.shareIcon}>🔗</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.coins}>🏆 Win {item.coins} Coins</Text>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFilled,
                    {width: `${(item.filled / item.total) * 100}%`},
                  ]}
                />
              </View>
              <Text style={styles.seatsText}>
                {item.filled}/{item.total} seats filled •{' '}
                {item.total - item.filled} seats left
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.teacherName}>{item.teacher}</Text>
                <TouchableOpacity style={styles.enrollBtn}>
                  <Text style={styles.enrollText}>Enroll Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},

  header: {
    flexDirection: 'row',
  },
  groupName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter',
  },
  groupDetails: {fontSize: 12, color: '#4B5563'},

  practiceNotesBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  notesText: {color: '#fff', fontWeight: 'bold'},

  tabs: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  tabText: {
    fontSize: 15,
    paddingBottom: 4,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#7B61FF',
    borderBottomWidth: 2,
    borderColor: '#7B61FF',
    fontWeight: '700',
  },

  listContainer: {paddingBottom: 100},

  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  quizTitle: {fontWeight: 'bold', fontSize: 16, color: '#000'},
  shareIcon: {fontSize: 16},

  coins: {fontSize: 13, color: '#555', marginBottom: 8},

  progressBar: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    height: 6,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressFilled: {
    backgroundColor: '#7B61FF',
    height: 6,
  },
  seatsText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teacherName: {
    color: '#666',
    fontSize: 13,
  },
  enrollBtn: {
    backgroundColor: '#7B61FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  enrollText: {color: '#fff', fontSize: 13, fontWeight: 'bold'},
});
