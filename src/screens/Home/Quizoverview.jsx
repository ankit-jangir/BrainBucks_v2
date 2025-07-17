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
      {/* Header */}
      <View>
        <MainHeader
          name="Add New Quiz"
          leftIcon={{
            source: require('../../assets/img/backq.png'),
            onPress: () => navigation.goBack(),
          }}
        />
      </View>

      <Text style={styles.stepText}>4/8 Steps Completed</Text>
      <ProgressBar progress={0.4} color="#9333EA" style={styles.stepBar} />

      {/* Category Selection */}
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

      {/* Question Composition */}
      <Text style={styles.sectionTitle}>Select Question Composition</Text>
      <View style={{maxHeight: 400}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{padding: 16}}>
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

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => {
          navigation.navigate('Addquestion');
        }}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
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
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    marginTop: 15,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  selectionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    height: 20,
    width: 20,
  },
  topicText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  percentage: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9333EA',
  },
  progressBar: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  proceedBtn: {
    marginTop: 'auto',
    backgroundColor: '#701DDB',
    marginBottom: 40,
    paddingVertical: 16,
    height: 56,

    borderRadius: 12,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },

  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  iconImage: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
  },
});
