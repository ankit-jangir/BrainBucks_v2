import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar} from 'react-native-paper';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const subjectCategories = [
  {
    id: '1',
    name: 'Sciences',
    image: require('../../assets/img/science.png'),
  },
  {
    id: '2',
    name: 'Mathematics',
    image: require('../../assets/img/maths.png'), // Add your math icon
  },
  {
    id: '3',
    name: 'History',
    image: require('../../assets/img/history.png'), // Add your history icon
  },
  {
    id: '4',
    name: 'Languages',
    image: require('../../assets/img/language.png'),
  },
  {
    id: '5',
    name: 'Arts',
    image: require('../../assets/img/art.png'),
  },
  {
    id: '6',
    name: 'Technology',
    image: require('../../assets/img/tech.png'),
  },
];
const bgColors = [
  '#EFF6FF',
  '#F0FDF4',
  '#FEF2F2',
  '#FAF5FF',
  '#FDF2F8',
  '#ECFEFF',
];

const tags = [
  'Biology',
  'Calculus',
  'World War II',
  'English',
  'Hindi',
  'Maths',
];

const SubjectCategory = () => {
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
      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>3/8 Steps Completed</Text>

        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.30}
          color="#9333EA"
        />
      </View>

      <Text style={styles.title}>Choose Subject Category</Text>
      <Text style={styles.subtitle}>Select a subject to create your quiz</Text>
      <View style={styles.searchBox}>
        <Image
          source={require('../../assets/img/searchicon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for subjects.."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.grid}>
        {subjectCategories.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              {backgroundColor: bgColors[index % bgColors.length]},
            ]}>
            <Image source={item.image} style={styles.img} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.popularTagTitle}>Popular Tags</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagContainer}
        style={styles.tagScrollContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          navigation.navigate('Quizoverview');
        }}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
    marginTop: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  img: {
    width: 48,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },

  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 25,
    marginTop: 2,
  },

  progressContainer: {
    marginTop: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1.3,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  popularTagTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 8,
  },

  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  tag: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    height: 36,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#1A1A1A',
  },
  continueButton: {
    backgroundColor: '#701DDB',
    borderRadius: 16,
    height: 56,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
