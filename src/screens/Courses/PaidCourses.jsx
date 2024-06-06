import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Accordion from '../../components/Accordion';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import CourseApiService from '../../services/api/CourseApiService';
import {BLOBURL} from '../../config/urls';
import {Modal} from 'react-native-paper';
import {Button, Image} from 'react-native-elements';

const PaidCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState({});
  const [material, setMaterial] = useState({});
  const [loading2, setLoading2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState();
  const [buycourses, setbuyCourses] = useState([]);
  const serv = new CourseApiService();

  useEffect(() => {
    getPaidCourses();
  }, []);

  async function buyCourse() {
    try {
      setLoading2(true);
      let res = await serv.buyCourse(current._id);
      if (res.status === 1) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          text1: 'course bought successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching videos for paid courses: ', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading2(false);
    }
  }

  async function getPaidCourses() {
    try {
      setLoading(true);
      setLoading2(true);
      let res = await serv.getPaidCourses();
      if (res.status === 1) {
        setCourses(res.data);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching paid courses: ', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading(false);
      setLoading2(false);
    }
  }

  async function getVideoForParticularCourse(course_id) {
    try {
      setLoading2(true);
      let res = await serv.getVideos(course_id);
      if (res.status === 1) {
        setVideos(old => {
          return {...old, [course_id]: res.videos};
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching videos for paid courses: ', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading2(false);
    }
  }

  async function getMaterialForParticularVideo(course_id, video_id) {
    try {
      setLoading2(true);
      let res = await serv.getStudyMaterial(course_id, video_id);
      if (res.status === 1) {
        setMaterial(old => {
          return {...old, [video_id]: res.study_materials};
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log(
        'Error in fetching study material for a paid course: ',
        err.message,
      );
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading2(false);
    }
  }

  return (
    <>
    <ScrollView>
      <View style={{zIndex: 100}}>
        <Toast />
      </View>
      {loading ? (
        <ActivityIndicator size={40} />
      ) : courses.length === 0 ? (
        <NoDataFound
          action={getPaidCourses}
          actionText={'Load again'}
          message={'No Courses Found'}
        />
      ) : (
        courses.map(item => (
          <Accordion
            onExpand={() => {
              getVideoForParticularCourse(item._id);
            }}
            buttonStyle={{
              backgroundColor: '#eee3fc',
              color: '#701DDB',
            }}
            key={item._id}
            containerStyle={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              elevation: 4,
            }}
            buttonText={'Buy Now'}
            itemText={item.cou_name}
            icon={{uri: BLOBURL + item.banner}}
            onButtonPress={() => {
              setCurrent(item), setModalVisible(true);
            }}>
            {!videos[item._id] ? (
              loading2 ? (
                <ActivityIndicator size={40} />
              ) : (
                <View style={{height: 200}}>
                  <NoDataFound
                    scale={0.5}
                    message={'No Videos Found for this course'}
                    action={() => {
                      getVideoForParticularCourse(item._id);
                    }}
                    actionText={'Refresh'}
                  />
                </View>
              )
            ) : videos[item._id].length === 0 ? (
              <View style={{height: 200}}>
                <NoDataFound
                  scale={0.5}
                  message={'No Videos Found for this course'}
                  action={() => {
                    getVideoForParticularCourse(item._id);
                  }}
                  actionText={'Refresh'}
                />
              </View>
            ) : (
              videos[item._id].map((video, index) => (
                <Accordion
                  key={video._id}
                  containerStyle={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginHorizontal: 10,
                    marginBottom: 4,
                    elevation: 4,
                    borderRadius: 5,
                    marginTop: index === 0 ? 5 : 0,
                  }}
                  buttonStyle={{
                    backgroundColor: '#eee3fc',
                    color: '#701DDB',
                  }}
                  buttonText={'Play Now'}
                  itemText={video.title}
                  icon={require('../../assets/img/play-button.png')}
                  onButtonPress={() => {
                    Toast.show({
                      type: 'info',
                      text1: 'Buy the course to watch the video',
                    });
                  }}
                  onExpand={() => {
                    getMaterialForParticularVideo(item._id, video._id);
                  }}>
                  {!material[video._id] ? (
                    loading2 ? (
                      <ActivityIndicator size={40} />
                    ) : (
                      <View style={{height: 200}}>
                        <NoDataFound
                          scale={0.5}
                          message={'No Study Material Found for this Video'}
                          action={() => {
                            getMaterialForParticularVideo(item._id, video._id);
                          }}
                          actionText={'Refresh'}
                        />
                      </View>
                    )
                  ) : material[video._id].length === 0 ? (
                    <View style={{height: 200}}>
                      <NoDataFound
                        scale={0.5}
                        message={'No Study Material For This Video'}
                        action={() => {
                          getMaterialForParticularVideo(item._id, video._id);
                        }}
                        actionText={'Refresh'}
                      />
                    </View>
                  ) : (
                    <FlatList
                      data={material[video._id]}
                      keyExtractor={item=>item._id}
                      renderItem={({item, index}) => {
                        return (
                          <Pressable>
                            <View
                              style={{
                                backgroundColor: '#fff',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                marginHorizontal: 10,
                                marginBottom: 4,
                                elevation: 4,
                                marginLeft:18,
                                borderRadius: 5,
                                marginTop: index === 0 ? 5 : 0,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flex: 1,
                                  alignItems: 'center',
                                }}>
                                <Image
                              source={require('../../assets/img/pdf.png')}
                              style={{height: 20, width: 20,marginRight:4}}
                              resizeMode="contain"
                            />
                                <Text style={{color: '#000', flex: 1}}>
                                  {item.title}
                                </Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Toast.show({
                                        type: 'info',
                                        text1:
                                          'Buy the course to see the material',
                                      });
                                    }}>
                                    <Text
                                      style={{
                                        padding: 5,
                                        borderRadius: 5,
                                        backgroundColor: '#eee3fc',
                                        color: '#701DDB',
                                        fontSize: 12,
                                        fontWeight: 400,
                                      }}>
                                      View Pdf
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </Pressable>
                        );
                      }}></FlatList>
                  )}
                </Accordion>
              ))
            )}
          </Accordion>
        ))
      )}
    </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        onDismiss={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {loading2 ? (
          <ActivityIndicator size={35} />
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{height: 150, width: '100%', objfit: 'cover'}}>
                <Image
                  source={{uri: BLOBURL + current?.banner}}
                  style={{height: '100%', width: '100%'}}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 21,
                  fontFamily: 'work-Sans',
                  fontWeight: '800',
                  textAlign: 'center',
                }}>
                {current?.cou_name}
              </Text>
              <View
                style={[
                  styles.mainv,
                  {alignItems: 'center', justifyContent: 'center', gap:10,paddingTop:5},
                ]}>
                <Text style={styles.datatext}>
                  Price:
                  <Text
                    style={[
                      styles.datatext1,
                      {textDecorationLine: 'line-through', fontSize: 14},
                    ]}>
                    {' '}
                    ₹ {current?.amount}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.datatext1,
                    {
                      backgroundColor: '#F6E482',
                      padding: 3,
                      borderRadius: 5,
                      fontSize: 12,
                    },
                  ]}>
                  {' '}
                  <Text style={[styles.datatext, {fontSize: 12}]}>
                    Duration:
                  </Text>{' '}
                  {current?.Duration}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop:5,
                  gap: 10,
                }}>
                <Text style={styles.datatext1}>
                  <Text style={styles.datatext}>Price:</Text> ₹{' '}
                  {current?.final_amount}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'green',
                    padding: 4,
                    borderRadius: 5,
                    color: 'white',
                    fontSize: 14,
                  }}>
                  {current?.discount}% : off
                </Text>
              </View>
              <View style={styles.mainv}>
                <Text style={styles.datatext1}>
                  <Text style={styles.datatext}>Videos Count:</Text>{' '}
                  {current?.videos_count}
                </Text>

                <Text style={styles.datatext1}>
                  <Text style={styles.datatext}>Attachment:</Text>{' '}
                  {current?.attachment_count}
                </Text>
              </View>
              <View style={styles.buttonV}>
                <TouchableOpacity
                  onPress={buyCourse}
                  style={[styles.button, styles.buttonClose, {}]}>
                  <Text style={styles.textStyle}>Buy Course</Text>
                </TouchableOpacity>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    {
                      paddingHorizontal: 38,
                    },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Modal>
      </>
  );
};

export default PaidCourses;
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
    width: '100%',
  },
  buttonV: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 5,
  },
  mainv: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    gap: 10,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee3fc',
  },
  buttonOpen: {
    backgroundColor: '#eee3fc',
  },
  buttonClose: {
    backgroundColor: '#eee3fc',
  },
  textStyle: {
    color: '#701DDB',

    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  datatext: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Work Sans',
    color: 'black',
  },
  datatext1: {color: 'gray'},
});
