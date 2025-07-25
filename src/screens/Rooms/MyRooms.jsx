import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/Rooms.styles';
import styles2 from '../../styles/Studymaterials.styles';
import {Text} from '../../utils/Translate';
import JoinedRooms from './JoinedRooms';
import CreatedRooms from './CreatedRooms';
import PendingRequests from './PendingRequests';
import BasicServices from '../../services/BasicServices';
import {useIsFocused} from '@react-navigation/native';

export default function MyRooms({navigation, route}) {
  const [selected, setSelected] = useState(null); // Initially null
  const [userType, setUserType] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      BasicServices.getUserType().then(type => {
        console.log('User Type (is_edu): roomjoid>>>>', type);
        setUserType(type);
        // Set default tab based on userType
        setSelected(type === true ? 'Created' : 'Joined');
      });
    }
  }, [isFocused]);

  if (selected === null) return null; // Optional: wait for state to initialize

  return (
    <>
      {userType === true ? (
        <>
          <CreatedRooms navigation={navigation} />
        </>
      ) : (
        <>
          <View
            style={[
              styles.roomContainer,
              {padding: 0, borderRadius: 0, marginVertical: 0},
            ]}>
            <View style={[styles2.container, {margin: 0, borderRadius: 0}]}>
              <TouchableOpacity
                style={[
                  styles2.button1,
                  selected === 'Joined'
                    ? styles2.selectedButton
                    : styles2.deselectedButton,
                  {paddingHorizontal: 30},
                ]}
                onPress={() => setSelected('Joined')}>
                <Text
                  style={[
                    styles2.text,
                    selected === 'Joined'
                      ? styles2.selectedText
                      : styles2.deselectedText,
                  ]}>
                  Joined
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles2.button,
                  selected === 'Created'
                    ? styles2.selectedButton
                    : styles2.deselectedButton,
                  {paddingHorizontal: 20},
                ]}
                onPress={() => setSelected('Created')}>
                <Text
                  style={[
                    styles2.text,
                    selected === 'Created'
                      ? styles2.selectedText
                      : styles2.deselectedText,
                  ]}>
                  Created
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles2.button,
                  selected === 'Pending'
                    ? styles2.selectedButton
                    : styles2.deselectedButton,
                  {paddingHorizontal: 30},
                ]}
                onPress={() => setSelected('Pending')}>
                <Text
                  style={[
                    styles2.text,
                    selected === 'Pending'
                      ? styles2.selectedText
                      : styles2.deselectedText,
                  ]}>
                  Pending
                </Text>
              </TouchableOpacity>
            </View>

            {/* Conditionally render components based on selection and userType */}
            {selected === 'Joined' && <JoinedRooms navigation={navigation} />}
            {selected === 'Created' && <CreatedRooms navigation={navigation} />}
            {selected === 'Pending' && (
              <PendingRequests navigation={navigation} />
            )}
          </View>
        </>
      )}
    </>
  );
}
