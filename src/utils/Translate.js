import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import translate from "translate";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@rneui/themed";

translate.engine = "google";
translate.key = process.env.GOOGLE_KEY;

async function getSavedLanguage(){
    let t = await AsyncStorage.getItem('language')
    if(!language){
        return 'en'
    }
        return language
}

async function setSavedLanguage(lang){
    await AsyncStorage.setItem("language",lang)
}

function BButton(props){
    const [text, setText] = useState(props.title)
    useEffect(() => {
        (async() => {
            let language = await AsyncStorage.getItem('language');
            if(!language){
                return setText(text)
            }

            if(!props.ignore && text != null){
                translate(text, language ? language : 'hi').then(result => {setText(result)},).catch(err=>{
                    console.log("Error in Translation of Language: ",err)
                });
            }
            return () => {
                setText({});
            }
        })();
    }, [])

    return(
        <Button {...props} title={text}/>
    )

}

function TText(props) {
    const [text, setText] = useState(props.children);
    useEffect(() => {
        (async() => {
            let language = await AsyncStorage.getItem('language');
            if(!language){
                return setText(text)
            }

            if(!props.ignore && text != null){
                translate(text, language ? language : 'hi').then(result => {setText(result)},).catch(err=>{
                    console.log("Error in Language Translation:",err)
                });
            }
            return () => {
                setText({});
            }
        })();
    }, [])

    return(
        <Text {...props}>
            { text }
        </Text>
    )
}

function TTextInput(props) {
    const [placeholder, setPlaceholder] = useState(props.placeholder);

    useEffect(() => {
        (async() => {
            let language = await AsyncStorage.getItem('language');
            translate(placeholder, language ? language : 'en').then(result => setPlaceholder(result));
            return () => {
                setPlaceholder({});
            }
        })()
    },[])

    return(
        <TextInput {...props} placeholder={placeholder} />
    )
}
export { TText as Text, TTextInput as TextInput, getSavedLanguage, setSavedLanguage, BButton as Button };