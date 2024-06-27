import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'
import basic from '../services/BasicServices';

import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'


/**
 * this message shows the notification on the device when recieved it from any external source
 * @param {*} message the message recieved from firebase or any other service
 */
export async function onMessageReceived(message) {

    // console.log(message, "HELO");

    const channel = await notifee.createChannel(
        {
            id: 'default',
            name: 'Default Channel',
        }
    )


    let item = message

    if (typeof message !== 'object')
        item = JSON.parse(message)

    let msg = item.notification;

    await notifee.displayNotification({
        ...msg,
        android: {
            channelId: channel,
            pressAction: {
                id: 'default',
            }
        }
    });
}


/**
 * this message creates a fcm token for the device and returns the token
 * @returns fcm token
 */
export default async function onAppBootstrap() {

    try {
        await notifee.requestPermission();
        // Register the device with FCM
        await messaging().registerDeviceForRemoteMessages();
        // Get the token
        const token = await messaging().getToken();
        // messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);
        // Save the token
        basic.setFcm(token)
        console.log("Fcm Token", token);

        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                setOnline(!!state.isConnected)
            })
        })

    }
    catch (err) {
        console.log("Error in Fetching Fcm from firebase: ", err.message)
    }
}