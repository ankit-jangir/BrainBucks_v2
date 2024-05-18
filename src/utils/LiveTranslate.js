import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import translate from "translate";

import AsyncStorage from '@react-native-async-storage/async-storage';

translate.engine = "google";
translate.key = process.env.GOOGLE_KEY;

function LTText(props) {

    const [text, setText] = useState(props.children);

    useEffect(() => {
        (async() => {
                let language = await AsyncStorage.getItem('LiveLanguage');
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

export { LTText as LText};