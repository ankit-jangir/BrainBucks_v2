import React, { useState, useEffect, useRef } from 'react';
import { View, Text , TouchableOpacity, Image, TextInput, ScrollView, RefreshControl, ActivityIndicator, ToastAndroid, StyleSheet, Button } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/SingUp.styles';

export default function SignUpExam({ navigation, route }) {
    const [refresh, setRefresh] = useState(false)
  const [exam, setExam] = useState([]);


  const data = [
    {
      text: 'Boy',
      image: require('../../assets/img/boy.png'),
    },
    {
        text: 'Girl',
      image: require('../../assets/img/gengirl.png'),
    },
    {
        text: 'No Say',
      image: require('../../assets/img/nosay.png'),
    },
  ];



    const onRefresh = () => {
        setRefresh(true);
        setTimeout(() => {
          setRefresh(false);
        }, 3000);
      }
  return (
    <View style={styles.containerView}>
      <View style={styles.FinalView} >
        <View style={styles.FinalView1}>
          <View style={styles.StepView}>
            <Text style={styles.TextFinal}>Final Step</Text>
            <Image source={require('../../assets/img/rightarrow.png')} resizeMode='contain' style={styles.ArrowPic} />
          </View>
        </View>
        <View style={styles.flowerView}>
          <Image source={require('../../assets/img/flower.png')} resizeMode='contain' style={styles.flowerPic} />
        </View>
      </View>

     




      <View style={styles.CardView}>
        <View style={styles.CardView2}>
          <Text style={styles.TextPrepare}>I am Preparing for</Text>
          <View style={styles.SearchView}>
            <TouchableOpacity style={{ flex: 0.10, }}>
          <Image source={require('../../assets/img/search.png')} resizeMode='contain' tintColor={ColorsConstant.GrayyColor} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>

            <TextInput style={styles.innput}
              placeholder="Search for Exams"
              placeholderTextColor={ColorsConstant.GrayyColor}
            />
          </View>
        </View>

        <ScrollView  style={{ flex: 1, paddingHorizontal: 20 }}>
                  {
            data.map((item)=>{
                return(
                <>
                <View style={styles.ExamView}>
      <View style={styles.ExamView2}>
        <View style={styles.CateView}>
          <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
        </View>
        <View style={styles.CateViewName}>
          <Text style={styles.CateName}>{item.text}</Text>
        </View>
        <View style={styles.TouchhView}>
          <TouchableOpacity style={styles.plus} >
            <Text style={{color:'#000'}} >+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
                </>
            )
            })
          }
        </ScrollView>
        <View style={styles.btnView}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
            style={[StyleConstants.Btn, { backgroundColor: ColorsConstant.Theme }]}>
            <Text style={[StyleConstants.BtnText, { color: ColorsConstant.White }]}>Start Preparing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


