import { StyleSheet } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: ColorsConstant.White
    },
    topbar: {
        flexDirection: 'row',
        padding: 10,
        width: '80%'
    },
    topbtns: {
        flexDirection: 'row',
        padding: 14,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tabBarLabelHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30
    },
    tabBarLabelLogo: {
        width: 20,
        height: 20,
        objectFit: 'contain',
        tintColor: ColorsConstant.GrayyColor
    },
    tabBarLabel: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        color: ColorsConstant.GrayyColor
    },
    roomstext: {
        color: ColorsConstant.Black,
        fontSize: 20
    },

    // Explore style
    roomContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 2,
        backgroundColor: 'white',
        elevation: 5,
        gap: 10,
        paddingBottom:14
    },
    roomNameText: {
        fontSize: 20,
        color: ColorsConstant.Black,
        paddingTop: 10
    },
    memberHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    memberText: {
        color: ColorsConstant.GrayyColor,
        fontSize: 14,
    },
    roomContainerBtns: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between'
    },
    exitbtn: {
        // backgroundColor: 'rgba(112, 29, 219, 1)',
        // padding: 5,
        paddingHorizontal: 8,
        fontFamily: 'WorkSans-Regular',
        borderRadius: 5,
        color: '#D92828',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    exitview: {
        backgroundColor: '#FFF4F4',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:4,
        elevation:2
    },
    exitimg:{
        marginLeft:7,
        width:20,
        objectFit:'contain'
    },
    enterbtn:{
        color: 'white',
        fontFamily:'WorkSans-Regular',
        fontSize:14 
    },
    enterbtncontainer:{
        elevation:3,
        borderRadius:4,
        flex:1,
    },


    // Create room styling
    backimg:{
        width:20,
        height:20,
        borderRadius:50,
        borderWidth:0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    createroomtext:{
        color:ColorsConstant.Black,
        fontSize:24,
        fontFamily:'WorkSans-Regular',
        fontWeight:"500"
    },
    createroomimg:{
        margin:'auto'
    },
    createRoomOptionText:{
        color:ColorsConstant.Black,
        fontSize:20,
        fontFamily:'WorkSans-Regular'
    },
    createRoomBtn:{
        fontFamily:"WorkSans-Regular",
        width:'100%',
        textAlign:'center',
        padding:20,
    },
    createRoomInput:{
        color:ColorsConstant.Black,
        backgroundColor:"#f0f0f0",
        padding:10,
        borderRadius:4
    }
})

export default styles;