import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Pdf from 'react-native-pdf';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { Text } from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import { BLOBURL } from '../../config/urls';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function ViewPdf({navigation, route}) {
  let url = route.params.pdf.pdf_url;
  let pdf = route.params.pdf
  const [loading, setLoading] = useState(false)

  const downloadPDF = () => {
    Toast.show({
      type:'info',
      text1:"Downloading..."
    })
    const source = BLOBURL+url;
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
      .then((res)=>{
        Toast.show({
          type:'success',
          text1:"Download Succesful"
        })
      })
      .catch((err) => {
        console.log('Pdf Download Error -> ', err)
        Toast.show({
          type:'error',
          text1:"Download Failed."
        })
      }
    )
  };

  
  const source = { uri: BLOBURL+url, cache: true };
  return (
    <View style={styles.container}>
      <View style={{zIndex:200}}>
        <Toast/>
      </View>
      {
        loading?
        <ActivityIndicator size={20}/>
        :
        <TouchableOpacity onPress={downloadPDF}>
          <Text style={styles.downloadbutt}>Download</Text>
        </TouchableOpacity>
      }
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoading(false)
        }}
        onError={(error) => {
          setLoading(false)
          console.log("Error in pdf viewing: ",error);
          Toast.show({
            type:'error',
            text1:"Couldn't load pdf"
          })
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        onLoadProgress={()=>{
          setLoading(true)
        }}
        style={styles.pdf} />
    </View>
  )
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
    height: screenHeight
  },
  downloadbutt:{
    color:'#fff',
    padding:5,
    paddingHorizontal:8,
    fontSize:12,
    backgroundColor:'blue',
    marginBottom:10,
    borderRadius:5
  }
});