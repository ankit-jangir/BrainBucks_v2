import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, ImageBackground, SafeAreaView, TextInput, Modal, ActivityIndicator, ToastAndroid, PermissionsAndroid, ScrollView, StyleSheet, Alert } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import styles from '../../styles/ViewProfile.styles';
import { Button, Text } from '../../utils/Translate';
import { color } from '@rneui/base';
import Toast from 'react-native-toast-message';
import { Overlay } from '@rneui/themed';
import AuthenticationApiService from '../../services/api/AuthenticationApiService';

export default function EditProfile({ navigation, route }) {

  const genders = [
    {
      gen: 'Boy',
      image: require('../../assets/img/boy.png'),
    },
    {
      gen: 'Girl',
      image: require('../../assets/img/gengirl.png'),
    },
    {
      gen: 'No Say',
      image: require('../../assets/img/nosay.png'),
    },
  ]
  const [isNameEditable, setNameEditable] = useState(false);
  const [isNumberEditable, setNumberEditable] = useState(false);
  const [image1, setImage1] = useState('https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png')

  const [user, setUser] = useState(route.params.userData);
  const [nameErrorMessage, setNameErrorMessage] = useState();
  const [numErrorMessage, setNumErrorMessage] = useState();
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const nameRef = useRef()
  const numRef = useRef()

  let auth = new AuthenticationApiService();

  function setGender(gender) {
    setUser({ ...user, gender: gender })
  }

  async function save() {
    if (loading) {
      return;
    }
    nameRef.current.blur()
    numRef.current.blur()
    setNameEditable(false)
    setNumberEditable(false)
    if (nameErrorMessage || numErrorMessage || user.phone.length !== 13) {
      setVisible(true)
      return;
    }
    try {
    setLoading(true)
      let resp = await auth.editProfile(user.gender, user.name, user.phone);
      if (resp.status === 1) {
        Toast.show("Profile updated succesfully")
      } else {
        Toast.show({
          type: 'error',
          text1: resp.Backend_Error
        })
      }
    } catch (err) {
      console.log("Error in updating profile", err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      })
    }
    finally {
      setLoading(false)
    }
  }

  function editName() {
    if (loading) {
      return
    }
    setNameEditable(true)
    setTimeout(() => {
      nameRef.current.focus()
    }, 100)
  }

  function editNumber() {
    if (loading) {
      return
    }
    setNumberEditable(true)
    setTimeout(() => {
      numRef.current.focus()
    }, 100)
  }

  function onNumberBlur() {
    if (user.phone.length !== 13) {
      setNumErrorMessage("Phone number must be of length 10")
    }

  }

  function onNameChange(text) {
    setNameErrorMessage(null)
    setUser({ ...user, name: text })
  }

  function onNameBlur() {
    if (user.name.trim().length === 0) {
      setNameErrorMessage("Name cannot be empty")
    }
  }

  function onNumberChange(text) {
    setNumErrorMessage(null)
    const regex = /^\d*$/;
    if (text.length <= 10 && regex.test(text)) {
      let first;
      if (text.length > 0) {
        first = text.charAt(0)
      }
      if (first && (first === '6' || first === '7' || first === '8' || first === '9')) {
        setUser({ ...user, phone: "+91" + text })
        return;
      } else if (!first) {
        setUser({ ...user, phone: "+91" + text })
      } else {
        setNumErrorMessage("Mobile number must be valid")
      }
    } else if (!regex.test(text)) {
      setNumErrorMessage("Only numbers are allowed")
    }
  }

  return (
    <>
      <SafeAreaView style={StyleConstants.safeArView}>
        <View style={{ zIndex: 100 }}>
          <Toast />
        </View>
        <View style={styles.Saveview} >
          <View style={styles.Saveview1} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={StyleConstants.H2Nd} >
              <Image source={require('../../assets/img/arrows.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={save} style={styles.touchArrow} >
              {
                loading
                  ? <ActivityIndicator style={styles.textSave} />
                  :
                  <Text style={styles.textSave}>Save</Text>
              }
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

              <View style={[styles.inputView, nameErrorMessage && { borderColor: "red", borderWidth: 1 }]}>
                <TextInput onBlur={onNameBlur} ref={nameRef} value={user.name} editable={isNameEditable} onChangeText={onNameChange} style={styles.inputTe} placeholder='Enter Your Name' placeholderTextColor={'gray'} />
                {
                  <TouchableOpacity style={{ padding: 10 }} onPress={() => { editName() }}>
                    <Image style={styles.penciledit} source={require("../../assets/img/pencil.png")} />
                  </TouchableOpacity>
                }
              </View>
            </View>
            {nameErrorMessage && <Text style={styles.errormsg} key={nameErrorMessage}>*{nameErrorMessage}</Text>}

            <View style={styles.TextName}>
              <View style={styles.viewName} >
                <Text style={styles.textContact} >Contact Number</Text>
              </View>

              <View style={[styles.inputView, numErrorMessage && { borderColor: "red", borderWidth: 1 }]}>
                <TextInput onBlur={onNumberBlur} ref={numRef} keyboardType='numeric' value={user?.phone?.slice(3)} editable={isNumberEditable} onChangeText={onNumberChange} style={styles.inputTe} placeholder='Enter Your Mobile No.' placeholderTextColor={'gray'} />
                {
                  <TouchableOpacity style={{ padding: 10 }} onPress={editNumber}>
                    <Image style={styles.penciledit} source={require("../../assets/img/pencil.png")} />
                  </TouchableOpacity>}
              </View>
            </View>
            {numErrorMessage && <Text style={styles.errormsg} key={numErrorMessage}>*{numErrorMessage}</Text>}
            <View style={styles.Genderview}>
              <Text style={styles.textContact}>My Gender</Text>
              <View style={styles.Gmap}>
                {
                  genders.map((item, index) => (
                    <SelectGender item={item} key={index} user={user} setGender={setGender} />
                  ))
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
          <View style={styles.logoutView}>
            <Text style={styles.logoutText}>*Entered details must be correct {" "}</Text>
            <View style={styles.logoutbuttons}>
              <Button
                color={"primary"}
                title="Enter Again"
                onPress={() => { setVisible(!visible) }} />
            </View>
          </View>
        </Overlay>
      </SafeAreaView>
    </>
  )
}

const SelectGender = (props) => {
  return (
    <View style={{ alignItems: "center", }}>
      <TouchableOpacity onPress={() => { props.setGender(props.item.gen) }} style={{ width: 80, height: 80, alignItems: "center", borderRadius: 100, backgroundColor: "whitesmoke", justifyContent: 'flex-end', borderWidth: 1, borderColor: props.user.gender.toLocaleLowerCase() == props.item.gen.toLocaleLowerCase() ? '#12D95B' : ColorsConstant.White, }}>
        <View style={styles.Selectview}>
          <Image source={props.item.image} resizeMode='contain' style={{ width: 60, height: 60, borderRadius: 100, }} uncheckedColor={"#DBDBDB"}
            color={ColorsConstant.White}
            value={props.item.gen}
            label="Carto Base MAp"
          >
          </Image>
        </View>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 16, color: props.user.gender === props.item.gen ? '#12D95B' : '#8A8C94', paddingTop: 5 }}>{props.item.gen}</Text>
    </View>
  )
}



