import { View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../../styles/Rooms.styles';
import Explore from './Explore';
import MyRooms from './MyRooms';
import { Button } from '../../utils/Translate';
import { Text } from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import { getPublicRoomsController } from '../../controllers/RoomsController';
import { useQuery } from '@apollo/client';
import RoomsApiService from '../../services/api/RoomsApiService';
import Search from '../Home/Search';
import PrivateRooms from './PrivateRooms';

const Tab = createMaterialTopTabNavigator();

export default function Rooms({ navigation, route }) {

    const { id, type } = route.params || {};

    useEffect(() => {
        if (id && type) {
            const screen = type === "public" ? "Explore" : type === "private" ? "Private" : "MyRooms";
            navigation.navigate(screen, { id });
        }
    }, [id, type, navigation]);

    return (
        <>
            {/* <View style={{zIndex:20}}>
            <Toast/>
        </View> */}
            <View style={styles.maincontainer}>
                <View style={styles.topbtns}>
                    <TouchableOpacity
                        onPress={() => {
                            try {
                                navigation.openDrawer()
                            } catch (err) {
                                navigation.navigate("Splash")
                            }
                        }
                        }
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 4,
                            borderWidth: 1,
                            borderRadius: 100,
                            width: 50,
                            height: 50,
                            borderColor: '#F5F5F5',
                        }}>
                        <Image
                            source={require('../../assets/img/drawerr.png')}
                            style={{ height: 25, width: 25 }}></Image>
                    </TouchableOpacity>
                    <Text style={styles.roomstext}>Rooms</Text>
                    <Button
                        title={"+ Create Room"}
                        onPress={() => { navigation.navigate("createroom") }}
                        buttonStyle={{
                            borderRadius: 4,
                            paddingHorizontal: 15
                        }} />
                </View>
                <Tab.Navigator
                    tabBar={props => <MyTabBar {...props} imgNeeded={true} width={100} />}
                    initialRouteName={type === "public" ? "Explore" : type === "private" ? "Private" : "MyRooms"}
                >
                    <Tab.Screen name="Explore" component={Explore} initialParams={{ id }} />
                    <Tab.Screen name="Private" component={PrivateRooms} initialParams={{ id }} />
                    <Tab.Screen name="MyRooms" component={MyRooms} initialParams={{ id }} />
                </Tab.Navigator>
            </View>
        </>
    )
}


/* top tab bar to show all screen names */
export function MyTabBar({ state, descriptors, navigation, position, imgNeeded, width }) {
    return (

        <View style={[styles.topbar, width && { width: width + "%" }]}>
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
                        key={label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <View style={[styles.tabBarLabelHolder, isFocused && { borderBottomWidth: 1 }]}>
                            {imgNeeded && <Image style={[styles.tabBarLabelLogo, isFocused && { tintColor: "#000" }]} source={src} />}
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
