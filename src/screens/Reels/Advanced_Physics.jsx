import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Video from 'react-native-video';

const initialResources = [
  {
    id: '1',
    type: 'video',
    date: 'Uploaded: Sept 15, 2023',
    duration: '45:22',
    thumbnail: require('../../assets/img/banners.png'),
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 128,
    shares: 32,
    comments: 12,
    liked: false,
  },
  {
    id: '2',
    type: 'pdf',
    title: 'Week 3 Study Materials',
    date: 'Uploaded: Sept 14, 2023',
    size: 'PDF • 2.8 MB',
    icon: require('../../assets/img/banners.png'),
    likes: 89,
    shares: 15,
    comments: 5,
    liked: false,
  },
  {
    id: '3',
    type: 'video',
    date: 'Uploaded: Sept 13, 2023',
    duration: '38:15',
    thumbnail: require('../../assets/img/banners.png'),
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 156,
    shares: 41,
    comments: 22,
    liked: false,
  },
  {
    id: '4',
    type: 'ppt',
    title: 'Practice Problems Set 2',
    date: 'Uploaded: Sept 12, 2023',
    size: 'PPT • 1.5 MB',
    icon: require('../../assets/img/banners.png'),
    likes: 73,
    shares: 19,
    comments: 4,
    liked: false,
  },
];

const IconText = ({img, text, onPress, tintColor}) => (
  <TouchableOpacity onPress={onPress} style={styles.iconText}>
    <Image
      source={img}
      style={[styles.iconImg, tintColor ? {tintColor} : {}]}
    />
    <Text style={styles.iconLabel}>{text}</Text>
  </TouchableOpacity>
);

const Advanced_Physics = () => {
  const [resources, setResources] = useState(initialResources);
  const [commentVisible, setCommentVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const navigation = useNavigation();
  const toggleLike = id => {
    setResources(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
            }
          : item,
      ),
    );
  };

  const shareItem = async item => {
    try {
      await Share.share({
        message: `${item.title || 'Watch this video'} - from Advanced Physics`,
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing.');
    }
  };

  const openCommentModal = item => {
    setSelectedItem(item);
    setCommentVisible(true);
  };

  const submitComment = () => {
    if (commentText.trim() === '') return;
    Alert.alert('Comment Submitted', commentText);
    setCommentVisible(false);
    setCommentText('');
  };

  const handleDownload = item => {
    Alert.alert('Downloading', `${item.title || 'Video'} will be downloaded.`);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        {item.type === 'video' ? (
          <View style={styles.videoContainer}>
            {playingVideoId === item.id ? (
              <Video
                source={{uri: item.videoUrl}}
                style={styles.thumbnail}
                resizeMode="cover"
                controls
                paused={false}
              />
            ) : (
              <TouchableOpacity onPress={() => setPlayingVideoId(item.id)}>
                <Image source={item.thumbnail} style={styles.thumbnail} />
                <Image
                  source={require('../../assets/img/playbutton.png')}
                  style={styles.playIcon}
                />
                <Text style={styles.duration}>{item.duration}</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.docRow}>
            <Image source={item.icon} style={styles.docIcon} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.docTitle}>{item.title}</Text>
              <Text style={styles.docSize}>{item.size}</Text>
            </View>
          </View>
        )}

        <Text style={styles.date}>{item.date}</Text>

        <View style={styles.iconRow}>
          <IconText
            img={require('../../assets/img/like_img.png')}
            text={item.likes}
            onPress={() => toggleLike(item.id)}
            tintColor={item.liked ? 'red' : '#444'}
          />
          <IconText
            img={require('../../assets/img/comment_img.png')}
            text={item.comments}
            onPress={() => openCommentModal(item)}
          />
          <IconText
            img={require('../../assets/img/share_img.png')}
            text={item.shares}
            onPress={() => shareItem(item)}
          />
          <TouchableOpacity onPress={() => handleDownload(item)}>
            <Image
              source={require('../../assets/img/down_load.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backq.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.header}>Advanced Physics</Text>
          <Text style={styles.subHeader}>Dr. Sarah Wilson</Text>
        </View>
      </View>

      <FlatList
        data={resources}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, paddingTop: 10}}
      />

      <Modal visible={commentVisible} transparent animationType="slide">
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <View style={styles.modalOverlay}>
            <View style={styles.commentModal}>
              <Text style={styles.modalTitle}>Add Comment</Text>
              <TextInput
                placeholder="Type your comment..."
                value={commentText}
                onChangeText={setCommentText}
                style={[styles.commentInput, {color: 'black'}]}
                multiline
                placeholderTextColor="#999"
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable onPress={() => setCommentVisible(false)}>
                  <Text style={styles.modalBtn}>Cancel</Text>
                </Pressable>
                <Pressable onPress={submitComment}>
                  <Text style={styles.modalBtn}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default Advanced_Physics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#F5F9FF',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  subHeader: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    marginTop: 12,
    color: '#757575',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    width: 40,
    height: 40,
    resizeMode: 'contain',
    zIndex: 10,
  },

  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  iconLabel: {
    marginLeft: 5,
    fontSize: 13,
    color: '#444',
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  docSize: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  commentModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalBtn: {
    fontSize: 15,
    color: '#0066cc',
    marginTop: 15,
  },
});
