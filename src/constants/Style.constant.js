import { StyleSheet, Platform } from 'react-native'
import { screenHeight, screenWidth } from './Sizes.constant'
import { ColorsConstant } from './Colors.constant'
const c = ColorsConstant
export const StyleConstants = StyleSheet.create({
    bbView: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    H2Nd: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#F5F5F5"
    },
    TocHead: {
        width: 50,
        height: 50,
        backgroundColor: "#F5F5F5",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F5F5F5"
    },
    loaderView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 300
    },
    Btn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 13,
        marginTop: 20,
    },
    containerCard: {
        flex: 1,
        backgroundColor: ColorsConstant.Theme,
        borderTopLeftRadius: 100,
        paddingHorizontal: 25
    },
    LetsView: {
        width: "100%",
        height: 100,
        marginTop: 20
    },
    BtnText: {
        fontFamily: "WorkSans-Medium",
        fontSize: 20
    },
    imgView: {
        width: "100%",
        height: 300,
        justifyContent: "flex-end"
    },
    imgView2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    girlimg: {
        width: "100%",
        height: 150
    },
    header_title: {
        fontSize: 20,
        color: ColorsConstant.Black,
        marginEnd: 10,
        fontFamily: "Poppins-Medium",
        lineHeight: 30,
        textTransform: "capitalize",
        textAlign: "center",
        width: 190
    },
    header_gradient_view: {
        width: "100%",
        paddingStart: 24,
        paddingEnd: 24,
        paddingTop: 40,
        paddingBottom: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    space_between_row_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    header_title: {
        fontSize: 20,
        color: ColorsConstant.Black,
        marginEnd: 10,
        fontFamily: "Poppins-Medium",
        lineHeight: 30,
        textTransform: "capitalize",
        textAlign: "center",
        width: 190
    },
    header_noti_btn: {
        height: 36,
        width: 36,
        borderRadius: 18,
        backgroundColor: ColorsConstant.white_transparent,
        alignItems: "center",
        justifyContent: "center",
    },
    space_between_row_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    space_row_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    small_view_line: {
        height: 1,
        width: 46,
        backgroundColor: ColorsConstant.chambray,
        opacity: .59
    },
    row_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    img_18: {
        height: 18,
        width: 18,
        resizeMode: "contain"
    },
    profile_img: {
        height: 62,
        width: 62,
        borderRadius: 31
    },
    toolbar_header_text: {
        fontSize: 19,
        fontFamily: "Poppins-Medium",
        lineHeight: 28,
        color: ColorsConstant.White
    },
    searchbarView: {
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        backgroundColor: ColorsConstant.White,
        paddingHorizontal: 15,
        marginTop: 25,
        marginBottom: 20,
    },
    descripation_header_text: {
        fontSize: 12,
        flexShrink: 1,
        lineHeight: 18,
        fontFamily: "Poppins-Regular",
        color: ColorsConstant.White,
        marginTop: 5
    },
    img: {
        height: 25,
        width: 20,
        resizeMode: "contain"
    },
    content: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: c.Dark
    },
    safeArView: {
        backgroundColor: ColorsConstant.White,
    },
    icon: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    loader: {
        position: 'absolute',
        alignSelf: 'center',
        width: screenWidth,
        height: screenHeight,
        zIndex: 9999,
        backgroundColor: c.DarkLight
    },
    Textinput: {
        borderWidth: 1.5,
        borderColor: c.BorderColor,
        borderRadius: 7,
        paddingHorizontal: 10,
        width: screenWidth - 40,
        height: 50,
        marginBottom: 12
    },
    textsigup: {
        textAlign: 'center',
        color: c.White,
        fontWeight: 'bold',
    },
    btnTheme: {
        backgroundColor: c.Headercolor,
        borderRadius: 10,
        marginVertical: 15,
        width: screenWidth - 40,
        height: 50,
        justifyContent: 'center'
    },
    securityCheck: {
        width: 35,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnOutline: {
        borderWidth: 1.5,
        padding: 16,
        borderRadius: 10,
        borderColor: c.BorderColor,
        width: screenWidth - 45
    },
    modalLhare: {
        backgroundColor: c.DarkLight,
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    modalView: {
        backgroundColor: c.White,
        borderRadius: 5,
        // padding: 10,
        margin: 20,
        width: screenWidth - 40,
    },
    textStylemodal: {
        color: c.Black,
        padding: 10
    },
    contents: {
        flex: 1,
        backgroundColor: ColorsConstant.Black,
        // paddingHorizontal: 20,
    },
    TouchableView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: c.Headercolor,
        backgroundColor: c.Hashcolortheme,
        height: 50
    },
    border: {
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: 2,
        borderColor: c.Btntheme,
        alignSelf: 'center',
        width: 50
    },
    ViewHader: {
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    Texthader: {
        fontSize: 14,
        color: c.White,
        textAlign: 'center',
    },
    TabsView: {
        height: 150,
        // backgroundColor:ColorsConstant.LightTheme
    },
    OrderWalletView: {
        backgroundColor: c.cards,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
        shadowColor: ColorsConstant.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    Ordertext: {
        width: 150,
        marginRight: 30,
        color: c.White
    },
    OrderItemtext: {
        color: c.BorderColor,
        width: screenWidth - 195,
        marginLeft: 'auto'
    },
    Boxshadow: {
        shadowColor: ColorsConstant.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    root: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    codeFieldRoot: {
        marginTop: 40,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderWidth: 0.3,
        borderColor: ColorsConstant.Hashcolortheme,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: 'blue'
    },
    textweHave: {
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: 5
    },
    textemailroute: {
        fontSize: 16,
        alignSelf: 'center'
    },
    banerPic: {
        height: 350,
        width: screenWidth,
        // alignSelf: 'center'
    },
    cardheading: {
        color: ColorsConstant.Black,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

})
