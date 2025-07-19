import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';

const boosters = [
  {
    title: 'Refer & Rise Leaderboard',
    desc: 'Compete with top affiliates and win weekly rewards',
    icon: require('../../assets/img/bluecup.png'),
    buttonText: 'Join Leaderboard',
    screen: 'LeaderboardScreen',
  },
  {
    title: 'Referral Missions',
    desc: 'Complete daily missions to earn bonus rewards',
    icon: require('../../assets/img/box4.png'),
    buttonText: 'Start Mission',
    screen: 'MissionScreen',
  },
  {
    title: 'Founders Club',
    desc: 'Elite membership with premium benefits',
    icon: require('../../assets/img/orangebox.png'),
    buttonText: 'Join Club',
    screen: 'FoundersClubScreen',
  },
  {
    title: 'Super 30 Rooms',
    desc: 'Exclusive mastermind groups for top performers',
    icon: require('../../assets/img/wins.png'),
    buttonText: 'Learn More',
    screen: 'Super30Screen',
  },
];

const screenWidth = Dimensions.get('window').width;
const cardMargin = 6;
const horizontalPadding = 20;
const cardWidth = (screenWidth - horizontalPadding * 2 - cardMargin * 2) / 2;

const Grouthbooster = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={{width: cardWidth, margin: cardMargin}}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Image source={item.icon} style={styles.icon} />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(item.screen)}>
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headingRow}>
          <Text style={styles.heading}>Growth Boosters</Text>
          <Image
            source={require('../../assets/img/bluerocket.png')}
            style={styles.rocketIcon}
          />
        </View>
        <Text style={styles.subheading}>
          Unlock special features to accelerate your {'\n'} earnings
        </Text>
      </View>

    
      <View style={styles.scrollBackground}>
        <FlatList
          data={boosters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 40}} />}
        />
      </View>
    </View>
  );
};

export default Grouthbooster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1A1A',
    marginRight: 6,
  },
  rocketIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    resizeMode: 'contain',
  },
  subheading: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
    textAlign: 'left',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#f8f6f6ff',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    minHeight: 235,
    justifyContent: 'space-between',
    
  },
  iconWrapper: {
    width: 47,
    height: 45,
    marginBottom: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight:24,
    color: '#000',
    fontFamily:"Inter"
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight:16,
  },
  button: {
    backgroundColor: '#701DDB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
