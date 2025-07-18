import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';

const topics = [
  {
    label: 'Indian History',
    progress: 0.5,
    image: require('../../assets/img/earth.png'),
  },
  {
    label: 'Geography',
    progress: 0.5,
    image: require('../../assets/img/earth.png'),
  },
  {
    label: 'Indian Polity',
    progress: 0.5,
    image: require('../../assets/img/earth.png'),
  },
  {
    label: 'Economy',
    progress: 0.7,
    image: require('../../assets/img/earth.png'),
  },
  {
    label: 'Science & Tech',
    progress: 0.6,
    image: require('../../assets/img/earth.png'),
  },
  {
    label: 'Environment',
    progress: 0.4,
    image: require('../../assets/img/earth.png'),
  },
];

const QuizOverview = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <Text style={styles.stepText}>4/8 Steps Completed</Text>
      <ProgressBar progress={0.4} color="#9333EA" style={styles.stepBar} />

      <TouchableOpacity style={styles.selectionBox}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Exam Category</Text>
            <Text style={styles.selectionText}>UPSC</Text>
          </View>
          <Image
            source={require('../../assets/img/rightarrow.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selectionBox}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Exam Sub Category</Text>
            <Text style={styles.selectionText}>Civil Services</Text>
          </View>
          <Image
            source={require('../../assets/img/rightarrow.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Select Question Composition</Text>

      {/* Scrollable Topics Only */}
      <View style={styles.scrollWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 20}}>
            {topics.map((item, index) => (
              <View key={index}>
                <View style={styles.topicRow}>
                  <View style={styles.iconLabel}>
                    <Image source={item.image} style={styles.iconImage} />
                    <Text style={styles.topicText}>{item.label}</Text>
                  </View>
                  <Text style={styles.percentage}>
                    {Math.round(item.progress * 100)}%
                  </Text>
                </View>
                <ProgressBar
                  progress={item.progress}
                  color="#9333EA"
                  style={styles.progressBar}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Fixed Proceed Button with White BG */}
      <View style={styles.proceedWrapper}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => navigation.navigate('Addquestion')}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  stepText: {
    fontSize: 12, 
    color: '#6B7280',
    marginBottom: 4,
    marginTop: 15,
  },
  stepBar: {
    height: 6,
    borderRadius: 4,
    marginBottom: 30,
  },
  selectionBox: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 10, 
    color: '#6B7280',
    marginBottom: 4,
  },
  selectionText: {
    fontSize: 14, 
    color: '#111827',
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#000',
    fontSize: 14, 
    fontWeight: '800',
    marginVertical: 12,
  },
  scrollWrapper: {
    flex: 1,
    maxHeight: 350, 
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicText: {
    fontSize: 14, 
    color: '#1F2937',
    marginLeft: 8,
  },
  percentage: {
    fontSize: 14, 
    fontWeight: '600',
    color: '#9333EA',
  },
  progressBar: {
    height: 6,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  iconImage: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
  },
  proceedWrapper: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 32,
  },
  proceedBtn: {
    backgroundColor: '#701DDB',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14, 
  },
});
