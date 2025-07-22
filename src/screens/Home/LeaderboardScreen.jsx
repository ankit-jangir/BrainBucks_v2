import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import MainHeader from '../../components/MainHeader';
import LinearGradient from 'react-native-linear-gradient';

const LeaderboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <MainHeader
        name="Refer Room Owners & Earn"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image
          source={require('../../assets/img/banner2.png')}
          style={styles.banner}
        />

        {/* Passive Income */}
        <View style={styles.section}>
          <Text style={styles.title}>Calculate Your Passive Income</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.subText}>Number of Room Owners</Text>
            <Text style={styles.subTextBold}>100</Text>
          </View>
          <ProgressBar
            style={{height: 8, borderRadius: 4}}
            color="#9145F4"
            progress={0.8} // for 80%
          />

          <LinearGradient
            colors={['#701DDB', '#985DE3']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.incomeBox}>
            <Text style={styles.incomeTitle}>Potential Annual Income</Text>
            <Text style={styles.incomeAmount}>₹3,60,000</Text>
            <Text style={styles.incomeNote}>
              Based on average room owner earnings
            </Text>
          </LinearGradient>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Image
                source={require('../../assets/img/coin.png')}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>20% Commission</Text>
              <Text style={styles.infoSub}>On every sale</Text>
            </View>
            <View style={styles.infoItem}>
              <Image
                source={require('../../assets/img/earning.png')}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Lifetime Earnings</Text>
              <Text style={styles.infoSub}>Never expires</Text>
            </View>
          </View>
        </View>

        {/* 3 Step Process */}
        <View style={styles.section}>
          <Text style={styles.stepTitle}>Simple 3-Step Process</Text>
          {[1, 2, 3].map(step => (
            <View key={step} style={styles.stepBox}>
              <Text style={styles.stepNumber}>{step}</Text>
              <View>
                <Text style={styles.stepHeading}>
                  {step === 1
                    ? 'Share Your Code'
                    : step === 2
                      ? 'They Join & Teach'
                      : 'You Earn Forever'}
                </Text>
                <Text style={styles.stepText}>
                  {step === 1
                    ? 'Send your unique referral code'
                    : step === 2
                      ? 'Room owners start their journey'
                      : 'Get paid for life'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Earnings & Referrers */}
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Image
                source={require('../../assets/img/avg.png')}
                style={styles.metricIcon}
              />
              <Text style={styles.metricTitle}>Average{'\n'}Earnings</Text>
            </View>
            <Text style={styles.metricValue}>₹3,600/month</Text>
          </View>

          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Image
                source={require('../../assets/img/refferrs.png')}
                style={styles.metricIcon}
              />
              <Text style={styles.metricTitle}>Total{'\n'}Referrers</Text>
            </View>
            <Text style={styles.metricValue}>10,000+</Text>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Start Referring Now</Text>
        </TouchableOpacity>
        <Text style={styles.footnote}>Join 10,000+ successful referrers</Text>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter',
  },
  banner: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    color: '#111827',
    fontFamily: 'Inter',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Inter',
  },
  subTextBold: {
    fontSize: 14,
    color: '#701DDB',
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  incomeBox: {
    padding: 16,
    paddingVertical: 33,
    borderRadius: 12,
    marginTop: 12,
  },
  incomeTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  incomeAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 4,
    fontFamily: 'Inter',
  },
  incomeNote: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginHorizontal: 4,
    paddingVertical: 20,
  },
  infoIcon: {
    width: 28,
    height: 28,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    fontFamily: 'Inter',
  },
  infoSub: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
    color: '#111827',
    fontFamily: 'Inter',
  },
  stepBox: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    backgroundColor: '#701DDB',
    color: '#fff',
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 14,
    marginRight: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  stepHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    paddingBottom: 6,
    fontFamily: 'Inter',
  },
  stepText: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metricBox: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'space-between',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  metricTitle: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 20,
    flexShrink: 1,
    fontFamily: 'Inter',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
  btn: {
    backgroundColor: '#701DDB',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  footnote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#4B5563',
    marginTop: 10,
    fontFamily: 'Inter',
  },
});

