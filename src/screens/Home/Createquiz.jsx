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
import React, {useEffect, useState} from 'react';
import MainHeader from '../../components/MainHeader';
import LinearGradient from 'react-native-linear-gradient';
import RoomsApiService from '../../services/api/RoomsApiService';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import {useRoom} from '../../utils/store';
import {useNavigation} from '@react-navigation/native';
import {Icon, ProgressBar} from 'react-native-paper';
import {useQuery} from '@apollo/client';

const Createquiz = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const [searchSubCat, setSearchSubCat] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [questionNum, setQuestionNum] = useState(0);
  const [selectedImage, setSelectedImage] = useState();

  const roomServ = new RoomsApiService();

  const {loading, error, data, refetch} = useQuery(roomServ.GETEXAMCATEGORIES, {
    variables: {
      search_cat: searchCat,
      search_sub_cat: searchSubCat,
      cat_id: selectedCategory,
    },
  });

  useEffect(() => {
    if (!data || !data.get_category_fromfill || !data.get_sub_category_fromfill) return;

    let categoryData = data.get_category_fromfill;
    let subCategoryData = data.get_sub_category_fromfill;

    if (categoryData.error) {
      ToastAndroid.show(categoryData.error, ToastAndroid.SHORT);
      return;
    }

    let newCategoryArr = categoryData.response.map(item => {
      return {
        ...item,
        image: {uri: BLOBURL + item.image},
      };
    });

    setCategories(newCategoryArr);

    if (subCategoryData.response) {
      setSelectedSubCat('');
      setSubCategories(subCategoryData.response);
    }
  }, [data]);

  const filteredCategories = categories.filter(item =>
    item.category_name.toLowerCase().includes(searchCat.toLowerCase())
  );

  const renderItem = ({item}) => {
    const isSelected = selectedCategory.toString() === item._id.toString();

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => {
          setSelectedCategory(item._id.toString());
          setCategoryName(item.category_name);
          setSelectedImage(item.image.uri);
        }}>
        <View style={styles.categoryLeft}>
          <Image source={{uri: item.image.uri}} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>
            {item.category_name}
          </Text>
        </View>
        <View style={[
          styles.radio, 
          isSelected && styles.radioSelected
        ]} />
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
   <>
     <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />
     <View style={styles.container}>
    

      {/* Step progress bar */}
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
          value={searchCat}
          onChangeText={text => setSearchCat(text)}
        />
      </View>

      {/* Category List */}
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => `category_${item.id}_${index}`}
        contentContainerStyle={styles.list}
        extraData={selectedCategory}
      />

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => {
          if (!selectedCategory) {
            Toast.show({
              type: 'error',
              text1: 'Please select a category',
            });
            return;
          }

          navigation.navigate('ExamCategory', {
            categoryId: selectedCategory,
            categoryName: categoryName,
            imageUri: selectedImage,
          });
        }}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
   </>
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
    height: 70,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#ffffff',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: 'cover'
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
    backgroundColor: 'transparent',
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
