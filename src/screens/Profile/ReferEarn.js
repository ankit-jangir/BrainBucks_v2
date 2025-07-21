import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainHeader from '../../components/MainHeader';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import { Share } from 'react-native';
import { APPURL } from '../../config/urls';
import { Clipboard } from 'react-native';

const ReferEarn = () => {
  const navigation = useNavigation();
  let auth = new AuthenticationApiService();
  const [referCode, setReferCode] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(referCode);
    ToastAndroid.show('Referral code copied to clipboard', ToastAndroid.LONG);
  };

  const CopYLink = () => {
    Clipboard.setString(`${APPURL}/Splash?referralCode=${referCode}`);
    ToastAndroid.show('Copey Link', ToastAndroid.LONG);
  };

  useEffect(() => {
    const fetchReferCode = async () => {
      const code = await auth.getReferCode();
      if (code) {
        setReferCode(code);
      }
    };

    fetchReferCode();
  }, []);

  

  const onShare = async reel_id => {
    try {
      const result = await Share.share({
        message: `${APPURL}/Splash?referralCode=${referCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const commissionData = [
    {
      id: '1',
      icon: require('../../assets/img/gift2.png'),
      percent: '1%',
      label: 'Commission',
      desc: 'When students join paid quizzes',
    },
    {
      id: '2',
      icon: require('../../assets/img/win.png'),
      percent: 'Signup',
      label: 'Commission',
      desc: 'When your students win prizes',
    },
    {
      id: '3',
      icon: require('../../assets/img/win.png'),
      percent: '10%',
      label: 'Commission',
      desc: 'When your students win prizes',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <MainHeader
        name={'Refer & Earn'}
        leftIcon={{
          type: 'image',
          source: require('../../assets/img/backq.png'), // provide the image source
          onPress: () => {
            navigation.goBack();
          },
        }}
      />

      <ScrollView style={{ paddingHorizontal: 15, paddingTop: 10, marginBottom: 10 }} showsVerticalScrollIndicator={false}>
        {/* Lifetime Earnings Card */}
        <View >
          <LinearGradient
            colors={['#9333ea', '#b266fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.earningsCard}>
            <Text style={styles.earningsTitle}>Lifetime Earnings</Text>
            <Text style={styles.earningsAmount}>$2,458.50</Text>
            <Image
              source={require('../../assets/img/chart.png')}
              style={styles.earningsIcon}
            />
          </LinearGradient>
        </View>

        {/* How Earning Works */}
        <Text style={styles.sectionTitle}>How Earning Works</Text>
        <FlatList
          horizontal
          data={commissionData}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigation.navigate("ReferStudents")} style={styles.commissionCard}>
              <View style={styles.iconWrapper}>
                <Image source={item.icon} style={styles.icon} />
              </View>
              <Text style={styles.percentText}>{item.percent}</Text>
              <Text style={styles.commissionLabel}>{item.label}</Text>
              <Text style={styles.commissionDesc}>{item.desc}</Text>
            </TouchableOpacity>
          )}
        />


        {/* Referral Code Box */}
        <View style={styles.inviteContainer}>
          <View style={styles.inviteBox}>
            <TextInput
              style={styles.refCode}
              value={referCode}
              editable={false}
            />
            <TouchableOpacity onPress={copyToClipboard}>
              <Image
                source={require('../../assets/img/copy1.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={CopYLink}>
            <LinearGradient
              colors={['#9230f0', '#b266fa']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy Invite Link</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Share Options */}
        <Text style={styles.sectionTitle1}>Or Share Via</Text>
        <TouchableOpacity onPress={onShare}>
          <LinearGradient
            colors={['#9230f0', '#b266fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.copyButton, { marginHorizontal: 10, marginBottom: 20 }]}>
            <Text style={styles.copyButtonText}>Invite Friend</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.statsRow}>
          <TouchableOpacity onPress={()=>{navigation.navigate("ReferStudents")}} style={styles.statCard}>
            <Text style={styles.statLabel}>Active Referrals</Text>
            <Text style={styles.statValue}>24</Text>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statValue}>$2,458.50</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferEarn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins-Regular',
  },
  topIcon: {
    width: 40,
    height: 40,
  },

  earningsCard: {
    // backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    marginBottom: 20,
    height: 116,
  },
  earningsTitle: {
    color: '#FFFFFFE5',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  earningsAmount: {
    color: '#FFFFFF',
    fontSize: 37,
    fontWeight: '800',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  earningsIcon: {
    width: 20,
    height: 15,
    position: 'absolute',
    top: 16,
    right: 16,
    color: '#FFFFFFCC',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 12,
    color: '#1A1A1A',
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle1: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 19,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center', // ✅ center the text
  },

  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  commissionCard: {
    width: 167,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    height: 200,
    marginRight: 10, // Optional, if not using `gap` in FlatList
  },




  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },

  percentText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 0,
    fontFamily: 'Poppins-Regular',
    marginTop: 10
  },

  commissionLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },

  commissionDesc: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },

  refCode: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
    marginRight: 10,
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
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
    marginBottom: 30
  },
  statCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    width: '48%',
    padding: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1A1A1A',
    fontFamily: 'Poppins-Regular',
  },
  statLabel: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
  },
});
