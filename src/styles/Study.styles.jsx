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
    TouchModal: {
      flex: 1,
      width: '100%',
      backgroundColor: '#00000040',
    },
    mainView: {
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
    TouchImg: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    listView: {
      height: 60,
      width: '100%',
    },
    listView1: {
      flex: 1,
      flexDirection: 'row',
    },
    ExamView: {
      flex: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    AddText: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      color:'#000'
    },
    touchExam: {
      width: 70,
      height: 30,
      backgroundColor: '#EFF5FF',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextSave: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: '#367CFF',
    },
    inputView: {
      width: '100%',
      justifyContent: 'center',
      marginVertical: 10,
    },
    inputView1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ColorsConstant.LightGray,
      borderRadius: 10,
      height: 45,
      marginTop: 0,
    },
    inputText: {
      color: ColorsConstant.LightGray,
      fontSize: 15,
      flex: 0.8,
      fontFamily: 'WorkSans-Regular',
    },
    touchSearch: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    TextYou: {
      paddingVertical: 120,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    stdView: {
      flex: 1,
      backgroundColor: ColorsConstant.White,
    },
    stdView1: {
      width: '100%',
      height: 70,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: ColorsConstant.LightGray,
    },
    stdView2: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stdView3: {
      flex: 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStudy: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 24,
      paddingRight: 40,
      fontWeight: '600',
      color: 'rgba(46, 46, 46, 1)',
    },
    examMainView: {
      width: '100%',
      height: 80,
    },
    examsView: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    TextExam: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 34,
      color: 'rgba(46, 46, 46, 1)',
      fontWeight: '600',
    },
    TouchAdd: {
      width: 70,
      height: 35,
      backgroundColor: '#EFF5FF',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#367CFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextAdd: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 16,
      color: '#367CFF',
    },
    viewStudy: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop: 20,
    },
    TouchData: {
      width: '100%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorsConstant.White,
      borderRadius: 5,
      elevation: 1.5,
      marginBottom: 20,
    },
    DataView: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    cateView: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.2,
    },
    cateImage: {
      width: 50,
      height: 50,
      borderRadius:100
    },
    NameView: {
      flex: 0.65,
      width: '100%',
      height: 60,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    Textname: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 20,
      paddingLeft: 10,
      color: '#000',
    },
    RightVe: {
      flex: 0.2,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    RightVe1: {
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    plusView: {
      width: '100%',
      height: 70,
      borderWidth: 1,
      borderColor: ColorsConstant.LightGray,
      borderRadius: 10,
      marginBottom: 20,
    },
    plusView1: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },

    // ****************************studyexam**************************************
        ExamSaveTouchable:
        {
          width: '100%',
          height: 50,
          justifyContent: "center",
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: ColorsConstant.LightGray,
          borderRadius: 10,
          marginBottom: 10
        },
        ExamSaveV:
        {
          flexDirection: "row",
          justifyContent: 'flex-start',
          alignItems: "center",
        },
        ExamSaveV1:
        {
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: "center",
        },
        ExamSaveImg:
        {
          width: 20,
          height: 20
        },
        ExamSaveV2:
        {
          width: "100%",
          height: 50,
          alignItems: 'flex-start',
          justifyContent: 'center'
        },
        ExamSaveText:
        {
          fontFamily: 'WorkSans-SemiBold',
          fontSize: 16,
          color:'#000'
        }
  });

  export default  styles