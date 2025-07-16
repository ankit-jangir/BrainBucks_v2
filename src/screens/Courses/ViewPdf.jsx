import {ActivityIndicator, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import Pdf from 'react-native-pdf';
import {screenHeight, screenWidth} from '../../constants/Sizes.constant';
import {Text} from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import {BLOBURL} from '../../config/urls';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function ViewPdf({navigation, route}) {
  let url = route.params.pdf.pdf_url
    ? route.params.pdf.pdf_url
    : route.params.pdf.filename;
  let pdf = route.params.pdf;
  const [loading, setLoading] = useState(false);

const downloadPDF = async (url, title) => {
  try {
    const fileUrl = BLOBURL + url;
    console.log('Downloading from:', fileUrl);

    // Sanitize file name to avoid invalid characters
    const sanitizeFileName = (name) => {
      return name ? name.replace(/[^a-zA-Z0-9._-]/g, '_') : 'default_pdf';
    };

    // Use a default title if undefined
    const safeTitle = title || 'downloaded_file';
    const fileName = safeTitle.endsWith('.pdf') ? sanitizeFileName(safeTitle) : `${sanitizeFileName(safeTitle)}.pdf`;

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

  const source = {uri: BLOBURL + url, cache: true};
  return (
    <View style={styles.container}>
      <View style={{zIndex: 200}}>
        <Toast />
      </View>
      {loading ? (
        <ActivityIndicator size={20} />
      ) : (
        <TouchableOpacity onPress={() => downloadPDF(url, pdf.title)}>
  <Text style={styles.downloadbutt}>Download</Text>
</TouchableOpacity>
      )}
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoading(false);
        }}
        onError={error => {
          setLoading(false);
          console.log('Error in pdf viewing: ', error);
                  ToastAndroid.show("Couldn't load pdf", ToastAndroid.SHORT);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        onLoadProgress={() => {
          setLoading(true);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  pdf: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  downloadbutt: {
    color: '#fff',
    padding: 5,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 5,
  },
});
