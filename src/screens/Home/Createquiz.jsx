import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';

const categories = [
  {
    id: '1',
    name: 'UPSC',
    icon: require('../../assets/img/upsc.png'),
    bgColor: '#FFFFFF',
  },
  {
    id: '2',
    name: 'Coding',
    icon: require('../../assets/img/coding.png'),
    bgColor: '#FFFFFF',
  },
  {
    id: '3',
    name: 'TIPS-G ICC Hub',
    icon: require('../../assets/img/upsc.png'),
    bgColor: '#FFFFFF',
  },
  {
    id: '4',
    name: 'Front End Coding',
    icon: require('../../assets/img/upsc.png'),
    bgColor: '#FFFFFF',
  },
];

const Createquiz = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderItem = ({item}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[styles.categoryItem, {backgroundColor: item.bgColor}]}
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
      ToastAndroid.showWithGravity(
        'Please select a category',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    navigation.navigate('ExamCategory');
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

      {/* Progress */}
      <View style={styles.progressContainer}>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.1}
          color="#9333EA"
        />
        <Text style={styles.stepText}>1/8 Steps Completed</Text>
      </View>

      <Text style={styles.selectCategory}>Select Category</Text>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Image
          source={require('../../assets/img/searchicon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for Category"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Createquiz;

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
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  selectCategory: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginVertical: 20,
    color: '#1A1A1A',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 25,
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
    color: '#000',
    fontFamily: 'Inter-Regular',
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
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#FFFFFF',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    color: '#1F2937',
    fontFamily: 'Inter-Regular',
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
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});
