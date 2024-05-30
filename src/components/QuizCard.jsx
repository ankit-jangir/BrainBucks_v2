import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../utils/Translate';
import styles from '../styles/Home.styles';
import {LinearProgress} from '@rneui/themed';
const QuizCard = ({
  onPress,
  image,
  title,
  fees,
  prize,
  date,
  time,
  totalslots,
  alotedslots,
  type,
}) => {
  // type - enum{'trivia','active','enrolled'}
  return (
    <>
      <View
        style={{
          backgroundColor: '#ffffff',
          margin: 10,
          padding: 15,
          borderRadius: 8,
          elevation: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={image}
              style={{width: 35, height: 35, borderRadius: 100}}
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

        {type === 'trivia' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text
                  style={{
                    color: 'rgba(126, 126, 126, 1)',
                    fontSize: 14,
                    paddingLeft: 6,
                    fontWeight: '500',
                  }}>
                  Fees
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
                  style={{width: 25, height: 25}}
                />
                <Text
                  style={{
                    color: 'rgba(245, 184, 7, 1)',
                    fontSize: 16,
                    fontWeight: '700',
                    paddingLeft: 5,
                  }}>
                  99
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text
                  style={{
                    color: 'rgba(126, 126, 126, 1)',
                    fontSize: 14,
                    paddingLeft: 6,
                    fontWeight: '500',
                    fontFamily: 'WorkSans-Medium',
                  }}>
                  Prize
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
                  style={{width: 25, height: 25}}
                />
                <Text
                  style={{
                    color: 'rgba(245, 184, 7, 1)',
                    fontSize: 16,
                    fontWeight: '600',
                    paddingLeft: 5,
                    fontFamily: 'WorkSans-Medium',
                  }}>
                  99
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      color: 'rgba(126, 126, 126, 1)',
                      fontSize: 14,
                      paddingLeft: 6,
                      fontWeight: '500',
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    Fees
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
                    style={{width: 20, height: 20}}
                  />
                  <Text
                    style={{
                      color: 'rgba(245, 184, 7, 1)',
                      fontSize: 16,
                      fontWeight: '700',
                      paddingLeft: 5,
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    {fees}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={require('../assets/img/time2.png')}
                    resizeMode="contain"
                    tintColor={'rgba(138, 138, 138, 1)'}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                  <Text
                    style={{
                      color: 'rgba(138, 138, 138, 1)',
                      fontSize: 14,
                      fontWeight: '500',
                      paddingLeft: 5,
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    {date}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      color: 'rgba(126, 126, 126, 1)',
                      fontSize: 14,
                      paddingLeft: 6,
                      fontWeight: '500',
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    Prize
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
                    style={{width: 20, height: 20}}
                  />
                  <Text
                    style={{
                      color: 'rgba(245, 184, 7, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      paddingLeft: 5,
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    {prize}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={require('../assets/img/calendar.png')}
                    resizeMode="contain"
                    tintColor={'rgba(138, 138, 138, 1)'}
                    style={{width: 16, height: 16}}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                  <Text
                    style={{
                      color: 'rgba(138, 138, 138, 1)',
                      fontSize: 14,
                      fontWeight: '500',
                      paddingLeft: 5,
                      fontFamily: 'WorkSans-Medium',
                    }}>
                    {date}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Image
            source={require('../assets/img/dollar.png')} // <QuizCard image={{uri:'as;dfl'}} image={require('')}/>>
            resizeMode="contain"
            tintColor={type==="trivia"?"#C922E4":'#333333'}
            style={{width: 25, height: 25}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: type === 'trivia' ? '#C922E4' : '#2188E7',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 18,
              }}>
              {totalslots}/
            </Text>
            <Text
              style={{
                color: type === 'trivia' ? '#C922E4' : '#333333',

                fontFamily: 'WorkSans-SemiBold',
                fontSize: 18,
              }}>
              {alotedslots}
            </Text>
          </View>
        </View>
        <View style={styles.LiniView}>
          <View style={styles.LiniView1}>
            <LinearProgress
              style={{marginVertical: 10, height: 8, borderRadius: 10}}
              value={0.4}
              variant="determinate"
              color={type === 'trivia' ? '#C922E4' : '#54ACFD'}
            />
          </View>
        </View>

        {type === 'active' ? (
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#54ACFD',
              marginTop: 2,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'WorkSans-Medium',
              }}>
              Register Now
            </Text>
          </TouchableOpacity>
        ) : type === 'trivia' ? (
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#C922E4',
              marginTop: 2,
            }}>
            <Text
              style={{
                color: '#C922E4',
                fontSize: 14,
                fontFamily: 'WorkSans-Medium',
              }}>
              Participate Now
            </Text>
          </TouchableOpacity>
        ) : type === 'enrolled' ? (

          <TouchableOpacity
            onPress={onPress}
            style={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#54ACFD',
              marginTop: 2,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'WorkSans-Medium',
              }}>
              Join Now
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export default QuizCard;
