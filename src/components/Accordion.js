import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../utils/Translate'
import React, { useState } from 'react'

export default function Accordion({ buttonText, buttonStyle, onExpand, containerStyle ,itemText, icon, onButtonPress, children }) {
    const [visible, setVisible] = useState(false)
    function expand(){
        if(!visible && onExpand)
        onExpand()
        setVisible(!visible)
    }
    return (
        <Pressable onPress={expand}>
            <View
                style={
                    containerStyle?
                    {...containerStyle, 
                        backgroundColor:visible?'rgba(0,0,0,0.03)':"#fff",
                        shadowColor:visible?'#fff':'#420000'
                    }
                    :
                    {
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    elevation:3,
                    padding: 10,
                    borderRadius: 5,
                }
                }>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {
                        icon&&
                        <Image
                            source={icon}
                            style={{ width: 24, height: 24,borderRadius:50, objectFit:'cover', backgroundColor:'rgba(0,0,0,0.03)', margin: 8 }}
                        />
                    }
                    <Text style={{ color: '#000', fontSize:13 }}>{itemText}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onButtonPress}>
                            <Text
                                style={{
                                    backgroundColor: 'rgba(112, 29, 219, 1)',
                                    padding: 5,
                                    paddingHorizontal:8,
                                    fontFamily:'WorkSans-Regular',
                                    borderRadius: 5,
                                    color: '#fff',
                                    fontSize:12,
                                    fontWeight:400,
                                    ...buttonStyle
                                }}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        visible ?
                            <Image
                                key={"up"}
                                source={require('../assets/img/arrow-up.png')}
                                style={{ width: 18, height: 18, margin: 8 }}
                            />
                            :
                            <Image
                                key={"down"}
                                source={require('../assets/img/down-arrow.png')}
                                style={{ width: 20, height: 20, margin: 8 }}
                            />
                    }
                </View>
            </View>
            {visible && children}
        </Pressable>
    )
}

const styles = StyleSheet.create({})