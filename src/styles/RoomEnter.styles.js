import { StyleSheet, Dimensions } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  enterRoomMainContainer: {
    flex: 1,
    backgroundColor: '#6B2AEE',
  },
  firstEnter: {
    padding: 15,
  },
  backandhistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backRoomEnterImg: {
    height: 14,
    width: 14,
    marginRight: 10,
    marginLeft: -10,
  },
  typebtn: {
    flex: 1,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  backimg: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  histImg: {
    width: 15,
    height: 15,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  detailsContainer: {
    borderRadius: 10,
  },
  roomNameText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Work Sans',
    paddingBottom: 10,
  },
  memberText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Work Sans',
    fontWeight: '400',
  },
  invitePrev: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 10,
  },
  roomEnterShareBtn: {
    backgroundColor: '#8D4AE2',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    gap: 10,
    marginTop: 5,
  },
  backRoomEnterImg: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  container: {
    marginHorizontal: 0,
  },
  roomContainerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  enterbtncontainer: {
    flex: 1,
    borderRadius: 10,
  },
  enterbtn: {
    fontSize: 16,
    color: 'white',
  },
  secondEnter: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  tabContainer: {
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tabItem: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    fontFamily: 'Work Sans',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Work Sans',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -5,
    height: 2,
    width: '100%', // Updated to full width as per your previous request
    backgroundColor: '#2E2E2E',
    alignSelf: 'center',
  },
});
