import React, { useState, useRef } from "react";
import { View, Text as BBText, TouchableOpacity, Image, SafeAreaView, TextInput, StyleSheet, Button, Text, ActivityIndicator } from "react-native";
import styles from "../../styles/Login.style";
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';

export default function Otp({ navigation, route }) {
    const [otpValue, setOtpValue] = useState(['', '', '', '']);
    const otpInputs = Array.from({ length: 4 });

    const handleChange = (text, index) => {
        const newOtpValue = [...otpValue];
        newOtpValue[index] = text;
        setOtpValue(newOtpValue);
        if (text && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !otpValue[index]) {
            otpInputs[index - 1].focus();
        }
    };

    return (  
        <>
            <SafeAreaView style={styles.safeArView}>
                <View style={StyleConstants.bbView} >
                    <Image
                        source={require("../../assets/img/bbcolorlogo.png")}
                        resizeMode="contain"
                        style={{ width: 250 }}
                    />
                </View>
                <View style={StyleConstants.containerCard}>
                    <View style={{ paddingHorizontal: 25 }}>
                        <View style={StyleConstants.LetsView}>
                            <View style={styles.Lastview1} >
                                <View style={{ flex: 0.75 }}>
                                    <Text style={styles.EnterOtp} >Enter OTP to Continue </Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <Image
                                        source={require('../../assets/img/rightarrow.png')}
                                        resizeMode="contain"
                                        style={styles.RightArrow}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.otpContainer}>
                            {otpInputs.map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref => (otpInputs[index] = ref)}
                                    style={styles.otpInput}
                                    value={otpValue[index]}
                                    onChangeText={text => handleChange(text, index)}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onKeyPress={e => handleKeyPress(e, index)}
                                />
                            ))}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textOtp}  >
                                OTP Sent on +91
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                            }}
                        >
                            <BBText style={[styles.textOtp, { color: ColorsConstant.TermColor }]} > Change Number </BBText>
                        </TouchableOpacity>
                        <TouchableOpacity
                         onPress={()=>{navigation.navigate('SignupName')}}
                         style={styles.BtnOtp}
                        >
                            <Text style={styles.textOt}>confirm</Text>
                        </TouchableOpacity>
                        <View style={styles.DidView}>
                            <BBText style={styles.textOtp} >
                                Did not receive OTP ?{" "}
                            </BBText>
                            <TouchableOpacity>
                                <BBText style={[styles.textOtp, { color: ColorsConstant.TermColor }]}> Resend OTP</BBText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={StyleConstants.imgView} >
                        <View style={StyleConstants.imgView2}>
                            <Image
                                source={require("../../assets/img/Girl.png")}
                                resizeMode="contain"
                                style={StyleConstants.girlimg}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
