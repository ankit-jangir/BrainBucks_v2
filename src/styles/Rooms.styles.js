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
        paddingBottom: 14
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
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 2
    },
    exitimg: {
        marginLeft: 7,
        width: 20,
        objectFit: 'contain'
    },
    enterbtn: {
        color: 'white',
        fontFamily: 'WorkSans-Regular',
        fontSize: 14
    },
    enterbtncontainer: {
        elevation: 3,
        borderRadius: 4,
        flex: 1,
    },


    // Create room styling
    backimg: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createroomtext: {
        color: ColorsConstant.Black,
        fontSize: 24,
        fontFamily: 'WorkSans-Regular',
        fontWeight: "500"
    },
    createroomimg: {
        margin: 'auto'
    },
    createRoomOptionText: {
        color: ColorsConstant.Black,
        fontSize: 20,
        fontFamily: 'WorkSans-Regular'
    },
    createRoomBtn: {
        fontFamily: "WorkSans-Regular",
        width: '100%',
        textAlign: 'center',
        padding: 20,
    },
    createRoomInput: {
        color: ColorsConstant.Black,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 4
    },


    // Enter Room Style
    enterRoomMainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: "#701DDB",
        paddingTop: 20
    },
    backRoomEnterImg: {
        height: 14,
        width: 14,
        marginRight: 10,
        marginLeft: -10
    },
    typebtn: {
        flex: 1,
        paddingHorizontal: 0,
        alignItems: 'center',
        marginHorizontal: 0
    },
    firstEnter: {
        height: '40%',
        padding: 10,
    },
    backandhistory: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    roomEnterShareBtn: {
        backgroundColor: '#8D4AE2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        paddingHorizontal: 20,
    },
    histImg: {
        height: 15,
        width: 15,
        objectFit: 'contain',
        marginRight: 10,
        marginLeft: -10
    },
    invitePrev: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    detailsContainer: {
        gap: 11
    },
    secondEnter: {
        //the second part of room
        height: "60%",
        backgroundColor: ColorsConstant.White,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },




    // History starts here
    /* Styles for top bar of history */
    Hview: {
        width: '100%',
        height: 65,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: ColorsConstant.LightGray,
        backgroundColor: "white"
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
        width: 40,
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


    proceedbtn: {
        padding: 14,
        textAlign: 'center',
        backgroundColor: "#fff",
        borderRadius: 10
    },
    flexCenter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    centerBox: {
        borderRadius: 8,
        backgroundColor: "#212236",
        height: 400,
        width: '100%',
        padding: 20,
        margin: 20,
        justifyContent: "space-evenly"

    },
    createLiveText: {
        fontSize: 20,
        color: "#fff",
        width: "70%",
        textAlign: 'center'
    },
    //dropdown styles:
    dropdownExam: {
        marginBottom: 20,
        backgroundColor: "#212236",

    },
    dropdownlabel: {
        color: "#A1A2AD",
        backgroundColor: "#282940",
    },
    ddexaminputSearchStyle: {
        color: "#A1A2AD",
        backgroundColor: "white",
        fontSize: 14
    },
    ddexamselectedTextStyle: {
        color: "#A1A2AD",
        backgroundColor: "#282940",
        padding: 7
    },
    ddexamplaceholderStyle: {
        color: "#B3B3B3",
        backgroundColor: "#282940",
        paddingHorizontal: 12,
        paddingVertical: 7
    },
    ddExamItemContainerStyle: {
        color: "#A1A2AD",
        borderRadius: 4,
        borderColor: '#353651',
        borderBottomWidth: 1,
        marginHorizontal: 4,
        marginVertical: 1,
        borderRadius: 4,
        backgroundColor: "#282940"
    },
    ddItemTextStyle: {
        color: "#A1A2AD",
        fontSize: 14,
    },
    ddinput: {
        backgroundColor: '#282940',
        color: "#A1A2AD",
        borderRadius: 4,
        paddingHorizontal: 10
    },
    TimeConatiner:
    {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    miniumT:
    {
        paddingBottom: 8,
        textAlign: "right",
        fontSize: 12,
        color: "#A1A2AD",

    },
    containerb:
    {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#282940',
        borderRadius: 4,
        paddingHorizontal: 10
    },
    st:
    {
        paddingBottom: 8,
        color: "#A1A2AD",

    }
})

export default styles;