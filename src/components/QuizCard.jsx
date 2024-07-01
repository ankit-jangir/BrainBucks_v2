import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from '../utils/Translate';
import { LinearProgress } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import homeStyles from '../styles/Home.styles';
import { ColorsConstant } from '../constants/Colors.constant';

const QuizCard = ({
  onPress,
  image,
  title,
  fees,
  prize,
  date,
  totalslots,
  alotedslots,
  type,
  minper,
  btntxt,
  invitebtn,
  roomname
}) => {

  return (
    <>
      <View
        style={{
          backgroundColor: '#ffffff',
          margin: 10,
          padding: 20,
          borderRadius: 8,
          elevation: 3,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image
              source={image}
              style={{ width: 35, height: 35, borderRadius: 100 }}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                paddingLeft: 20,
                fontWeight: '700',
              }}>
              {title}
            </Text>
          </View>
        </View>

        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text
                  style={{
                    color: 'rgba(126, 126, 126, 1)',
                    fontSize: 14,
                    paddingLeft: 6,
                    fontWeight: '500',
                  }}>
                  Entry Fees
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/img/bbcoin.png')}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
                <Text
                  style={{
                    color: 'rgba(245, 184, 7, 1)',
                    fontSize: 16,
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>
                  {type === 'trivia' || type == 0 ? '0' : fees}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Image
                  source={require('../assets/img/calendar.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{ width: 17, height: 17 }}
                />
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 0 }}>
                <Text
                  style={{
                    color: 'rgba(138, 138, 138, 1)',
                    fontSize: 14,
                    fontWeight: '600',
                    paddingLeft: 5,
                  }}>
                  {date?.substr(0, 10)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text
                  style={{
                    color: 'rgba(126, 126, 126, 1)',
                    fontSize: 14,
                    paddingLeft: 6,
                    fontWeight: '500',
                  }}>
                  Reward
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/img/bbcoin.png')}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
                <Text
                  style={{
                    color: 'rgba(245, 184, 7, 1)',
                    fontSize: 16,
                    fontWeight: '600',
                    paddingLeft: 5,
                  }}>
                  {prize}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 17 }}>
              <View style={{}}>
                <Image
                  source={require('../assets/img/time2.png')}
                  resizeMode="contain"
                  tintColor={'rgba(138, 138, 138, 1)'}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={{ paddingLeft: 4 }}>
                <Text
                  style={{
                    color: 'rgba(138, 138, 138, 1)',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  {date?.substr(11, 8)}
                </Text>
              </View>
            </View>
          </View>
        </>

        <>
          {
            roomname&&
            <View style={{ flexDirection: 'row', paddingVertical:20, gap:12, alignItems:'center' }}>
              <Image style={{width:20, height:17.5, objectFit:'contain'}} source={require('../assets/img/roomsimgs.png')} />
              <Text style={{color:ColorsConstant.Black, fontFamily:"Inter", fontWeight:'700', fontSize:16}}>{roomname}</Text>
            </View>
          }
        </>

        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              source={type === 'trivia' || type == 0 ? require('../assets/img/cup.png') : require('../assets/img/dollar.png')} // <QuizCard image={{uri:'as;dfl'}} image={require('')}/>>
              resizeMode="contain"
              tintColor={type === 'trivia' || type == 0 ? '#C922E4' : '#333333'}
              style={{ width: 25, height: 25 }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              {
                type === 'trivia' || type == 0 ?
                  <Text
                    style={{
                      color: type === 'trivia' || type == 0 ? '#C922E4' : '#2188E7',
                      fontFamily: 'WorkSans-SemiBold',
                      fontSize: 18,
                    }}>{minper}%</Text>
                  :
                  <>
                    <Text
                      key={alotedslots}
                      style={{
                        color: type === 'trivia' || type == 0 ? '#C922E4' : '#2188E7',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: 18,
                      }}>
                      {alotedslots}/
                    </Text>
                    <Text
                    key={totalslots}
                      style={{
                        color: type === 'trivia' || type == 0 ? '#C922E4' : '#333333',

                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: 18,
                      }}>
                      {totalslots}
                    </Text>
                  </>
              }
            </View>
          </View>

          <View style={styles.LiniView}>
            <View style={styles.LiniView1}>
              <LinearProgress
                style={{ marginVertical: 10, height: 8, borderRadius: 10 }}
                value={minper ? minper / 100 : alotedslots / totalslots}
                variant="determinate"
                color={type === 'trivia' || type == 0 ? '#C922E4' : '#54ACFD'}
              />
            </View>
          </View>
        </>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          {type === 'active' || type == 1 ? (
            <TouchableOpacity
              style={{ marginTop: 1, flex: 1 }}
              onPress={onPress}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.6, y: 2.0 }}
                colors={['#54ACFD', '#2289E7']}
                style={{ borderRadius: 10 }}>
                <Text
                  style={{ textAlign: 'center', padding: 15, borderRadius: 10, color: "white" }}>
                  {btntxt ? btntxt : "Register NOW"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : type === 'trivia' || type == 0 ? (
            <TouchableOpacity
              onPress={onPress}
              style={{
                flex: 1,
                height: 45,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#C922E4',
                marginTop: 4,
              }}>
              <Text
                style={{
                  color: '#C922E4',
                  fontSize: 14,
                  fontFamily: 'WorkSans-Medium',
                }}>
                {btntxt ? btntxt : "Participate Now"}
              </Text>
            </TouchableOpacity>
          ) : type === 'enrolled' ? (
            <TouchableOpacity
              style={{ marginTop:1 , flex:1 }}
              onPress={onPress}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.6, y: 2.0 }}
                colors={['#54ACFD', '#2289E7']}
                tyle={{ borderRadius: 10 }}>
                <Text
                  style={{ textAlign: 'center', padding: 15, borderRadius: 10, color: "white" }}>
                  {btntxt ? btntxt : "JOIN NOW"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : <></>}
          {
            invitebtn &&
            <Button
              icon={
                <Image
                  style={styles.backRoomEnterImg}
                  source={require('../assets/img/whatsapp.png')} />
              }
              containerStyle={{ flex: 1 }}
              buttonStyle={styles.roomEnterShareBtn}
              title={"Invite"}
            />
          }
        </View>
      </View>
    </>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  ...homeStyles,
  backRoomEnterImg: {
    height: 22,
    width: 22,
    marginRight: 10,
    marginLeft: -10
  },
  roomEnterShareBtn: {
    backgroundColor: '#16AC72',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    flex: 1
  },


})