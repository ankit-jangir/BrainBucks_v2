import {View, Linking, Share} from 'react-native';
import React from 'react';
import styles from '../../styles/Rooms.styles';
import {Button, Image} from 'react-native-elements';
import {ColorsConstant} from '../../constants/Colors.constant';
import {Text} from '../../utils/Translate';
import {APPURL, BLOBURL} from '../../config/urls';
import { Alert } from 'react-native';

const ScheduledSuccessfullyQuiz = ({navigation, route}) => {
  let quiz_obj = route.params.obj;

console.log(quiz_obj,"pppp")
   const onShare = async quiz_id => {
      try {
        const result = await Share.share({
          message: `${APPURL}/scheduledsuccessfullyQuiz?id=${quiz_id}`,
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
    <View style={styles.maincontainers}>
      {/* Top Banner */}
      <View style={{height: 200, width: '100%'}}>
        <Image
          source={require('../../assets/img/halfchakr.png')}
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
        />
      </View>

      {/* Success Text */}
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={[styles.createLiveText1, {paddingHorizontal: 10, fontSize: 22}]}>
          🎉 Quiz Scheduled Successfully!
        </Text>
      </View>

      {/* Quiz Info Card */}
      <View style={[styles.SbiContainerm, {padding: 15, backgroundColor: '#F5F5F5', borderRadius: 10, marginHorizontal: 15}]}>
        
        {/* Category */}
        <View style={[styles.SbiContainer, {marginBottom: 10}]}>
          <Image
            source={{uri: BLOBURL + quiz_obj.category_image}}
            style={{height: 25, width: 25, marginRight: 10}}
            resizeMode="contain"
          />
          <Text style={styles.sbit}>{quiz_obj.category_name}</Text>
        </View>

        {/* Entry Fee & Date */}
        <View style={styles.FeesContainer}>
          <View style={styles.FeesContainer1}>
            <Text style={styles.feesT}>Entry Fees</Text>
            <Image
              source={require('../../assets/img/bb.png')}
              style={{height: 18, width: 18, marginLeft: 5}}
              resizeMode="contain"
            />
            <Text style={[styles.feesT, {marginLeft: 5}]}>{quiz_obj.entryFees}</Text>
          </View>
          <View style={styles.FeesContainer1}>
            <Image
              source={require('../../assets/img/Timer.png')}
              style={{height: 18, width: 18, marginRight: 5}}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>{quiz_obj.sch_time.substr(0, 10)}</Text>
          </View>
        </View>

        {/* Reward & Time */}
        <View style={styles.FeesContainer}>
          <View style={styles.FeesContainer1}>
            <Text style={styles.feesT}>Reward</Text>
            <Image
              source={require('../../assets/img/bb.png')}
              style={{height: 18, width: 18, marginLeft: 5}}
              resizeMode="contain"
            />
            <Text style={[styles.feesT, {marginLeft: 5}]}>0</Text>
          </View>
          <View style={styles.textc}>
            <Image
              source={require('../../assets/img/time2.png')}
              style={{height: 18, width: 18, marginRight: 5}}
              tintColor={'gray'}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>{quiz_obj.sch_time.substr(11, 8)}</Text>
          </View>
        </View>

        {/* Slots Info */}
        <View style={[styles.textc1, {marginTop: 10}]}>
          <Image
            source={require('../../assets/img/Vector.png')}
            style={{height: 22, width: 22, marginRight: 5}}
            tintColor={'gray'}
            resizeMode="contain"
          />
          <Text style={styles.feesT}>{0}/{quiz_obj.slots}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{gap: 15, marginHorizontal: 20, marginVertical: 25}}>
        <Button
          onPress={onShare}
          icon={
            <Image
              style={{height: 22, width: 22, marginRight: 10}}
              source={require('../../assets/img/whatsapp.png')}
            />
          }
          buttonStyle={{
            backgroundColor: '#16AC72',
            borderRadius: 8,
            paddingVertical: 12,
          }}
          titleStyle={{fontSize: 16}}
          title={'Invite Participants'}
        />
        <Button
          onPress={() => navigation.pop(3)}
          buttonStyle={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#701DDB',
            paddingVertical: 12,
          }}
          titleStyle={{color: '#701DDB', fontSize: 16}}
          title={'View Quiz'}
        />
      </View>
    </View>
  );
};

export default ScheduledSuccessfullyQuiz;
