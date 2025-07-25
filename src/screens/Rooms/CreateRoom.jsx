import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/Rooms.styles';
import styles2 from '../../styles/Studymaterials.styles';
import {Button, Text, TextInput} from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import {createRoomInController} from '../../controllers/RoomsController';
import {ColorsConstant} from '../../constants/Colors.constant';
import CreateRoomSvg from '../../assets/img/Rectangle.svg';
import { useIsFocused } from '@react-navigation/native';
import BasicServices from '../../services/BasicServices';

export default function CreateRoom({navigation}) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('Private');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      BasicServices.getUserType().then(type => {
        console.log('User Type (is_edu)creatatta:', type);
        setUserType(type);
      });
    }
  }, [isFocused]);

  async function createRoom() {
    let type = selected === 'Public' ? 1 : 0;
    let res = await createRoomInController(
      type,
      name,
      setErrorMessage,
      setLoading,
    );
    if (res) {
      navigation.navigate('roomcreatedsuccess', {
        name: res.room_name,
        roomhash: res.room_hash,
      });
      setName('');
    }
  }

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backimg, {padding: 20}]}>
          <Image
            style={styles.backimg}
            source={require('../../assets/img/backq.png')}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{padding: 20}}>
            <Text style={styles.createroomtext}>
              Create Room & Compete with your Friends
            </Text>
           <CreateRoomSvg width={100} height={100} style={styles.createroomimg} />

           {
            userType===true?<>
              <View style={{marginTop: 20}}>
                <Text style={styles.createRoomOptionText}>Room Type</Text>
                <View style={[styles2.container, {marginHorizontal: 0}]}>
                  <TouchableOpacity
                    style={[
                      styles2.button,
                      selected === 'Private'
                        ? {backgroundColor: '#701DDB'}
                        : {backgroundColor: 'rgba(239, 239, 239, 1)'},
                      {flex: 1, paddingHorizontal: 0, alignItems: 'center'},
                    ]}
                    onPress={() => setSelected('Private')}>
                    <Text
                      style={[
                        styles2.text,
                        selected === 'Private'
                          ? styles2.selectedText
                          : styles2.deselectedText,
                      ]}>
                      Private
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles2.button,
                      selected === 'Public'
                        ? {backgroundColor: '#701DDB'}
                        : {backgroundColor: 'rgba(239, 239, 239, 1)'},
                      {flex: 1, paddingHorizontal: 0, alignItems: 'center'},
                    ]}
                    onPress={() => setSelected('Public')}>
                    <Text
                      style={[
                        styles2.text,
                        selected === 'Public'
                          ? styles2.selectedText
                          : styles2.deselectedText,
                      ]}>
                      Public
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.createRoomOptionText}>
                  Enter the name of Room
                </Text>
                <TextInput
                  style={[
                    styles.createRoomInput,
                    errorMessage && {borderWidth: 1, borderColor: 'red'},
                  ]}
                  placeholder={'Ex. My UPSC Room'}
                  placeholderTextColor={'gray'}
                  value={name}
                  onChangeText={text => {
                    setErrorMessage(null), setName(text);
                  }}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
                {errorMessage && (
                  <Text
                    key={errorMessage}
                    style={{color: 'red', fontSize: 15, marginTop: 10}}>
                    *{errorMessage}
                  </Text>
                )}
              </View>
            </>:<>
              <View style={{marginTop: 20}}>
                <Text style={styles.createRoomOptionText}>Room Type</Text>
                <View style={[styles2.container, {marginHorizontal: 0}]}>
                  <TouchableOpacity
                    style={[
                      styles2.button,
                      selected === 'Private'
                        ? {backgroundColor: '#701DDB'}
                        : {backgroundColor: 'rgba(239, 239, 239, 1)'},
                      {flex: 1, paddingHorizontal: 0, alignItems: 'center'},
                    ]}
                    onPress={() => setSelected('Private')}>
                    <Text
                      style={[
                        styles2.text,
                        selected === 'Private'
                          ? styles2.selectedText
                          : styles2.deselectedText,
                      ]}>
                      Private
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.createRoomOptionText}>
                  Enter the name of Room
                </Text>
                <TextInput
                  style={[
                    styles.createRoomInput,
                    errorMessage && {borderWidth: 1, borderColor: 'red'},
                  ]}
                  placeholder={'Ex. My UPSC Room'}
                  placeholderTextColor={'gray'}
                  value={name}
                  onChangeText={text => {
                    setErrorMessage(null), setName(text);
                  }}
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
                {errorMessage && (
                  <Text
                    key={errorMessage}
                    style={{color: 'red', fontSize: 15, marginTop: 10}}>
                    *{errorMessage}
                  </Text>
                )}
              </View>
            </>
           }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        loading={loading}
        loadingProps={{color: ColorsConstant.Theme, size: 26}}
        onPress={() => {
          createRoom();
        }}
        title={'Create Room'}
        buttonStyle={styles.createRoomBtn}
        containerStyle={{alignSelf: 'flex-end', width: '100%'}}
      />
    </SafeAreaView>
  );
}
