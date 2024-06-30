import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation
import styles  from '../../styles/Studymaterials.styles';
import StudyApiService from '../../services/api/StudyApiService';
import { useCurrentId } from '../../context/IdReducer';
import { ScrollView } from 'react-native-gesture-handler';
import { BLOBURL } from '../../config/urls';
import { ColorsConstant } from '../../constants/Colors.constant';
import NoDataFound from '../../components/NoDataFound';
import Toast from 'react-native-toast-message';
const FreePdf = () => {
  const navigation = useNavigation()
  const saved = new StudyApiService();

  const [loading,setloading]=useState();
  const [freePdf,setFreepdf]=useState([])
  const {idState, dispatch} = useCurrentId();
  useEffect(()=>{
  listpdf()
  },[])
  
  async function listpdf (){
    setloading(true)
    try {
      let res = await saved.listPdfs(idState.id);
      if(res.status===1){
        setFreepdf(res.send_data)
      }else{
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting list of pdfs', err.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Something went wrong',
      // });
    }finally{
      setloading(false)
    }
  }
  return (

    <>
    <View style={{zIndex:1,}}>
    <Toast/>
    
    </View>
    <View style={styles.container}>
   
    <ScrollView>
    { 
      loading
      ? (
        <ActivityIndicator color={ColorsConstant.Theme} size={35} />
      ) : freePdf.length === 0 ? (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <NoDataFound
            message={'No Data Found'}
            action={listpdf}
            actionText={'Reload'}
          />
        </View>
      ) :
      
    freePdf.map((res)=>{
    return(
      <TouchableOpacity key={res.cat_id}
      onPress={() => navigation.navigate("QuestionPapers", {pdf_id : res.pdf_type} )}
      style={styles.touchableOpacity}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri:BLOBURL+res.logo}}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{res.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Total</Text>
            <Text style={[styles.detailsText, styles.count]}>{res.count}</Text>
            <Text style={styles.detailsText}>PDFs</Text>
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Image
              source={require('../../assets/img/right-arr.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    )
  })
    }
    </ScrollView>
    </View>
    </>
    
  );
};

export default FreePdf;

