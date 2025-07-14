import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const roomsData = [
  {
    id: '1',
    title: 'UPSC Warriors',
    host: 'Alex Johnson • IAS Officer',
    tags: ['Created', 'Public'],
    quizzes: 16,
    schedules: 23,
    members: 45,
    joined: false,
  },
  {
    id: '2',
    title: 'RAS Rookies',
    host: 'Sarah Miller • RAS Officer',
    tags: ['Joined', 'Private'],
    quizzes: 8,
    schedules: 15,
    members: 45,
    joined: true,
  },
];

const tabs = ['All Rooms', 'Created', 'Joined', 'Pending'];

export default function VirtualRooms() {
  const [selectedTab, setSelectedTab] = useState('All Rooms');
const navigation = useNavigation()
  const filteredData = roomsData.filter(room =>
    selectedTab === 'All Rooms' ? true : room.tags.includes(selectedTab),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F7FA'}}>
      <StatusBar animated={true} backgroundColor="#701DDB" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Virtual Rooms</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Create Room</Text>
          </TouchableOpacity>
        </View>

        {/* Search & Tabs */}
        <View style={{backgroundColor: '#fff', paddingTop: 20}}>
          {/* Search Box */}
          <View style={styles.searchBox}>
            <Image
              source={require('../../assets/img/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search rooms..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          {/* Scrollable Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabs}
            contentContainerStyle={{paddingHorizontal: 10, flexGrow: 1}}>
            {tabs.map((tab, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedTab(tab)}
                activeOpacity={0.7}
                style={[
                  styles.tabButton,
                  selectedTab === tab && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Room Cards */}
        {filteredData.length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>
            No rooms available in this category.
          </Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 10, paddingBottom: 0}}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: `https://i.pravatar.cc/300?img=${item.id}`}}
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={styles.roomTitle}>{item.title}</Text>
                      <Text style={styles.roomHost}>{item.host}</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/img/sharea.png')}
                      style={{width: 15, height: 15}}
                      tintColor={'#9CA3AF'}
                    />
                  </View>
                </View>

                <View style={styles.tagRow}>
                  {item.tags.map((tag, i) => (
                    <Text key={i} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <View style={styles.statsRow}>
                  <View style={[styles.badgeContainer, styles.blueBadge]}>
                    <Image
                      source={require('../../assets/img/record-button.png')}
                      style={styles.badgeIcon}
                      tintColor={'#2563EB'}
                    />
                    <Text style={styles.badgeText}>
                      Live Quizzes {item.quizzes}
                    </Text>
                  </View>
                  <View style={[styles.badgeContainer, styles.greenBadge]}>
                    <Image
                      source={require('../../assets/img/record-button.png')}
                      style={styles.badgeIcon}
                      tintColor={'#16A34A'}
                    />
                    <Text style={styles.badgeTextg}>
                      Scheduled {item.schedules}
                    </Text>
                  </View>
                </View>

                <View style={styles.footerRow}>
                  <Text style={styles.memberCount}>
                    👥 {item.members} Members
                  </Text>
                  <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                    <Image
                      source={require('../../assets/img/trash.png')}
                      style={{width: 20, height: 20}}
                    />
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate("PhysicsChampions")}}
                      activeOpacity={0.7}
                      style={[
                        styles.actionButton,
                        item.joined ? styles.sendRequest : styles.joinNow,
                      ]}>
                      <Text
                        style={[
                          styles.actionText,
                          item.joined && {color: '#7b2ff7'},
                        ]}>
                        {item.joined ? 'Send Request' : 'Join Now'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  createButton: {
    backgroundColor: '#7b2ff7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#9CA3AF',
    marginRight: 8,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    padding: 0,
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 17,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  activeTab: {
    backgroundColor: '#701DDB',
  },
  tabText: {
    fontSize: 14,
    color: '#4B5563',
  },
  activeTabText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
    fontFamily: 'Inter',
  },
  roomHost: {
    fontSize: 13,
    color: '#4B5563',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    // backgroundColor: '#F5F7FA',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 12,
    color: '#4B5563',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  blueBadge: {
    backgroundColor: '#DBEAFE',
    color: '#B82F6',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 14,
    marginRight: 8,
    flexDirection: 'row',
  },
  greenBadge: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 14,
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 15,
    marginRight: 8,
  },
  badgeIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
    resizeMode: 'contain',
  },
  badgeText: {
    fontSize: 13,
    color: '#3B82F6',
  },
  badgeTextg: {
    fontSize: 13,
    color: '#16A34A',
  },
  blueBadge: {
    backgroundColor: '#DBEAFE',
  },
  greenBadge: {
    backgroundColor: '#DCFCE7',
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberCount: {
    fontSize: 13,
    color: '#666',
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    width: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  joinNow: {
    backgroundColor: '#7b2ff7',
  },
  sendRequest: {
    backgroundColor: '#e7d9fc',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
});
