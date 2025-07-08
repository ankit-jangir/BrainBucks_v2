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


