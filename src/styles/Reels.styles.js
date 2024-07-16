import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../constants/Sizes.constant';
import { ColorsConstant } from '../constants/Colors.constant';

const styles = StyleSheet.create({
    container: { flex: 1 },
    backBtnView: { position: 'absolute', padding: 20, top: 20, left: 20, width: 30, height: 30, zIndex: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 },
    backBtn: { width: 25, height: 25, borderRadius: 20 },
    pauseBtnView: { zIndex: 21, position: 'absolute', padding: 20, top: screenHeight / 2 - 17, left: screenWidth / 2 - 17, width: 35, height: 35, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20 },
    pauseBtn: { width: 30, height: 30, borderRadius: 20, objectFit: 'contain' },
    resumeBtn: { width: 25, height: 25, borderRadius: 20, objectFit: 'contain' },
    tagsContainer: { marginLeft: 40, padding: 20, flexGrow: 0, height: "11%", backgroundColor: 'transparent' },
    tagsView: { 
        flexDirection: 'row',
        marginRight: 25,
        flex:1,
     },
    tag: { 
        padding: 10, 
        paddingHorizontal: 20, 
        marginLeft: 20, 
        borderRadius: 10, 
        backgroundColor: ColorsConstant.Theme, 
        flexGrow: 1 
    },
    videoContainer: {
        height: screenHeight * (85 / 100)
    },
    video: {
        height: '100%',
    },
    captionView: { position: 'absolute', left: 0, bottom: 30, right: 0, backgroundColor: 'rgba(0,0,0,0.2)' },
    reelNameContainer: { flexDirection: 'row', margin: 20 },
    reelImage: { width: 30, height: 30, borderRadius: 50 },
    reelName: { color: ColorsConstant.White, fontSize: 16, paddingHorizontal: 20, textAlign: "center", textAlignVertical: "center" },
    caption: { paddingHorizontal: 20, color: ColorsConstant.White },
    likeCommentContainer: { position: 'absolute', bottom: 240, right: 0, height: 200, width: 60, paddingTop: 10, justifyContent: 'space-between' },
    likeItemContainer: { alignItems: 'center', justifyContent: 'center' },
    likeIcon: { widhth: 30, height: 30, objectFit: 'contain' },
    commentImage: { width: 25, height: 25, borderRadius: 50, borderWidth: 0.3, borderColor: '#000' },
    commenterName: {
        fontSize: 15, color: ColorsConstant.Black, marginTop: 4,
        fontFamily: 'WorkSans-SemiBold',
    },
    commenterImageView: { width: "13%", height: 30, padding: 10, alignItems: 'center', justifyContent: 'center' },
    nameAndCommentView: { width: "75%" },
    deleteCommentIcon: { marginTop: 20, objectFit: 'contain', height: 18, width: 20 },
    messageview: {
        alignSelf: 'flex-end',
        width: '96%',
        paddingVertical: 10,
        borderRadius: 10,
        margin: 'auto',
        flexDirection: 'row',
        backgroundColor: '#f0f0fa',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 3,
        padding: 10
    },
    messageinput: {
        width: '85%',
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        color: 'gray'
    },
    sendbtnView: {
        backgroundColor: ColorsConstant.Theme,
        padding: 20,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    sendbtnImg: {
        objectFit: 'cover',
        height: 20,
        width: 20,
        tintColor: 'white'
    },

});

export default styles;
