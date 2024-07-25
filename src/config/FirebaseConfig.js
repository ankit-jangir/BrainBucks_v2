import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'
import basic from '../services/BasicServices';

import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'
import {
    CFErrorResponse,
    CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import { ColorsConstant } from '../constants/Colors.constant';


export default async function onAppBootstrap() {
    try {
        await notifee.requestPermission();

        // Register the device with FCM
        await messaging().registerDeviceForRemoteMessages();

        // Get the token
        const token = await messaging().getToken();

        // Handle foreground messages
        messaging().onMessage(async (remoteMessage) => {
            onMessageReceived(remoteMessage);
        });

        // Handle background messages
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            // Do not call onMessageReceived here, as Notifee will handle the display
            return Promise.resolve();
        });

        // Handle notification interactions
        notifee.onForegroundEvent(async ({ type, detail }) => {
        });

        notifee.onBackgroundEvent(async ({ type, detail }) => {
        });

        // Save the token
        basic.setFcm(token);
        console.log("Fcm Token", token);

        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                setOnline(!!state.isConnected);
            });
        });
    } catch (err) {
        console.log("Error in Fetching Fcm from firebase: ", err.message);
    }
}


export async function onMessageReceived(message) {
    // console.log(message, "RECEIVED MESSAGE");

    const channel = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'brainbucksnotification',
    });

    let item = typeof message === 'object' ? message : JSON.parse(message);
    let msg = item.notification;

    notifee.displayNotification({
        ...msg,
        android: {
            channelId: channel,
            color:ColorsConstant.Theme,
            smallIcon: 'ic_launcher_foreground',
            pressAction: {
                id: 'default',
            },
        },
    });
}