import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Studymaterials.styles'
import { Text } from '../../utils/Translate'
import JoinedRooms from './JoinedRooms'
import CreatedRooms from './CreatedRooms'
import Toast from 'react-native-toast-message'
import PendingRequests from './PendingRequests'

export default function MyRooms({ navigation }) {

  const [selected, setSelected] = useState('Joined');

  return (
    <>
      <View style={[styles.roomContainer, {padding:0, borderRadius:0, marginVertical:0}]}>
        <View style={[styles2.container, {margin:0, borderRadius:0,}]}>
          <TouchableOpacity
            style={[
              styles2.button1,
              selected === 'Joined' ? styles2.selectedButton : styles2.deselectedButton,
              {paddingHorizontal:30}
            ]}
            onPress={() => setSelected('Joined')}
          >
            <Text style={[
              styles2.text,
              selected === 'Joined' ? styles2.selectedText : styles2.deselectedText
            ]}>
              Joined
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.button,
              selected === 'Created' ? styles2.selectedButton : styles2.deselectedButton,
              {paddingHorizontal:30}
            ]}
            onPress={() => setSelected('Created')}
          >
            <Text style={[
              styles2.text,
              selected === 'Created' ? styles2.selectedText : styles2.deselectedText
            ]}>
              Created
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.button,
              selected === 'Pending' ? styles2.selectedButton : styles2.deselectedButton,
              {paddingHorizontal:30}
            ]}
            onPress={() => setSelected('Pending')}
          >
            <Text style={[
              styles2.text,
              selected === 'Pending' ? styles2.selectedText : styles2.deselectedText
            ]}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {selected === 'Joined' && (
          <JoinedRooms navigation={navigation} />
        )}
        {selected === 'Created' && (
          <CreatedRooms navigation={navigation} />
        )}
        {
          selected==='Pending' && (
            <PendingRequests navigation = {navigation}/>
          )
        }
      </View>
    </>
  )
}