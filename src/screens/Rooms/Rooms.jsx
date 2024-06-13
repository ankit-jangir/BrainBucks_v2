import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../../styles/Rooms.styles';
import Explore from './Explore';
import MyRooms from './MyRooms';
import { Button } from '../../utils/Translate';
import { Text } from '../../utils/Translate';
import Toast from 'react-native-toast-message';

const Tab = createMaterialTopTabNavigator();

export default function Rooms({ navigation }) {


    return (
        <View style={styles.maincontainer}>
            <View style={styles.topbtns}>
                <Text style={styles.roomstext}>Rooms</Text>
                <Button
                title={"+ Create Room"}
                onPress={()=>{navigation.navigate("createroom")}}
                    buttonStyle={{
                        borderRadius: 4,
                        paddingHorizontal: 15
                    }} />
            </View>
            <Tab.Navigator tabBar={props => <MyTabBar {...props} imgNeeded={true} />}>
                <Tab.Screen name="Explore" component={Explore} />
                <Tab.Screen name="My Rooms" component={MyRooms} />
            </Tab.Navigator>
        </View>
    )
}


/* top tab bar to show all screen names */
export function MyTabBar({ state, descriptors, navigation, position, imgNeeded, width }) {
    return (

        <View style={[styles.topbar, width&&{width:width+"%"}]}>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);

                let src = require('../../assets/img/roomsimgs.png')
                if (index === 0) {
                    src = require('../../assets/img/explore.png')
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <View style={[styles.tabBarLabelHolder, isFocused && { borderBottomWidth: 1 }]}>
                            {imgNeeded&&<Image style={[styles.tabBarLabelLogo, isFocused && { tintColor: "#000" }]} source={src} />}
                            <Text style={[styles.tabBarLabel, isFocused && { color: "#000" }]}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
