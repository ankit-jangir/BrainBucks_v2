import {StyleSheet} from 'react-native';
import {ColorsConstant} from '../constants/Colors.constant';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: ColorsConstant.White,
  },
  actionToggleButton: {
  backgroundColor: '#701DDB',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 5,
},
tabBarLabelLogo:{
height:20,width:20
},
tabBarLabelHolder:{
flexDirection:"row",
gap:10
},
actionToggleText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
  fontFamily: 'WorkSans-SemiBold',
},
actionToggleText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
  fontFamily: 'WorkSans-SemiBold',
},
 
 topbtns: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 8,
  backgroundColor: ColorsConstant.White,
  zIndex: 100, // Ensure it's above the tab view
},

roomstext: {
  color: ColorsConstant.Black,
  fontSize: 24,
  fontWeight: '600',
  fontFamily: 'WorkSans-SemiBold',
},

actionContainer: {
  position: 'absolute',
  top: 36, // adjust to appear below the icon
  right: 0,
  backgroundColor: 'white',
  borderRadius: 10,
  elevation: 5,
  padding: 10,
  zIndex: 999,
  width: 160,
},

actionButton: {
  backgroundColor: ColorsConstant.Primary,
  borderRadius: 8,
  marginVertical: 4,
  paddingVertical: 8,
},

