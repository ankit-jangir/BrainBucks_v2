import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
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

    const [current, setCurrent] = useState("SQYPyxswqT8")

    return (
        <FlatList style={{ flex: 1 }}
            data={data}
            width={screenWidth}
            height={screenHeight}
            horizontal={false}
            snapToAlignment='start'
            scrollAnimationDuration={1000}
            decelerationRate={'fast'}
            snapToInterval={screenHeight}
            keyExtractor={(item)=>item.id}
            onScrollAnimationEnd={{}}
            renderItem={({ item }) => {
                return (
                    <View style={{borderWidth:2, borderColor:'red'}}>
                    <YoutubePlayer
                        height={screenHeight}
                        width={screenWidth}
                        webViewProps={{
                            injectedJavaScript: `
                              var element = document.getElementsByClassName('container')[0];
                              element.style.position = 'unset';
                              true;
                            `,
                          }}
                        play={current===item.id}
                        forceAndroidAutoplay={true}
                        videoId={item.id}
                        onChangeState={()=>{console.log("changed");}}
                    />
                    </View>
                )
            }
            }
        />
    )
}

export default Reels