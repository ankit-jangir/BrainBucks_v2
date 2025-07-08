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

  const downloadPDF = () => {
    ToastAndroid.show('Downloading...', ToastAndroid.SHORT);
    const source = BLOBURL + url;
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${pdf.title}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: pdf.title,
        description: 'Brainbucks pdf downloaded',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', source)
      .then(res => {
        ToastAndroid.show('Download Succesful', ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log('Pdf Download Error -> ', err);
        ToastAndroid.show('Download Failed', ToastAndroid.SHORT);
      });
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
        <TouchableOpacity onPress={downloadPDF}>
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
