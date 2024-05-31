import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text as BBText,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';

export default function RulesRegulations() {
 
  const navigation = useNavigation();
 

 

  
  return (
    <>
      <SafeAreaView style={styles.safeArView}>
      
      <View style={styles.Hview}>
      <View style={styles.Hview1}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.THead}>
          <Image
            source={require('../../assets/img/arrows.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <View style={styles.ViewMy}>
          <Text style={styles.TextMy}>Rules</Text>
        </View>
      </View>
    </View>
        <View style={styles.safeArView}>
          <View style={styles.BBview}>
            <Text style={styles.textBr}>Brainbucks Quiz Rules and Terms :</Text>
          </View>
          <ScrollView
            style={styles.viewS}
            >
            <View style={styles.rulesv}>
              {/*<View style={{flex:0.10}}>
                  <Text>{index+1}.</Text>
                </View>*/}
              <View style={{flex: 1,backgroundColor:"white"}}>
                <Text style={{color:"black",fontWeight:"600",fontSize:17}}>
                  Rules to know before participating in any quiz in Brain Bucks
                  App
                </Text>
                <Text style={styles.textValue1}>
                  {' '}
                  1.This is "Not a gambling app" but contains financial risks.
                </Text>
                <Text style={styles.textValue1}>
                  {' '}
                  2.Rewards in regular contests and quizzes are based upon the
                  number of participants that join the contests.
                </Text>
                <Text style={styles.textValue1}>
                  3.There are two types of contests:
                  <Text style={styles.textValue1}>
                    {' '}
                    1. Free to Join and, 2. Paid (Includes an Entry Fee) There
                    are also some live contests to join and{' '}
                  </Text>
                </Text>

                <Text style={styles.textValue1}>
                  {' '}
                  4.participate in in real-time. For the Paid Contests, the
                  entry fee varies from contest to contest.
                </Text>
                <Text style={styles.textValue1}>
                  Rules for selecting a winner of the quiz and distributing the
                  prize pool: Total of top 20% participants are considered as
                  Winning group of a quiz, who receives the cash prize at the
                  end of the quiz. Formula for calculating the Winners is: r =
                  (20* TP)/100 r = Number of Winners TP = Total number of
                  participants participating in the quiz.
                </Text>

                <Text style={styles.textValue1}>
                  {' '}
                  The winners are determined by the accuracy of the answers they
                  give to the questions asked in the quiz, accuracy is
                  determined by the following formula: A = (( Nc )/ Nq)*100
                  Where, A = Accuracy Nc = Total number of questions answered
                  correctly Nq = Total number of questions asked.{' '}
                </Text>
                <Text style={styles.textValue1}>
                  For example: the total amount of players participating in a
                  quiz are total 100, and the entry fees for each participant is
                  10 BB Coins, then the total prize pool sums up to 800 BB
                  Coins, therefore this prize pool will be distributed among top
                  20% players that is to top 20 players in this case.
                </Text>

                <Text style={styles.textValue1}>
                  Distribution of the prize among winners; a. The achiever with
                  the highest amount of accuracy gets the biggest chunk of prize
                  pool. b. The distribution of prize pool is determined by the
                  following formula: pp = [((r-R) +r)*PP]/Tp Where, pp = Prize
                  to be received by winner. R = Rank of Winner r = Total number
                  of winners PP = Total amount of prize pool Tp Total
                  Participants of the quiz c. For Example: If in the previous
                  scenario the total number of Winners (r) are 20 and the amount
                  of prize pool (PP) is 800 BB Coins and the Total Participants
                  (Tp) are 100, then according to the above formula, winner with
                  the rank 1, will get a Prize (pp) of 312 BB Coins and the
                  winner with rank 2 will get a prize of 304 BB Coins and so on.
                </Text>

                <Text style={styles.textValue1}>
                  {' '}
                  In case of Tie: a. If the accuracy of 2 players comes same
                  with the above mentioned formula, then the player completing
                  quiz With lower Average Time Per Question (T) is selected on a
                  higher rank, formula of calculating T is as follows: T = (t/q)
                  Where, T = Average Time per Question t = Total time taken to
                  complete the quiz in seconds q = Total number of questions
                  asked in the quiz b. For example: If accuracy of 2
                  participants, let the name of participants be "A" and "B" came
                  same in a quiz containing total 10 Questions but the total
                  time taken by "A" to complete the quiz (t) was 20 Seconds and
                  the total time taken by "B" to complete the quiz (t) was 25
                  Seconds, then Participant "A's" Average Time Per Question (T)
                  is 2 Seconds, according to the above mentioned formula,
                  whereas Participant "B" is having Average Time per Question
                  (T) is 2.5 Seconds, therefore according to the algorithm
                  Participant A will be assigned a higher Rank than Participant
                  B...{' '}
                </Text>

                <Text style={styles.textValue1}>
                  For Paid contest a total of 20% commision will be charged by
                  Brain Bucks, for instance if the total number of participants
                  participating in a quiz contest is 100 and the participation
                  fees is INR 100 per Participant, which will result into a
                  total prize pool of INR 10,000, brain bucks will deduct 20%
                  i.e INR 2,000 from the principal amount, which will lead to
                  net distribution of INR 8,000 among 100 Participants.
                </Text>

                <Text style={styles.textValue1}>
                  The entry fee is paid and converted into our standard BB Coin
                  which is our platform-limited virtual currency (Not a
                  Cryptocurrency), & 1 BB Coin represents 0.01 INR or 100 BB
                  coins = INR 1.00
                </Text>

                <Text style={styles.textValue1}>
                  A 30% of the TDS amount will be applicable and deducted as per
                  Government/RBI Tax rules on the reward amount(Profit) is more
                  than $10,000, for instance, you've joined a quiz where you
                  have paid
                </Text>

                <Text style={styles.textValue1}>
                  a participation fee of 100 and the reward you won is 11,000 so
                  the actual amount you'll get will be? 11,000 100=10,900-30%
                  89.7 (INR). 10. If the winning amount is less than 10,000 INR,
                  then
                </Text>

                <Text style={styles.textValue1}>
                  the user is not liable to pay any TDS
                </Text>
                <Text style={styles.textValue1}>
                  11. The Payout for the rewards the user won in the regular
                  quizzes will be directly credited into the user's account and
                  the user can redeem that amount directly into their bank
                  accounts. The payout will be done using the RazorpayX payout
                  service.{' '}
                </Text>

                <Text style={styles.textValue1}>
                  12. We invite users to participate in various subject or
                  topic-based quizzes, the questions the quizzes belong to
                  different subjects e.g. general knowledge, science, chemistry,
                  mathematics, physics, and more. If the quiz has an entry fee,
                  the user pays the fee and then joins in the quiz. If the user
                  failed to join the quiz is considered eliminated, and if more
                  than 1 user joins the quiz the amount for the joining doesn't
                  get refunded. If only 1 user joins the quiz, at the end of the
                  quiz his amount is refunded or won by him because no other
                  users joined that quiz.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.checkV}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor:"white"
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/img/check-mark.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            {/* {console.log(isChecked)} */}
            <Text style={styles.textHer}>
              I hereby agree to the{' '}
              <Text style={styles.textRule}>Rules & Regulations</Text> of the
              Brain Bucks app
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArView: {
    flex: 1,
    backgroundColor:'White',
  },
  BBview: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor:"white"
  },
  textBr: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  viewS: {
    backgroundColor:'White',
    flex:1
  },
  rulesv: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"white"
  },
  textValue: {
    fontSize: 15,
    fontWeight: '400',
  },
  textValue1: {
    fontSize: 15,
    fontWeight: '400',
    paddingTop: 10,
    color:"black"
  },
  checkV: {
    alignItems: 'center',
    width: '100%',
    height: 80,
    borderTopColor: 'whitesmoke',
    borderTopWidth: 0.5,
    backgroundColor:"white"
  },
  textHer: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: 'black',
    textAlign: 'justify',
    paddingLeft: 15,
  },
  textRule: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#367CFF',
  },

  Hview: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
    backgroundColor:"white"
  },
  Hview1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  THead: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100,
  },
  ViewMy: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  TextMy: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },
}

)