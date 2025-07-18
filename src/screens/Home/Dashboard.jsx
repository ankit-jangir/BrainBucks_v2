import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
              datasets: [{ data: [300, 280, 500, 450, 470, 520] }],
            }}
            width={wp('90%')}
            height={hp('20%')}
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
              marginTop: hp('2%'),
              marginLeft: wp('-3%'),
              marginRight: wp('-3%'),
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
            style={[styles.actionButton, { backgroundColor: '#b66ef5' }]}>
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
            style={[styles.actionButton, { backgroundColor: '#6ed1f5' }]}
            onPress={() => navigation.navigate('Createquiz')}>
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
            style={[styles.actionButton, { backgroundColor: '#fa7fc5' }]}
            onPress={() => navigation.navigate('Grouthbooster')}>
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
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: hp('2%'),
    color: '#6B7280',
    flex: 1,
    fontWeight: '400',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: hp('3%'),
    fontWeight: '700',
    marginVertical: hp('1%'),
    color: '#000000',
  },
  avatar: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    marginLeft: wp('2%'),
  },
  icon: {
    width: wp('6%'),
    height: hp('3%'),
    marginLeft: wp('2%'),
  },
  card: {
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginTop: hp('1%'),
    paddingBottom: hp('2%'),
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsLabel: {
    color: '#FFFFFFE5',
    fontSize: hp('2%'),
  },
  earningsChange: {
    color: '#FFFFFFE5',
    fontSize: hp('2%'),
    opacity: 0.8,
  },
  earnings: {
    color: '#FFFFFF',
    fontSize: hp('4%'),
    marginTop: hp('0.5%'),
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  statBox: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('4%'),
    width: '48%',
    height: hp('14%'),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    justifyContent: 'space-around',
  },
  icons: {
    width: wp('7%'),
    height: hp('3%'),
    tintColor: '#a855f7',
    marginRight: wp('5%'),
  },
  statContent: {
    flexDirection: 'column',
  },
  statTitle: {
    fontSize: hp('2%'),
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: hp('3%'),
    fontWeight: '700',
    color: '#000000',
    marginTop: hp('0.5%'),
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
    color: '#000000',
  },
  progressBarBackground: {
    height: hp('1%'),
    borderRadius: hp('0.5%'),
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
  progressBarFill: {
    height: hp('1%'),
    borderRadius: hp('0.5%'),
    width: '60%',
    backgroundColor: '#A855F7',
  },
  goalText: {
    fontSize: hp('1.8%'),
    color: '#6B7280',
    marginTop: hp('1%'),
    fontWeight: '400',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2.5%'),
  },
  actionButton: {
    width: wp('26%'),
    height: wp('26%'),
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  icon1: {
    width: wp('7%'),
    height: wp('7%'),
    marginBottom: hp('1%'),
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: hp('1.8%'),
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: hp('2.4%'),
  },
});
