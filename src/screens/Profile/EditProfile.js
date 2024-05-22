import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, SafeAreaView, TextInput, Modal, ActivityIndicator, ToastAndroid, PermissionsAndroid, ScrollView, StyleSheet } from 'react-native';
import { ColorsConstant } from '../../../constants/Colors.constant';
import { StyleConstants } from '../../../constants/Style.constant';
import styles from '../../../styles/ViewProfile.styles';
export default function EditProfile({ navigation, route }) {
  const ref_input0 = useRef();
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const inputs = [ref_input0, ref_input1, ref_input2, ref_input3,];
  const choosegender = [
    {
      gen: 'male',
      image: require('../../assets/img/boy.png'),
    },
    {
      gen: 'female',
      image: require('../../assets/img/gengirl.png'),
    },
    {
      gen: 'No Say',
      image: require('../../assets/img/nosay.png'),
    },
  ]


  const [otp, setOTP] = useState(['', '', '', '',]);
  const [checked, setChecked] = useState(false);
  const [state, setstate] = useState({ checked: "Boy" });
  const [gender, setGender] = useState(choosegender);
  const [modalVisible, setModalVisible] = useState(false);
  const [getBase64, setBase64] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [image1, setImage1] = useState('https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png')
 
  
  return (
    <>
      <SafeAreaView style={StyleConstants.safeArView}>

              <View style={styles.Saveview} >
                <View style={styles.Saveview1} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={StyleConstants.H2Nd} >
                  <Image source={require('../../assets/img/arrows.png')} style={{height:20,width:20}}/>
                </TouchableOpacity>
                  <TouchableOpacity  style={styles.touchArrow} >
                  <Text style={styles.textSave}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView>
                <View style={styles.Cview} >
                  <View style={{ flexDirection: "row", }} >
                    <View style={styles.Cview1} >
                      <View style={styles.Cview2} >
                        <Image source={{ uri: image1 }} resizeMode='contain' style={styles.ProfileImg} />
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={{ width: '100%', marginVertical: 10 }} >
                    <Text style={styles.textChnage}>Change Picture</Text>
                  </TouchableOpacity>
                  <View style={styles.TextName}>
                    <View style={styles.viewName} >
                      <Text style={styles.textContact} >Name</Text>
                    </View>

                    <View style={styles.inputView}>
                      <TextInput value={name} onChangeText={(value) => setName(value)} style={styles.inputTe} placeholder='Enter Your Name' placeholderTextColor={'#000'} />
                    </View>
                  </View>

                  <View style={styles.TextName}>
                    <View style={styles.viewName} >
                      <Text style={styles.textContact} >Contact Number</Text>
                    </View>

                    <View style={styles.inputView}>
                      <TextInput value={name} onChangeText={(value) => setName(value)} style={styles.inputTe} placeholder='Enter Your Name' placeholderTextColor={'#000'} />
                    </View>
                  </View>
                  <View style={styles.Genderview}>
                    <Text style={styles.textContact}>My Gender</Text>
                    <View style={styles.Gmap}>
                      {
                        gender.map((item, index) => (
                          <SelectGender item={item} key={index} state={state} setstate={setstate} />
                        ))
                      }
                    </View>
                  </View>
                </View>
              </ScrollView>
      </SafeAreaView>
    </>
  )
}

const SelectGender = (props) => {
  return (
    <View style={{ alignItems: "center", }}>
      <TouchableOpacity onPress={() => { props.setstate({ checked: props.item.gen }); }} style={{ width: 80, height: 80, alignItems: "center", borderRadius: 100, backgroundColor: "whitesmoke", justifyContent: 'flex-end', borderColor: props.state.checked == props.item.gen && props.state.checked ? '#12D95B' : ColorsConstant.White, borderWidth: 1 }}>
        <View style={styles.Selectview}>
          <Image source={props.item.image} resizeMode='contain' style={{ width: 60, height: 60, borderRadius: 100, }} uncheckedColor={"#DBDBDB"}
            color={ColorsConstant.White}
            value={props.item.gen}
            label="Carto Base MAp"
            status={props.state.checked === props.item.gen ? 'checked' : 'unchecked'}>
          </Image>
        </View>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 16, color: props.state.checked === props.item.gen ? '#12D95B' : '#8A8C94', paddingTop: 5 }}>{props.item.gen}</Text>
    </View>
  )
}



