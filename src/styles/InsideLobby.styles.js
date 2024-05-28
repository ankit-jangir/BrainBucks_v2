// styles.js
import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../constants/Colors.constant';
import { StyleConstants } from '../constants/Style.constant';



const styles = StyleSheet.create({
    viewWelcome: {
      width: "100%",
      justifyContent: "center",
      alignItems: 'center',
      marginTop: 50
    },
    textWel: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 30,
      color:ColorsConstant.GrayyColor
    },
    qview: {
      width: "100%",
      justifyContent: "center",
      alignItems: 'center',
      marginTop: 0,
    },
    qview1: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: "center",
    },
    qview2: {
      width: 30,
      height: 30,
      alignItems: 'flex-end',
      justifyContent: "center",
      flex: 0.20
    },
    viewTitle: {
      width: "100%",
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flex: 0.80
    },
    textTit: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      color:'#000',
      paddingLeft: 10
    },
    Pview: {
      width: "100%",
      height: 150,
      justifyContent: "center",
      alignItems: 'center'
    },
    Pview1: {
      width: 250,
      height: 120,
      backgroundColor: ColorsConstant.White,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: ColorsConstant.LightGray,
      alignItems: "center",
      justifyContent: "center"
    },
    textP: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: '#2E2E2E'
    },
    viewJ: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "center",
      paddingTop: 30
    },
    textj: {
      color: '#2188E7',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18
    },
    Doview: {
      width: '100%',
      height: 50,
      alignItems: 'center'
    },
    Doview1: {
      width: 150,
      alignItems: "center"
    },
    textDo: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: '#DC1111',
      textAlign: "center"
    },
    lview: {
      width: 200,
      height: 200,
      backgroundColor: 'transparent',
    },
    Eview: {
      width: '100%',
      alignItems: "center",
      marginTop: 30
    },
    Etouch: {
      height: 45,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textExam: {
      color: ColorsConstant.White,
      fontSize: 17,
      fontFamily: 'WorkSans-Medium'
    },
    textTimer: {
      color: ColorsConstant.TermColor,
      fontSize: 17,
      fontFamily: 'WorkSans-Medium'
    }
  })

  export default styles