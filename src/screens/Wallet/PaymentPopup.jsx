import React, { useEffect, useRef } from 'react'
import { BackHandler, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from '../../utils/Translate';
import LottieView from 'lottie-react-native';

const PopupText = (props) => {

    const bottom = useSharedValue(150)
    useEffect(()=>{
        bottom.value=withTiming(bottom.value+200,{duration:1500})
    },[])


  return (
    <Animated.View
    style={{
        ...props.style,
        bottom:bottom
    }}
    >
        {props.children}
    </Animated.View>
  )
}


export default function PaymentPopup({navigation, route}){

    const timeRef = useRef()
    useEffect(()=>{
        timeRef.current = setTimeout(()=>{
            navigation.goBack();
        },3200)

        const back = BackHandler.addEventListener('hardwareBackPress',()=>{clearTimeout(timeRef.current)})

        return ()=>back.remove()
    },[])



    let status = route.params.status
    return(
        <View style={{width:'100%', height:'100%', backgroundColor: status?'#701DDB':"#ff0000", position:'relative'}}>
             <PopupText style={{width:'100%', height:'20%', backgroundColor:'transparent', position:'absolute', justifyContent:'center', alignItems:'center'}}>
                {
                    status===1
                    ?
                    <LottieView style={{height:100, width:160}} source={require('../../assets/img/tick.json')} autoPlay={true}/>
                    :
                    <LottieView style={{height:100, width:160}} source={require('../../assets/img/cross.json')} autoPlay={true}/>
                }
                <Text style={{color:'#fff', padding:2, fontSize:20, width:'100%', textAlign:'center'}}>{status?'Payment Successfull':"Payment Failed"}</Text>
             </PopupText>
        </View>
    )
}