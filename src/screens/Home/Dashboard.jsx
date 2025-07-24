import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';
import BasicServices from '../../services/BasicServices';
import {AUTHMICRO} from '../../config/urls';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const navigation = useNavigation();
  let auth = new AuthenticationApiService();
  const [userData, setUserData] = useState({});
  const [Graph, setGrafData] = useState({
    labels: [''],
    datasets: [{data: [0]}],
  });
  const [Imag, setImage1] = useState({});
  const [refers, setRefers] = useState(0);
  const [eduLevel, setEduLevel] = useState('Level');

  let isFocused = useIsFocused();

  useEffect(() => {
    try {
      auth.getUserProfile().then(res => {
        if (res.status === 1) {
          setUserData(res.user_details);
          if (res.user_details.image) {
            setImage1(BLOBURL + res.user_details.image);
          }
        } else {
          ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      console.log('Error in Fetching User Profile', err.message);
    }
  }, [isFocused]);

  const getEduGraf = async () => {
    try {
      const token = await BasicServices.getBearerToken();
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `${token}`);

      const response = await fetch(`${AUTHMICRO}/auth/participant/income`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      });
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const months = result.data.map(item => item.month?.slice(0, 5) || '');
        const amounts = result.data.map(item => item.totalIncome || 0);

        setGrafData({
          labels: months,
          datasets: [{data: amounts}],
        });
        setRefers(result.refers);
        setEduLevel(result.eduLevel);
        console.log('📊 Graph Data:', {
          labels: months,
          datasets: [{data: amounts}],
        });
      } else {
        console.error('API failed:', result.message);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  useEffect(() => {
    getEduGraf();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer?.()}>
          <Image
            source={require('../../assets/img/burgerbar.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.welcome}>
            Welcome back, {userData?.name || userData?.username || 'User'}!
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('wallet')} >
          <Image
            source={require('../../assets/img/wallet.png')}
            style={{width:20,height:20}}
            tintColor={"#000"}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
        {/* <View style={styles.rightHeader} /> */}

      <View style={styles.container}>
        <LinearGradient colors={['#9333EA', '#A855F7']} style={styles.card}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <Text style={styles.earningsChange}>+12.5%</Text>
          </View>
          <Text style={styles.earnings}>
            ₹ {Graph?.datasets?.[0]?.data?.reduce((a, b) => a + b, 0)}
          </Text>

          <LineChart
            data={
              Graph?.labels?.length
                ? Graph
                : {
                    labels: [''],
                    datasets: [{data: [0]}],
                  }
            }
            width={screenWidth - 40}
            height={90}
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

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Image
              source={require('../../assets/img/h86.png')}
              style={styles.icons}
              resizeMode="contain"
            />
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Referrals</Text>
              <Text style={styles.statValue}>{refers}</Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <Image
              source={require('../../assets/img/h92.png')}
              style={styles.icons}
              resizeMode="contain"
            />
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Level</Text>
              <Text style={styles.statValue}>{eduLevel}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Monthly Goals</Text>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.goalText}>
          30 more referrals to reach next level
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReferStudents')}
            style={[styles.actionButton, {backgroundColor: '#b66ef5'}]}>
            <View style={styles.centerContent}>
              <Image
                source={require('../../assets/img/h103.png')}
                style={styles.icon1}
                resizeMode="contain"
              />
              <Text style={styles.buttonLabel}>Refer{'\n'}Students</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Questionscreen')}
            style={[styles.actionButton, {backgroundColor: '#6ed1f5'}]}>
            <View style={styles.centerContent}>
              <Image
                source={require('../../assets/img/h107.png')}
                style={styles.icon1}
                resizeMode="contain"
              />
              <Text style={styles.buttonLabel}>Create{'\n'}Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Grouthbooster')}
            style={[styles.actionButton, {backgroundColor: '#fa7fc5'}]}>
            <View style={styles.centerContent}>
              <Image
                source={require('../../assets/img/SV.png')}
                style={styles.icon1}
                resizeMode="contain"
              />
              <Text style={styles.buttonLabel}>Missions</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Dashboard;

// ✅ Tera same styles hi use ho raha hai – no change needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },

  greeting: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
    fontFamily: 'Inter',
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // marginLeft: 10,
  },

  icon: {
    width: 28,
    height: 24,
    // marginLeft: 10,
  },

  menuIcon: {
    width: 24,
    height: 24,
  },
  welcome: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0.6,
    flexDirection: 'row',
  },
  icons: {
    width: 30,
    height: 24,
    tintColor: '#a855f7',
    marginBottom: 30,
  },
  statContent: {
    alignItems: 'center',
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
    marginHorizontal: 5,
    padding: 15,
    width: 100,
  },
  centerContent: {
    alignItems: 'center',
    gap: 5,
  },
  icon1: {
    width: 30,
    height: 30,
    // marginBottom: 8,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    // lineHeight: 10,
    fontFamily: 'Inter',
  },
});
