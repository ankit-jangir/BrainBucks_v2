import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import styles from '../../styles/Study.styles';
export default function Study({navigation}) {
  const [material, setMaterial] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [exam, setExam] = useState([]);
  const [submitArray, setSubmitArray] = useState();
  const [dataArray1, setdataArray1] = useState([]);
  const [select, setselect] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

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
              style={styles.TouchModal}></TouchableOpacity>
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
                      onPress={() => {
                        navigation.navigate('StudyExam');
                      }}>
                      <Text style={styles.TextSave}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.inputView}>
                <View style={styles.inputView1}>
                  <TextInput
                    value={search}
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
                <View style={styles.plusView}>
                  <View style={styles.plusView1}>
                    <View style={styles.cateView}>
                      <Image
                        source={require('../../assets/img/banner.png')}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'red',
                          borderRadius: 100,
                        }}
                      />
                    </View>
                    <View style={styles.NameView}>
                      <Text style={styles.Textname}>sonu</Text>
                    </View>
                    <View style={styles.RightVe}>
                      <TouchableOpacity
                        style={{
                          width: 45,
                          height: 45,
                          backgroundColor: select == 1 ? '#2E91EC' : '#EFEFEF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                        }}>
                        <Text style={{color: '#000', fontSize: 24}}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.stdView}>
          <View style={styles.stdView1}>
            <View style={styles.stdView2}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 4,
                  borderWidth: 1,
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                  borderColor: '#F5F5F5',
                }}>
                <View
                  style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Image
                    source={require('../../assets/img/drawerr.png')}
                    style={{height: 25, width: 25}}></Image>
                </View>
              </TouchableOpacity>

              <View style={styles.stdView3}>
                <Text style={styles.textStudy}>Study Materials</Text>
              </View>
            </View>
          </View>

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
            <View style={styles.viewStudy}>
              <TouchableOpacity
                onPress={() => navigation.navigate('StudyMaterials')}
                style={styles.TouchData}>
                <View style={styles.DataView}>
                  <View style={styles.cateView}>
                    <Image
                      source={require('../../assets/img/banner.png')}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 100,
                      }}></Image>
                  </View>
                  <View style={styles.NameView}>
                    <Text style={styles.Textname}>kaju</Text>
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
          </ScrollView>
        </View>
      </View>
    </>
  );
}
