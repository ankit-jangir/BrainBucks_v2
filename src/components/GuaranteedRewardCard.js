import { StyleSheet, Text, View ,Dimensions,Image} from 'react-native'
import React,{useEffect,useState} from 'react';

import LinearGradient from 'react-native-linear-gradient'
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import {LinearProgress, Button} from '@rneui/themed';

const GuaranteedRewardCard = () => {
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
    <View>
      <View style={styles.conatiner1}>
      <View style={styles.conatinerImg}>
      <LinearGradient style={[styles.conatinerImg,{width:"100%"}]}
          colors={['#496BC0', '#323698']}>
          </LinearGradient>
      </View>
      <View style={styles.conatinerText}>
      <View style={styles.containerImg}>
          <Image
            source={require('../assets/img/Rectangle.png')}
            resizeMode="contain"
            style={styles.mainImage}
          />
          <Text style={styles.textTitle}>SBI-PO Current Affairs</Text>
        </View>
        <View style={styles.textt}>
        <Text style={styles.textt1}>Prize</Text>
        <Text style={styles.textt11} >Z</Text>
        <Text style={styles.textt11}>256</Text>
        </View>
        <View style={styles.conatiner12}>
        <View style={styles.conatinerImg1}>
        <Image
        source={require('../assets/img/Timer.png')}
        style={styles.icon}
      />
      <Text>07-12-2024</Text>
        </View>
        <View style={styles.conatinerImg1}>
        <Image
        source={require('../assets/img/Clock.png')}
        style={styles.icon}
      />
      <Text>07-12-2024</Text>
        </View>
      
        </View>
        <View style={styles.scoreContainer}>
        <Image
          source={require('../assets/img/Vector.png')}
          style={styles.vectorIcon}
          resizeMode="contain"
        />
        <Text style={styles.scoreText}>2425/2425</Text>
      </View>
      <LinearProgress
        style={styles.progress}
        value={progress}
        variant="determinate"
      />
      <Button
        linearGradientProps={{
          colors: ['#54ACFD', '#2289E7'],
          start: {x: 0, y: 0.5},
          end: {x: 1, y: 0.5},
        }}
        buttonStyle={styles.button}>
        Register Now
      </Button>
      </View>
      </View>
    </View>
  )
}

export default GuaranteedRewardCard

const styles = StyleSheet.create({
    conatiner1:{
        flex:1,
        flexDirection:"row",
        padding:10,
    },
    conatinerImg:{
        width:"35%",
        height:200,
        borderTopLeftRadius:5,
        borderTopEndRadius:5,
        borderBottomLeftRadius:5,
    },
    conatinerText:{
        width:"65%",
        backgroundColor:"#fcfbf7",
        height:200,
        padding:8,
        borderTopEndRadius:5,
        borderBottomRightRadius:5
    },
    containerImg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      mainImage: {
        width: 20,
        height: 20,
      },
      textTitle: {
        marginLeft: screenWidth * 0.03,
        fontSize:16,
        fontWeight: '500',
        
      },
      textt:{
        flexDirection:"row",
        gap:10
      },
      textt1:{
        color:"#7E7E7E",
        fontSize:16
      },
      textt11:{
        color:"white",
        fontSize:16,
        backgroundColor:"black",
        padding:10
      },
      textt11:{
        color:"black",
        fontSize:16,
        fontWeight:"400"
      },
      conatiner12:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:10
      },
      conatinerImg1:{
        flexDirection:"row",
        alignItems:"center"
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
        fontWeight:"600"
      },
      progress: {
        marginVertical: 10,
      },
      button: {
        borderRadius: 5,
      },
})