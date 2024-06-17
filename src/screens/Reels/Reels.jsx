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
import { Text } from '../../utils/Translate';

const Reels = ({ navigation, route }) => {

    const [reels, setReels] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentReel, setCurrentReel] = useState()
    const [visible, setVisible] = useState(false)
    const [paused, setPaused] = useState(false)
    const [buffering, setBuffering] = useState(false)
    const [muted, setMuted] = useState(false)
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const firstReel = route?.params?.first_reel;
    const reServ = new ReelsApiService()
    const timeoutRef = useRef()
    const scrollRef = useRef()

    const currentIndex = useRef(0)

    //note:- page means the number of reels and currentReel is just the id of the reel currently playing


    useEffect(() => {
        getTags()
        getReels()

    }, [])


    function getTagsHelper() {
        return async () => {
            let res = await reServ.getTags()
            return res;
        }
    }

    async function getTags() {
        let res = await BasicServices.apiTryCatch(getTagsHelper(), Toast)
        if (res) {
            let tArr = res.tags;
            tArr = tArr.map((item) => {
                return { ...item, selected: false }
            })

            setTags(tArr)
        }
    }



    function getReelsHelper(page) {
        return async () => {
            if (page === 1 && firstReel) {
                let res = await reServ.getRandomReels(selectedTags, [firstReel._id])
                return res
            }
            else {
                let seen = reels.map(item => item._id)
                return await reServ.getRandomReels(selectedTags, seen)
            }
        }
    }

    async function getReels(page = 1) {
        let func = setLoadingMore
        if (page === 1) {
            func = setLoading
        }

        let res = await BasicServices.apiTryCatch(getReelsHelper(page), Toast, () => { func(true) }, () => { func(false) })
        if (res && res.reel) {
            if (firstReel && page === 1) {
                setReels([firstReel, ...reels, ...res.reel])
                setCurrentReel(firstReel._id)
            } else {
                setReels([...reels, ...res.reel])
                if (page === 1) {
                    setCurrentReel(res.reels[0]._id)
                }
            }
            setCurrentPage(page)
        }
    }

    function handleClick() {
        if (visible) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        } else {
            timeoutRef.current = setTimeout(() => { setVisible(false) }, 2000)
        }
        setVisible(!visible)
    }

    function select(index) {
        let item = tags[index]
        item = { ...item, selected: !item.selected }

        let newArr = [...tags]
        newArr.splice(index, 1)

        setTags([...newArr])

        if (item.selected) {
            newArr.unshift(item)
            setSelectedTags([...selectedTags, item._id])
        } else {
            newArr.push(item)
            let arr = [...selectedTags]
            arr = arr.filter((i) => i !== item._id)
            setSelectedTags([...arr])
        }

        setTags([...newArr])
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
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }
                    timeoutRef.current = setTimeout(() => { setVisible(false) }, 2000)
                }} style={{ zIndex: 21, position: 'absolute', padding: 20, top: screenHeight / 2 - 17, left: screenWidth / 2 - 17, width: 35, height: 35, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                    {!paused ? <Image style={{ width: 30, height: 30, borderRadius: 20, objectFit: 'contain' }} source={require('../../assets/img/pause.png')} /> : <Image style={{ width: 25, height: 25, borderRadius: 20, objectFit: 'contain' }} source={require('../../assets/img/resume.png')} />}
                </TouchableOpacity>
            }
            {
                (buffering || loading && !visible) &&
                <View style={{ zIndex: 11, position: 'absolute', padding: 20, top: screenHeight / 2 - 17, left: screenWidth / 2 - 17, width: 35, height: 35, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 }}>
                    <ActivityIndicator size={20} color={ColorsConstant.Theme} />
                </View>
            }


            <View style={{ flexDirection: 'row', padding: 20, marginLeft: 50, gap: 20 }}>
                {
                    tags.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => { select(index) }}
                                style={{ padding: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: !item.selected ? 'white' : ColorsConstant.Theme }}>
                                <Text key={item._id + "" + item.selected} style={{ color: item.selected ? 'white' : ColorsConstant.Black }}>
                                    {item.selected && 'X  '}
                                    {item.tag_name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            {console.log(reels)}
            <FlatList style={{ flex: 1 }}
                ref={scrollRef}
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
                    // if (!reels.includes(changed[0].item._id)) { setSeenReels([...seenReels, changed[0].item._id]) }
                    setCurrentReel(viewableItems[0]?.item?._id);
                    currentIndex.current = (viewableItems[0]?.index)
                    setLoading(false)
                    setBuffering(false)
                    if (viewableItems[0] && viewableItems[0].index % 3 === 0) {
                        let diff = reels.length - viewableItems[0].index
                        if (diff === 3 || diff === 4);
                        getReels(currentPage + 1)
                    }
                }}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={handleClick}>
                            <View style={{ flex: 1, position: 'relative', width: screenWidth, height: screenHeight }}>
                                <Video
                                    // poster={BLOBURL+item?.banner}
                                    paused={(currentReel !== item._id) || paused}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 150,
                                        right: 0,
                                    }}
                                    resizeMode='cover'
                                    posterResizeMode='cover'
                                    source={{ uri: BLOBURL + item.blobName }}
                                    repeat
                                    onBuffer={() => setBuffering(true)}
                                    onLoad={() => { setBuffering(false) }}
                                    onError={(e) => console.log("Error in loading reel ", e)}
                                />

                                <View style={{ position: 'absolute', left: 0, bottom: 100, right: 0, height: 100, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                <Text style={{ padding: 20, color: ColorsConstant.White }} key={item.caption}>{item.caption}</Text>
                                    
                                    {
                                        item.tags.map((im, index) => {
                                            return (
                                                <Text style={{ padding: 20, color: ColorsConstant.White }} key={im}>#{im}</Text>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ position: 'absolute', bottom: 200, right: 0, height: 200, width: 60, paddingTop: 10, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'space-between' }}>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/img/like.png')} style={{ widhth: 30, height: 30, objectFit: 'contain', }} />
                                        <Text style={{ color: item.liked ? '#ED2839' : ColorsConstant.White }}>{item.likes}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/img/comment.png')} style={{ widhth: 30, height: 30, objectFit: 'contain' }} />
                                        <Text style={{ color: ColorsConstant.White }}>{item.commentsCount}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/img/sharereel.png')} style={{ widhth: 30, height: 30, objectFit: 'contain' }} />
                                        <Text style={{ color: ColorsConstant.White }}>Share</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
                }
            />

            {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}

        </View>
    )
}

export default Reels