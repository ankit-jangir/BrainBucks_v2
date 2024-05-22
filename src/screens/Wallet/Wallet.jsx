import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import Header from '../../components/Header';

const Wallet = ({navigation}) => {
  return (
    <View style={styles.container}>
    
      <View style={styles.container1}>
        <LinearGradient
          style={{ width: '100%', borderRadius: 10 }}
          colors={['#E34F4F', '#D64A7B', '#C143BC']}
        >
          <View style={styles.containerImg1}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../../assets/img/walletI.png')}
                style={styles.walletIcon}
                resizeMode='contain'
              />
              <Text style={styles.headerTitle}>My Wallet</Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.shareText}>Share</Text>
              <Image
                tintColor="white"
                source={require('../../assets/img/share.png')}
                style={styles.shareIcon}
                resizeMode='contain'
              />
            </View>
          </View>

          <View>
            <Text style={styles.balanceText}>₹ 45,600 </Text>
          </View>

          <View style={styles.containerImg1}>
            <View style={styles.growthContainer}>
              <Text style={styles.growthText}>+121.56%</Text>
            </View>

            <View style={styles.investedContainer}>
              <Text style={styles.investedText}>Invested</Text>
              <Text style={styles.investedAmount}>₹ 4,500</Text>
            </View>
          </View>

          <View style={styles.containerImg2}>
            <View style={styles.redeemableContainer}>
              <Text style={styles.redeemableText}>Redeemable Balance ₹ 42,600</Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText} onPress={() => navigation.navigate('myEarning')} >Details</Text>
              <Image
                tintColor="white"
                source={require('../../assets/img/rightarrow1.png')}
                style={styles.detailsIcon}
                resizeMode='contain'
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionItem}  onPress={() => navigation.navigate('deposit')} >
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/downarrow.png')}
                style={styles.actionIcon}
                resizeMode='contain'
              />
            </View>
            <Text style={styles.actionText} >Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/uparrow.png')}
                style={styles.actionIcon}
                resizeMode='contain'
              />
            </View>
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('history')}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/updown.png')}
                style={styles.actionIcon}
                resizeMode='contain'
              />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Image
                tintColor="gray"
                source={require('../../assets/img/question.png')}
                style={styles.actionIcon}
                resizeMode='contain'
              />
            </View>
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    padding: 8,
  },
  containerImg1: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  containerImg2: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#f5d0f1",
    borderBottomRightRadius: 5,
    borderBottomStartRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  walletIcon: {
    height: 25,
    width: 25,
  },
  headerTitle: {
    marginLeft: 10,
    color: "white",
    fontWeight: "600",
    fontSize: 21,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  shareText: {
    color: "white",
  },
  shareIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  balanceText: {
    margin: 20,
    fontSize: 27,
    fontWeight: "700",
    color: "white",
  },
  growthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    padding: 4,
    backgroundColor: "#f5d0f1",
    borderRadius: 5,
  },
  growthText: {
    color: "white",
    textAlign: "center",
  },
  investedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  investedText: {
    color: "white",
  },
  investedAmount: {
    marginLeft: 10,
    color: "white",
  },
  redeemableContainer: {
    alignItems: "center",
    marginLeft: 15,
  },
  redeemableText: {
    color: "white",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  detailsText: {
    color: "white",
  },
  detailsIcon: {
    height: 15,
    width: 15,
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  actionItem: {
    alignItems: "center",
  },
  actionIconContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    height: 30,
    width: 30,
  },
  actionText: {
    textAlign: "center",
  },
});
