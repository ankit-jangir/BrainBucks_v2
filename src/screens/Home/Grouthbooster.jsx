import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
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

const Grouthbooster = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Growth Boosters</Text>
        <Image
          source={require('../../assets/img/bluerocket.png')}
          style={styles.rocketIcon}
        />
      </View>

      <Text style={styles.subheading}>
        Unlock special features to accelerate your earnings
      </Text>

      <View style={styles.grid}>
        {boosters.map((item, index) => (
          <View key={index} style={styles.card}>
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
        ))}
      </View>
    </ScrollView>
  );
};

export default Grouthbooster;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9FC',
    flexGrow: 1,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 25,
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
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 50,
    textAlign: 'left',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 9,
  },
  card: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5,
    color: '#000',
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#701DDB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
