import React, { useState , useEffect, useRef} from 'react';
import { View, Text, SafeAreaView, Animated, Easing, Image, ImageBackground,StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { StackActions } from '@react-navigation/native';

export default function RoomsAnimations({navigation,}) {
    const [state, setState] = useState(0);
    const [click, setClick] = useState(false)

        if(click == true){
            setTimeout(() => {
                setState(state + 1)  
            }, 1000);
        }

        if(state == 3){
          navigation.dispatch(
            StackActions.replace("Roomsquestions")
          )
        }

    useEffect(() =>{
        setClick(true);
    },[])

    const translation = useRef(
        new Animated.Value(0)
      ).current;

        useEffect(() => {
            Animated.timing(translation, {
              toValue: 200,
              duration: 5000,
              deasing: Easing.bounce,
              useNativeDriver: true,
            }).start();
          }, []);

    const translation2 = useRef(
        new Animated.Value(0)
      ).current;

        useEffect(() => {
            Animated.timing(translation2, {
              toValue: -200,
              duration: 5000,
              deasing: Easing.bounce,
              useNativeDriver: true,
            }).start();
          }, []);


          const translationY1 = useRef(
            new Animated.Value(0)
          ).current;
    
            useEffect(() => {
                Animated.timing(translationY1, {
                  toValue: 200,
                  duration: 5000,
                  deasing: Easing.bounce,
                  useNativeDriver: true,
                }).start();
              }, []);
    
        const translationY2 = useRef(
            new Animated.Value(0)
          ).current;
    
            useEffect(() => {
                Animated.timing(translationY2, {
                  toValue: -200,
                  duration: 5000,
                  deasing: Easing.bounce,
                  useNativeDriver: true,
                }).start();
              }, []);
    

              const translationY3 = useRef(
                new Animated.Value(0)
              ).current;
        
                useEffect(() => {
                    Animated.timing(translationY3, {
                      toValue: 80,
                      duration: 1000,
                      deasing: Easing.bounce,
                      useNativeDriver: true,
                    }).start();
                  }, []);
        
            const translationY4 = useRef(
                new Animated.Value(0)
              ).current;
        
                useEffect(() => {
                    Animated.timing(translationY4, {
                      toValue: -80,
                      duration: 1000,
                      deasing: Easing.bounce,
                      useNativeDriver: true,
                    }).start();
                  }, []);

  return (
    <SafeAreaView style={{flex:1,}} >
     <LinearGradient
                    start={{x: 0.0, y: 0.10}} end={{x: 0.2, y: 1.0}}
                    colors={['#000000', 'blue', '#000000']}
                    style={{flex:1,}}>

                <View style={{flex:1, display: state == 0 ? 'flex' : 'none' }}>
                <View style={styles.container} >
                  <Animated.View style={{transform: [{ translateX: translation }]}} >
                    <Image source={require('../../assets/img/bubble1.png')} resizeMode="cover" style={styles.img1} />
                  </Animated.View>
                </View>

                <View style={styles.containerview} >
                  <Text style={styles.containerV1}>Bring it </Text>    
                  <Text style={styles.containerV2}>ONN!!! </Text>    
                  <Text style={styles.containerV3}>3</Text>
                </View>

                <View style={styles.container} >
                  <Animated.View style={{transform: [{ translateX: translation2 }]}} >
                    <ImageBackground source={require('../../assets/img/bubble2.png')} resizeMode='cover' style={styles.img} >
                    </ImageBackground>
                  </Animated.View>
                </View>
                </View>

                    <View style={{flex:1, display: state == 1 ? 'flex' : 'none' }}>
                       <View style={styles.container} >
                          <Animated.View style={{transform: [{ translateY: translationY1 }]}} >
                            <Image source={require('../../assets/img/bubble2sec.png')} resizeMode="cover" style={styles.img1} />
                          </Animated.View>
                        </View>

                        <View style={styles.containerview} >
                          <Text style={styles.containerV1}>Bring it </Text>    
                          <Text style={styles.containerV2}>ONN!!! </Text>    
                          <Text style={styles.containerV3}>2</Text>
                        </View>

                        <View style={styles.container} >
                          <Animated.View style={{transform: [{ translateY: translationY2 }]}} >
                            <Image source={require('../../assets/img/bubble2sec2.png')} resizeMode='cover' style={styles.img} />
                          </Animated.View>
                        </View>
                    </View>

                    <View style={{flex:1, display: state == 2 ? 'flex' : 'none' }}>
                        <View style={{flex:1,}} >
                           <Animated.View style={{transform: [{ translateY: translationY3 }]}} >
                             <Image source={require('../../assets/img/bubble1sec.png')} resizeMode="cover" style={styles.img3} />
                           </Animated.View>
                         </View>

                         <View style={styles.containerview} >
                           <Text style={styles.containerV1}>Bring it </Text>    
                           <Text style={styles.containerV2}>ONN!!! </Text>    
                           <Text style={styles.containerV3}>1</Text>
                         </View>

                         <View style={styles.View1} >
                           <Animated.View style={{transform: [{ translateY: translationY4 }]}} >
                             <Image source={require('../../assets/img/bubble1sec2.png')} resizeMode='cover' style={styles.img} />
                           </Animated.View>
                         </View>
                    </View>

                    <View style={{flex:1, display: state == 3 ? 'flex' : 'none' }}>
                        <View style={{flex:1,}} >
                           <Animated.View style={{transform: [{ translateY: translationY3 }]}} >
                             <Image source={require('../../assets/img/bubble1sec.png')} resizeMode="cover" style={styles.img3} />
                           </Animated.View>
                         </View>

                         <View style={styles.containerview} >
                           <Text style={styles.containerV1}>Bring it </Text>    
                           <Text style={styles.containerV2}>ONN!!! </Text>    
                           <Text style={styles.containerV3}>0</Text>
                         </View>

                         <View style={styles.View1} >
                           <Animated.View style={{transform: [{ translateY: translationY4 }]}} >
                             <Image source={require('../../assets/img/bubble1sec2.png')} resizeMode='cover' style={styles.img} />
                           </Animated.View>
                         </View>
                    </View>

       </LinearGradient>
    </SafeAreaView>
  )
}


const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"transparent",
      },
      containerview:{
        justifyContent:"center",
        alignItems:"center"
      },
      containerV1:{
        fontFamily:'WorkSans-SemiBold',
        fontSize:30,
        color:"#fff"
      },
      containerV2:{
        fontFamily:'WorkSans-SemiBold',
        fontSize:50,
        color:"#fff",
      },
      containerV3:{
        fontFamily:'WorkSans-SemiBold',
        fontSize:150,
        color:"#FAFF10"
      },
      img:{
        width:'100%',
        height:300
      },
      img1:{
        width:'100%',
        height:250
      },
     img3:{
      width:'100%',
      height:400
     },
     View1:{
      flex:1,
      justifyContent:"flex-end"
     }





  })