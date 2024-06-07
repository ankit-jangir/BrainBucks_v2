import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-reanimated-carousel';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';

const Reels = () => {

    const data = [
        {id:"SQYPyxswqT8", tags:["first","one"]},
        {id:"p1lSWqnVlFM", tags:["second","two"]},
        {id:"TdbtfgYVrTs", tags:["third", "three"]},
        {id:"v1Bng4cx5iE", tags:["fourth","four"]}
    ];

    return (
        <Carousel style={{ flex: 1 }}
            data={data}
            width={screenWidth}
            height={screenHeight}
            autoPlay={false}
            vertical={true}
            scrollAnimationDuration={1000}
            keyExtractor={(item)=>item.id}
            renderItem={({ item }) => {
                return (
                    <YoutubePlayer
                        height={screenHeight}
                        width={screenWidth}
                        forceAndroidAutoplay
                        play={true}
                        videoId={item.id}
                        onChangeState={()=>{console.log("changed");}}
                    />
                )
            }
            }
        />
    )
}

export default Reels