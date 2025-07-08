import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Text} from '../utils/Translate';
import {LinearProgress} from '@rneui/themed';
import {ColorsConstant} from '../constants/Colors.constant';

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
  roomname,
  declareTime,
  onShare,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Title Row */}
      <View style={styles.titleRow}>
        <Image source={image} style={styles.image40} />
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* Fees & Date */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Fees</Text>
          <Image
            source={require('../assets/img/bbcoin.png')}
            style={styles.coinIcon}
          />
          <Text style={styles.coinValue}>
            {type === 'trivia' || type == 0 ? '0' : fees}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require('../assets/img/calendar.png')}
            style={styles.iconSmall}
          />
          <Text style={styles.rightValueText}>{date?.substr(0, 10)}</Text>
        </View>
      </View>

      {/* Prize & Time */}
      {/* Reward & Time */}
      <View style={[styles.infoRow1, {}]}>
        <View style={[styles.infoItem, {flex: 0.85}]}>
          <Text style={styles.infoLabel}>Reward</Text>
          <View style={styles.iconValueRow}>
            <Image
              source={require('../assets/img/bbcoin.png')}
              style={styles.coinIcon}
            />
            <Text style={styles.coinValue}>{prize}</Text>
          </View>
        </View>
        <View style={[styles.infoItem, {}]}>
          <Image
            source={require('../assets/img/clock1.png')}
            style={styles.iconSmall}
          />
          <Text style={styles.rightValueText}>{date?.substr(11, 5)}</Text>
        </View>
      </View>

      {/* Declaration Time */}
      {/* {declareTime && (
        <Text style={styles.declarationText}>
          Declaration Time: {declareTime}
        </Text>
      )} */}

      {/* Room Name */}
      {roomname && (
        <View style={styles.roomRow}>
          <Image
            style={styles.roomIcon}
            source={require('../assets/img/roomsimgs.png')}
          />
          <Text style={styles.roomName}>{roomname}</Text>
        </View>
      )}

      {/* Slots or Percentage */}
      <View style={styles.slotContainer}>
        <Image
          source={
            type === 'trivia' || type == 0
              ? require('../assets/img/cup.png')
              : require('../assets/img/dollar.png')
          }
          style={[
            styles.slotIcon,
            {
              tintColor: type === 'trivia' || type == 0 ? '#C922E4' : '#333333',
            },
          ]}
        />
        <View style={styles.rowCenter}>
          {type === 'trivia' || type == 0 ? (
            <Text
              style={[
                styles.slotText,
                {color: type === 'trivia' || type == 0 ? '#C922E4' : '#2188E7'},
              ]}>
              {minper}%
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.slotText,
                  {color: type === 'trivia' ? '#C922E4' : '#2188E7'},
                ]}>
                {alotedslots}/
              </Text>
              <Text
                style={[
                  styles.slotText,
                  {color: type === 'trivia' ? '#C922E4' : '#333333'},
                ]}>
                {totalslots}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <LinearProgress
          value={minper ? minper / 100 : alotedslots / totalslots}
          variant="determinate"
          color={
            type === 'trivia'
              ? '#C922E4'
              : alotedslots === totalslots
                ? '#2188E7'
                : '#59AFFF'
          }
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#EFEFEF',
          }}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        {(type === 'active' || type == 1) && (
          <TouchableOpacity style={{flex: 1}} onPress={onPress}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 2.0}}
              colors={['#54ACFD', '#2289E7']}
              style={styles.gradientBtn}>
              <Text style={[styles.gradientBtnText, {padding: 10}]}>
                {btntxt ? btntxt : 'Register Now'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {(type === 'trivia' || type == 0) && (
          <TouchableOpacity onPress={onPress} style={styles.outlineBtn}>
            <Text style={[styles.outlineBtnText]}>
              {btntxt ? btntxt : 'Participate Now'}
            </Text>
          </TouchableOpacity>
        )}
        {type === 'enrolled' && (
          <TouchableOpacity style={{flex: 1}} onPress={onPress}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 2.0}}
              colors={['#54ACFD', '#2289E7']}
              style={styles.gradientBtn}>
              <Text style={[styles.gradientBtnText, {padding: 10}]}>
                {btntxt ? btntxt : 'Join Now'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {invitebtn && (
          <Button
            icon={
              <Image
                style={styles.backRoomEnterImg}
                source={require('../assets/img/whatsapp.png')}
              />
            }
            containerStyle={{flex: 1}}
            buttonStyle={styles.shareBtn}
            title={'Invite'}
            onPress={onShare}
          />
        )}
      </View>
    </View>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  iconValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // ensures space between coin and number
  },
  // cardContainer: {
  //   backgroundColor: '#ffffff',
  //   margin: 6,
  //   padding: 20,
  //   borderRadius: 8,
  //   elevation: 1,
  //   shadowColor:'#BCBCBC1A'
  // },

  cardContainer: {
    backgroundColor: '#ffffff',
    margin: 13,
    padding: 15,
    borderRadius: 10, // updated from 8 to 5 as per request
    elevation: 1, // Android shadow
    shadowColor: '#BCBCBC', // cleaned hex (opacity handled below)
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow (BCBCBC1A = ~10% opacity)
    shadowRadius: 4, // smooth blur
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image40: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  titleText: {
    color: '#2E2E2E',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
    letterSpacing: 0.2,
    paddingLeft: 12,
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  infoRow1: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoLabel: {
    color: '#7E7E7E',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    // marginRight: 4,
  },
  coinIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  coinValue: {
    color: '#F5B807',
    fontSize: 14,
    fontWeight: '700',
  },
  iconSmall: {
    width: 18,
    height: 18,
    tintColor: '#8A8A8A',
  },
  rightValueText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8A8A8A',
    // marginLeft: 5,
  },

  declarationText: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: '500',
    marginTop: 10,
  },
  roomRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 12,
    alignItems: 'center',
  },
  roomIcon: {
    width: 20,
    height: 17.5,
    resizeMode: 'contain',
  },
  roomName: {
    color: ColorsConstant.Black,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  slotIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  slotText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 15,
    // paddingLeft: 10,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  gradientBtn: {
    borderRadius: 10,
  },
  gradientBtnText: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  outlineBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C922E4',
  },
  outlineBtnText: {
    color: '#C922E4',
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
  },
  shareBtn: {
    backgroundColor: '#16AC72',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    flex: 1,
  },
  backRoomEnterImg: {
    height: 22,
    width: 22,
    marginRight: 10,
    marginLeft: -10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
