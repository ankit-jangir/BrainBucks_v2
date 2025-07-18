import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <View style={styles.rightHeader}>
          <Image
            source={require('../../assets/img/bell.png')}
            style={styles.icon}
          />
          <Image
            source={{uri: 'https://i.pravatar.cc/150?img=3'}}
            style={styles.avatar}
          />
        </View>
      </View>

      <Text style={styles.welcome}>Welcome back, Alex!</Text>

      {/* Earnings Card */}
      <LinearGradient colors={['#9333EA', '#A855F7']} style={styles.card}>
        <View style={styles.earningsHeader}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsChange}>+12.5%</Text>
        </View>
        <Text style={styles.earnings}>$1,247.50</Text>

        <LineChart
          data={{
            labels: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{data: [300, 280, 500, 450, 470, 520]}],
          }}
          width={screenWidth - 40}
          height={160}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={true}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: () => '#ffffff',
            labelColor: () => '#ffffff',
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
            propsForLabels: {
              fontSize: 12,
            },
            fillShadowGradient: '#ffffff',
            fillShadowGradientOpacity: 0.15,
          }}
          bezier
          style={{
            marginTop: 15,
            marginLeft: -10,
            marginRight: -10,
          }}
        />
      </LinearGradient>

      {/* Stats Boxes */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Image
            source={require('../../assets/img/user.png')}
            style={styles.icons}
            resizeMode="contain"
          />
          <View style={styles.statContent}>
            <Text style={styles.statTitle}>Referrals</Text>
            <Text style={styles.statValue}>42</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Image
            source={require('../../assets/img/gift.png')}
            style={styles.icons}
            resizeMode="contain"
          />
          <View style={styles.statContent}>
            <Text style={styles.statTitle}>Level</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>
      </View>

      {/* Monthly Goals */}
      <Text style={styles.sectionTitle}>Monthly Goals</Text>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>
      <Text style={styles.goalText}>30 more referrals to reach next level</Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReferStudents')}
          style={[styles.actionButton, {backgroundColor: '#b66ef5'}]}>
          <View style={styles.centerContent}>
            <Image
              source={require('../../assets/img/user1.png')}
              style={styles.icon1}
              resizeMode="contain"
            />
            <Text style={styles.buttonLabel}>Refer{'\n'}Students</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Createquiz')}
          style={[styles.actionButton, {backgroundColor: '#6ed1f5'}]}>
          <View style={styles.centerContent}>
            <Image
              source={require('../../assets/img/line3.png')}
              style={styles.icon1}
              resizeMode="contain"
            />
            <Text style={styles.buttonLabel}>Create{'\n'}Quiz</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Grouthbooster')}
          style={[styles.actionButton, {backgroundColor: '#fa7fc5'}]}>
          <View style={styles.centerContent}>
            <Image
              source={require('../../assets/img/rokect.png')}
              style={styles.icon1}
              resizeMode="contain"
            />
            <Text style={styles.buttonLabel}>Missions</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 1,
    color: '#000000',
    fontFamily: 'Inter',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
  },
  icon: {
    width: 28,
    height: 24,
    borderRadius: 18,
    marginLeft: 10,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsLabel: {
    color: '#FFFFFFE5',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  earningsChange: {
    color: '#FFFFFFE5',
    fontSize: 14,
    opacity: 0.8,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  earnings: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Inter',
    marginTop: 5,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 12,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    justifyContent: 'space-around',
  },
  icons: {
    width: 30,
    height: 20.44,
    tintColor: '#a855f7',
    marginRight: 49,
  },
  statContent: {
    flexDirection: 'column',
  },
  statTitle: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
    color: '#000000',
    fontFamily: 'Inter',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: '#000000',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    width: '60%',
    backgroundColor: '#A855F7',
  },
  goalText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  icon1: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
});
