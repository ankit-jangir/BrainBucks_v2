import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Modal,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {Text} from '../../utils/Translate';
import {StyleConstants} from '../../constants/Style.constant';
import styles from '../../styles/Saved.styles';
import SavedApiService from '../../services/api/SavedApiService';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import StudyApiService from '../../services/api/StudyApiService';
import NoDataFound from '../../components/NoDataFound';
import { ColorsConstant } from '../../constants/Colors.constant';
import { useCurrentId } from '../../context/IdReducer';

export default function Saved({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setloading] = useState();
  const [SavedExam, setExamData] = useState([]);
  const [otherExams, setOtherExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState(new Set([]))

  const saved = new SavedApiService();
  const study = new StudyApiService();
  useEffect(() => {
    getSavedExams();
    loadOtherExams()
  }, []);

  const {idState,dispatch}=useCurrentId()
  async function getSavedExams() {
    setloading(true);
    try {
      let res = await saved.getSavedExams();
      if (res.status === 1) {
        setExamData(res.send_data);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setloading(false);
    }
  }

  async function loadOtherExams() {
    setloading(true);
    try {
      let res = await study.getOtherExams();
      if (res.status === 1) {
        setOtherExams(res.exams);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching not enrolled exams ', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
      });
    } finally {
      setloading(false);
    }
  }

  function selectExam(id) {
    setSelectedExams((prev) => {
      let temp = new Set(prev)
      temp.has(id) ? temp.delete(id) : temp.add(id)
      return temp;
    })
  }

  async function addExams() {
    if (selectedExams.size === 0) {
      Toast.show({
        type: "error",
        text1: "Select atleast one exam to add"
      })
      return;
    }

    try {
      let arr = Array.from(selectedExams)
      let response = await study.enrollInExam(arr)
      if(response.status===1){
        let nextOtherArr = otherExams.filter(item=>!selectedExams.has(item._id))
        setOtherExams(nextOtherArr)
        setSelectedExams(new Set([]))
        getSavedExams()
      }else{
        Toast.show({
          type: "info",
          text1: response.Backend_Error
        })
      }
    } catch (error) {
      console.log("Error in adding exams: ", error.message);
      Toast.show({
        type: "info",
        text1: "Something Went Wrong"
      })
    }

  }
  return (
    <>
      <Toast/>
      <View style={{flex: 1,backgroundColor:"white"}}>
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
              style={styles.modalTocuh}></TouchableOpacity>
            <View style={styles.modalview1}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.DownTouch}>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <View style={styles.viewExam}>
                <View style={styles.examview}>
                  <View style={{flex: 4}}></View>
                  <View style={styles.addview}>
                    <Text style={styles.textAdd}>Add Exam</Text>
                    <TouchableOpacity style={styles.EList1} onPress={addExams}>
                      <Text style={styles.textSave}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.loadview}>
                <View style={styles.loadview1}>
                  <TouchableOpacity style={{flex: 0.1}}>
                    <Image
                      source={require('../../assets/img/search.png')}
                      resizeMode="contain"
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                  <TextInput
                    // onChangeText={value => {
                    //   setSearch(value);
                    //   updateResult(value);
                    // }}
                    value={search}
                    style={styles.SerchIn}
                    placeholder="Search for Exams"
                    placeholderTextColor={'#7E7E7E'}></TextInput>
                </View>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{width: '100%'}}>
                {loading ? (
                  <ActivityIndicator color={ColorsConstant.Theme} size={35} />
                ) : otherExams.length === 0 ? (
                  <NoDataFound
                    message={'No Data Found'}
                    action={loadOtherExams}
                    actionText={'Reload'}
                  />
                ) : (
                 otherExams.map((item)=>{
                  return(
                    <View style={styles.EListss}>
                    <View style={styles.EListss1}>
                      <View style={styles.ItmView}>
                        <Image
                        source={{uri: BLOBURL + item.image }}

                          resizeMode="contain"
                          style={{width: 50, height: 50, borderRadius: 10}}
                        />
                      </View>
                      <View style={styles.ItmView1}>
                        <Text style={styles.ItmText}>{item.category_name}</Text>
                      </View>
                      
                      <View style={styles.viewSS}>
                              <TouchableOpacity
                                onPress={() => { selectExam(item._id) }}
                                style={{
                                  width: 45,
                                  height: 45,
                                  backgroundColor: selectedExams.has(item._id) ? ColorsConstant.Theme : "#EFEFEF",
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 50,
                                }}>
                                {
                                  selectedExams.has(item._id)
                                    ?
                                    <Text key={"selected"} style={{ color: '#fff', fontSize: 15 }}>✓</Text>
                                    :
                                    <Text key={"nonselected"} style={{ color: '#000', fontSize: 15 }}>+</Text>
                                }
                              </TouchableOpacity>
                            </View>
                    </View>
                  </View>
                  )
                 })
                  
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={StyleConstants.safeArView}>
          <View style={styles.Hview}>
            <View style={styles.Hview1}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 4,
                  borderWidth: 1,
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                  borderColor: '#F5F5F5',
                }}>
                <Image
                  source={require('../../assets/img/drawerr.png')}
                  style={{height: 25, width: 25}}></Image>
              </TouchableOpacity>
              <View style={styles.examView}>
                <Text style={styles.textMy}>My Exams</Text>
              </View>
              <View style={styles.viewAdd}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.touchAdd}>
                  <Text style={styles.textAdd1}>+Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView >
          
            {
              loading ?
            <ActivityIndicator color={ColorsConstant.Theme} size={35} />:
            SavedExam.length===0?
            <NoDataFound message={"No Data Found"} action={getSavedExams} actionText={"Reload"} />:
              
              SavedExam.map(res => {
              return (
                <View key={res.exam_id} style={{flex: 1,padding:15}}>
                  <View style={styles.liveVIew}>
                    <View style={styles.liveVIew1}>
                      <View style={styles.liveVIew2}>
                        <View style={styles.cateView}>
                          <Image
                            source={{uri: BLOBURL + res.image}}
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: 100,
                              resizeMode: 'contain',
                            }}></Image>
                        </View>
                        <View style={styles.cateName}>
                          <Text style={styles.cateName1}>{res.exam_name}</Text>
                        </View>
                      </View>
                      <View style={styles.ActiveView}>
                        <View style={styles.ActiveView1}>
                          <View style={{flex: 0.7}}>
                            <View style={styles.ActiveView2}>
                              <Text style={styles.textAct}>Active Quizzes</Text>
                              <Text
                                style={[styles.textAct, {color: '#367CFF'}]}>
                                {res.active_quizes}
                              </Text>
                            </View>
                          </View>
                          <View style={{flex: 0.8}}>
                            <View style={styles.Cview}>
                              <Text style={styles.textC}>Trivia Quizes</Text>
                              <Text
                                style={[
                                  styles.textC,
                                  {fontFamily: 'WorkSans-SemiBold'},
                                ]}>
                                {res.triviaQuizes}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={[styles.textP]}>
                        <View
                          style={[
                            styles.Cview,
                            {justifyContent: 'center', alignItems: 'center'},
                          ]}>
                          <Text style={styles.textC}>Enrolled quizes</Text>
                          <Text
                            style={[
                              styles.textC,
                              {fontFamily: 'WorkSans-SemiBold'},
                            ]}>
                            {res.enrolled_quizes}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {dispatch({type:'change',idState:{id:res.exam_id}}), navigation.navigate('ExamDetail')}}
                        style={styles.viewBtn}>
                        <Text style={styles.textDetails}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
