import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Image, SafeAreaView, ToastAndroid } from "react-native";
import styles from "../../styles/Login.style";
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Text } from "../../utils/Translate";
import Toast from "react-native-toast-message";
import { Button } from '../../utils/Translate';
import { OtpInput } from "react-native-otp-entry";
import WalletApiService from "../../services/api/WalletApiService";
import { useWithdraw } from "../../context/WithdrawReducer";
import { StackActions } from "@react-navigation/native";


export default function WithdrawOtp({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const wallServ = new WalletApiService();
    const { withdrawState, dispatch } = useWithdraw()

    function otpChanged(value) {
        dispatch({ type: "details", withdrawDetails: { 'otp': value } })
    }

    async function resendOtp() {
        if (loading) {
            return;
        }
        setErrorMessage(null)
        setLoading(true)
        try {
            let response = await wallServ.sendOtp()
            if (response.status === 1) {
                Toast.show({
                    type: "success",
                    text1: "Otp sent succesfully"
                })
                if (response.otp) {
                    ToastAndroid.show(response.otp + "", ToastAndroid.LONG)
                }
            } else {
                setErrorMessage("* "+response.Backend_Error)
            }
        } catch (error) {
            console.log("Error in Resending OTP: ", error.message);
            setErrorMessage("*Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    async function next() {
        if (loading) {
            return;
        }

        let ot = withdrawState.otp + ""

        if (ot.length !== 4) {
            setErrorMessage("*Enter The OTP First")
            return;
        }

        try {
            setErrorMessage(null)
            setLoading(true)
            let response = await wallServ.withdrawMoney(withdrawState.amount, withdrawState.otp, withdrawState.bank._id)
            if (response.status === 1) {
                setErrorMessage(null)
                navigation.dispatch(StackActions.replace('withdrawReq'));
            }
            else {
                setErrorMessage(response.Backend_Error)
            }

        } catch (err) {
            console.log("Error in Verifying OTP in withdraw : ", err.message);
            setErrorMessage("*Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <View style={{ zIndex: 25 }}>
                <Toast />
            </View>
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
                                    <Text style={[styles.EnterOtp, { marginTop: 20 }]} >Enter OTP sent to your registered mobile number </Text>
                                </View>

                            </View>
                        </View>
                        <View style={[styles.otpContainer, { marginTop: 70 }]}>
                            <OtpInput
                                textInputProps={
                                    { selectTextOnFocus: false, caretHidden: true }
                                }
                                numberOfDigits={4}
                                focusColor="blue"
                                focusStickBlinkingDuration={500}
                                onTextChange={otpChanged}
                                theme={{
                                    pinCodeContainerStyle: styles.OtpBoxView,
                                    pinCodeTextStyle: styles.textOtp,
                                }}
                            />
                        </View>
                        {
                            errorMessage && <Text key={errorMessage} style={styles.errormsg}>{errorMessage}</Text>
                        }
                        <View style={{ marginTop: 20 }}>

                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                        </TouchableOpacity>
                        <Button
                            onPress={next}
                            title="Confirm"
                            loading={loading}
                            titleStyle={styles.textOt}
                            buttonStyle={[styles.BtnOtp, { marginTop: 50 }]}
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
