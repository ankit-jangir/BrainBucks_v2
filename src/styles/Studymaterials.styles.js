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
      fontSize: 18,
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
      fontSize: 14,
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
      fontSize: 13,
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
      fontSize: 14,
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
      fontSize: 22,
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
      fontSize: 29,
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
      fontSize: 14,
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
      fontSize: 18,
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
          fontSize: 14,
          color:'#000'
        },

        // 34567899999/**************freepdf***************************** */
          // container: {
          //   marginBottom: 10,
          //   marginHorizontal: 10,
          // },
          touchableOpacity: {
            width: '100%',
            height: 70,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#EFEFEF',
            marginTop: 10,
            flexDirection: 'row',
          },
          innerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          },
          imageContainer: {
            width: 35,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0.18,
            backgroundColor: '#EFEFEF',
            borderRadius: 100,
          },
          image: {
            width: 50,
            height: 50,
            borderRadius: 25,
          },
          textContainer: {
            flex: 0.65,
            width: '90%',
            height: 60,
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          title: {
            fontFamily: 'WorkSans-SemiBold',
            fontSize: 18,
            paddingLeft: 10,
            color: '#000',
          },
          detailsContainer: {
            flexDirection: 'row',
            paddingLeft: 10,
          },
          detailsText: {
            fontFamily: 'WorkSans-Medium',
            fontSize: 14,
            color: '#7E7E7E',
          },
          count: {
            color: '#D92828',
            paddingHorizontal: 5,
          },
          arrowContainer: {
            flex: 0.1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          arrowButton: {
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          },
          arrowIcon: {
            width: 25,
            height: 20,
            borderRadius: 25,
          },
              // **********************online class css******************/********** */
                lottiV:
                {
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                lottie:
                {
                  width: 300,
                  height: 250,
                  backgroundColor: 'transparent',
                },
                IndustryV:
                {
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: "center"
                },
                IndustryT:
                {
                  fontFamily: "WorkSans-SemiBold",
                  fontSize: 21,
                  textAlign: "center"
                },
                comingSoon: {
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: "center",
                  marginTop: 20
                },
                comingSoonT: {
                  width: '80%',
                  height: 50,
                  backgroundColor: "#367CFF",
                  borderRadius: 10,
                  justifyContent: 'center'
                  , alignItems: "center"
                },

                // **************************studymaterials css*********************************
                  container: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 10
                  },
                  button: {
                    paddingHorizontal: 35,
                    padding: 10,
                    borderRadius: 10,
                    margin: 5
                  },
                  buttonP: {
                    paddingHorizontal:65,
                    padding: 10,
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    margin: 5
                  },
                  button1: {
                    paddingHorizontal: 51,
                    padding: 10,
                    borderRadius: 10,
                    margin: 5
                  },
                  button2: {
                    paddingHorizontal:65,
                    padding: 10,
                    borderRadius: 10,
                    margin: 5
                  },
                  selectedButton: {
                    backgroundColor: 'black',
                  },
                  deselectedButton: {
                    backgroundColor: 'rgba(239, 239, 239, 1)'
                  },
                  text: {
                    fontSize: 16,
                  },
                  selectedText: {
                    color: 'white',
                  },
                  deselectedText: {
                    color: 'black',
                  },
                  mainView: {
                    width: '100%',
                    height: 70,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: ColorsConstant.LightGray
                  },
                  arrowView: {
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  },
                  TouchArrow: {
                    flex: 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 4,
                    width: 50,
                    height: 50,
                    borderColor: ColorsConstant.BlurWhite,
                    borderWidth: 1,
                    borderRadius: 100
                  },
                  StdView: {
                    flex: 0.80,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingLeft: 20
                  },
                  TextStd: {
                    fontSize: 20,
                    fontFamily: 'WorkSans-SemiBold',
                    color: '#000'
                  },

                  // ***********************************questionpaper*****************************************************
                
  mainView: {
    width: "100%",
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray
  },
  mainView1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  touchView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100
  },
  QView: {
    flex: 0.80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20
  },
  textQ: {
    fontSize: 20,
    fontFamily: "WorkSans-SemiBold",
    color:'#000',
    fontWeight:'600'
  },
  inputV: {
    flex: 1,
    paddingHorizontal: 10
  },
  inputV1: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
  },
  inputv2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorsConstant.LightGray,
    borderRadius: 10,
    height: 45,
    marginTop: 0
  },
  Inview: {
    color: ColorsConstant.GrayyColor,
    fontSize: 14,
    flex: 0.80,
    fontFamily: "WorkSans-Regular"
  },
  PView: {
    flex: 1,
    marginBottom: 20,
    justifyContent:"space-between"
  },
  Ptouch: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ColorsConstant.LightWhite,
    backgroundColor:ColorsConstant.White
  },
  textQue: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
    color:'#000',
    fontWeight:'600'

  },
  TrView: {
    width: '100%',
    height: 50,
  },
  TrView1: {
    flex: 1,
paddingTop:10   
  },
  touchTR: {
    // width: 150,
    height: 30,
    // backgroundColor: "#EFFFF6",
    borderRadius: 5,
    flexDirection: "row",
    
  },
  TextTrans: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 17,
    color: '#1DC173'
  },
  dateView: {
    width: 140,
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textDate: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 13,
    color: '#8A8A8A'
  },
  downView: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  touchDown: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  textDown: {
    color: ColorsConstant.Black,
    fontSize: 13,
    fontFamily: 'WorkSans-Regular',
    color:'#000'
  },
  touchEng: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsConstant.Black
  },
  textEng: {
    fontSize: 13,
    fontFamily: 'WorkSans-Regular',
    color: ColorsConstant.White,
  },
  Hview: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
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
  selectedButton1: {
                    backgroundColor: '#8D4AE2',
                  },
                  deselectedButton1: {
                    backgroundColor: '#F2F2F2'
                  },
  });

  export default  styles