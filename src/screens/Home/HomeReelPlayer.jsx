import { ActivityIndicator, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, Share, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import Video from 'react-native-video'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { TouchableOpacity } from 'react-native';
import ReelsApiService from '../../services/api/ReelsApiService';
import Toast from 'react-native-toast-message';
import BasicServices from '../../services/BasicServices';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import { APPURL, BLOBURL } from '../../config/urls';
import { Text, TextInput } from '../../utils/Translate';
import styles2 from '../../styles/Saved.styles';
import styles from '../../styles/Reels.styles';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const HomeReelsPlayer = ({ firstReel, setParentModalVisible }) => {

  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentReel, setCurrentReel] = useState()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [muted, setMuted] = useState(false)
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [expendedCaptions, setExpendedCaptions] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  const reServ = new ReelsApiService()
  const timeoutRef = useRef()
  const scrollRef = useRef()

  const currentIndex = useRef(0)
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  //note:- page means the number of reels and currentReel is just the id of the reel currently playing


  useEffect(() => {
    getTags()
    getReels()
  }, [])

  useEffect(() => {
    isFocused ? setPaused(false) : setPaused(true)
  }, [isFocused])


  function renderCaption(item) {
    let tagsString = '';

    item.tags.forEach(element => {
      tagsString += "#" + element + "  "
    });

    let caption = item.caption + "\n\n" + tagsString;
    if (caption.length > 100) {
      if (expendedCaptions[item._id]) {
        return caption;
      } else {
        return caption.substr(0, 100) + "..."
      }
    }

    return caption;
  }

  function toggleExpand(item) {
    setExpendedCaptions({ ...expendedCaptions, [item._id]: !expendedCaptions[item._id] })
  }


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



  function getReelsHelper(page, again) {
    return async () => {
      if (page === 1 && firstReel) {
        let res = await reServ.getRandomReels(selectedTags, [firstReel._id])
        return res
      }
      else {
        let seen = again ? [] : reels.map(item => item._id)
        return await reServ.getRandomReels(selectedTags, seen)
      }
    }
  }

  async function getReels(page = 1, again) {
    let func = setLoadingMore
    let res = await BasicServices.apiTryCatch(getReelsHelper(page, again), Toast, () => { func(true) }, () => { func(false) })

    if (res && res.reel) {
      if (res.reel.length === 0) {
        getReels(page + 1, true)
        return;
      }
      if (firstReel && page === 1) {
        setReels([firstReel, ...reels, ...res.reel])
        setCurrentReel(firstReel._id + "0")
      } else {
        setReels([...reels, ...res.reel])
        if (page === 1) {
          setCurrentReel(res?.reel[0]?._id + "0")
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

  function likeHelper(id) {
    return async () => {
      let res = await reServ.likeReel(id);
      return res;
    }
  }

  async function like(id) {
    let res = await BasicServices.apiTryCatch(likeHelper(id), Toast)
    let arr = [...reels]
    arr = arr.map((item) => {
      if (item._id === id) {
        let liked = !item.liked
        let likes = liked ? item.likes + 1 : item.likes - 1
        return { ...item, liked: liked, likes: likes }
      } else {
        return item;
      }
    })

    setReels([...arr])
  }


  function getCurrentReelId() {
    let indexedReelId = currentReel + "";
    let currIndex = currentIndex.current + "";
    let reelId = indexedReelId.substring(0, indexedReelId.length - currIndex.length)
    return reelId;
  }

  function getCommentsHelper() {
    return async () => {
      let reelId = getCurrentReelId()
      let res = await reServ.getComments(reelId)
      return res;
    }
  }
  async function getComments() {

    setComments([])

    let res = await BasicServices.apiTryCatch(getCommentsHelper(), Toast, () => { setCommentsLoading(true) }, () => { setCommentsLoading(false) })
    if (res) {
      setComments(res.comments)
    }
  }

  async function deleteComment(comm) {
    let currentId = getCurrentReelId();
    let res = await BasicServices.apiTryCatch(async () => { return await reServ.deleteComment(currentId, comm) }, Toast);
    if (res) {
      getComments()
    }
  }
  async function addComment() {
    if (comment.trim().length === 0) {
      return;
    }
    let currentId = getCurrentReelId();
    let res = await BasicServices.apiTryCatch(async () => { return await reServ.addComment(currentId, comment) }, Toast);
    if (res) {
      getComments()
      setComment('')
    }
  }

  const onShare = async (reel_id) => {
    try {
      const result = await Share.share({
        message: `${APPURL}/reels?id=${reel_id}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ zIndex: 200 }}><Toast /></View>
      <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={styles.backBtnView}>
        <Image style={styles.backBtn} source={require('../../assets/img/drawerr.png')} />
      </TouchableOpacity>
      {
        visible &&
        <TouchableOpacity onPress={() => {
          setPaused(!paused)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => { setVisible(false) }, 2000)
        }} style={styles.pauseBtnView}>
          {!paused ? <Image style={styles.pauseBtn} source={require('../../assets/img/pause.png')} /> : <Image style={styles.resumeBtn} source={require('../../assets/img/resume.png')} />}
        </TouchableOpacity>
      }
      {
        (buffering || loading && !visible) &&
        <View style={styles.pauseBtnView}>
          <ActivityIndicator size={20} color={ColorsConstant.Theme} />
        </View>
      }


      <ScrollView
        horizontal
        style={styles.tagsContainer}
        contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
        onStartShouldSetResponder={() => true}
        onStartShouldSetResponderCapture={() => true}
      >
        <View style={[styles.tagsView, { minHeight: 40 }]}>
          {
            tags.length === 0 ?
              <Text style={{ color: "#000", paddingHorizontal: 20 }}>No Tags Found</Text>
              :
              tags.map((item, index) =>
                <TouchableOpacity
                  key={item._id}
                  onPress={() => { select(index) }}
                  style={[styles.tag, !item.selected && { backgroundColor: 'white' }]}>
                  <Text key={item._id + "" + item.selected} style={{ color: item.selected ? 'white' : ColorsConstant.Black }}>
                    {item.selected && 'X  '}
                    {item.tag_name}
                  </Text>
                </TouchableOpacity>
              )
          }
        </View>
      </ScrollView>
      <>
        {
          reels.length === 0 ?
            <View style={{ flex: 1, height: 300, padding: 30, backgroundColor: "white" }}>
              <NoDataFound message={"No Reels Found"} />
            </View>
            :
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flexGrow: 1, }}
              ref={scrollRef}
              onEndReached={() => { if (!loadingMore) getReels(currentPage + 1) }}
              data={reels}
              windowSize={5} // Number of items to render outside of the visible area
              initialNumToRender={5} // Number of items to render initially
              maxToRenderPerBatch={5} // Number of items rendered per batch
              removeClippedSubviews={true}
              horizontal={false}
              snapToAlignment='start'
              scrollAnimationDuration={1000}
              decelerationRate={'fast'}
              snapToInterval={screenHeight * (85 / 100)}
              keyExtractor={(item, index) => item._id + index}
              onViewableItemsChanged={({ changed, viewableItems }) => {
                setCurrentReel(viewableItems[0]?.item?._id + viewableItems[0]?.index);
                currentIndex.current = (viewableItems[0]?.index)
                setLoading(false)
                setBuffering(false)
                if (viewableItems[0] && viewableItems[0].index === reels.length - 1) {
                  getReels(currentPage + 1)
                }
              }}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={[styles.videoContainer]}
                    onPress={handleClick}
                  >
                    <MemoizedVideo currentReel={currentReel} index={index} item={item} paused={paused} />
                    <MemoizedCaptionSection expendedCaptions={expendedCaptions} item={item} renderCaption={renderCaption} toggleExpand={toggleExpand} />
                    <MemoizedLikeCommentSection onShare={onShare} like={like} item={item} setModalVisible={setModalVisible} />
                  </Pressable>

                )
              }
              }
            />}
      </>
      <Modal
        onShow={() => { getComments(), setComment("") }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles2.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles2.modalTocuh}></TouchableOpacity>
          <View style={styles2.modalview1}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles2.DownTouch}>
              <Image
                source={require('../../assets/img/down-arrow.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={styles2.viewExam}>
              <View style={styles2.examview}>
                <View style={{ flex: 4 }}></View>
                <View style={styles2.addview}>
                  <Text style={styles2.textAdd}>Comments</Text>
                </View>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}>
              {commentsLoading || loading ? (
                <ActivityIndicator color={ColorsConstant.Theme} size={35} />
              ) : comments.length === 0 ? (
                <NoDataFound
                  message={'No Comments Found'}
                  action={() => { }}
                  actionText={'Reload'}
                />
              ) : (
                comments.map((item) => {
                  return (
                    <View key={item._id} style={{ padding: 4 }}>
                      <View style={styles2.EListss1}>
                        <View style={styles.commenterImageView}>
                          <Image
                            source={{ uri: BLOBURL + item.image }}
                            resizeMode="cover"
                            style={styles.commentImage}
                          />
                        </View>
                        <View style={styles.nameAndCommentView}>
                          <Text style={styles.commenterName}>{item.name}</Text>
                          <Text style={[styles2.ItmText, { fontSize: 15, fontFamily: 'Inter' }]}>{item.comment}</Text>
                        </View>
                        {
                          item.is_deletable
                          &&
                          <TouchableOpacity onPress={() => { deleteComment(item.comment) }}>
                            <Image source={require("../../assets/img/redbin.png")} style={styles.deleteCommentIcon}></Image>
                          </TouchableOpacity>
                        }
                      </View>

                    </View>
                  )
                })


              )}
            </ScrollView>
            <View style={styles.messageview}>
              <TextInput value={comment} placeholder="Enter Comment..." placeholderTextColor="gray" onChangeText={setComment} style={styles.messageinput} />
              <TouchableOpacity onPress={() => { addComment() }} style={styles.sendbtnView}>
                <Image style={styles.sendbtnImg} source={require('../../assets/img/rightarrow1.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {loadingMore && <ActivityIndicator size={30} color={ColorsConstant.Theme} />}

    </View>
  )
}

export default HomeReelsPlayer


const MemoizedVideo = memo(({ item, currentReel, index, paused, }) => {
  return (
    <Video
      poster={BLOBURL + item?.banner}
      paused={(currentReel !== item._id + index) || paused}
      style={styles.video}
      resizeMode='cover'
      posterResizeMode='cover'
      source={{ uri: item.blobName }}
      repeat
      // onBuffer={() => setBuffering(true)}
      // onLoad={() => { setBuffering(false) }}
      onError={(e) => console.log("Error in loading reel ", e)}
    />
  )
})

const MemoizedCaptionSection = memo(({ expendedCaptions, item, renderCaption, toggleExpand }) => {
  return (
    <View style={[styles.captionView, { height: expendedCaptions[item._id] ? 400 : 200 }]}>
      <ScrollView>
        <View style={styles.reelNameContainer}>
          <Image source={{ uri: BLOBURL + item.banner }} style={styles.reelImage} />
          <Text key={item.name} style={styles.reelName}>{item.name}</Text>
        </View>
        <Text style={styles.caption} key={renderCaption(item)}>{renderCaption(item)}</Text>
        {renderCaption(item).length > 100 && <TouchableOpacity onPress={() => toggleExpand(item)} style={{ marginLeft: 20 }}><Text key={expendedCaptions[item._id] ? "Read Less" : "Read More"} style={{ color: ColorsConstant.Theme, fontSize: 15 }}>{expendedCaptions[item._id] ? "Read Less" : "Read More"}</Text></TouchableOpacity>}
      </ScrollView>
    </View>
  )
})


const MemoizedLikeCommentSection = memo(({ like, item, setModalVisible, onShare }) => {
  return (
    <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={styles.likeCommentContainer}>

      <TouchableOpacity onPress={() => { like(item._id) }} style={styles.likeItemContainer}>
        <Image source={require('../../assets/img/like.png')} tintColor={item.liked ? "#ED2839" : "#fff"} style={styles.likeIcon} />
        <Text key={item.likes} style={{ color: ColorsConstant.White }}>{item.likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.likeItemContainer}>
        <Image source={require('../../assets/img/comment.png')} style={styles.likeIcon} />
        <Text style={{ color: ColorsConstant.White }}>{item.commentsCount}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.likeItemContainer} onPress={()=>{onShare(item._id)}}>
        <Image source={require('../../assets/img/sharereel.png')} style={styles.likeIcon} />
        <Text style={{ color: ColorsConstant.White }}>Share</Text>
      </TouchableOpacity>

    </LinearGradient>
  )
})
