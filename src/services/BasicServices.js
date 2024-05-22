import AsyncStorage from "@react-native-async-storage/async-storage";

async function setLocalObject(brainBucksObject) {
    try { await AsyncStorage.setItem("brainbucksobject", JSON.stringify(brainBucksObject)) }
    catch (err) {
        console.log("Error in Setting Local Object: ", err.message)
    }
}

async function getLocalObject() {
    try { 
        let t = await AsyncStorage.getItem("brainbucksobject")
        return JSON.parse(t)
    }
    catch (err) {
        console.log("Error in Getting Local Object: ", err.message)
    }
}

async function getBearerToken() {
    try {
        let obj = await getLocalObject();
        return "Bearer " + obj.jwt
    }
    catch (err) {
        console.log("Error in Getting Bearer Token: ", err.message)
    }
}

async function setJwt(jwt) {
    try {
        let localObj = await getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
            localObj.jwt = jwt + '';
            objectToSave.setObject(localObj)
        }
        else {
            objectToSave.setJwt(jwt)
        }
        await setLocalObject(objectToSave.getObject());
    }
    catch (err) {
        console.log("Error in setting JWT: ", err.message)
    }
}

/**
 * this method sets fcm token to the local storage
 * @param fcm the fcm token to save to local storage
 */
async function setFcm(fcm) {
    try {
        let localObj = await getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
            localObj.fcm = fcm + '';
            objectToSave.setObject(localObj)
        }
        else {
            objectToSave.setFcm(fcm)
        }
        await setLocalObject(objectToSave.getObject());

    }
    catch (err) {
        console.log("Error in setting fcm: ", err.message)
    }
}

async function setGender(gender) {
    try {
        let localObj = await getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
            localObj.gender = gender + '';
            objectToSave.setObject(localObj)
        }
        else {
            objectToSave.setGender(gender)
        }
        await setLocalObject(objectToSave.getObject());

    }
    catch (err) {
        console.log("Error in setting Gender: ", err.message)
    }
}

async function setName(name) {
    try {
        let localObj = await getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
            localObj.name = name + '';
            objectToSave.setObject(localObj)
        }
        else {
            objectToSave.setName(name)
        }
        await setLocalObject(objectToSave.getObject());

    }
    catch (err) {
        console.log("Error in setting Name: ", err.message)
    }
}

async function setNumber(number) {
    try {
        let localObj = await getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
            localObj.number = number + '';
            objectToSave.setObject(localObj)
        }
        else {
            objectToSave.setNumber(number)
        }
        await setLocalObject(objectToSave.getObject());

    }
    catch (err) {
        console.log("Error in setting Mobile Number: ", err.message)
    }
}


class BrainBucksObject {
    constructor(fcm, jwt, number, name, gender) {
        this.fcm = fcm;
        this.jwt = jwt;
        this.number = number;
        this.name = name;
        this.gender = gender;
    }

    setObject(obj) {
        this.fcm = obj.fcm;
        this.jwt = obj.jwt;
        this.number = obj.number;
        this.name = obj.name;
        this.gender = obj.gender;
    }

    getObject() {
        return {
            fcm: this.fcm,
            jwt: this.jwt,
            number: this.number,
            name: this.name,
            gender: this.gender
        }
    }

    setGender(gender) {
        this.gender = gender
    }
    getGender() {
        return this.gender
    }

    setJwt(jwt) {
        this.jwt = jwt
    }
    getJwt() {
        return this.jwt
    }

    setFcm(fcm) {
        this.fcm = fcm
    }
    getFcm() {
        return this.fcm
    }

    setNumber(number) {
        this.number = number
    }
    getNumber() {
        return this.number
    }

    setName(name) {
        this.name = name
    }
    getName() {
        return this.name
    }

}

export default{
    BrainBucksObject, setNumber, setName, setGender, setFcm, setJwt, getBearerToken, getLocalObject, setLocalObject
}