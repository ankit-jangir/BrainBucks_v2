import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const MissionScreen = () => {
  const navigation = useNavigation();
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

      <ScrollView contentContainerStyle={styles.container}>
        {levels.map((level, index) => (
          <View key={index} style={[styles.levelBox]}>
            <View style={styles.levelRow}>
              <View style={styles.iconColumn}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      borderColor: level.active
                        ? '#8453E2'
                        : level.completed
                          ? '#22C55E'
                          : '#C4C4C4',
                    },
                  ]}>
                  <Image
                    source={level.icon}
                    style={styles.levelIcon}
                    resizeMode="contain"
                  />
                </View>
                {index !== levels.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                      {
                        backgroundColor: '#c6c2cdff',
                      },
                    ]}
                  />
                )}
              </View>

              <View style={{flex: 1, paddingRight: 10, position: 'relative'}}>
                <Text
                  style={[
                    styles.levelTitle,
                    level.active && {color: '#8453E2'},
                    level.completed && {color: '#22C55E'},
                    !level.completed && !level.active && {color: '#9CA3AF'},
                  ]}>
                  {level.title}
                </Text>

                <Text style={styles.levelEarnings}>
                  {level.progress !== null
                    ? `Earn up to $500/month\n${Math.round(level.progress * 25)}/25 referrals`
                    : level.earning}
                </Text>
                {level.progress !== null && (
                  <ProgressBar
                    progress={level.progress}
                    color="#8453E2"
                    unfilledColor="#E6E6E6"
                    borderWidth={0}
                    height={6}
                    style={{marginTop: 6, width: '90%'}}
                  />
                )}
                {level.completed && (
                  <Image
                    source={require('../../assets/img/checkmark.png')}
                    style={styles.checkmarkIcon}
                  />
                )}
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.viewBtn}>
          <Text style={styles.viewBtnText}>View Your Level Details</Text>
        </TouchableOpacity>

        <Text style={[styles.title, {marginTop: 30}]}>Earnings Dashboard</Text>
        <Text style={styles.earningAmount}>
          $1,247.50 <Text style={styles.monthText}>This Month</Text>
        </Text>

        {earnings.map((item, i) => (
          <View key={i} style={styles.earningCard}>
            <View style={styles.row}>
              <Image source={item.icon} style={styles.cardIcon} />
              <View>
                <Text style={styles.earningTitle}>{item.title}</Text>
                <Text style={styles.earningValue}>${item.amount}</Text>
              </View>
            </View>
            <Text style={{color: item.changeColor}}>{item.change}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.exportBtn}>
          <View style={styles.exportContent}>
            <Image
              source={require('../../assets/img/down.png')}
              style={styles.exportIcon}
            />
            <Text style={styles.exportText}>Export Earnings Report</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MissionScreen;

// ✅ Updated Dummy Data
const levels = [
  {
    title: 'Level 5: Expert Mentor',
    earning: 'Earn up to $2000/month\nRefer 50+ students',
    icon: require('../../assets/img/expert.png'),
    active: false,
    progress: null,
    completed: false,
  },
  {
    title: 'Level 4: Senior Guide',
    earning: 'Earn up to $1000/month\nRefer 25+ students',
    icon: require('../../assets/img/madel.png'),
    active: false,
    progress: null,
    completed: false,
  },
  {
    title: 'Level 3: Rising Star',
    earning: '',
    icon: require('../../assets/img/top.png'),
    active: true,
    progress: 18 / 25,
    completed: false,
  },
  {
    title: 'Level 2: Helper',
    earning: 'Earn up to $200/month',
    icon: require('../../assets/img/cupwin.png'),
    active: true,
    progress: null,
    completed: true,
  },
  {
    title: 'Level 1: Beginner',
    earning: 'Earn up to $50/month',
    icon: require('../../assets/img/cupwin.png'),
    active: true,
    progress: null,
    completed: true,
  },
];

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
    fontSize: 20,
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
    fontSize: 13,
    color: '#9CA3AF',
    fontFamily: 'Poppins',
  },
  levelEarnings: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'Poppins',
  },
  checkmarkIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 0,
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
    fontSize: 13,
    fontFamily: 'Poppins',
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
    fontFamily: 'Poppins',
  },
  earningAmount: {
    fontWeight: '800',
    fontSize: 26,
    marginTop: 6,
    color: '#000000',
    fontFamily: 'Poppins',
  },
  monthText: {
    fontSize: 11,
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
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  earningValue: {
    fontWeight: '500',
    fontSize: 13,
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
    fontSize: 13,
    fontFamily: 'Poppins',
  },
});
