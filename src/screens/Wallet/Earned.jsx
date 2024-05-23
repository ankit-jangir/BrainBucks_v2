import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';
import { Text } from '../../utils/Translate';
import { ScrollView } from 'react-native-gesture-handler';

const Earned = () => {
    const data = [
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
        {
            data1:"+399",
            time:"15:36 | 23 Dec 2022",
            part:"Quiz Reward",
            data2:"Reward for",
            data3:"SBI-PO Current Affairs"
        },
    ]
  return (
    <>
    <ScrollView>
    <View style={styles.wrapper}>
      {
        data.map((res)=>{
            return(
                <View style={styles.card}>
                <View style={styles.row}>
                  <Image
                    source={require('../../assets/img/bb.png')}
                    style={styles.icon}
                  />
                  <View style={styles.info}>
                    <Text style={styles.amount}>{res.data1}</Text>
                    <Text style={styles.date}>{res.time}</Text>
                  </View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{res.part}</Text>
                  </View>
                </View>
                <View style={styles.spentForWrapper}>
                  <Text style={styles.spentFor}>{res.data2}</Text>
                </View>
                <View style={styles.containerImg}>
                  <Image
                    source={require('../../assets/img/Rectangle.png')}
                    resizeMode="contain"
                    style={styles.mainImage}
                  />
                  <Text style={styles.textTitle}>{res.data3}</Text>
                </View>
              </View>
            )
        })
      }
        
      </View>
    </ScrollView>
      
    </>
  );
};

export default Earned;

const styles = StyleSheet.create({
  wrapper: {
    padding:10,
    flex:1,
    backgroundColor:"white"
  },
  card: {
    backgroundColor: 'white',
    margin:8,
    paddingLeft: 20,
    borderRadius: 5,
    elevation:3,
    padding:8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
  info: {
    marginLeft: 10,
  },
  amount: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    color:"#16AC72"
  },
  date: {
    color: 'gray',
    fontSize: 12,
  },
  titleWrapper: {
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    textAlign:"right"

  },
  spentForWrapper: {
    paddingTop: 20,
  },
  spentFor: {
    color: 'lightgray',
    fontSize: 14,
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  mainImage: {
    width: 40,
    height: 40,
  },
  textTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
  },
});
