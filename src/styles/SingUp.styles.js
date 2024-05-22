import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../../src/constants/Colors.constant';
import { StyleConstants } from '../../src/constants/Style.constant';
import { Config } from "../Services/Config";




const styles = StyleSheet.create({
  checkboxImage: {
    width: 24,
    height: 24,
  },
  checkboimg: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bbView: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: ColorsConstant.Theme,
    borderTopLeftRadius: 100,
    paddingHorizontal: 25
  },
  LetsView: {
    width: "100%",
    height: 100,
    marginTop: 20
  },
  LetsView2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textLets: {
    fontFamily: "WorkSans-Bold",
    fontSize: 24,
    textAlign: "left",
    color: ColorsConstant.White,
  },
  togetherview: {
    flexDirection: "row",
    alignItems: "center"
  },
  texttogether: {
    fontFamily: "WorkSans-Bold",
    fontSize: 24,
    textAlign: "left",
    color: ColorsConstant.White
  },
  handPic: {
    width: 20,
    height: 20,
    position: "relative",
    marginHorizontal: 10
  },
  rightarraow: {
    width: 40,
    height: 15
  },
  textEnter: {
    fontSize: 14,
    color: ColorsConstant.White,
    fontFamily: "WorkSans-Regular",
  },
  inputView: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: ColorsConstant.uncheckedcolor,
    marginTop: 5,
    height: 50,
  },
  inputview91: {
    flex: 0.25,
    borderRadius: 6,
    backgroundColor: ColorsConstant.InputbgColor,
    borderColor: ColorsConstant.uncheckedcolor,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    orderRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  text91: {
    color: ColorsConstant.White,
    fontSize: 16
  },
  errormsg: {
    fontSize: 12,
    color: "#FF3333",
    marginTop: 7,
    fontWeight: '500'
  },
  inputView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
    backgroundColor: ColorsConstant.Theme2nd,
    borderRadius: 6,
  },
  textinputt: {
    fontSize: 15,
    width: "100%",
    height: 50,
    textAlign: "justify",
    paddingLeft: 20,
    color: ColorsConstant.White,
  },
  checboxview: {
    width: "100%",
    height: 50,
    marginTop: 20
  },
  checboxview2: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  textHereby: {
    fontSize: 10,
    color: ColorsConstant.White,
    marginHorizontal: 2
  },
  textTerm: {
    fontSize: 10,
    fontFamily: "WorkSans-Regular",
    color: ColorsConstant.TermColor,
    paddingLeft: 3
  },
  textBrain: {
    fontSize: 10,
    marginTop: -6,
    color: ColorsConstant.White
  },
  BtnOtp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsConstant.White,
    borderRadius: 13,
    marginTop: 20,
  },
  textOt: {
    fontFamily: "WorkSans-Medium",
    fontSize: 20,
    color: '#000'
  },
  imgView: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end"
  },
  imgView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  girlimg: {
    width: "100%",
    height: 150
  },


  // ///////////////////////////////////SignupGender///////////////////////////////////////////////////////

  mainView: {
    width: '100%',
    height: 280,
    backgroundColor: ColorsConstant.Theme,
  },
  mainView1: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  mainView2: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
  },
  mainView3: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //   flex: 1,
  },
  WelcomeText: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 26,
    textAlign: 'left',
    color: ColorsConstant.White,
  },
  ArrowPic: {
    width: 40,
    height: 15,
    marginHorizontal: 24,
  },
  HandPic: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  LookView: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    marginTop: 0,
  },
  LooksText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    color: ColorsConstant.White,
    marginTop: 10
  },
  lottiView: {
    width: 300,
    height: 150,
    backgroundColor: 'transparent',
  },
  letView: {
    width: '90%',
    height: 120,
    justifyContent: 'center',
  },
  TextEach: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 30,
    color: ColorsConstant.AshGray,
  },
  viewIam: {
    width: '100%',
    height: 150,
  },
  TextIam: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 20,
    color: ColorsConstant.AshGray,
    paddingBottom: 10,
  },
  GenderView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TouchView: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(112, 29, 219, 1)',
    borderRadius: 10,
    height: 50,
    marginTop: 30
  },
  btntex: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'WorkSans-Regular',
    color: '#fff'
  },
  girlPic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  genderButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'whitesmoke',
    justifyContent: 'flex-end',
    borderWidth: 1,
  },
  btn: {
    width: 100,
    height: 100,
    color: '#000',
  },



  // **********************************************signupexam*********************************************
  plus: {
    width: 45,
    height: 45,
    backgroundColor: ColorsConstant.LightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  containerView: {
    flex: 1,
    backgroundColor: ColorsConstant.Theme
  },
  FinalView: {
    width: "100%",
    height: 150,
    flexDirection: "row"
  },
  FinalView1: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  StepView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  TextFinal: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 30,
    textAlign: 'left',
    color: ColorsConstant.White,
    marginHorizontal: 22
  },
  ArrowPic: {
    width: 35,
    height: 15,
  },
  flowerView: {
    flex: 2,
    alignItems: 'flex-end'
  },
  flowerPic: {
    width: 120,
    height: 250,
  },
  CardView: {
    flex: 1,
    backgroundColor: ColorsConstant.White,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  CardView2: {
    width: '100%',
    height: 150,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  TextPrepare: {
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 24,
    color: ColorsConstant.AshGray
  },
  SearchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorsConstant.LightGray,
    borderRadius: 10,
    height: 45,
    marginTop: 20
  },
  innput: {
    color: ColorsConstant.AshGray,
    fontSize: 15,
    flex: 0.80,
    fontFamily: "WorkSans-Regular"
  },
  ExamView: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: ColorsConstant.LightGray,
    borderRadius: 10,
    marginBottom: 20
  },
  ExamView2: {
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
  },
  CateView: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.20
  },
  CateViewName: {
    flex: 0.65,
    width: "100%",
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  CateName: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20,
    paddingLeft: 10,
    color:ColorsConstant.Black
  },
  TouchhView: {
    flex: 0.20,
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'center'
  },


  btnView: {
    width: '100%',
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10
  }


});


export default styles;
