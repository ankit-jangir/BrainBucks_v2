import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import Video, { DRMType } from 'react-native-video'
import CourseApiService from '../../services/api/CourseApiService';
import { ActivityIndicator } from 'react-native';

//todo: add styles to the video player
export default function VideoPlayer({navigation, route}) {

    const [video, setVideo] = useState()
    const course_id = route.params.course_id
    const video_id = route.params.video_id
    const serv = new CourseApiService()

    useEffect(()=>{
        getVideo()
    },[])

    async function getVideo(){
    try{
        let res = await serv.startVideo(course_id, video_id)
        if(res.status===1){
            console.log(res);
            setVideo(res)
        }
        else{
            Toast.show({
                type:'error',
                text1:res.Backend_Error
            })
        }
      }catch (err) {
        console.log("Error in playing video in video player: ", err.message);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong'
        })
      } 
    }

    return (
        <>
        <View style={{zIndex:100}}>
            <Toast/>
        </View>
        {
            !video?
            <ActivityIndicator size={"large"}/>
            :
            <Video
            controls={true}
            onError={console.log}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            source={{
                uri:video.url,
            }}
            drm={{
                type: DRMType.WIDEVINE,
                licenseServer: 'https://drm-widevine-licensing.axprod.net/AcquireLicense',
                headers: {
                    'X-AxDRM-Message':video.token,
                },
            }}
        />
        }
        </>
    )
}
