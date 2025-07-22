import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import BasicServices from '../../services/BasicServices';
import { AUTHMICRO } from '../../config/urls';
import NoDataFound from '../../components/NoDataFound';

const MissionScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);

  const earnings = [
    {
      title: 'Student Referrals',
      amount: '750.00',
      change: '↑ 15%',
      changeColor: 'green',
      icon: require('../../assets/img/studentcap.png'),
    },
    {
      title: 'Quizzes Created',
      amount: '245.50',
      change: '↑ 8%',
      changeColor: 'green',
      icon: require('../../assets/img/document.png'),
    },
    {
      title: 'Room Owner Referrals',
      amount: '150.00',
      change: '0%',
      changeColor: 'gray',
      icon: require('../../assets/img/key.png'),
    },
    {
      title: 'Tier Bonuses',
      amount: '75.00',
      change: '↑ 5%',
      changeColor: 'green',
      icon: require('../../assets/img/bonus.png'),
    },
    {
      title: 'Level-Up Rewards',
      amount: '27.00',
      change: '↓ 2%',
      changeColor: 'red',
      icon: require('../../assets/img/reward.png'),
    },
  ];

  useEffect(() => {
    LevelApiUser();
  }, []);

  async function LevelApiUser() {
    setLoading(true);
    const token = await BasicServices.getBearerToken();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `${token}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${AUTHMICRO}/levelBenefits/user`, requestOptions);
      const result = await response.json();

      if (result.success == true) {
        const combinedLevels = [
          ...result.achieved_levels.map(item => ({
            ...item,
            type: 'achieved',
            icon: require('../../assets/img/cupwin.png'),
          })),
          {
            ...result.current_level,
            type: 'current',
            icon: require('../../assets/img/top.png'),
          },
          ...result.upcoming_levels.map(item => ({
            ...item,
            type: 'upcoming',
            icon: require('../../assets/img/expert.png'),
          })),
        ];
        setLevels(combinedLevels);
      } else {
        console.error('API failed:', result.message);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);

    }
  }




  const renderLevelItem = ({ item, index }) => {
    let color = '#9CA3AF'; // default gray
    if (item.type === 'achieved') color = '#22C55E';
    if (item.type === 'current') color = '#8453E2';

    return (
      <View style={[styles.levelBox]}>
        <View style={styles.levelRow}>
          <View style={styles.iconColumn}>
            <View style={[styles.iconWrapper, { borderColor: color }]}>
              <Image
                source={item.icon || defaultIcon}
                style={styles.levelIcon}
                resizeMode="contain"
              />
            </View>
            {index !== levels.length - 1 && (
              <View style={[styles.verticalLine, { backgroundColor: '#c6c2cdff' }]} />
            )}
          </View>

          <View style={{ flex: 1, paddingRight: 10, position: 'relative' }}>
            <Text style={[styles.levelTitle, { color }]}>
              {item.level_name || item.title}
            </Text>

            <Text style={styles.levelEarnings}>
              Income: {item.income_slab} | Followers: {item.follower_slab}
            </Text>
            <Text style={styles.levelEarnings}>
              Benefits: {item.income_benefits}
            </Text>

            {Array.isArray(item.other_benefits) &&
              item.other_benefits.map((benefit, idx) => (
                <Text key={idx} style={styles.levelEarnings}>
                  • {benefit}
                </Text>
              ))}

           {/*} {item.type === 'current' && (
              <ProgressBar
                progress={0.75} // Replace with dynamic value if available
                color="#8453E2"
                unfilledColor="#E6E6E6"
                borderWidth={0}
                height={6}
                style={{ marginTop: 6, width: '90%' }}
              />
            )}*/}
          </View>
        </View>
      </View>
    );
  };

  const renderEarningItem = ({ item }) => (
    <View style={styles.earningCard}>
      <View style={styles.row}>
        <Image source={item.icon} style={styles.cardIcon} />
        <View>
          <Text style={styles.earningTitle}>{item.title}</Text>
          <Text style={styles.earningValue}>${item.amount}</Text>
        </View>
      </View>
      <Text style={{ color: item.changeColor }}>{item.change}</Text>
    </View>
  );

 

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/img/backq.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Your Growth Journey</Text>
          <Text style={styles.headerSubtitle}>
            Level up to earn more rewards
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {
          loading ? <ActivityIndicator  size={24} /> :
            <FlatList
              data={levels}
              refreshing={loading}
              onRefresh={LevelApiUser}
              renderItem={renderLevelItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              ListHeaderComponent={() => {
              <NoDataFound message={"NO Level cross"} />
              }}
            />
      }


       {/* <TouchableOpacity style={styles.viewBtn}>
          <Text style={styles.viewBtnText}>View Your Level Details</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { marginTop: 30 }]}>Earnings Dashboard</Text>
        <Text style={styles.earningAmount}>
          $1,247.50 <Text style={styles.monthText}>This Month</Text>
        </Text>

        <FlatList
          data={earnings}
          renderItem={renderEarningItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />

        <TouchableOpacity style={styles.exportBtn}>
          <View style={styles.exportContent}>
            <Image
              source={require('../../assets/img/down.png')}
              style={styles.exportIcon}
            />
            <Text style={styles.exportText}>Export Earnings Report</Text>
          </View>
        </TouchableOpacity>*/}
      </ScrollView>
    </View>
  );
};

export default MissionScreen;

// Styles remain unchanged
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 1,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 19,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  levelBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  levelIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  verticalLine: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  levelTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Poppins',
  },
  levelEarnings: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Poppins',
  },
  viewBtn: {
    backgroundColor: '#701DDB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
    color: '#000',
    fontFamily: 'Poppins',
  },
  earningAmount: {
    fontWeight: '800',
    fontSize: 28,
    marginTop: 6,
    color: '#000000',
    fontFamily: 'Poppins',
  },
  monthText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  earningCard: {
    borderWidth: 1,
    borderColor: '#EDEDED',
    padding: 19,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  earningTitle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  earningValue: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
    color: '#4B5563',
    fontFamily: 'Poppins',
  },
  exportBtn: {
    borderColor: '#F3F4F6',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#F3F4F6',
  },
  exportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exportIcon: {
    width: 20,
    height: 20,
    tintColor: '#8453E2',
  },
  exportText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});