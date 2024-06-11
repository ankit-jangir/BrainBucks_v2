import { ActivityIndicator, FlatList, Image, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { TouchableOpacity } from 'react-native';
import ReelsApiService from '../../services/api/ReelsApiService';
import Toast from 'react-native-toast-message';
import BasicServices from '../../services/BasicServices';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';

const Reels = ({ navigation, route }) => {

    const [reels, setReels] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)
    const [currentReel, setCurrentReel] = useState()
    const [visible, setVisible] = useState(false)
    const [paused, setPaused] = useState(false)
    const [buffering, setBuffering] = useState(false)
    const tag_id = route.params.tag_id;
    const reServ = new ReelsApiService()
    const timeoutRef = useRef()

    useEffect(() => {
        getReels()
    }, [])

    function getReelsHelper(page) {
        return async () => {
            let res = await reServ.getReels(tag_id, page)
            return res;
        }
    }
    async function getReels(page = 1) {

        if (page > totalPages) {
            return
        }

        let res = await BasicServices.apiTryCatch(getReelsHelper(page), Toast, () => { setLoading(true) }, () => { setLoading(false) })
        if (res) {
            console.log("data for page "+page+": ",res);
            if (page === 1) {
                setReels([...res.reels])
            } else {
                setReels([...reels, ...res.reels])
            }
            setCurrentPage(page)
            setTotalPages(res.totalPages)
            if (res.reels[0]) {
                setCurrentReel(res?.reels[0]?._id)
            }
        }
    }

    function handleClick(){
        if(visible){
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }else{
            timeoutRef.current = setTimeout(()=>{setVisible(false)},2000)
        }
        setVisible(!visible)

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ zIndex: 200 }}><Toast /></View>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', padding: 20, top: 20, left: 20, width: 30, height: 30, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                <Image style={{ width: 25, height: 25, borderRadius: 20 }} source={require('../../assets/img/arrow-left.png')} />
            </TouchableOpacity>
            {
                visible &&
                <TouchableOpacity onPress={() => {
                    setPaused(!paused)
                    if(timeoutRef.current){
                        clearTimeout(timeoutRef.current)
                    }
                    timeoutRef.current = setTimeout(()=>{setVisible(false)},2000)
                }} style={{ zIndex:21, position: 'absolute', padding: 20, top: screenHeight / 2 - 17, left: screenWidth / 2 - 17, width: 35, height: 35, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                    {!paused ? <Image style={{ width: 30, height: 30, borderRadius: 20 }} source={require('../../assets/img/pause.png')} /> : <Image style={{ width: 25, height: 25, borderRadius: 20 }} source={require('../../assets/img/resume.png')} />}
                </TouchableOpacity>
            }
            {
                (buffering && !visible) &&
                <View style={{ zIndex:11, position: 'absolute', padding: 20, top: screenHeight / 2 - 17, left: screenWidth / 2 - 17, width: 35, height: 35, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                    <ActivityIndicator size={20} color={ColorsConstant.Theme}/>
                </View>
            }
            {
                reels.length === 0
                    ?
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <NoDataFound scale={0.7} message={"No Reels For This Tag"} action={() => getReels()} actionText={"Reload"} />
                    </View>
                    :
                    <FlatList style={{ flex: 1 }}
                        onEndReached={() => { getReels(currentPage + 1) }}
                        data={reels}
                        width={screenWidth}
                        height={screenHeight}
                        horizontal={false}
                        snapToAlignment='start'
                        scrollAnimationDuration={1000}
                        decelerationRate={'fast'}
                        snapToInterval={screenHeight}
                        keyExtractor={(item) => item._id}
                        onViewableItemsChanged={({ changed, viewableItems }) => {
                            setCurrentReel(viewableItems[0]?.item?._id);
                            setLoading(false)
                            setBuffering(false)
                        }}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableWithoutFeedback onPress={handleClick}>
                                <View style={{ flex: 1, position: 'relative', width: screenWidth, height: screenHeight }}>
                                    <Video
                                        paused={(currentReel !== item._id) || paused}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                        }}
                                        resizeMode='stretch'
                                        source={{ uri: BLOBURL + item.blobName }}
                                        repeat
                                        onBuffer={()=>setBuffering(true)}
                                        onLoad={()=>{setBuffering(false)}}
                                    />
                                </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                        }
                    />}
            {loading && <ActivityIndicator size={40} color={ColorsConstant.Theme} />}
        </View>
    )
}

export default Reels