// styles.js
import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../../src/constants/Colors.constant';
import { StyleConstants } from '../../src/constants/Style.constant';
import { Config } from "../Services/Config";

    const styles = StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor:ColorsConstant.Theme,
          paddingHorizontal: 30,
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
              marginHorizontal: 3
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
            textOtp: {
              fontFamily: "WorkSans-Medium",
              fontSize: 20,
              color:'#000'
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
            }
        





      });


export default styles;
