import {View, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import styles2 from '../../styles/Study.styles';
import {TextInput, Text} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import {joinPrivateRoomInController} from '../../controllers/RoomsController';
import Toast from 'react-native-toast-message';

export default function PrivateRooms({route}) {
  const [search, setSearch] = useState(route.params.id || '');

  async function sendRequest() {
    let res = await joinPrivateRoomInController(search, Toast);
    if (res) {
      ToastAndroid.show('Request sent Successfully', ToastAndroid.SHORT);
      setSearch('');
    }
  }

  return (
    <>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>

      <View style={styles.container}>
        <TextInput
          value={search}
          onChangeText={text => {
            setSearch(text);
          }}
          style={styles.textInput}
          placeholder="Enter Room Hash"
          placeholderTextColor={'#7E7E7E'}/>
        <TouchableOpacity
          onPress={sendRequest}
          style={styles.searchBtnTouchable}>
          <Text style={{color: '#fff'}}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  textInput: {
    fontSize: 13,
    fontFamily: 'WorkSans-Regular',
    color: ColorsConstant.Black,
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
  },
  searchBtnTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: ColorsConstant.Theme,
    margin: 20,
    borderRadius: 20,
    minHeight: 40,
  },
});
