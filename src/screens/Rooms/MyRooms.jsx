import { View,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/Rooms.styles'
import styles2 from '../../styles/Studymaterials.styles'
import { Text } from '../../utils/Translate'
import JoinedRooms from './JoinedRooms'
import CreatedRooms from './CreatedRooms'

export default function MyRooms({navigation}) {

    const [selected, setSelected] = useState('Joined');

  return (
    <View style={styles.roomContainer}>  
      <View style={styles2.container}>
        <TouchableOpacity
          style={[
            styles2.button1,
            selected === 'Joined' ? styles2.selectedButton : styles2.deselectedButton
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
            selected === 'Created' ? styles2.selectedButton : styles2.deselectedButton
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
      </View>

      {selected === 'Joined' && (
        <JoinedRooms navigation={navigation} />
      )}
      {selected === 'Created' && (
        <CreatedRooms navigation={navigation} />
      )}
    </View>
  )
}