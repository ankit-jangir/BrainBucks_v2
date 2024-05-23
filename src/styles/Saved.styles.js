import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../../src/constants/Colors.constant';
import { StyleConstants } from '../../src/constants/Style.constant';
import { Config } from "../Services/Config";

const styles = StyleSheet.create({
    modalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    modalTocuh: {
      flex: 1,
      width: '100%',
      backgroundColor: '#00000040',
    },
    modalview1: {
      width: '100%',
      height: 500,
      backgroundColor: ColorsConstant.White,
      paddingVertical: 10,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    DownTouch: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    viewExam: {
      height: 60,
      width: '100%',
    },
    examview: {
      flex: 1,
      flexDirection: 'row',
    },
    addview: {
      flex: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    textAdd: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      color:'#000',
      fontWeight:'700'
    },
    EList1: {
      width: 70,
      height: 30,
      backgroundColor: '#EFF5FF',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textSave: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: '#367CFF',
    },
    loadview: {
      width: '100%',
      justifyContent: 'center',
      marginVertical: 10,
    },
    loadview1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ColorsConstant.LightGray,
      borderRadius: 10,
      height: 45,
      marginTop: 0,
    },
    SerchIn: {
      color: ColorsConstant.GrayyColor,
      fontSize: 15,
      flex: 0.8,
      fontFamily: 'WorkSans-Regular',
    },
    Loaderview: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 500,
    },
    Hview: {
      width: '100%',
      height: 70,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: ColorsConstant.LightGray,
    },
    Hview1: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    examView: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewAdd: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.4,
    },
    textMy: {
      fontSize: 22,
      fontFamily: 'WorkSans-SemiBold',
      color:"#000",
      textAlign:'center'
    },
    touchAdd: {
      width: 70,
      height: 35,
      backgroundColor: '#EFF5FF',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#367CFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textAdd1: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 16,
      color: '#367CFF',
    },
    liveVIew: {
      flex: 1,
      paddingTop: 20,
    },
    liveVIew1: {
      width: 340,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      backgroundColor: ColorsConstant.White,
    },
    liveVIew2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: ColorsConstant.White,
    },
    cateView: {
      width: 50,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    cateName: {
      width: '75%',
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
      color:'#000',
      marginLeft:20,
      fontSize:20
    },
    cateName1: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      color:'#000',
      fontWeight:'700'
    },
    Tdelete: {
      width: 50,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    DeleteImg: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    ActiveView: {
      width: '100%',
      height: 50,
    },
    ActiveView1: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ActiveView2: {
      width: 140,
      height: 30,
      backgroundColor: '#EFF5FF',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAct: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: '#367CFF',
    },
    Cview: {
      width: 140,
      height: 30,
      backgroundColor: '#EFFFF6',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textC: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: '#1DC173',
    },
    textP: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
    },
    textPro: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 14,
      color: 'rgba(138, 138, 138, 1)',
    },
    textPer: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 14,
      color: '#DCA815',
    },
    LiniView: {
      height: 10,
      backgroundColor: 'whitesmoke',
      borderRadius: 10,
      marginTop:10
    },
    Grade: {
      borderRadius: 8,
      width: '50%',
      height: 10,
    },
    viewBtn: {
      width: '100%',
      height: 45,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D9D9D9',
      marginTop: 10,
      marginBottom: 8,
    },
    textDetails: {
      color: '#000',
      fontSize: 17,
      fontFamily: 'WorkSans-Medium',
    },
    EListss: {
      width: '100%',
      height: 70,
      borderWidth: 1,
      borderColor: '#EFEFEF',
      borderRadius: 10,
      marginBottom: 20,
    },
    EListss1: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    ItmView: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.2,
    },
    ItmView1: {
      flex: 0.65,
      width: '100%',
      height: 60,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    ItmText: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      paddingLeft: 10,
      color:'#000'
    },
    viewSS: {
      flex: 0.2,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });

  export default styles