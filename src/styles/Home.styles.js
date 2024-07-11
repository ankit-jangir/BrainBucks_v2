import { StyleSheet } from 'react-native';
import { ColorsConstant } from "../constants/Colors.constant";

const styles = StyleSheet.create({
  MainView: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  TouchImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
    borderColor: 'rgba(71, 71, 71, 0.06)',
  },
  SearchBar: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'rgba(71, 71, 71, 0.06)',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    marginHorizontal: 10
  },
  TextSearch: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'WorkSans-Regular',
    verticalAlign:'center',
    textAlignVertical:'center'
  },
  ShareView: {
    flex: 0.1,
    justifyContent: 'center',
    padding: 4,
    marginLeft: 0,
  },
  BellView: {
    flex: 0.2,
    justifyContent: 'center',
    padding: 4,
  },
    carouselImage: {
      width: '100%',
      height: '100%',
    },
    carouselContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    carouselItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    LiveView: {
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 1,
      padding: 10,
    },
    LiveView1: {
      flex: 1,
      justifyContent: 'center',
    },
    LiveView2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    LiveText: {
      color: '#000',
      fontSize: 14,
      fontFamily: 'WorkSans-Medium',
    },
    lotiView: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    SeeView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    TouchAll: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    SeeAll: {
      color: ColorsConstant.GreenColor,
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
    },
    ViewLoti: {
      width: 25,
      height: 25,
      backgroundColor: 'transparent',
    },
    ReferCard: {
      width: '95%',
      paddingHorizontal: 0,
      marginBottom: 10,
      alignItems:'center',
      margin:'auto'
    },
    ActiveView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginVertical:10
    },
    TextCat: {
      fontSize: 20,
      fontFamily: "WorkSans-SemiBold",
      textAlign: "center",
    },
    TextActive: {
      fontSize: 16,
      fontFamily: "WorkSans-Regular",
      textAlign: "center",
      color: ColorsConstant.GrayyColor,
    },
    ExamView: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 5,
    },
    TouchExam: {
      width: 160,
      padding: 8,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#F5F5F5",
      marginRight: 20,
      backgroundColor: ColorsConstant.White,
    },
    bgPic: {
      width: '100%',
      margin:"auto",
      height: 100,
      alignItems: 'flex-start',
    },
    ReferView: {
      width: '100%',
      paddingLeft: 20,
      paddingVertical: 13,
    },
    TextEarn: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 14,
      color: ColorsConstant.White,
    },
    TextRupee: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 28,
      color: ColorsConstant.White,
    },
      
    header: {
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
      elevation:1
    },
    backImage: {
      height: 30,
      width: 45,
      marginRight: 8,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'black',
      fontFamily: 'Work Sans',
      textAlign:'center'
    },
    DataView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    TextNo: {
      fontSize: 18,
      fontWeight: '500'
    },
    LoadView: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      height:1000
    },
    LoaderVIew: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    examView: {
      width: 160,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      backgroundColor: "#fff",
      marginTop: 10,
      marginHorizontal: 10,
      marginBottom: 10
      
    },
    CateView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    CateImage: {
      width: 40,
      height: 40,
      borderRadius: 100
    },
    TextEdit: {
      fontSize: 20,
      fontFamily: 'WorkSans-SemiBold',
      textAlign: 'center'
    },
    buyCourseModalView:{
      width:300,
      height:200,
      backgroundColor:"#fff",
      justifyContent:"space-evenly",
      padding:20
    },
    buyCourseModalButtonsView:{
      flexDirection:"row",
      justifyContent:"space-evenly"
    },
    buyCourseModalText:{
      textAlign:"center",
      fontSize:20
    }

});

export default styles;






