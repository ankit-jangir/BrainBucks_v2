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

export default function Saved({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [loading,setloading]= useState()

  async function ExamEndrolledStudy() {
    setloading(true)
  try {
    
  } catch (error) {
    
  }
  }

  return (
    <>
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
                    <TouchableOpacity style={styles.EList1}>
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
                    onChangeText={value => {
                      setSearch(value);
                      updateResult(value);
                    }}
                    value={search}
                    style={styles.SerchIn}
                    placeholder="Search for Exams"
                    placeholderTextColor={'#7E7E7E'}></TextInput>
                </View>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{width: '100%'}}>
                <View style={styles.EListss}>
                  <View style={styles.EListss1}>
                    <View style={styles.ItmView}>
                      <Image
                        source={require('../../assets/img/banner.png')}
                        resizeMode="contain"
                        style={{width: 50, height: 50,borderRadius:10}}
                      />
                    </View>
                    <View style={styles.ItmView1}>
                      <Text style={styles.ItmText}>category_name</Text>
                    </View>
                    <View style={styles.viewSS}>
                      <TouchableOpacity
                        style={{
                          width: 45,
                          height: 45,
                          backgroundColor: '#EFEFEF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                        }}>
                        <Text style={{color:'#000'}}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={styles.liveVIew}>
                <View style={styles.liveVIew1}>
                  <View style={styles.liveVIew2}>
                    <View style={styles.cateView}>
                      <Image
                        source={require('../../assets/img/banner.png')}
                        style={{height: 50, width: 50,borderRadius:100}}></Image>
                    </View>
                    <View style={styles.cateName}>
                      <Text style={styles.cateName1}>uuu</Text>
                    </View>
                  </View>
                  <View style={styles.ActiveView}>
                    <View style={styles.ActiveView1}>
                      <View style={{flex: 0.7}}>
                        <View style={styles.ActiveView2}>
                          <Text style={styles.textAct}>Active Quizzes </Text>
                          <Text style={[styles.textAct, {color: '#367CFF'}]}>
                            88
                          </Text>
                        </View>
                      </View>
                      <View style={{flex: 0.8}}>
                        <View style={styles.Cview}>
                          <Text style={styles.textC}>Challenges </Text>
                          <Text
                            style={[
                              styles.textC,
                              {fontFamily: 'WorkSans-SemiBold'},
                            ]}>
                            Active
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.textP}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.textPro}>
                        Probability of Success{' '}
                      </Text>
                      <Text style={styles.textPer}>00%</Text>
                    </View>
                    <View style={styles.LiniView}>
                      {/* <LinearGradient
                        start={{x: 0.0, y: 0.25}}
                        end={{x: 0.5, y: 1.0}}
                        colors={['#F5B807', '#F5B807']}
                        style={styles.Grade}></LinearGradient> */}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ExamDetail')}
                    style={styles.viewBtn}>
                    <Text style={styles.textDetails}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
