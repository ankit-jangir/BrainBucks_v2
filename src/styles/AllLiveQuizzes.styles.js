// styles.js
import {StyleSheet} from 'react-native';
import {ColorsConstant} from '../constants/Colors.constant';
import {StyleConstants} from '../constants/Style.constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  quizContainer: {
    backgroundColor: '#ffffff',
    margin: 7,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
  },
  quizHeader: {
    flexDirection: 'row',
  },
  quizImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  quizTitle: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'WorkSans-SemiBold',
    fontWeight: '700',
  },
  quizDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  quizDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizDetailLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 13,
    paddingLeft: 6,
    fontWeight: '500',
  },
  quizDetailValueContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  coinText: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 5,
    fontFamily: 'WorkSans-SemiBold',
  },
  timeImage: {
    width: 20,
    height: 20,
  },
  timeText: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 5,
    fontFamily: 'WorkSans-SemiBold',
  },
  calendarImage: {
    width: 17,
    height: 17,
  },
  calendarText: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 5,
    fontFamily: 'WorkSans-SemiBold',
  },
  earningContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  dollarImage: {
    width: 25,
    height: 25,
  },
  earningTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  earningPrimaryText: {
    color: '#2188E7',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
  },
  earningSecondaryText: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  progressBarBackground: {
    flex: 1,
    height: 15,
    borderRadius: 8,
  },
  progressBar: {
    flex: 0.6,
    height: 15,
    borderRadius: 8,
  },
  registerButtonContainer: {
    marginTop: 10,
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  ul: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  li: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
  },
  liBullet: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#000',
    fontFamily: 'WorkSans-SemiBold',
  },
  liBullet1: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
    fontFamily: 'WorkSans-SemiBold',
  },
  liText: {
    fontSize: 13,
    color: 'rgba(46, 46, 46, 1)',
    fontWeight: '500',
    fontFamily: 'WorkSans-SemiBold',
  },
  liText1: {
    fontSize: 13,
    color: 'rgba(46, 46, 46, 1)',
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: 'WorkSans-SemiBold',
  },
  AgreeV: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
  },

  RulesTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightGray,
  },
  RulesTouchable1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  RulesPText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20,
    paddingLeft: 10,
  },
  RulesTouchable2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  RulesPV2: {
    width: '100%',
    height: 400,
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: ColorsConstant.Black,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  RulesPV3: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  RulesText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 22,
    color: '#000',
  },
  RulesLott: {
    width: 140,
    height: 140,
    backgroundColor: 'transparent',
  },
  RegisteredT: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    color: '#000',
  },
  RegisteredV: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  RegisteredV1: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft:20
  },
  RegisteredImg: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  RulesName: {flex: 1},
  NameText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  continueTouchable: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF5FF',
    borderRadius: 10,
    marginVertical: 10,
  },
  continueText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    color: '#2188E7',
  },
});

export default styles;
