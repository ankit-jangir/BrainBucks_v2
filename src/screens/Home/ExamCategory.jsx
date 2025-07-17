import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';

import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import {Icon, ProgressBar} from 'react-native-paper';

const categories = [
  {
    id: '1',
    name: 'Civil Services',
    icon: require('../../assets/img/person.png'),
    bgColor: '#F9FAFB',
  },
  {
    id: '2',
    name: 'Engineering Services',
    icon: require('../../assets/img/person.png'),
    bgColor: '#F9FAFB',
  },
  {
    id: '3',
    name: 'Combined Medical Services',
    icon: require('../../assets/img/person.png'),
    bgColor: '#F9FAFB',
  },
  {
    id: '4',
    name: 'Indian Forest Service',
    icon: require('../../assets/img/person.png'),
    bgColor: '#F9FAFB',
  },
];

const ExamCategory = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderItem = ({item}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          {
            backgroundColor: item.bgColor,
          },
        ]}
        onPress={() => setSelectedCategory(item.id)}>
        <View style={styles.categoryLeft}>
          <Image source={item.icon} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      {/* Step progress bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>2/8 Steps Completed</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.20}
          color="#9333EA"
        />
      </View>

      {/* Headings */}
      <Text style={styles.examCategoryText}>Exam Category : UPSC</Text>
      <Text style={styles.selectCategory}>Select Sub Category</Text>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <Image
          source={require('../../assets/img/searchicon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for Sub Category"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => {
          navigation.navigate('SubjectCategory');
        }}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExamCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  progressContainer: {
    marginTop: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'right',
  },

  examCategoryText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
  },
  selectCategory: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B5563',
    marginTop: 4,
    marginVertical: 30,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF', // Optional: makes the icon black
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },

  list: {
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 74,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9e9eaff',
    borderRadius: 16,
    backgroundColor: '#00000000',
  },

  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 28,
    height: 32,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  radioSelected: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  proceedButton: {
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
    fontSize: 16,
    fontWeight: '700',
  },
});
