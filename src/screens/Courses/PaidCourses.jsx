import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import Accordion from '../../components/Accordion';
import Toast from 'react-native-toast-message';
import NoDataFound from '../../components/NoDataFound';
import CourseApiService from '../../services/api/CourseApiService';
import { BLOBURL } from '../../config/urls';
import { Modal } from 'react-native-paper';
import { Button, Image } from 'react-native-elements';

const PaidCourses = () => {

  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const [videos, setVideos] = useState({})
  const [material, setMaterial] = useState({})
  const [loading2, setLoading2] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [current,setCurrent]=useState();
  const [buycourses,setbuyCourses]=useState([])
  console.log(current,"kajaj")
  const serv = new CourseApiService()

  useEffect(() => {
    getPaidCourses()
  }, [])

async function buyCourse(){
  try {
    setLoading2(true)
    let res = await serv.buyCourse(current._id)
    if (res.status === 1) {
      setModalVisible(false)
      Toast.show({
        type: 'success',
        text1:"course bought successfully"

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

  async function getPaidCourses() {
    try {
      setLoading(true)
      setLoading2(true)
      let res = await serv.getPaidCourses()
      if (res.status === 1) {
        console.log(res);
        setCourses(res.data)
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in fetching paid courses: ", err.message);
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
        // console.log(res);
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
        setMaterial(old => {
          return { ...old, [video_id]: res.study_materials }
        })
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
            <NoDataFound action={getPaidCourses} actionText={"Load again"} message={"No Courses Found"} />
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
                onButtonPress={() => {setCurrent(item), setModalVisible(true)} }
              >
                {
                  (!videos[item._id])
                    ?
                    (
                      loading2
                        ?
                        <ActivityIndicator size={40} />
                        : <View style={{ height: 200 }}>
                          <NoDataFound scale={0.5} message={"No Videos Found for this course"} action={() => { getVideoForParticularCourse(item._id) }} actionText={"Refresh"} />
                        </View>
                    )
                    :
                    (
                      (videos[item._id].length === 0)
                        ?
                        <View style={{ height: 200 }}>
                          <NoDataFound scale={0.5} message={"No Videos Found for this course"} action={() => { getVideoForParticularCourse(item._id) }} actionText={"Refresh"} />
                        </View>
                        :
                        videos[item._id].map((video, index) =>
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
                              marginTop: index === 0 ? 5 : 0
                            }}
                            buttonStyle={{
                              backgroundColor: '#eee3fc',
                              color: '#701DDB'
                            }}
                            buttonText={"Play Now"}
                            itemText={video.title}
                            icon={require('../../assets/img/play-button.png')}
                            onButtonPress={() => { Toast.show({
                              type:'info',
                              text1:"Buy the course to watch the video"
                            }) }}
                            onExpand={() => { getMaterialForParticularVideo(item._id, video._id) }}
                          >
                            {
                              (!material[video._id])
                                ?
                                (
                                  loading2
                                    ?
                                    <ActivityIndicator size={40} />
                                    : <View style={{ height: 200 }}>
                                      <NoDataFound scale={0.5} message={"No Study Material Found for this Video"} action={() => { getMaterialForParticularVideo(item._id, video._id) }} actionText={"Refresh"} />
                                    </View>
                                )
                                : (
                                  material[video._id].length === 0
                                    ?
                                    <View style={{ height: 200 }}>
                                      <NoDataFound scale={0.5} message={"No Study Material For This Video"} action={() => { getMaterialForParticularVideo(item._id, video._id) }} actionText={"Refresh"} />
                                    </View>
                                    :
                                    <FlatList
                                      data={material[video._id]}
                                      renderItem={({ item, index }) => {
                                        return (
                                          <Pressable key={item._id}>
                                            <View style={{
                                              backgroundColor: '#fff',
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                              paddingHorizontal: 10,
                                              paddingVertical: 8,
                                              marginHorizontal: 10,
                                              marginBottom: 4,
                                              elevation: 4,
                                              borderRadius: 5,
                                              marginTop: index === 0 ? 5 : 0,
                                            }}>
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  flex: 1,
                                                  alignItems: 'center'
                                                }}>
                                                <Text style={{ color: '#000', flex: 1 }}>{item.title}</Text>
                                              </View>
                                              <View style={{ flexDirection: 'row' }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                  <TouchableOpacity onPress={()=>{
                                                    Toast.show({
                                                      type:'info',
                                                      text1:"Buy the course to see the material"
                                                    })
                                                  }}>
                                                    <Text
                                                      style={{
                                                        padding: 5,
                                                        borderRadius: 5,
                                                        backgroundColor: '#eee3fc',
                                                        color: '#701DDB',
                                                        fontSize: 12,
                                                        fontWeight: 400
                                                      }}>
                                                      View Pdf
                                                    </Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                            </View>
                                          </Pressable>
                                        )
                                      }}>
                                    </FlatList>
                                )
                            }
                          </Accordion>
                        )
                    )
                }
              </Accordion>)
      }
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }} >
      {
        loading2? 
        <ActivityIndicator   size={35}/>:
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
         <View style={{height:200,width:"100%"}}>
         <Image source={{uri:BLOBURL + current?.banner}} style={{height:200,width:"100%"}} resizeMode='contain' />
         </View>
         <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
         <Text> <Text style={styles.datatext}>Duration:</Text> {current?.Duration}</Text>
         <Text><Text style={styles.datatext}>Amount:</Text> {current?.amount}</Text>

         </View>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text><Text style={styles.datatext}>Final Amount:</Text> {current?.final_amount}</Text>
         <Text> <Text style={styles.datatext}>Discount:</Text> {current?.discount}%</Text>

         </View>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text><Text style={styles.datatext}>Videos Count:</Text> {current?.videos_count}</Text>

         <Text><Text style={styles.datatext}>Attachment:</Text> {current?.attachment_count}</Text>

         </View>
         <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
         <TouchableOpacity onPress={buyCourse}
         style={[styles.button, styles.buttonClose]}
         
         >
         <Text style={styles.textStyle}>Buy Course</Text>
         </TouchableOpacity>
         <Pressable
         style={[styles.button, styles.buttonClose]}
         onPress={() => setModalVisible(!modalVisible)}>
         <Text style={styles.textStyle}>Cancel</Text>
       </Pressable>
         </View>
         
        </View>
      </View>
      }
      
    </Modal>
     
    </>
  );
};

export default PaidCourses;
const styles = StyleSheet.create({
  centeredView:{
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:400,
    width:"100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop:10,
    paddingHorizontal:20
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
 datatext:{fontSize:17,fontWeight:"500",fontFamily:"Work Sans",color:"black"}
})
