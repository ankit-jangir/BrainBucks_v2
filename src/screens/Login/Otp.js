import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, SafeAreaView, ToastAndroid } from "react-native";
import styles from "../../styles/Login.style";
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Text } from "../../utils/Translate";
import AuthenticationApiService from "../../services/api/AuthenticationApiService";
import Toast from "react-native-toast-message";
import { Button } from '../../utils/Translate';
import { OtpInput } from "react-native-otp-entry";
import basic from "../../services/BasicServices";
import { StackActions } from "@react-navigation/native";
import ChatSockService from "../../services/api/ChatSockService";
import BackgroundTimer from 'react-native-background-timer';
import { setLoggedIn } from "../../..";


export default function Otp({ navigation, route }) {
    const [otp, setOtp] = useState();
    const [loading, setLoading] = useState(false)
    const [seconds, setSeconds] = useState(59);
    const [minute, setMinute] = useState(0);
    const [errorMessage, setErrorMessage] = useState()
    const auth = new AuthenticationApiService();
    let phone = route.params.phone;


    useEffect(() => {
        setSeconds(59)
        let sec = 59;
        const interval = BackgroundTimer.setInterval(() => {
            if (sec > 0) {
                sec = sec - 1;
                setSeconds(p => p - 1)
            }
            else {
                setSeconds(0)
                BackgroundTimer.clearInterval(interval)
                setErrorMessage("OTP Expired. Please Resend")
            }
        }, 1000)
        return () => { BackgroundTimer.clearInterval(interval) }
    }, [minute])



    function otpChanged(value) {
        setErrorMessage("")
        setOtp(value + "")
    }

    async function resendOtp() {
        setErrorMessage(null)
        setLoading(true)
        try {
            let response = await auth.sendOtp(phone)
            if (response.status === 1) {
                Toast.show({
                    type: "success",
                    text1: "Otp sent succesfully"
                })
                setMinute(Math.random())

            } else {
                setErrorMessage("*" + response.Backend_Error)
            }
        } catch (error) {
            console.log("Error in Resending OTP: ", error.message);
            setErrorMessage("*Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    async function next() {
        if (!otp || otp.length === 0) {
            setErrorMessage("*Enter The OTP First")
            return;
        }

        if (otp.length !== 4) {
            setErrorMessage("*OTP must be of 4 digits")
            return;
        }

        try {
            setErrorMessage(null)
            setLoading(true)
            let response = await auth.verifyOtpAndRegister(phone, otp)
            if (response.status === 1) {
                setErrorMessage(null)
                await basic.setJwt(response.token)
                await basic.setId(response.user_id)
                console.log("JWT Token: ", response.token);
                console.log("User id: ", response.user_id);
                ChatSockService.connect()
                setLoggedIn(true)
                navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            } else if (response.status === 2) {
                setErrorMessage(null)
                navigation.dispatch(
                    StackActions.replace("SignupName", {
                        phone: phone
                    })
                )
            }
            else {
                // console.log(response);
                setErrorMessage("*" + response.Backend_Error)
            }

        } catch (err) {
            console.log("Error in Verifying OTP: ", err.message);
            setErrorMessage("*Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <View style={{ zIndex: 200 }}><Toast /></View>
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
                                        source={require('../../assets/img/arrowtoright.png')}
                                        resizeMode="contain"
                                        style={styles.RightArrow}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.otpContainer}>
                            <OtpInput
                                numberOfDigits={4}
                                focusColor="blue"
                                focusStickBlinkingDuration={500}
                                onTextChange={otpChanged}
                                theme={{
                                    pinCodeContainerStyle: styles.OtpBoxView,
                                    pinCodeTextStyle: styles.textOtp,
                                }}
                                textInputProps={
                                    { selectTextOnFocus: false, caretHidden: true }
                                }
                            />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:errorMessage?"space-between":"flex-end"}}>
                            {
                                errorMessage && <Text key={errorMessage} style={styles.errormsg}>{errorMessage}</Text>
                            }
                            <Text key={seconds + "seconds"} style={[styles.textOtp, { textAlign: 'right', alignSelf:'flex-end' }]}>OTP Valid For: 00:{seconds > 9 ? seconds : "0" + seconds}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textOtp}  >
                                OTP Sent on +91 {phone}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <Text style={[styles.textOtp, { color: ColorsConstant.TermColor }]} > Change Number </Text>
                        </TouchableOpacity>
                        <Button
                            onPress={next}
                            title="Confirm"
                            loading={loading}
                            titleStyle={styles.textOt}
                            buttonStyle={styles.BtnOtp}
                            loadingProps={{
                                size: 'large',
                                color: '#701DDB',
                            }}
                        />
                        <View style={styles.DidView}>
                            <Text style={styles.textOtp} >
                                Did not receive OTP ?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={resendOtp}
                            >
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
