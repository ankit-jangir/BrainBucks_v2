
import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../../src/constants/Colors.constant';

const styles = StyleSheet.create({
  HeaderView: {
    width: '100%',
    height: 70,
    backgroundColor: ColorsConstant.White,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  MainView: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  MainView1: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  MainView2: {
    width: 120,
    height: 120,
    marginTop: 20
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  EditT: {
    flexDirection: "row",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
    borderRadius: 10
  },
  EditText: {
    color: ColorsConstant.White,
    fontFamily: "WorkSans-Medium",
    fontSize: 12,
    paddingHorizontal: 12
  },
  mobView: {
    width: '100%',
    marginVertical: 10
  },
  TextName: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 24,
    textAlign: "center",
    color: '#7E7E7E'
  },
  Textmobile: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#000"
  },
  totalView: {
    width: '100%',
    paddingHorizontal: 10,
  },
  bgImg: {
    width: "100%",
    height: 100,
    alignItems: "flex-start",
  },
  RfrView: {
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 13
  },
  quizText: {
    fontFamily: "WorkSans-Medium",
    fontSize: 16,
    color: ColorsConstant.White
  },
  ProfileView1:
  {
    width: 60,
    height: 60,
    justifyContent: "center",
    flex: 0.30,
    // alignItems: "flex-start"
    alignItems: 'center',
    alignSelf: 'center'
  },
  HelpView: {
    width: "100%",
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  touchH: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: "center",
  },
  CkrView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.20
  },
  Ckrimg: {
    width: 30,
    height: 30
  },
  SupportV: {
    flex: 0.80,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextSupport: {
    fontSize: 18,
    fontFamily: "WorkSans-Medium",
    color: '#000'
  },
  tocuh: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  },
  ProfileImg:
  {
    width: 130,
    height: 130,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    objectFit:'contain'
  },
  mainView: {
    width: "100%",
    height: 350,
    margin: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: ColorsConstant.White,
    paddingHorizontal: 20
  },
  mainView1: {
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  EnterT: {
    width: 30,
    height: 30,
    backgroundColor: ColorsConstant.White,
    alignSelf: "flex-end",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  textEnter: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 16,
    textAlign: "center"
  },
  Arrview: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'space-between',
  },
  touchConti: {
    width: '80%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#610ECD",
    borderRadius: 5,
    marginTop: 50
  },
  resend: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: "#DC1111",
    paddingTop: 20
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 300
  },
  Saveview: {
    width: '100%',
    height: 70,
    backgroundColor: ColorsConstant.White,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  Saveview1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  arrTouch: {
    width: 50,
    height: 50,
    backgroundColor: ColorsConstant.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ColorsConstant.White
  },
  touchArrow: {
    width: 70,
    height: 30,
    backgroundColor: "#EFF5FF",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorsConstant.White
  },
  textSave: {
    color: "#367CFF",
    fontFamily: "WorkSans-Regular",
    fontSize: 16
  },
  Cview: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  Cview1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  Cview2: {
    width: 120,
    height: 120,
    marginTop: 20
  },
  imgUri: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  textChnage: {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#367CFF"
  },
  viewName: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textContact: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: ColorsConstant.Black,
    fontWeight: "bold"
  },
  inputView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
    height: 50,
    borderColor: "#ccc",
    flexDirection: "row",
    backgroundColor: ColorsConstant.BackgroundGrey,
    borderRadius: 6,
    elevation: 1,
    marginVertical: 10,
    marginHorizontal: 5
  },
  errormsg: {
    color: "red",
    fontSize: 13,
    padding: 10,
    paddingTop: 1
  },
  inputTe: {
    fontSize: 16,
    width: "80%",
    fontFamily: "WorkSans-SemiBold",
    color: ColorsConstant.AshGray,
    paddingLeft: 10
  },
  penciledit: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
  viewNumber: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 50,
  },
  inputt: {
    fontSize: 24,
    width: "100%",
    fontFamily: "WorkSans-SemiBold",
    color: '#000'
  },
  Genderview: {
    width: '100%',
    paddingHorizontal: 10,
  },
  Gmap: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 10
  },
  Selectview: {
    borderRadius: 100,
    padding: 2,
  },
  textOTP: {
    backgroundColor: ColorsConstant.WhiteGray,
    width: 55,
    height: 55,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: "center"
  },
  logoutView: {
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  logoutbuttons: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logoutyesbutton: {
    paddingHorizontal: 20
  },
  logoutText: {
    color: ColorsConstant.Error,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlayBox: {
    width: '97%',
    height: 200,
    bottom: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  chooseoptionview:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    alignItems:'center'
    },
  chooseOptionText: {
    color: ColorsConstant.GrayyColor,
    fontSize: 17,
    borderWidth:1,
    borderColor:'transparent',
    textAlign:'center',

  },
  xview: {
    fontSize: 20,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    width:30,
    padding:2,
    backgroundColor:'white',
    elevation:2,
  },
  iconview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cameraicon: {
    backgroundColor:ColorsConstant.White,
    tintColor:ColorsConstant.Theme,
    padding:13,
    borderRadius:50,
    width:45,
    height:45
  },
  iconcontainer:{
    backgroundColor:ColorsConstant.White,
    padding:5,
    borderRadius:50,
    elevation:4,
    shadowColor:ColorsConstant.Black
  },
  galleryicon:{
    width:45,
    height:45
  }

})

export default styles