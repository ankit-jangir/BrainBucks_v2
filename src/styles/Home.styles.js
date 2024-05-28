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
    FreeView: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      flex: 1,
    },
    FreeView1: {
      flex: 1,
      justifyContent: 'center',
    },
    TextExam: {
      color: '#000',
      fontSize: 16,
      fontFamily: 'WorkSans-Medium',
    },
    LoadingView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    TouchRender: {
      flex: 1,
      width: 100,
      height: 100,
      paddingHorizontal: 10,
    },
    Pic: {
      width: '100%',
      height: 145,
    },
    QuizzView: {
      flex: 1,
      paddingVertical: 5,
    },
    MaskedVieww: {
      width: 340,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      marginRight: 20,
      backgroundColor: ColorsConstant.White,
    },
    QuizzView1: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: ColorsConstant.White,
    },
    QuizzView2: {
      width: 50,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    CatePic: {
      objectFit:'cover',
      height:'100%',
      width:'100%',
      borderRadius:50,


    },
    TitleView: {
      width: '100%',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TitleTextt: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
      width: '90%',
      color: '#000',
      alignItems:'center'
    },
    FeeView: {
      width: '100%',
      height: 50,
      backgroundColor: ColorsConstant.White,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    FeeView1: {
      flex: 1,
      flexDirection: 'row',
    },
    FeeView2: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextPrice: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: ColorsConstant.GrayyColor,
      flex: 0.3,
    },
    CoinView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex: 0.7,
      alignItems: 'center',
    },
    CoinPic: {
      width: 20,
      height: 20,
    },
    TextEntryFee: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
      color: '#F5B807',
      paddingLeft: 10,
    },
    TimeView: {
      flex: 4,
      backgroundColor: ColorsConstant.White,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    TimeView1: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextLobi: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 14,
      color: '#8A8A8A',
      paddingLeft: 10,
    },
    FilledSlot: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    DollarPic: {
      width: 25,
      height: 25,
    },
    FilledSlot1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    TextSlot: {
      color: '#2188E7',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 14,
    },
    LiniView: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
    },
    LiniView1: {
      height: 10,
      backgroundColor: 'whitesmoke',
      borderRadius: 10,
    },
    RegiView: {
      height: 45,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextRegister: {
      color: ColorsConstant.White,
      fontSize: 13,
      fontFamily: 'WorkSans-Medium',
    },
    SourecView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    TextMin: {
      color: '#C922E4',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
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
      ActiveView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center", 
    },
    TextCat: {
      fontSize: 18,
      fontFamily: 'WorkSans-SemiBold',
      textAlign: 'center',
    },
    TextActive: {
      fontSize: 14,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'center',
      color: ColorsConstant.GrayyColor,
    },
    ChalView: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 20,
    },
    GraView: {
      width: 340,
      borderRadius: 10,
      padding: 15,
      justifyContent: 'space-between',
      marginRight: 20,
    },
    GraView1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    TextHash: {
      color: '#F0F0F050',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18,
    },
    CountView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextCount: {
      color: '#F0F0F050',
      fontFamily: 'WorkSans-Regular',
      fontSize: 14,
    },
    TextJoin: {
      color: ColorsConstant.White,
      fontFamily: 'WorkSans-Medium',
      fontSize: 14,
    },
    ViewCatName: {
      justifyContent: 'flex-start',
      paddingTop: 20,
    },
    CateName: {
      color: ColorsConstant.White,
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 26,
    },
    ViewCatName1: {
      width: '100%',
      height: 30,
      justifyContent: 'center',
    },
    GradientView: {
      height: 10,
      backgroundColor: '#F8F8F840',
      borderRadius: 10,
    },


});

export default styles;






