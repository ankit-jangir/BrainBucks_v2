import {StyleSheet} from 'react-native';
import {ColorsConstant} from '../constants/Colors.constant';

const styles = StyleSheet.create({
mainHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  paddingHorizontal: 12,
  paddingVertical: 10,
  // borderBottomWidth: 1,
  // borderBottomColor: '#E0E0E0',
  // shadowOffset: { width: 0, height: 2 },
  // shadowOpacity: 0.05,
  // shadowRadius: 2,
},

iconWrapper: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#F5F5F5',
  backgroundColor: '#fff',
},

iconImage: {
  width: 20,
  height: 20,
  tintColor: '#333',
  resizeMode: 'contain',
},

searchBox: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#F5F5F5',
  borderRadius: 10,
  marginHorizontal: 10,
  paddingHorizontal: 12,
  height: 40,
   boxShadow: `0px 2px 4px rgba(71, 71, 71, 0.06)`,
},

searchIcon: {
  width: 16,
  height: 16,
  tintColor: '#7E7E7E',
  marginRight: 8,
  resizeMode: 'contain',
},

searchPlaceholder: {
  color: '#7E7E7E',
  fontSize: 14,
  fontWeight: '500',
},

bellWrapper: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  backgroundColor: '#fff',
},

bellIcon: {
  width: 20,
  height: 20,
  tintColor: '#333',
  resizeMode: 'contain',
},

badgeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
  position: 'absolute',
  top: -4,
  right: -4,
  backgroundColor: 'red',
  borderRadius: 10,
  paddingHorizontal: 4,
  paddingVertical: 1,
},



  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    borderRadius:10,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
    marginTop: 4,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
  LiveView: {
      flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  LiveView1: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  LiveView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LiveText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    fontWeight: '500',
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
    width: '95%', 
    paddingHorizontal: 0,
    marginBottom: 10,
    alignItems: 'center',
    margin: 'auto',
  },
  ActiveView: {
    width: '100%',
    marginVertical: 10,
  },
  TextCat: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    textAlign: 'center',
  },
  TextActive: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    color: ColorsConstant.GrayyColor,
  },
  ExamView: {
   flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around', // ye items ko space ke according side me le ja raha hai
  alignItems: 'center',
  alignSelf: 'center',

  },


  TouchExam: {
    width: 160,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginRight: 20,
    backgroundColor: ColorsConstant.White,

  },
  bgPic: {
    width: '100%',
    margin: 'auto',
    height: 100,
    alignItems: 'flex-start',
  },
  ReferView: {
    width: '100%',
    paddingLeft: 20,
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

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
  },
  backImage: {
    height: 30,
    width: 45,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Work Sans',
    textAlign: 'center',
  },
  DataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextNo: {
    fontSize: 18,
    fontWeight: '500',
  },
  LoadView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 1000,
  },
  LoaderVIew: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  examView: {
    width: 160,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  CateView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CateImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  TextEdit: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    textAlign: 'center',
  },
  buyCourseModalView: {
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  buyCourseModalButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buyCourseModalText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },

  
  cardContainer: {
    marginTop:20,
    width: 160,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    // marginRight: 12,
    elevation: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    margin:10
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    color: '#DC1111',
    marginTop: 4,
  },
});

export default styles;
