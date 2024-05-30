import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React,{useEffect,useState} from 'react';
import {LinearProgress, Button} from '@rneui/themed';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Lost = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let subs = true;
    if (progress < 1 && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(progress + 0.1);
        }
      }, 100);
    }
    return () => {
      subs = false;
    };
  }, [progress]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.containerImg}>
          <Image
            source={require('../../assets/img/Rectangle.png')}
            resizeMode="contain"
            style={styles.mainImage}
          />
          <Text style={styles.textTitle}>SBI-PO Current Affairs</Text>
        </View>
        <View style={styles.containerImg12}>
          <View style={styles.containerImg122}>
            <Text style={styles.subText}>Fees</Text>
            <Image
              source={require('../../assets/img/bb.png')}
              style={styles.icon}
            />
            <Text style={styles.highlightedText}>2024</Text>
          </View>
          <View style={styles.containerImg1222}>
            <Image
              source={require('../../assets/img/Timer.png')}
              resizeMode="contain"
              style={styles.smallIcon}
            />
            <Text style={styles.dateText}>2/4/2024</Text>
          </View>
        </View>
        <View style={styles.containerImg12}>
          <View style={styles.containerImg122}>
            <Text style={styles.subText}>Prize</Text>
            <Image
              source={require('../../assets/img/bb.png')}
              style={styles.icon}
            />
            <Text style={styles.highlightedText}>2024</Text>
          </View>
          <View style={styles.containerImg1222}>
            <Image
              source={require('../../assets/img/Clock.png')}
              resizeMode="contain"
              style={styles.smallIcon}
            />
            <Text style={styles.dateText}>2/4/2024</Text>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Image
            source={require('../../assets/img/Vector.png')}
            style={styles.vectorIcon}
            resizeMode="contain"
          />
          <Text style={styles.scoreText}>2425/</Text>
          <Text style={styles.scoreText1}>242</Text>

        </View>
        <LinearProgress
              style={{marginVertical: 10, height: 8, borderRadius: 10}}
              value={0.4}
              variant="determinate"
              color={'#54ACFD'}
            />
        <Button
        title="View Result"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
      </View>
    </View>
  );
};

export default Lost;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor:"white"
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    elevation: 3,
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainImage: {
    width: screenWidth * 0.10,
    height: screenWidth * 0.10,
  },
  textTitle: {
    marginLeft: screenWidth * 0.03,
    fontSize:17,
    fontWeight: 'bold',
    fontFamily:"Inter",
    color:"#2E2E2E"

  },
  containerImg12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,

  },
  containerImg122: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'lightgray',
    fontFamily:"Inter"
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  highlightedText: {
    fontSize:16 ,
    fontWeight: '600',
    paddingLeft: screenWidth * 0.02,
    color: '#F5B807',
    fontFamily:"Inter"

  },
  containerImg1222: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIcon: {
    width: 20,
    height: 20,
  },
  dateText: {
    paddingLeft: 8,
    fontFamily:"Inter",
    color:'lightgray',
    fontWeight:'600'

  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  vectorIcon: {
    width: 20,
    height: 20,
  },
  scoreText: {
    paddingLeft: 5,
    fontFamily:"Inter",
    color:'#2188E7'

  },
  scoreText: {
    paddingLeft: 5,
    fontFamily:"Inter",
    color:'#2188E7',
    fontWeight:'700'
  },
  scoreText1: {
    paddingLeft: 5,
    fontFamily:"Inter",
    color:'#000',
    fontWeight:'700'
  },
  progress: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    borderColor: "#54ACFD",
    borderWidth: 1,
    backgroundColor: "white",  
  },
  buttonTitle: {
    color: "#54ACFD",
    fontFamily:"Inter"

  },
});
