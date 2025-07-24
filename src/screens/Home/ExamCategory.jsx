// ✅ ExamCategory.js
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
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import RoomsApiService from '../../services/api/RoomsApiService';
import {useQuery} from '@apollo/client';
import { useRoom } from '../../utils/store';

const ExamCategory = ({route}) => {
  const navigation = useNavigation();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [searchSubCat, setSearchSubCat] = useState('');
  const room_data = useRoom(state => state.currentRoom);

  const selectedCategoryId = route?.params?.categoryId || '';
  const categoryName = route?.params?.categoryName || 'Category';
  const imageUri = route?.params?.imageUri || '';

  const roomServ = new RoomsApiService();

  const {loading, error, data, refetch} = useQuery(roomServ.GETEXAMCATEGORIES, {
    variables: {
      search_cat: '',
      search_sub_cat: searchSubCat,
      cat_id: selectedCategoryId,
    },
    fetchPolicy: 'cache-and-network',
    skip: !selectedCategoryId,
  });

  useEffect(() => {
    if (data?.get_sub_category_fromfill?.response) {
      setSubCategories(data.get_sub_category_fromfill.response);
    } else if (data?.get_sub_category_fromfill?.error) {
      ToastAndroid.show(
        data.get_sub_category_fromfill.error,
        ToastAndroid.SHORT,
      );
    }
  }, [data]);

  const handleSubCategorySelect = subCategoryId => {
    setSelectedSubCat(subCategoryId); // Single selection - removed toggle logic
  };

  const handleSearch = text => {
    setSearchSubCat(text);
    const timeoutId = setTimeout(() => {
      if (selectedCategoryId) {
        refetch({
          search_cat: '',
          search_sub_cat: text,
          cat_id: selectedCategoryId,
        });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const filteredSubCategories = subCategories.filter(item =>
    item.sub_category_name.toLowerCase().includes(searchSubCat.toLowerCase()),
  );

  const renderSubCategoryItem = ({item}) => {
    const isSelected = selectedSubCat === item._id;

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleSubCategorySelect(item._id)}
        activeOpacity={0.7}>
        <View style={styles.categoryLeft}>
          <Text
            style={styles.categoryText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.sub_category_name}
          </Text>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  const canProceed = !!selectedSubCat;
  const selectedSubCategoryData = filteredSubCategories.find(
    item => item._id === selectedSubCat, // Fixed: using _id for comparison
  );

  return (
    <>
      <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>2/8 Steps Completed</Text>
          <ProgressBar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={0.25}
            color="#9333EA"
          />
        </View>

        <Text style={styles.examCategoryText}>
          Exam Category : {categoryName}
        </Text>
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
            value={searchSubCat}
            onChangeText={handleSearch}
          />
        </View>

        {/* Removed loading and error states as requested */}

        {!loading && filteredSubCategories.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              {searchSubCat
                ? 'No subcategories found for your search'
                : 'No subcategories available'}
            </Text>
            {searchSubCat && (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={() => {
                  setSearchSubCat('');
                  refetch({
                    search_cat: '',
                    search_sub_cat: '',
                    cat_id: selectedCategoryId,
                  });
                }}>
                <Text style={styles.clearSearchText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <FlatList
          data={filteredSubCategories}
          renderItem={renderSubCategoryItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          extraData={selectedSubCat}
        />

        <TouchableOpacity
          style={[
            styles.proceedButton,
            !canProceed && styles.proceedButtonDisabled,
          ]}
          disabled={!canProceed}
          onPress={() => {
            if (selectedSubCategoryData) {
              navigation.navigate('Schedulequiz', {
                room_id: room_data._id,
                room_name: room_data.room_name,
                category_id: selectedCategoryId,
                category_name: categoryName,
                sub_cat_id: selectedSubCat,
                subCategoryName: selectedSubCategoryData.sub_category_name,
                category_image: imageUri,
              });
            }
          }}>
          <Text
            style={[
              styles.proceedText,
              !canProceed && styles.proceedTextDisabled,
            ]}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    // marginTop: 10,
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'right',
  },
  examCategoryText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
  },
  selectCategory: {
    fontSize: 16,
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
    paddingVertical: 3,
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  noDataContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearSearchButton: {
    backgroundColor: '#9333EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#e9e9eaff',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  selectedInfo: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    marginBottom: 30,
    paddingVertical: 16,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    // marginTop:10
  },
  proceedButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  proceedTextDisabled: {
    color: '#9CA3AF',
  },
});
