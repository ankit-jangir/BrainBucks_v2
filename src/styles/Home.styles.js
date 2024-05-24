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
    fontSize: 16,
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
  ViewLoti: {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
  },
  LiveText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "WorkSans-Medium",
  },
  SeeAll: {
    color: ColorsConstant.GreenColor,
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
  },
  container: {
    flex: 1,
    height:10,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
  carouselContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  RegiView: {
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TextRegister: {
    color: ColorsConstant.White,
    fontSize: 17,
    fontFamily: "WorkSans-Medium",
  },
  container1: {
    flex: 0.3,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  title: {
    color: '#000',
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: '700',
  },
  feeAndDateRow: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  feeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: '500',
  },
  feeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  feeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  date: {
    color: 'rgba(138, 138, 138, 1)',
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 5,
  },
  prizeAndDateRow: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  prizeLabel: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 14,
    paddingLeft: 6,
    fontWeight: '500',
  },
  prizeAmountContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  prizeAmount: {
    color: 'rgba(245, 184, 7, 1)',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5,
  },
  iconImageSmall: {
    width: 17,
    height: 17,
  },
  earningContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  dollarImage: {
    width: 25,
    height: 25,
  },
  earningAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  earningAmountBlue: {
    color: '#2188E7',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
  },
  earningAmount: {
    color: '#333333',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
  },
  progressBarContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
});

export default styles;