actionTitle: {
  fontSize: 14,
  fontWeight: '600',
  fontFamily: 'WorkSans-SemiBold',
},

  // Explore style
  roomContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    backgroundColor: 'white',
    elevation: 2,
    gap: 10,
    paddingBottom: 14,
    marginVertical: 7,
  },
  roomNameText: {
    fontSize: 20,
    color: ColorsConstant.Black,
    paddingTop: 10,
  },
  memberHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberText: {
    color: ColorsConstant.GrayyColor,
    fontSize: 14,
  },
  memberText1: {
    color: ColorsConstant.Black,
    fontSize: 21,
    fontFamily: 'Work Sans',
    fontWeight: '600',
  },
  roomContainerBtns: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  exitbtn: {
    // backgroundColor: 'rgba(112, 29, 219, 1)',
    // padding: 5,
    paddingHorizontal: 8,
    fontFamily: 'WorkSans-Regular',
    borderRadius: 5,
    color: '#D92828',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  exitview: {
    backgroundColor: '#FFF4F4',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 2,
  },
  exitimg: {
    marginLeft: 7,
    width: 20,
    objectFit: 'contain',
  },
  enterbtn: {
    color: 'white',
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
  },
  enterbtncontainer: {
    elevation: 3,
    borderRadius: 4,
    flex: 1,
  },

  // Create room styling
  backimg: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
createroomtext: {
  color: ColorsConstant.Black,
  fontSize: 24,
  fontFamily: 'WorkSans-SemiBold', 
  fontWeight: '600',              
  lineHeight: 24,                  
  letterSpacing: 0,
},

  createroomimg: {
    margin: 'auto',
  },
  createRoomOptionText: {
    color: ColorsConstant.Black,
    fontSize: 20,
    fontFamily: 'WorkSans-Regular',
  },
  createRoomBtn: {
    fontFamily: 'WorkSans-Regular',
    width: '100%',
    textAlign: 'center',
    padding: 20,
  },
  createRoomInput: {
    color: ColorsConstant.Black,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
  },

  // Enter Room Style
  enterRoomMainContainer: {
    flexGrow: 1, // ScrollView ko support karega
    width: '100%',
    backgroundColor: '#701DDB',
    paddingTop: 20,
  },
  backRoomEnterImg: {
    height: 14,
    width: 14,
    marginRight: 10,
    marginLeft: -10,
  },
  typebtn: {
    flex: 1,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  firstEnter: {
    height: '40%',
    padding: 10,
  },
  backandhistory: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roomEnterShareBtn: {
    backgroundColor: '#8D4AE2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 20,
  },
  histImg: {
    height: 15,
    width: 15,
    objectFit: 'contain',
    marginRight: 10,
    marginLeft: -10,
  },
  invitePrev: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  detailsContainer: {
    gap: 11,
  },
  secondEnter: {
    //the second part of room
    height: '60%',
    backgroundColor: ColorsConstant.White,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  // History starts here
  /* Styles for top bar of history */
  Hview: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
    backgroundColor: 'white',
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
    width: 40,
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
  proceedbtn: {
    padding: 14,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 60,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  centerBox: {
    borderRadius: 8,
    backgroundColor: '#212236',
    width: '100%',
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    gap: 20, // form fields ke beech gap
  },
  createLiveText: {
    fontSize: 20,
    color: '#fff',
    width: '70%',
    textAlign: 'center',
  },
  //dropdown styles:
  dropdownExam: {
    marginBottom: 15,
    backgroundColor: '#282940',
    borderRadius: 4,
    paddingHorizontal:10
  },
  dropdownlabel: {
    color: '#A1A2AD',
    backgroundColor: '#282940',
  },
  ddexaminputSearchStyle: {
    color: '#A1A2AD',
    backgroundColor: '#fff',
    fontSize: 14,
  },
  ddexamselectedTextStyle: {
    color: '#A1A2AD',
    backgroundColor: '#282940',
    padding: 7,
  },
  ddexamplaceholderStyle: {
    color: '#B3B3B3',
    backgroundColor: '#282940',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  ddExamItemContainerStyle: {
    color: '#A1A2AD',
    borderRadius: 4,
    borderColor: '#353651',
    borderBottomWidth: 1,
    marginHorizontal: 4,
    marginVertical: 1,
    backgroundColor: '#282940',
  },
  ddItemTextStyle: {
    color: '#A1A2AD',
    fontSize: 14,
  },
  ddinput: {
    backgroundColor: '#282940',
    color: '#A1A2AD',
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 10,
    height: 48,
    marginBottom: 5,
  },
  TimeConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  miniumT: {
    // paddingBottom: 4,
    textAlign: 'right',
    fontSize: 12,
    color: '#A1A2AD',
  },
  containerb: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282940',
    borderRadius: 4,
    paddingHorizontal: 10,
    // justifyContent:"space-evenly"
  },
  containerbb: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    // gap: 10,
  },
  st: {
    paddingBottom: 4,
    color: '#A1A2AD',
  },

  // CreateQuizeeSucessfully css :

  maincontainers: {
    flex: 1,
    backgroundColor: '#701DDB',
  },
  createLiveText: {
    fontSize: 20,
    color: '#fff',
    width: '80%',
    textAlign: 'center',
    // marginBottom: 10,
  },
  SbiContainerm: {
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  SbiContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
  },
  sbit: {
    color: '#2E2E2E',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  FeesContainer: {flexDirection: 'row', justifyContent: 'space-between'},

  FeesContainer1: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    alignItems: 'center',
  },
  feesT: {
    color: '#2E2E2E',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  textc: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },

  textc1: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
  },

  // RoomSetting css

  Hview2: {
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
  },
  Hviews: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  THead1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100,
  },

  TextMy1: {
    fontSize: 21,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },
  btnsave: {
    backgroundColor: 'lightgray',
  },

  container1: {
    borderWidth: 0.2,
    borderRadius: 5,
    marginTop: 10,
    elevation: 20,
    shadowColor: '#FAFAFA',
  },

  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Work Sans',
    fontWeight: '500',
    color: 'black',
  },
  roleText: {
    fontSize: 16,
    fontFamily: 'Work Sans',
    fontWeight: '400',
    color: '#7E7E7E',
  },
  onlineStatus: {
    color: '#129C73',
    backgroundColor: '#EFFFF6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  kickOutButton: {
    backgroundColor: '#FFF4F4',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: '90%',
    margin: 'auto',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#D92828',
  },
  kickOutButtonText: {
    color: '#D92828',
    fontWeight: '500',
    textAlign: 'center',
  },
  offlineStatus: {
    color: '#8A8A8A',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  RasContainer: {
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 8,
    marginTop: 8,
    paddingLeft: 10,
  },
  RasContainerText: {
    color: '#8A8A8A',
    fontfamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 21,
  },
  HistoryV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  HistoryV1: {
    flexDirection: 'row',
    backgroundColor: '#8D4AE2',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 35,
  },

  HistoryV2: {
    flexDirection: 'row',
    backgroundColor: '#FFF4F4',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#D92828',
  },
  logoutView: {
    height: 170,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  logoutbuttons: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutyesbutton: {
    borderRadius: 10,
  },
  welcomeText: {
    fontFamily: 'Work Sans',
    color: ColorsConstant.Black,
    fontSize: 17,
    borderWidth: 1,
    borderColor: 'transparent',
    textAlign: 'center',
  },
  actionIcon:{
    height:25,
    width:20
  },
  inviteBtn:{
    width:"100%",
    padding:10,
    borderRadius:10,
    marginVertical:10
  },
  shareIcon:{
    height:25,
    width:20
  }
});

export default styles;
