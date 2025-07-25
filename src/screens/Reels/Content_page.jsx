import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const data = [
  {
    id: '1',
    date: '22 July 2025',
    type: 'video',
    title: 'Quadratic Equations',
    label: 'Upload Video',
  },
  {
    id: '2',
    date: '21 July 2025',
    type: 'pdf',
    title: 'Algebra Formulas',
    label: 'Upload PDF',
  },
  {
    id: '3',
    date: '20 July 2025',
    type: 'ppt',
    title: 'Geometry Basics',
    label: 'Upload PPT',
  },
];

const Content_page = () => {
      const navigation = useNavigation();
  const handleUpload = type => {
    if (type === 'video') {
      launchImageLibrary({mediaType: 'video'}, res => {
        if (res.assets && res.assets.length > 0) {
          // Add your toast here later
        }
      });
    } else {
      // Add your toast here later
    }
  };

  const handleDelete = title => {
    // Add your toast here later
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
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => handleUpload(item.type)}>
        <Text style={styles.uploadText}>{item.label}</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => { /* View action */ }}>
          {/* <Image source={require('./assets/view.png')} style={styles.actionIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.title)}>
          {/* <Image source={require('./assets/delete.png')} style={styles.actionIcon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backq.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Uploaded Content</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subTitle}>
          Stay updated with the latest notes, videos, and resources.
        </Text>

        <Text style={styles.classTitle}>Class 10 - Maths</Text>
        <Text style={styles.owner}>Room Owner: Rajat Sir</Text>

        <View style={styles.banner}>
          {/* <Image source={require('./assets/banner.png')} style={styles.bannerImg} /> */}
          <View style={styles.playOverlay}>
            {/* <Image source={require('./assets/play-button.png')} style={styles.playIcon} /> */}
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 140}}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.downloadAllBtn}
          onPress={() => { /* Download all */ }}>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 2,
  },
  backIcon: {
    width: 21,
    height: 21,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color:"#111827"
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  owner: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 30,
  },
  playIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
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
    color: '#555',
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
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  uploadBtn: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: '#444',
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
    backgroundColor: '#6A0DAD',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  downloadAllText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
