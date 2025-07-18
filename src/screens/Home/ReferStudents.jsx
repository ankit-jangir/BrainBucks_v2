import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ReferStudents = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backicon.png')}
            style={styles.topIcon}
          />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Refer Students & Earn</Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/img/help.png')}
            style={styles.topIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Lifetime Earnings Card */}
        <LinearGradient
          colors={['#9333ea', '#b266fa']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>Lifetime Earnings</Text>
          <Text style={styles.earningsAmount}>$2,458.50</Text>
          <Image
            source={require('../../assets/img/chart.png')}
            style={styles.earningsIcon}
          />
        </LinearGradient>

        {/* How Earning Works */}
        <Text style={styles.sectionTitle}>How Earning Works</Text>
        <View style={styles.commissionRow}>
          <View style={styles.commissionCard}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('../../assets/img/gift2.png')}
                style={styles.icons}
              />
            </View>
            <Text style={styles.percentText}>1%</Text>
            <Text style={styles.commissionLabel}>Commission</Text>
            <Text style={styles.commissionDesc}>
              When students join paid quizzes
            </Text>
          </View>

          <View style={styles.commissionCard}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('../../assets/img/win.png')}
                style={styles.icons}
              />
            </View>
            <Text style={styles.percentText}>10%</Text>
            <Text style={styles.commissionLabel}>Commission</Text>
            <Text style={styles.commissionDesc}>
              When your students win prizes
            </Text>
          </View>
        </View>

        {/* Referral Code Box */}
        <View style={styles.inviteContainer}>
          <View style={styles.inviteBox}>
            <TextInput
              style={styles.refCode}
              value="REF-2024-XYZ"
              editable={false}
            />
            <TouchableOpacity>
              <Image
                source={require('../../assets/img/copy1.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <LinearGradient
              colors={['#9230f0', '#b266fa']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy Invite Link</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Share Options */}
        <Text style={styles.sectionTitle1}>Or Share Via</Text>
        <View style={styles.shareRow}>
          <Image
            source={require('../../assets/img/whatsaps.png')}
            style={styles.shareIcon}
          />
          <Image
            source={require('../../assets/img/messenger.png')}
            style={styles.shareIcon}
          />
          <Image
            source={require('../../assets/img/emails.png')}
            style={styles.shareIcon}
          />
          <Image
            source={require('../../assets/img/more.png')}
            style={styles.shareIcon}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Referrals</Text>
            <Text style={styles.statValue}>24</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statValue}>$2,458.50</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  topIcon: {
    width: 40,
    height: 40,
  },

  earningsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    height: 116,
    position: 'relative',
  },
  earningsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFFE5',
    fontFamily: 'Poppins',
  },
  earningsAmount: {
    fontSize: 35,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  earningsIcon: {
    width: 20,
    height: 15,
    position: 'absolute',
    top: 16,
    right: 16,
  },

  sectionTitle: {
    fontSize: 16, // -2
    fontWeight: '700',
    color: '#1A1A1A',
    marginVertical: 12,
    fontFamily: 'Poppins',
  },
  sectionTitle1: {
    fontSize: 14, // -2
    fontWeight: '700',
    color: '#666666',
    textAlign: 'center',
    marginVertical: 19,
    fontFamily: 'Poppins',
  },

  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commissionCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    height: 200,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  percentText: {
    fontSize: 18, // -2
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  commissionLabel: {
    fontSize: 18, // -2
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
    fontFamily: 'Poppins',
  },
  commissionDesc: {
    fontSize: 12, // -2
    fontWeight: '600',
    lineHeight: 20,
    color: '#666666',
    fontFamily: 'Poppins',
  },
  icons: {
    width: 48,
    height: 48,
  },

  inviteContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  inviteBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  refCode: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
    color: '#111827',
    fontFamily: 'Poppins',
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  copyButton: {
    backgroundColor: '#9333ea',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },

  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 25,
  },
  shareIcon: {
    width: 48,
    height: 48,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    fontFamily: 'Poppins',
  },
});
