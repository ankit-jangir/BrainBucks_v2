import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const initialData = [
  {
    id: '1',
    date: '22 July 2025',
    type: 'video',
    title: 'Quadratic Equations',
    label: 'Upload Video',
    uri: null,
  },
  {
    id: '2',
    date: '21 July 2025',
    type: 'pdf',
    title: 'Algebra Formulas',
    label: 'Upload PDF',
    uri: null,
  },
  {
    id: '3',
    date: '20 July 2025',
    type: 'ppt',
    title: 'Geometry Basics',
    label: 'Upload PPT',
    uri: null,
  },
];

const Content_page = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState(initialData);

  const handleUpload = (item) => {
    launchImageLibrary({mediaType: 'mixed'}, res => {
      if (res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        const updated = content.map(c =>
          c.id === item.id ? {...c, uri} : c,
        );
        setContent(updated);
      }
    });
  };

  const handleDelete = title => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = content.map(c =>
              c.title === title ? {...c, uri: null} : c,
            );
            setContent(updated);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={[styles.typeBadge, getTypeColor(item.type)]}>
          <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>

      {item.uri && item.type === 'video' && (
        <View style={styles.videoContainer}>
          <Video
            source={{uri: item.uri}}
            style={styles.video}
            controls
            resizeMode="cover"
          />
        </View>
      )}

      {item.uri && (item.type === 'pdf' || item.type === 'ppt') && (
        <View style={styles.previewBox}>
          <Text style={styles.previewText}>Uploaded File: {item.uri.split('/').pop()}</Text>
        </View>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => handleUpload(item)}>
          <Image
            source={require('../../assets/img/cloud.png')}
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadText}>{item.label}</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../../assets/img/view.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.title)}>
            <Image
              source={require('../../assets/img/deletes.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backq.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Uploaded Content</Text>
          <Text style={styles.subTitle}>
            Stay updated with the latest notes, videos, and resources.
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.classTitle}>Class 10 - Maths</Text>
        <Text style={styles.owner}>Room Owner: Rajat Sir</Text>

        <FlatList
          data={content}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 140}}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.downloadAllBtn} onPress={() => navigation.navigate("Advanced_Physics")}>
          <Image
            source={require('../../assets/img/down.png')}
            style={styles.downloadAllIcon}
          />
          <Text style={styles.downloadAllText}>Download All Content</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Content_page;

const getTypeColor = type => {
  switch (type) {
    case 'video':
      return {backgroundColor: '#00C8A0'};
    case 'pdf':
      return {backgroundColor: '#FF7043'};
    case 'ppt':
      return {backgroundColor: '#FF4081'};
    default:
      return {backgroundColor: '#ccc'};
  }
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  headerTextContainer: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 2,
  },
  backIcon: {width: 21, height: 21, marginRight: 12},
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter',
  },
  subTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: 'Inter',
  },
  container: {flex: 1, paddingHorizontal: 16},
  classTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 10,
    fontFamily: 'Inter',
  },
  owner: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 8,
    color: '#000000',
    fontFamily: 'Inter',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#701DDB',
    borderRadius: 8,
  },
  uploadIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  uploadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    width: 22,
    height: 22,
    marginLeft: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  downloadAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#701DDB',
    borderRadius: 8,
    marginTop: 16,
  },
  downloadAllIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  downloadAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  previewBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  previewText: {
    fontSize: 13,
    color: '#374151',
    fontFamily: 'Inter',
  },
});
