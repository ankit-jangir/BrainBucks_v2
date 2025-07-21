import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const QuzescreenR = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header with image */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backq.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            navigation.navigate('Questionscreen');
          }}>
          <Text style={styles.publishBtnText}>Publish New Quiz</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.categoryText}>
          Exam Category : <Text style={styles.bold}>UPSC</Text> {'>'}{' '}
          <Text style={styles.bold}>Civil Services</Text>
        </Text>

        <View style={styles.card}>
          <Text style={styles.quizName}>Quiz Name: xyz</Text>
        </View>
        <Text style={[styles.label, {marginTop: 20}]}>
          Questions Composition
        </Text>
        <View style={[styles.qBox, styles.shadow]}>
          <ScrollView style={{maxHeight: 170}} nestedScrollEnabled={true}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={{marginTop: index === 0 ? 0 : 12}}>
                <View style={styles.qRow}>
                  <Text style={styles.qTitle}>Geography, Indian Polity</Text>
                  <Text style={styles.qPercent}>50%</Text>
                </View>
                <View style={styles.qProgressBar}>
                  <View style={[styles.qProgressFill, {width: '50%'}]} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.grid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Total Questions</Text>
            <Text style={styles.infoValue}>13</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Time/Question</Text>
            <Text style={styles.infoValue}>13</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Repetition</Text>
            <Text style={styles.infoValue}>never</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Quiz Time</Text>
            <Text style={styles.infoValue}>26-6-2025</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Total Slots</Text>
            <Text style={styles.infoValue}>20</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Entry Fees</Text>
            <Text style={styles.infoValue}>100</Text>
          </View>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={require('../../assets/img/peoples.png')}
            style={styles.quizImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rules</Text>
          <Text style={styles.label}>edde</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuzescreenR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',

    borderBottomColor: '#ddd',
  },
  backIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -30}],
  },
  publishBtn: {
    backgroundColor: '#701DDB',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  publishBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  qBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginVertical: 20,
    marginTop: 10,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        borderColor: '#e9e9eaff',
        borderWidth: 1,
      },
    }),
  },
  qRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  qTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  qPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  qProgressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 6,
  },
  qProgressFill: {
    height: 6,
    backgroundColor: '#9333EA',
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    marginBottom: 8,
    color: '#4B5563',
  },
  bold: {
    fontWeight: 'bold',
    color: '#4B5563',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  borderColor: '#e9e9eaff',
    borderWidth: 1,
  },
  quizName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#4B5563',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: '#4B5563',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A020F0',
    borderRadius: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    marginBottom: 16,
     borderColor: '#e9e9eaff',
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#4b5563c5',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  imageCard: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  quizImage: {
    width: '100%',
    height: 200,
    opacity: 0.5,
  },
});
