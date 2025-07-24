import {View, TouchableOpacity, Image, Share, Alert, Text} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/RoomEnter.styles';
import {Button} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import LiveQuizzes from './LiveQuizzes';
import ScheduledQuizzes from './ScheduledQuizzes';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoom} from '../../utils/store';
import {APPURL} from '../../config/urls';

const Tab = createMaterialTopTabNavigator();

// Custom TabBar component embedded
const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, { flex: 1 }]}>
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
              {isFocused && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function RoomEnter({navigation, route}) {
  const room_data = useRoom(state => state.currentRoom);
  const [selected, setSelected] = useState('Quizzes');
  const type = route.params.type;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${APPURL}/rooms?id=${room_data.room_hash ? room_data.room_hash : room_data.room_name}&type=${room_data.room_hash ? 'private' : 'public'}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.enterRoomMainContainer}>
      <View style={styles.firstEnter}>
        <View style={styles.backandhistory}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backimg, {padding: 20, backgroundColor: '#8D4AE2'}]}>
            <Image
              style={[styles.backimg]}
              resizeMethod="contain"
              tintColor={'white'}
              source={require('../../assets/img/backq.png')}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
            {type === 'created' && (
              <Button
                icon={
                  <Image
                    style={styles.histImg}
                    source={require('../../assets/img/mail.png')}
                  />
                }
                onPress={() => {
                  navigation.navigate('RoomNotification');
                }}
                buttonStyle={{
                  backgroundColor: '#8D4AE2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  gap:5
                }}
                title={'9+'}
                titleStyle={{fontSize: 14}}
              />
            )}

            <Button
              icon={
                <Image
                  style={styles.histImg}
                  source={
                    type === 'created'
                      ? require('../../assets/img/setting.png')
                      : require('../../assets/img/historywatch.png')
                  }
                />
              }
              onPress={() => {
                type === 'created'
                  ? navigation.navigate('roomsetting', {type: type})
                  : navigation.navigate('roomhistory');
              }}
              buttonStyle={{
                backgroundColor: '#8D4AE2',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                paddingHorizontal: 15,
                gap:5
              }}
              title={type === 'created' ? 'Settings' : 'History'}
              titleStyle={{fontSize: 14}}
            />
          </View>
        </View>



        <View style={styles.detailsContainer}>
          <Text style={[styles.roomNameText, {color: ColorsConstant.White}]}>
            {room_data.room_name}
          </Text>
          <Text style={[styles.memberText, {color: ColorsConstant.White}]}>
            Members:{' '}
            <Text
              key={room_data?.enrolled_participants_count}
              style={{color: ColorsConstant.GreenColor}}>
              {room_data.enrolled_participants_count}
            </Text>
            <Text style={{color: ColorsConstant.White}}>{}</Text>
          </Text>
          <View style={styles.invitePrev}>
            <Button
              icon={
                <Image
                  style={styles.backRoomEnterImg}
                  tintColor={'white'}
                  source={require('../../assets/img/share.png')}
                />
              }
              buttonStyle={styles.roomEnterShareBtn}
              titleStyle={{fontSize: 12}}
              title={'Invite'}
              onPress={onShare}
            />
            <Text style={{fontSize: 12, color: 'white'}}>
              {room_data.room_hash ? 'Private' : 'Public'}
            </Text>
          </View>

          <View style={[styles.container, {marginHorizontal: 0}]}>
            {type === 'created' ? (
              <View style={styles.roomContainerBtns}>
                <Button
                  titleStyle={[styles.enterbtn]}
                  containerStyle={styles.enterbtncontainer}
                  buttonStyle={{backgroundColor: '#0CBC8B'}}
                  title={' + Schedule Quiz'}
                  onPress={() => {
                    navigation.navigate('schedulquiz');
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>

      <View style={styles.secondEnter}>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="Live Quizzes" component={LiveQuizzes} />
          <Tab.Screen name="Scheduled Quizzes" component={ScheduledQuizzes} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
