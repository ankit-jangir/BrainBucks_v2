/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import axios from 'axios';

let isLoggedIn = false;
export const setLoggedIn = (val) => {
  isLoggedIn = val;
}

let navigation = false;
export const setNavigation = (nav) => {
  navigation = nav;
}

axios.interceptors.response.use(function (response) {
  if (response.data.status === "TOKEN_ERR" && isLoggedIn) {
    setLoggedIn(false)
    navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
  }
  if(response.data.Backend_Error && (response.data.Backend_Error.includes("sufficient balance")|| response.data.Backend_Error.includes("sufficent balance"))){
    navigation.navigate("wallet")
  }
  return response;
}
);

AppRegistry.registerComponent(appName, () => App);
