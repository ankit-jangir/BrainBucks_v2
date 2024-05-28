import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
  } from 'react-native';
import {Text} from '../../utils/Translate';
import React, {useEffect, useState} from 'react';
import {List} from 'react-native-paper';
import styles from '../../styles/Home.styles';
import NoDataFound from '../../components/NoDataFound';
import Accordion from '../../components/Accordion';
import Toast from 'react-native-toast-message';
import CourseApiService from '../../services/api/CourseApiService';
import { BLOBURL } from '../../config/urls';


const FreeCourses = ({navigation,data}) => {
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const [videos, setVideos] = useState({})
  const [material, setMaterial] = useState({})
  const [loading2, setLoading2] = useState(false)

  const serv = new CourseApiService()

  useEffect(() => {
    getFreeCourses()
  }, [])

  async function getFreeCourses() {
    try {
      setLoading(true)
      setLoading2(true)
      let res = await serv.getFreeCourses()
      if (res.status === 1) {
        setCourses(res.data)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in fetching free courses: ", err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      })
    } finally {
      setLoading(false)
      setLoading2(false)
    }
  }

  async function getVideoForParticularCourse(course_id) {
    try {
      setLoading2(true)
      let res = await serv.getVideos(course_id)
      if (res.status === 1) {
        setVideos(old => {
          return { ...old, [course_id]: res.videos }
        })
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in fetching videos for paid courses: ", err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      })
    } finally {
      setLoading2(false)
    }
  }

  async function getMaterialForParticularVideo(course_id, video_id) {
    try {
      setLoading2(true)
      let res = await serv.getStudyMaterial(course_id, video_id)
      if (res.status === 1) {
        console.log(res);
        // setCourses(res.data)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in fetching study material for a paid course: ", err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      })
    } finally {
      setLoading2(false)
    }
  }


  return (
    <>
      <View style={{ zIndex: 100 }}>
        <Toast />
      </View>
      {
        loading ?
          <ActivityIndicator size={40} />
          :
          courses.length === 0
            ?
              <NoDataFound action={getFreeCourses} actionText={"Load again"} message={"No Courses Found"} />
            :
            courses.map(item =>
              <Accordion
                onExpand={() => { getVideoForParticularCourse(item._id) }}
                buttonStyle={{
                  backgroundColor: '#eee3fc',
                  color: '#701DDB'
                }}
                key={item._id}
                containerStyle={
                  {
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 10,
                    elevation: 4
                  }
                }
                buttonText={"Buy Now"}
                itemText={item.cou_name}
                icon={{ uri: BLOBURL + item.banner }}
                onButtonPress={() => { console.log("Buy Course") }}
              >
                {
                  (!videos[item._id])
                    ?
                    (
                      loading2
                        ?
                        <ActivityIndicator size={40} />
                        :
                        <View style={{height:200}}>
                          <NoDataFound scale={0.5} message={"No Videos Found for this course"} action={() => { getVideoForParticularCourse(item._id) }} actionText={"Refresh"} />
                        </View>
                      )
                    :
                    (
                      (videos[item._id].length === 0)
                        ?
                        <View style={{height:200}}>
                          <NoDataFound scale={0.5} message={"No Videos Found for this course"} action={() => { getVideoForParticularCourse(item._id) }} actionText={"Refresh"} />
                        </View>
                      :
                        videos[item._id].map((video, index) =>
                          <Accordion  
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
                              marginTop: index === 0 ? 5 : 0
                            }}
                            buttonStyle={{
                              backgroundColor: '#eee3fc',
                              color: '#701DDB'
                            }}
                            buttonText={"Play Now"}
                            itemText={video.title}
                            icon={require('../../assets/img/play-button.png')}
                            onButtonPress={() => { console.log("Video Play"); }}
                          >
                            <FlatList
                              data={material[video._id]}
                              renderItem={({ item }) => {
                                return (
                                  <View style={{ backgroundColor: '#fff', elevation: 1, marginTop: 2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, padding: 10 }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                      }}>
                                      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                                        1.
                                      </Text>
                                      <Text style={{ color: '#000' }}>{item.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity >
                                          <Text
                                            style={{
                                              backgroundColor: 'rgba(112, 29, 219, 1)',
                                              padding: 5,
                                              borderRadius: 5,
                                              color: '#fff',
                                            }}>
                                            View Pdf
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                )
                              }}>
                            </FlatList>
                          </Accordion>
                        )
                    )
                }
              </Accordion>)
      }
    </>
  );
};

export default FreeCourses;
