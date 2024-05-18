import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Image, SafeAreaView, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import styles from "../../styles/Login.style";
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Text } from "../../utils/Translate";
import OtpInput from 'react-native-animated-otp-input';

export default function Otp({ navigation, route }) {

    const [otp, setOtp] = useState();

    function otpChanged(value){
        setOtp(value+"")
    }

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
                            <OtpInput otpCount={4} autoFocus={true}
                                onCodeChanged={otpChanged}
                            />
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
                            <Text style={[styles.textOtp, { color: ColorsConstant.TermColor }]} > Change Number </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('SignupName') }}
                            style={styles.BtnOtp}
                        >
                            <Text style={styles.textOt}>confirm</Text>
                        </TouchableOpacity>
                        <View style={styles.DidView}>
                            <Text style={styles.textOtp} >
                                Did not receive OTP ?{" "}
                            </Text>
                            <TouchableOpacity>
                                <Text style={[styles.textOtp, { color: ColorsConstant.TermColor }]}> Resend OTP</Text>
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
