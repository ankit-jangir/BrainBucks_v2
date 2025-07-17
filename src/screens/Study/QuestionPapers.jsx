import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Linking,
  StyleSheet,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Text } from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Image } from '@rneui/base';
import styles from '../../styles/Studymaterials.styles';
import StudyApiService from '../../services/api/StudyApiService';
import Toast from 'react-native-toast-message';
import { useCurrentId } from '../../context/IdReducer';
import NoDataFound from '../../components/NoDataFound';
import { BLOBURL } from '../../config/urls';
import ReactNativeBlobUtil from 'react-native-blob-util';
import MainHeader from '../../components/MainHeader';
import { useNavigation } from '@react-navigation/native';
export default function QuestionPaperList({ navigation, route }) {
  const pdf_id = route.params.pdf_id;
  const [searchQuery, setSearchQuery] = useState('');
  const saved = new StudyApiService();
  const [loading, setloading] = useState();
  const [ViewPdf, setViewPdf] = useState([]);
  const { idState, context } = useCurrentId();
  console.log(idState)
const navigate = useNavigation()

  useEffect(() => {
    viewPdf();
  }, []);

const downloadPDF = async (url, title) => {
  try {
    const fileUrl = BLOBURL + url;
    console.log('Downloading from:', fileUrl);

    // Sanitize file name to avoid invalid characters
    const sanitizeFileName = (name) => {
      return name.replace(/[^a-zA-Z0-9._-]/g, '_');
    };
    const fileName = title.endsWith('.pdf') ? sanitizeFileName(title) : `${sanitizeFileName(title)}.pdf`;

    // Try public Downloads folder
    const publicDownloadPath = `/storage/emulated/0/Download/${fileName}`;
    console.log('Target public path:', publicDownloadPath);

    // Fallback to cache if Download Manager fails
    const cachePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
    console.log('Fallback cache path:', cachePath);

    try {
      // First attempt with Download Manager
      const res = await ReactNativeBlobUtil.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: fileName,
          description: 'Downloading PDF file...',
          mime: 'application/pdf',
          path: publicDownloadPath,
        },
      }).fetch('GET', fileUrl);

      ToastAndroid.show('Download Successful', ToastAndroid.LONG);
      console.log('✅ File saved to:', res.path());
      // Force media scan for public Downloads folder
      await ReactNativeBlobUtil.fs.scanFile([{ path: publicDownloadPath }]);
    } catch (err) {
      console.error('❌ Download Manager error:', err);
      ToastAndroid.show('Download Manager failed, trying fallback...', ToastAndroid.LONG);

      // Fallback: Save to cache and copy to public Downloads
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: cachePath,
      }).fetch('GET', fileUrl);

      // Copy file from cache to public Downloads
      await ReactNativeBlobUtil.fs.cp(cachePath, publicDownloadPath);
      console.log('✅ File copied to:', publicDownloadPath);
      ToastAndroid.show('Download Successful (Fallback)', ToastAndroid.LONG);

      // Force media scan for public Downloads folder
      await ReactNativeBlobUtil.fs.scanFile([{ path: publicDownloadPath }]);

      // Clean up cache file
      await ReactNativeBlobUtil.fs.unlink(cachePath);
    }
  } catch (error) {
    console.error('Error in downloadPDF:', error);
    ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
  }
};

async function viewPdf(search = '') {
    setloading(true);
    try {
      let res = await saved.getStudyMaterial(idState.id, pdf_id, search);

      if (res.status === 1) {
        setViewPdf(res.data);
      } else {
        ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <View style={{ zIndex: 1 }}>
        <Toast />
      </View>
      <View style={StyleConstants.safeArView}>
        <MainHeader
          name={'Question Papers'}
          leftIcon={{
            type: 'image',
            source: require('../../assets/img/backq.png'), // provide the image source
            onPress: () => {
              navigate.goBack()
            },
          }}
        />
        <View style={styles.inputV}>
          <View style={styles.inputV1}>
            <View style={styles.inputv2}>
              <TouchableOpacity style={{ flex: 0.1 }}>
                <Image
                  source={require('../../assets/img/search.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.Inview}
                placeholder="Search for Previous year papers"
                placeholderTextColor={'#7E7E7E'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => viewPdf(searchQuery)}
              />

            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => viewPdf()} />
            }
          >
            {loading ? (
              <ActivityIndicator color={ColorsConstant.Theme} size={35} />
            ) : ViewPdf.length === 0 ? (
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NoDataFound
                  message={'No Data Found'}
                  action={viewPdf}
                  actionText={'Reload'}
                />
              </View>
            ) : (
              ViewPdf.map(res => {
                return (
                  <View key={res._id} style={styles.PView}>
                    <TouchableOpacity style={styles.Ptouch}>
                      <View style={styles.downView}>
                        <View>
                          <Text style={styles.textQue}>{res.display_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            style={{ paddingRight: 15 }}
                            onPress={() => {
                              navigation.navigate('viewpdf', { pdf: res });
                            }}>
                            <Image
                              source={require('../../assets/img/pdf.png')}
                              style={{ height: 30, width: 30 }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ paddingRight: 8 }}
                            onPress={() => {
                              downloadPDF(res.filename, res.display_name);
                            }}>
                            <Image
                              source={require('../../assets/img/downloading.png')}
                              style={{ height: 30, width: 30 }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
