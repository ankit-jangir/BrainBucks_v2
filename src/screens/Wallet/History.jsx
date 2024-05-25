import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';

const History = ({ navigation }) => {
  const data = [
    {
      r: '₹ 15,600',
      s: '12:34 | 20 Dec 2022',
      success: 1,
      type: 'credit',
    },
    {
      r: '₹ 15,600',
      s: '12:34 | 20 Dec 2022',
      success: -1,
      type: 'debit',
    },
    {
      r: '₹ 15,600',
      s: '12:34 | 20 Dec 2022',
      success: 0,
      type: 'credit',
    },
    {
      r: '₹ 15,600',
      s: '12:34 | 20 Dec 2022',
      success: 1,
      type: 'debit',
    },
    {
      r: '₹ 15,600',
      s: '12:34 | 20 Dec 2022',
      success: 0,
      type: 'credit',
    },
  ];

  const getArrowImage = (type) => {
    return type === 'credit' 
      ? require('../../assets/img/downarrow.png')
      : require('../../assets/img/uparrowss.png');
  };

  const getStatusIcon = (success) => {
    if (success === 1) return require('../../assets/img/arrowright.png');
    else if(success === -1) return require('../../assets/img/pending.png');
    else return require('../../assets/img/cross.png');
  };

  const getStatusText = (success) => {
    if (success === 1) return 'Success';
    else if (success === -1) return 'Pending';
    else return 'Failed';
  };

  const getStatusColor = (success, type) => {
    if (success === 1) return '#129C73'; 
    else if (success === -1) return 'orange'; 
    else if (type === 'credit') return 'red'; 
    else return '#FFEFEF';
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate("Wallet") }}>
          <Image
            source={require('../../assets/img/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      <ScrollView>
        {data.map((res, index) => (
          <View key={index} style={styles.historyContainer}>
            <TouchableOpacity onPress={() => { navigation.navigate('transactionDetails') }}>
              <View style={styles.transactionEntry}>
                <View
                style={[
                  styles.iconContainer,
                  { 
                    backgroundColor: res.success === -1 ? '#fff9ef' : 
                                     res.success === 1 ? '#EFFFF6' : '#FFEFEF' 
                  },
                ]}>
                <Image
                  source={getArrowImage(res.type)}
                  style={styles.icon}
                  tintColor={res.success === 1 ? '#129C73' : '#DC1111'}
                />
                </View>
                <View>
                  <Text style={styles.transactionAmount}>{res.r}</Text>
                  <Text style={styles.timestamp}>{res.s}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusIcon]}>
                    <Image
                      source={getStatusIcon(res.success)}
                      style={styles.icon1}
                    />
                  </View>
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(res.success, res.type) },
                    ]}>
                    {getStatusText(res.success)}
                  </Text>
                </View>
                <View style={styles.arrowIconContainer}>
                  <Image
                    source={require('../../assets/img/rightarrow1.png')}
                    style={styles.icon2}
                    tintColor={'gray'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginBottom: 20,
  },
  backImage: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  historyContainer: {
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  transactionEntry: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray"
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#EFFFF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  icon2: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  icon1: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  transactionAmount: {
    color: 'black',
    fontSize: 21,
    fontWeight: '600',
  },
  timestamp: {
    color: '#8A8A8A',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    paddingLeft: 8,
    fontSize: 17,
    fontWeight: '600',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
