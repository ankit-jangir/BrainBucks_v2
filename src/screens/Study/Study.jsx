import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
  StatusBar,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import styles from '../../styles/Study.styles';
import StudyApiService from '../../services/api/StudyApiService';
import Toast from 'react-native-toast-message';
import {ColorsConstant} from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import {BLOBURL} from '../../config/urls';
import {useCurrentId} from '../../context/IdReducer';
import {useIsFocused} from '@react-navigation/native';
import MainHeader from '../../components/MainHeader';
export default function Study({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [otherExams, setOtherExams] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [enrolledExams, setEnrolledExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState(new Set([]));
  const {idState, dispatch} = useCurrentId();
  const focused = useIsFocused();
  const study = new StudyApiService();

  async function addExams() {
    if (selectedExams.size === 0) {
      ToastAndroid.show('Select atleast one exam to add', ToastAndroid.SHORT);
      return;
    }

    try {
      let arr = Array.from(selectedExams);
      let response = await study.enrollInExam(arr);
      if (response.status === 1) {
        let nextOtherArr = otherExams.filter(
          item => !selectedExams.has(item._id),
          setModalVisible(false),
        );
        setOtherExams(nextOtherArr);
        loadEnrolledExams();

        setSelectedExams(new Set([]));
      } else {
        ToastAndroid.show(response.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error in adding exams: ', error.message);
    }
  }

  async function loadEnrolledExams() {
    setLoading(true);
    try {
      let res = await study.getEnrolledExams();
      if (res.status === 1) {
        setEnrolledExams(res.data);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in fetching enrolled exams in study: ', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadOtherExams() {
    setLoading1(true);
    try {
      let res = await study.getOtherExams();
      if (res.status === 1) {
        setOtherExams(res.exams);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error in fetching not enrolled exams ', err.message);
    } finally {
      setLoading1(false);
    }
  }

  function selectExam(id) {
    setSelectedExams(prev => {
      let temp = new Set(prev);
      temp.has(id) ? temp.delete(id) : temp.add(id);
      return temp;
    });
  }

  useEffect(() => {
    loadEnrolledExams();
    loadOtherExams();
  }, [focused]);

  return (
    <>
      <View style={{zIndex: 1}}>
        <Toast />
      </View>
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.TouchModal}>
              <Toast />
            </TouchableOpacity>
            <View style={styles.mainView}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.TouchImg}>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>

              <View style={styles.listView}>
                <View style={styles.listView1}>
                  <View style={{flex: 4}}></View>
                  <View style={styles.ExamView}>
                    <Text style={styles.AddText}>Add Exam</Text>
                    <TouchableOpacity
                      style={styles.touchExam}
                      onPress={addExams}>
                      <Text style={styles.TextSave}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.inputView}>
                <View style={styles.inputView1}>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    style={styles.inputText}
                    placeholder="Search for Exams"
                    placeholderTextColor={'#7E7E7E'}></TextInput>
                  <TouchableOpacity style={styles.touchSearch}>
                    <Image
                      source={require('../../assets/img/search.png')}
                      resizeMode="contain"
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{width: '100%'}}>
                {loading1 ? (
                  <ActivityIndicator color={ColorsConstant.Theme} size={35} />
                ) : otherExams.length === 0 ? (
                  <NoDataFound
                    message={'No Data Found'}
                    action={loadOtherExams}
                    actionText={'Reload'}
                  />
                ) : (
                  otherExams.map(item => {
                    if (
                      item.category_name
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                      return (
                        <View key={item._id} style={styles.plusView}>
                          <View style={styles.plusView1}>
                            <View style={styles.cateView}>
                              <Image
                                source={{uri: BLOBURL + item.image}}
                                style={{
                                  width: 40,
                                  height: 40,
                                  backgroundColor: 'red',
                                  borderRadius: 100,
                                }}
                              />
                            </View>
                            <View style={styles.NameView}>
                              <Text style={styles.Textname}>
                                {item.category_name}
                              </Text>
                            </View>
                            <View style={styles.RightVe}>
                              <TouchableOpacity
                                onPress={() => {
                                  selectExam(item._id);
                                }}
                                style={{
                                  width: 45,
                                  height: 45,
                                  backgroundColor: selectedExams.has(item._id)
                                    ? ColorsConstant.Theme
                                    : '#EFEFEF',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 50,
                                }}>
                                {selectedExams.has(item._id) ? (
                                  <Text
                                    key={'selected'}
                                    style={{color: '#fff', fontSize: 15}}>
                                    ✓
                                  </Text>
                                ) : (
                                  <Text
                                    key={'nonselected'}
                                    style={{color: '#000', fontSize: 15}}>
                                    +
                                  </Text>
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                  })
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.stdView}>
          <MainHeader
            name={'Study Materials'}
            leftIcon={{
              type: 'image',
              source: require('../../assets/img/backq.png'), // provide the image source
              onPress: () => {
                navigation.goBack();
              },
            }}
          />

          <View style={styles.examMainView}>
            <View style={styles.examsView}>
              <Text style={styles.TextExam}>My Exam</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.TouchAdd}>
                <Text style={styles.TextAdd}>+Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            {loading ? (
              <ActivityIndicator color={ColorsConstant.Theme} size={35} />
            ) : enrolledExams.length === 0 ? (
              <NoDataFound
                message={'No Exam Found'}
                action={loadEnrolledExams}
                actionText={'Load Again'}
              />
            ) : (
              enrolledExams.map(item => (
                <View key={item._id} style={styles.viewStudy}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({type: 'change', idState: {id: item._id}}),
                        navigation.navigate('addExamss');
                    }}
                    style={styles.TouchData}>
                    <View style={styles.DataView}>
                      <View style={styles.cateView}>
                        <Image
                          source={{uri: BLOBURL + item.image}}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}></Image>
                      </View>
                      <View style={styles.NameView}>
                        <Text style={styles.Textname}>
                          {item.category_name}
                        </Text>
                      </View>
                      <View style={styles.RightVe}>
                        <View style={styles.RightVe1}>
                          <Image
                            source={require('../../assets/img/right-arrow.png')}
                            tintColor={'rgba(0, 0, 0, 1)'}
                            style={{
                              height: 13,
                              width: 13,
                              borderRadius: 100,
                            }}></Image>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
