import {View,} from 'react-native';
import React from 'react';
import styles from '../../styles/Rooms.styles';
import {Button, Image} from 'react-native-elements';
import QuizCard from '../../components/QuizCard';
import {ColorsConstant} from '../../constants/Colors.constant';
import { Text } from '../../utils/Translate';
import { BLOBURL } from '../../config/urls';

const ScheduledSuccessfullyQuiz = ({navigation, route}) => {

  let quiz_obj = route.params.obj;

  return (
    <View style={styles.maincontainers}>
      <View style={{height: 200, width: '100%'}}>
        <Image
          source={require('../../assets/img/halfchakr.png')}
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.createLiveText1,{padding:10}]}>
        Quiz Scheduled Successfully
        </Text>
      </View>
      <View style={styles.SbiContainerm}>
        <View style={styles.SbiContainer}>
          <Image
            source={{uri: BLOBURL+quiz_obj.category_image}}
            style={{height: 25, width: 25}}
            resizeMode="contain"
          />
          <Text style={styles.sbit}>{quiz_obj.category_name}</Text>
        </View>
        <View style={styles.FeesContainer}>
          <View style={styles.FeesContainer1}>
            <Text style={styles.feesT}>Entry Fees</Text>

            <Image
              source={require('../../assets/img/bb.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>{quiz_obj.entryFees}</Text>
          </View>
          <View style={styles.FeesContainer1}>
            <Image
              source={require('../../assets/img/Timer.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>{quiz_obj.sch_time.substr(0,10)}</Text>
          </View>
        </View>
        <View style={styles.FeesContainer}>
          <View style={styles.FeesContainer1}>
            {/* <Text style={styles.feesT}>Prize</Text>

            <Image
              source={require('../../assets/img/bb.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>200</Text> */}
          </View>
          <View style={styles.textc}>
            <Image
              source={require('../../assets/img/time2.png')}
              style={{height: 20, width: 20}}
              tintColor={'gray'}
              resizeMode="contain"
            />
            <Text style={styles.feesT}>{quiz_obj.sch_time.substr(11,8)}</Text>
          </View>
        </View>
        <View style={styles.textc1}>
          <Image
            source={require('../../assets/img/Vector.png')}
            style={{height: 25, width: 25}}
            tintColor={'gray'}
            resizeMode="contain"
          />
          <Text style={styles.feesT}>{0}/{quiz_obj.slots}</Text>
        </View>
      </View>
      <View style={{gap: 20, margin: 10}}>
        <Button
          icon={
            <Image
              style={{height: 25, width: 25, marginRight: 10}}
              source={require('../../assets/img/whatsapp.png')}
            />
          }
          buttonStyle={{
            backgroundColor: '#16AC72',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={'Invite Participants'}
        />
        <Button 
        onPress={()=>{navigation.pop(3)}}
        buttonStyle={{backgroundColor:"white"}}
        titleStyle={{color:"#701DDB"}}
        title={'View Quiz'} />
      </View>
    </View>
  );
};

export default ScheduledSuccessfullyQuiz;
