import AsyncStorage from "@react-native-async-storage/async-storage"

const mainUrl ="https://api.hashdcxe.com/"
// const mainUrl ="http://192.168.1.15:5002/"

const base ={
    api: mainUrl +'frontapi/',
    imageBaseUrl: mainUrl+'static/currencyImage/',
    imageBaseUrlHelp: mainUrl+'static/helpIssue/',
    token:  AsyncStorage.getItem('token')
}

export {
    mainUrl,
    base 
}



// const setMobileValidateCode =(value)=>{
//     let mobNumber = isValidMobile(mobNumber)
//     let getcodeObject = {}
//     if (mobNumber) {
//         setMobNumber(mobNumber)
//         setDisable(true)
//         getcodeObject = {
//             Mobile: mobNumber,
//         }
//         Toast.show({ type: 'success', text1: 'Mobile Number is validated' });
//     }
//     else {
//         Toast.show({ type: 'error', text1: 'Please Enter Valid Mobile Number' });
//     }
//     if (disable) {
//         if (value == 'verified') {
//             if (checkMobileVerificationCode == '') {
//                 Toast.show({ type: 'error', text1: 'Please Enter code!' });
//             }
//             else {
//                 if (checkMobileVerificationCode == verfiedCode) {
//                     Toast.show({ type: 'success', text1: 'code matched!' });
//                     setMobDisableInput(true)
//                     setMobVerifyCode('Verfied')
//                 }
//                 else {
//                     Toast.show({ type: 'error', text1: 'wrong code!' });
//                 }
//             }
//         }
//         // else {
//         //     sendEmailCode(getcodeObject).then(result => {
//         //         console.log('result', result)
//         //         if (result.status) {
//         //             console.log(result.code, 'result.code')
//         //             setVerfiedCode(result.code)
//         //         } else {
//         //             Toast.show({ type: 'error', text1: result.EmailMessage });
//         //         }
//         //     }).catch(e => console.log(e))
//         // }
//     }

//   }