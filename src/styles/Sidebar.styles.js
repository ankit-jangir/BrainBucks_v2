

import { StyleSheet } from 'react-native';


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
      fontSize: 20,
      color: '#888'
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
    },
    profileName: {
      fontFamily: "WorkSans-SemiBold",
      fontSize: 22,
      color:'rgba(138, 140, 148, 1)'
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
      paddingVertical: 15,
    },
    menuItemIcon: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'whitesmoke',
      borderRadius: 25,
    },
    menuItemImage: {
      width: 25,
      height: 25,
    },
    menuItemText: {
      marginLeft: 15,
      fontFamily: "WorkSans-Medium",
      fontSize: 16,
      color: 'gray'
    },
  });


export default styles;
