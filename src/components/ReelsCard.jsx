import { View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import { BLOBURL } from '../config/urls'
import { Text } from '../utils/Translate'
import { screenWidth } from '../constants/Sizes.constant'

export default function ReelsCard({ tagName, reels, containerStyle, videostyle, backgroundColor, onPress }) {
    return (
        <View style={{ backgroundColor: backgroundColor ? backgroundColor : 'white', paddingVertical:20 }}>
            <Text style={{ fontSize: 20, padding: 12, paddingHorizontal: 20, color: 'gray' }}>{tagName}</Text>
            <FlatList
                style={{
                    width:screenWidth,
                    height:400,
                    backgroundColor:'transparent',
                    flexDirection:'row',
                    gap:15,
                    ...containerStyle,
                }}
                key={tagName}
                data={reels}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={onPress}>
                            <Video
                                paused={true}
                                style={{width:screenWidth/3, height:200, borderRadius:30, ...videostyle }}
                                source={{ uri: BLOBURL + item.blobName }}
                                controls={false}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}