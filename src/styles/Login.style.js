// styles.js
import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../constants/Colors.constant';
import { StyleConstants } from '../constants/Style.constant';

    const styles = StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor:ColorsConstant.Theme,
          paddingHorizontal: 30,
        },
        errormsg:{
          fontSize:12,
          color:"#FF3333",
          marginTop:7,
          fontWeight:'500'
        },
        aniView: {
          width: '100%',
          height: 100,
          marginTop: 40,
        },
        logo: {
          width: '100%',
          height: "100%",
        },
        aniView2: {
          width: '100%',
          height: 200,
          justifyContent: "center",
        },
        langu: {
          fontSize: 20,
          color:ColorsConstant.White,
          fontFamily: 'WorkSans-Bold',
        },
        text: {
          fontSize: 14,
          fontWeight: 'bold',
          marginHorizontal: 10
        },
        touchPro: {
        //   width:60,
          width:'100%',
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: ColorsConstant.White,
          borderRadius: 10,
          marginTop: 50
        },
        textProceed: {
          fontFamily: "WorkSans-Medium",
          fontSize: 20,
          color: ColorsConstant.Black
        },
        lottiV: {
          flex: 1,
          alignItems: 'center',
          marginTop: 30
        },
        lottiV2: {
          width: 180,
          height: 250,
          backgroundColor: 'transparent',
        },
        touchRadio: {
          flexDirection: 'row',
          alignItems: "center",
          borderWidth: 1,
          backgroundColor:ColorsConstant.bgcolorlanguage,
          borderColor: ColorsConstant.BorderColor,
          padding: 5,
          borderRadius: 10,
          width: '100%',
          height: 50
        },
        Textbha: {
          color:ColorsConstant.White,
          fontSize: 20,
          fontFamily: "WorkSans-Medium",
          paddingLeft: 10
        },
        


// //////////////////////////////////////////////////otp csss/////////////////////////////////////////////////////////////////
 safeArView: {
    flex: 1,
    backgroundColor: ColorsConstant.White
  },
  Lastview1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  EnterOtp: {
    fontFamily: "WorkSans-Bold",
    fontSize: 20,
    color: ColorsConstant.White,
  },
  RightArrow: {
    width: "100%",
    height: 20
  },
  OtpView: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    height: 50,
    justifyContent: "space-between",
  },
  textOtp: {
    fontFamily: "WorkSans-Regular",
    fontSize: 14,
    color: ColorsConstant.White,
  },
  DidView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  OtpBoxView: {
    backgroundColor: ColorsConstant.OtpbgColor,
    width: 55,
    height: 55,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    textAlign: "center",
    color: ColorsConstant.White,
    fontSize: 15,
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginBottom: 20,
},
otpInput: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
},
textOt:{
  fontFamily: "WorkSans-Regular",
  fontSize: 20,
  color: ColorsConstant.Dark,
},
BtnOtp:{
  width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: ColorsConstant.White,
      borderRadius: 13,
      marginTop: 20,
},

// /********************************singupname***************************************************************** */



mainView: {
  width: '100%',
  height: 280,
  backgroundColor: ColorsConstant.Theme,
},
mainView1: {
  flex: 1,
  paddingTop: 40,
  paddingHorizontal: 30
},
mainView2: {
  width: '100%',
  height: 150,
  justifyContent: "center",
},
mainView3: {
  flexDirection: "row",
  alignItems: "flex-end",
  flex: 1,
  marginTop:-40
},
mainView22: {
  flexDirection: "row",
  alignItems: "flex-end",
},
WelcomeText: {
  fontFamily: 'WorkSans-Bold',
  fontSize: 30,
  textAlign: 'left',
  color: ColorsConstant.White,
  
},
ArrowPic: {
  width: 40,
  height: 15,
  marginHorizontal: 24
},
HandPic: {
  width: 20,
  height: 20,
  position: 'relative',
},
LookView: {
  flex: 1,
  height: 100,
  flexDirection: "row",
  marginTop: 0
},
LooksText: {
  fontSize: 16,
  fontFamily: 'WorkSans-Medium',
  color: ColorsConstant.White
},
lottiView: {
  width: 300,
  height: 150,
  backgroundColor: 'transparent',
},
letView: {
  width: '90%',
  height: 120,
  justifyContent: "center"
},
TextEach: {
  fontFamily: 'WorkSans-Bold',
  fontSize: 30,
  color: ColorsConstant.AshGray
},
TextMy: {
  fontFamily: 'WorkSans-Regular',
  fontSize: 20,
  color: ColorsConstant.AshGray,
  paddingBottom: 10
},
inputView: {
  // flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: 0,
  backgroundColor: ColorsConstant.LightGray,
  borderRadius: 10,
},
inputView1: {
  fontSize: 16,
  width: "100%",
  textAlign: "justify",
  paddingLeft: 20,
  color: ColorsConstant.AshGray
},
TouchView: {
  width: '100%',
  height: 120,
  justifyContent: 'center'
}




      });


export default styles;
