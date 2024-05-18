import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import translate from "translate";
import AsyncStorage from '@react-native-async-storage/async-storage';

translate.engine = "google";
translate.key = process.env.GOOGLE_KEY;

function TText(props) {
    const [text, setText] = useState(props.children);
    useEffect(() => {
        (async() => {
            let language = await AsyncStorage.getItem('language');
            if(!language){
                return setText(text)
            }
            if(!props.ignore && text != null){
                translate(text, language ? language : 'hi').then(result => setText(result));
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
export { TText as Text, TTextInput as TextInput };