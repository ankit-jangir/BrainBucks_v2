import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'
import basic from '../services/BasicServices';

/**
 * this message shows the notification on the device when recieved it from any external source
 * @param {*} message the message recieved from firebase or any other service
 */
function onMessageReceived(message) {
    notifee.displayNotification(JSON.parse(message.data.notifee));
    console.log("NOTIFICATION RECIEVED", message);
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

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
        // Save the token
        basic.setFcm(token)
        console.log("Fcm Token",token);
    }
    catch (err) {
        console.log("Error in Fetching Fcm from firebase: ", err.message)
    }
}