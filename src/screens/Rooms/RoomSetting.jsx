import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/Rooms.styles';
import {Button, Text} from '../../utils/Translate';
import styles2 from '../../styles/Studymaterials.styles';
import CreatedRooms from './CreatedRooms';
import JoinedRooms from './JoinedRooms';
import {ColorsConstant} from '../../constants/Colors.constant';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {Overlay} from '@rneui/themed';

const RoomSetting = ({navigation}) => {
  const [selected, setSelected] = useState('Joined');
  const [visible, setVisible] = useState(false);

  function toggleOverlay() {
    setVisible(!visible);
  }

  const data = [
    {
      id: '1',
      name: 'kajal',
      isleader: 'online',
      isCurrentUser: true,
    },
    {
      id: '2',
      name: 'kajal',
      isleader: 'offline',
      isCurrentUser: false,
    },
    {
      id: '1',
      name: 'kajal',
      isleader: 'online',
      isCurrentUser: true,
    },
    {
      id: '2',
      name: 'kajal',
      isleader: 'offline',
      isCurrentUser: false,
    },
    {
      id: '1',
      name: 'kajal',
      isleader: 'online',
      isCurrentUser: true,
    },
    {
      id: '2',
      name: 'kajal',
      isleader: 'offline',
      isCurrentUser: false,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Hview2}>
        <View style={styles.Hviews}>
          <View style={styles.THead1}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/img/arrows.png')}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.TextMy1}>Setting</Text>
          </View>
          <View>
            <Button
              buttonStyle={{
                backgroundColor: '#F2F2F2',
                alignItems: 'center',
                justifyContent: 'center',
                boderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
              titleStyle={{color: '#606060'}}
              title={'save'}
            />
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
        <View>
          <Text
            style={{
              color: '#8A8A8A',
              fontfamily: 'Work Sans',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Name
          </Text>
        </View>
        <View style={styles.RasContainer}>
          <Text style={styles.RasContainerText}>RAS Rookies</Text>
        </View>

        <View style={styles.HistoryV}>
          <View style={styles.HistoryV1}>
            <Image
              source={require('../../assets/img/time2.png')}
              resizeMode="contain"
              style={{width: 20, height: 20}}
              tintColor={'white'}
            />
            <Button
              title={'History'}
              buttonStyle={{backgroundColor: '#8D4AE2'}}
              onPress={() => navigation.navigate('roomhistory')}
            />
          </View>
          <View style={styles.HistoryV2}>
            <Image
              source={require('../../assets/img/redbin.png')}
              resizeMode="contain"
              style={{width: 20, height: 20}}
              tintColor={'#D92828'}
              titleStyle={{color: '#D92828'}}
            />
            <Button
              title={'Delete Room'}
              buttonStyle={{backgroundColor: '#FFF4F4'}}
              titleStyle={{color: '#D92828'}}
            />
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Button
            icon={
              <Image
                style={{height: 25, width: 25, marginRight: 10}}
                source={require('../../assets/img/whatsapp.png')}
              />
            }
            buttonStyle={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#129C73',
              borderRadius: 5,
            }}
            titleStyle={{color: '#129C73'}}
            title={'Invite Participants'}
          />
        </View>
      </View>

      <View style={{paddingLeft: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontfamily: 'Work Sans',
            color: 'black',
            fontWeight: '500',
          }}>
          Room Type
        </Text>
      </View>
      <View style={styles2.container}>
        <TouchableOpacity
          style={[
            styles2.button2,
            selected === 'Joined'
              ? styles2.selectedButton1
              : styles2.deselectedButton1,
          ]}
          onPress={() => setSelected('Joined')}>
          <Text
            style={[
              styles2.text,
              selected === 'Joined'
                ? styles2.selectedText
                : styles2.deselectedText,
            ]}>
            Public
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles2.buttonP,
            selected === 'Created'
              ? styles2.selectedButton1
              : styles2.deselectedButton1,
          ]}
          onPress={() => setSelected('Created')}>
          <Text
            style={[
              styles2.text,
              selected === 'Created'
                ? styles2.selectedText
                : styles2.deselectedText,
            ]}>
            Private
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{margin: 10, flex: 1}}>
        <Text style={styles.memberText1}>
          Members: <Text style={{color: '#129C73'}}>{20}</Text>
          <Text style={{color: '#000000'}}>/30</Text>
        </Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <View style={styles.container1}>
                <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/img/boy.png')}
                      style={styles.image}
                      resizeMethod="cover"
                    />
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text style={styles.nameText}>{item.name}</Text>
                      {item.isCurrentUser && (
                        <Text style={{color: '#7E7E7E'}}>Me</Text>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text style={styles.roleText}>
                        {item.isleader === 'online' ? 'Leader' : 'Member'}
                      </Text>
                      <Text
                        style={
                          item.isleader === 'online'
                            ? styles.onlineStatus
                            : styles.offlineStatus
                        }>
                        {item.isleader.charAt(0).toUpperCase() +
                          item.isleader.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
                {item.isleader === 'offline' && (
                  <TouchableOpacity
                    style={styles.kickOutButton}
                    onPress={toggleOverlay}>
                    <Text style={styles.kickOutButtonText}>Kick Out</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.logoutView}>
          <Text style={styles.welcomeText}>
            Kick out{' '}
            <Text style={{color: 'balck', fontWeight: '600', fontSize: 21}}>
              Vikaram Singhvi
            </Text>{' '}
            from{' '}
            <Text style={{color: 'balck', fontWeight: '600', fontSize: 21}}>
              IAS Warriors
            </Text>
          </Text>
          <View style={styles.logoutbuttons}>
            <Button
              title="Yes"
              color={'#eb1313'}
              titleStyle={{
                color: 'white',
                fontSize: 15,
                padding: 15,
                paddingHorizontal: 30,
              }}
              buttonStyle={styles.logoutyesbutton}
              onPress={() => {
                
              }}
            />
            <Button
              color={'#129C73'}
              title="No"
              buttonStyle={styles.logoutyesbutton}
              titleStyle={{color: 'white', fontSize: 15, padding: 15}}
              onPress={toggleOverlay}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default RoomSetting;
