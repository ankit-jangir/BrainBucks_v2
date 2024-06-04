import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Text } from '../../utils/Translate';
import React, { useEffect, useState } from 'react';
import NoDataFound from '../../components/NoDataFound';
import Accordion from '../../components/Accordion';
import Toast from 'react-native-toast-message';
import CourseApiService from '../../services/api/CourseApiService';
import { BLOBURL } from '../../config/urls';
import { Image } from 'react-native';

const FreeCourses = ({ navigation, data }) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState({});
  const [material, setMaterial] = useState({});
  const [loading2, setLoading2] = useState(false);

  const serv = new CourseApiService();

  useEffect(() => {
    getFreeCourses();
  }, []);

  async function getFreeCourses() {
    try {
      setLoading(true);
      setLoading2(true);
      let res = await serv.getFreeCourses();
      if (res.status === 1) {
        setCourses(res.data);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching free courses: ', err.message);
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
          return { ...old, [course_id]: res.videos };
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error in fetching videos for free courses: ', err.message);
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
          return { ...old, [video_id]: res.study_materials };
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log(
        'Error in fetching study material for a free course: ',
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

  async function playVideo(course_id, video_id) {
    navigation.navigate('videoplayer', {
      course_id: course_id,
      video_id: video_id,
    });
  }

  return (
    <ScrollView>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      {loading ? (
        <ActivityIndicator size={40} />
      ) : courses.length === 0 ? (
        <NoDataFound
          action={getFreeCourses}
          actionText={'Load again'}
          message={'No Courses Found'}
        />
      ) : (
        courses.map(item => (
          <Accordion
            onExpand={() => {
              getVideoForParticularCourse(item._id);
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
            itemText={item.cou_name}
            icon={{ uri: BLOBURL + item.banner }}>
            {!videos[item._id] ? (
              loading2 ? (
                <ActivityIndicator size={40} />
              ) : (
                <View style={{ height: 200 }}>
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
              <View style={{ height: 200 }}>
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
                    playVideo(item._id, video._id);
                  }}
                  onExpand={() => {
                    getMaterialForParticularVideo(item._id, video._id);
                  }}>
                  {!material[video._id] ? (
                    loading2 ? (
                      <ActivityIndicator size={40} />
                    ) : (
                      <View style={{ height: 200 }}>
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
                    <View style={{ height: 200 }}>
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
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable key={item._id}>
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
                                borderRadius: 5,
                                marginLeft: 18,
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
                                  style={{
                                    height: 20,
                                    width: 20,
                                    marginRight: 4,
                                  }}
                                  resizeMode="contain"
                                />
                                <Text style={{ color: '#000', flex: 1 }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('viewpdf', {
                                        pdf: item,
                                      });
                                    }}>
                                    <Text
                                      style={{
                                        padding: 5,
                                        paddingHorizontal: 8,
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
  );
};

export default FreeCourses;
