import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ToastAndroid,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

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

  const handleProceed = () => {
    if (!selectedCategory) {
      ToastAndroid.show('Please select a category', ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('SubjectCategory');
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

      <View style={styles.fixedContent}>
        <Text style={styles.stepText}>2/8 Steps Completed</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.2}
          color="#9333EA"
        />
        <Text style={styles.examCategoryText}>Exam Category : UPSC</Text>
        <Text style={styles.selectCategory}>Select Sub Category</Text>
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
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* White background container for button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExamCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04,
  },
  fixedContent: {
    paddingTop: height * 0.015,
    paddingBottom: height * 0.02,
    backgroundColor: '#fff',
  },
  stepText: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'right',
  },
  examCategoryText: {
    fontSize: 22,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
  },
  selectCategory: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#4B5563',
    marginTop: 4,
    marginVertical: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#000',
  },
  list: {
    paddingBottom: height * 0.15,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 74,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9e9ea',
    backgroundColor: '#fff',
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
    fontSize: 14,
    fontFamily: 'Inter',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#fff',
    paddingBottom: 55,
    paddingTop: 10,
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    paddingVertical: 19,
    borderRadius: 12,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
});
