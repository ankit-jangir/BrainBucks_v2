import { StyleSheet } from 'react-native';
import { ColorsConstant } from "../constants/Colors.constant";

const styles = StyleSheet.create({
  MainView: {
    paddingVertical: 10,
    flexDirection: 'row',
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
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    flex: 0.8,
    fontFamily: 'WorkSans-Regular',
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
      width: '100%',
      paddingHorizontal: 0,
      marginBottom: 10,
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
      height: 100,
      alignItems: 'flex-start',
    },
    ReferView: {
      width: '100%',
      paddingLeft: 10,
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
      


});

export default styles;






