import {View, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/Rooms.styles';
import {Button, Text, TextInput} from '../../utils/Translate';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';
import {Slider} from '@rneui/themed';
import {useQuery} from '@apollo/client';
import RoomsApiService from '../../services/api/RoomsApiService';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import {useRoom} from '../../utils/store';

export default function ScheduleQuiz({navigation, route}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [value, setValue] = useState(10);
  const [searchCat, setSearchCat] = useState('');
  const [searchSubCat, setSearchSubCat] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [questionNum, setQuestionNum] = useState(0);
  const [selectedImage, setSelectedImage] = useState();

  const room_data = useRoom(state => state.currentRoom);

  console.log(room_data);

  const roomServ = new RoomsApiService();

  const {loading, error, data, refetch} = useQuery(roomServ.GETEXAMCATEGORIES, {
    variables: {
      search_cat: searchCat,
      search_sub_cat: searchSubCat,
      cat_id: selectedCategory,
    },
  });

  useEffect(() => {
    if (
      !data ||
      !data.get_category_fromfill ||
      !data.get_sub_category_fromfill
    ) {
      return;
    }

    let categoryData = data.get_category_fromfill;
    let subCategoryData = data.get_sub_category_fromfill;

    if (categoryData.error) {
       ToastAndroid.show(categoryData.error, ToastAndroid.SHORT);
      return;
    }

    let newCategoryArr = categoryData.response.map(item => {
      return {...item, image: {uri: BLOBURL + item.image}};
    });
    setCategories(newCategoryArr);

    if (subCategoryData.response) {
      setSelectedSubCat('');
      setSubCategories(subCategoryData.response);
    }
  }, [data]);

  function proceed() {
    if (
      !selectedCategory ||
      !selectedSubCat ||
      !categoryName ||
      !questionNum ||
      questionNum <= 0 ||
      !selectedImage
    ) {
       ToastAndroid.show('Please fill all the details correct', ToastAndroid.SHORT);
      return;
    }

    let obj = {
      room_id: room_data._id,
      room_name: room_data.room_name,
      category_id: selectedCategory,
      category_name: categoryName,
      sub_cat_id: selectedSubCat,
      total_ques: questionNum,
      time_per_que: value,
      category_image: selectedImage,
    };

    navigation.navigate('schedulquiztime', {obj: obj});
  }

  return (
    <>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>
      <View style={[styles.enterRoomMainContainer, {padding: 15}]}>
        <View style={styles.backandhistory}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backimg, {padding: 20, backgroundColor: '#8D4AE2'}]}>
            <Image
              style={[styles.backimg]}
              resizeMethod="contain"
              tintColor={'white'}
              source={require('../../assets/img/backq.png')}
            />
          </TouchableOpacity>
          <Image
            style={{height: 170, width: 200}}
            resizeMethod="contain"
            source={require('../../assets/img/axeimg.png')}
          />
        </View>

        <View style={styles.flexCenter}>
          <Text style={styles.createLiveText}>
            Schedule Quiz and Compete with your friends
          </Text>

          <View style={styles.centerBox}>
            <SelectCountry
              style={styles.dropdownExam}
              placeholderStyle={styles.ddexamplaceholderStyle}
              selectedTextStyle={styles.ddexamselectedTextStyle}
              inputSearchStyle={styles.ddexaminputSearchStyle}
              iconStyle={styles.iconStyle}
              itemContainerStyle={styles.ddExamItemContainerStyle}
              itemTextStyle={styles.ddItemTextStyle}
              data={categories}
              activeColor="#212121"
              onConfirmSelectItem={item => setSelectedSubCat(item)}
              search
              maxHeight={300}
              labelField="category_name"
              valueField="_id"
              imageField="image"
              placeholder="Select Category"
              searchPlaceholder="Search..."
              imageStyle={{borderRadius: 50, width: 20, height: 20}}
              value={selectedCategory}
              onChangeText={setSearchCat}
              onChange={item => {
                setSelectedCategory(item._id);
                setCategoryName(item.category_name);
                setSelectedImage(item.image.uri.replace(BLOBURL, ''));
              }}
            />
            <Dropdown
              style={styles.dropdownExam}
              placeholderStyle={[styles.ddexamplaceholderStyle]}
              selectedTextStyle={styles.ddexamselectedTextStyle}
              inputSearchStyle={styles.ddexaminputSearchStyle}
              iconStyle={styles.iconStyle}
              itemContainerStyle={styles.ddExamItemContainerStyle}
              itemTextStyle={styles.ddItemTextStyle}
              data={subCategories}
              activeColor="#212121"
              onConfirmSelectItem={item => setSelectedExam(item)}
              search
              maxHeight={300}
              labelField="sub_category_name"
              valueField="_id"
              placeholder="Select Sub-Category"
              searchPlaceholder="Search..."
              value={selectedSubCat}
              onChangeText={setSearchSubCat}
              onChange={item => {
                setSelectedSubCat(item._id);
              }}
            />

            <TextInput
              style={styles.ddinput}
              placeholder="Enter Total Number Of Questions"
              placeholderTextColor="#A1A2AD"
              value={questionNum}
              onChangeText={setQuestionNum}
              inputMode="numeric"
            />

            <View style={styles.TimeConatiner}>
              <Text style={{color: '#A1A2AD'}}>Time for Each Question</Text>
              <Text style={{color: '#367CFF'}} key={value + 'val'}>
                {value} Sec
              </Text>
            </View>
            <View>
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={60}
                minimumValue={10}
                step={1}
                minimumTrackTintColor="#367CFF"
                allowTouchTrack
                trackStyle={{height: 5, backgroundColor: 'blue'}}
                thumbStyle={{height: 20, width: 20, backgroundColor: 'white'}}
              />
            </View>
          </View>

          <Button
            containerStyle={{width: '100%'}}
            buttonStyle={styles.proceedbtn}
            titleStyle={{color: '#000'}}
            title={'Proceed'}
            onPress={() => {
              proceed();
            }}
          />
        </View>
      </View>
    </>
  );
}
