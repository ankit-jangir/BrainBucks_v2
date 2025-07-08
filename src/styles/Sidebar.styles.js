

import { StyleSheet } from 'react-native';
import { ColorsConstant } from '../constants/Colors.constant';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 20
    },
    header: {
      width: "100%",
      paddingVertical: 10,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
    },
    welcomeText: {
      fontFamily: "WorkSans-SemiBold",
      color: ColorsConstant.Black,
      fontSize: 21,
      borderWidth: 1,
      borderColor: 'transparent',
      fontWeight:"600",
    },
    closeButton: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center"
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingVertical: 10,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30
    },
    profileInfo: {
      marginLeft: 15,
      maxWidth:170
      
    },
    profileName: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 22,
      color:'rgb(12, 12, 12)'
    },
    profileLink: {
      fontFamily: "WorkSans-Regular",
      fontSize: 16,
      color: '#888'
    },
    menu: {
      flex: 1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: "center",
      paddingVertical: 10,
    },
    menuItemIcon: {
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'whitesmoke',
      borderRadius: 25,
    },
    menuItemImage: {
      width: 15,
      height: 15,
    },
    menuItemText: {
      marginLeft: 15,
      fontFamily: "WorkSans-Medium",
      fontSize: 15,
      color: 'gray'
    },
    logoutView:{
      height:170,
      width:300,
      alignItems:"center",
      justifyContent:"center",
      gap:40,
    },
    logoutbuttons: {
      gap: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
      logoutyesbutton: {
        borderRadius:10
      },
  });


export default styles;
