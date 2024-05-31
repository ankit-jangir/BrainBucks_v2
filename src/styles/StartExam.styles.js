import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../constants/Colors.constant';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: "#00000090",
      borderRadius: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      width: 320,
      // height:150,
      alignItems: 'center',
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: .50,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      width: 180,
    },
    buttonOpen: {
      backgroundColor: 'green',
    },
    buttonClose: {
      backgroundColor: 'green',
      marginTop: 15,
      marginBottom: 20
    },
    textStyle: {
      color: 'dark',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    InsufficientV:
    {
      backgroundColor: "#ccc",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      width: "100%",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row"
    },
    InsufficientV1:
    {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      paddingVertical: 5,
    },
    InsufficientText:
    {
      color: "#000",
      fontSize: 18,
      fontFamily: "WorkSans-SemiBold"
    },
    InsufficientTouchable:
    {
      position: "absolute",
      right: 0,
      bottom: 40
    },
    InsufficientText1:
    {
      color: ColorsConstant.Black,
      fontSize: 16,
      marginBottom: 10
    },
    InsufficientTouchable1:
    {
      width: 40,
      height: 40,
      backgroundColor: '#00000070',
      borderRadius: 100,
      margin: 10,
      justifyContent: "center",
      alignItems: 'center'
    },
    InsufficientV2:
    {
      justifyContent: 'center',
      alignItems: 'center',
      height: 240
    },
    InsufficientV3:
    {
      width: '100%',
      padding: 10,
      marginRight: 20,
      backgroundColor: "#fff"
    },
    InsufficientV4:
    {
      flexDirection: "row",
      justifyContent: 'flex-start',
      alignItems: "flex-start",
      backgroundColor: "#fff"
    },
    InsufficientV5:
    {
      width: 50,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: "center",
    },
    categoryImage:
    {
      width: 35,
      height: 35,
      borderRadius: 100
    },
    categoryView:
    {
      width: "100%",
      height: "auto",
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    categoryText:
    {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
      width: "90%"
    },
    EnteryV:
    {
      width: '100%',
      height: 50,
      backgroundColor: "#fff",
      marginTop: 0,
      justifyContent: 'center',
      alignItems: "center"
    },
    EnteryV1:
    {
      flex: 1,
      flexDirection: "row"
    },
    EnteryFeesVi:
    {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    EnteryFeesText:
    {
      fontFamily: "WorkSans-Regular",
      fontSize: 13,
      color: ColorsConstant.GrayyColor,
      flex: 0.40
    },
    EnteryV2:
    {
      flexDirection: "row",
      justifyContent: "flex-start",
      flex: 0.70,
      alignItems: "center"
    },
    EnteryImg:
    {
      width: 20,
      height: 20,
    },
    EnteryFeesBText:
    {
      fontFamily: "Inter",
      fontSize: 14,
      color: '#F5B807',
      paddingLeft: 10
    },
    EnteryV3:
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
    },
    DateV:
    {
      flex: 4,
      backgroundColor: "#fff",
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    DateV1:
    {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    DateText:
    {
      fontFamily: "Inter",
      fontSize: 13,
      color: '#8A8A8A',
      paddingLeft: 10
    },
    TotalSlotsVi:
    {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: "center",
    },
    DateImg:
    {
      width: 25,
      height: 25
    },
    TotalSlotsVi1:
    {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10
    },
    TotalSlotsBtext:
    {
      color: '#2188E7',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 18
    },
    TotalSlotsVi2:
    {
      width: "100%",
      height: 40,
      justifyContent: "center"
    },
    TotalSlotsVi3:
    {
      height: 10,
      backgroundColor: 'whitesmoke',
      borderRadius: 10
    },
    StartExamV:
    {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    StartExamLiner:
    {
      height: 45,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    LobbtText:
    {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'WorkSans-Medium'
    },
  
  
  });

  export default styles