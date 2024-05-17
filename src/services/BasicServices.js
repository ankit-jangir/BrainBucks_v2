import { default as AsyncStorage } from "@react-native-async-storage/async-storage";

class BasicServices {
    async setLocalObject(brainBucksObject) { 
        await AsyncStorage.setItem("brainbucks_object", JSON.stringify(brainBucksObject))
    }

    async getLocalObject() {
        return await JSON.parse(AsyncStorage.getItem("brainbucks_object"));
    }

    async getJwt(){
        return await JSON.parse(AsyncStorage.getItem("brainbucks_object")).jwt;
    }

    async setJwt(jwt){
        let localObj = await this.getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
          localObj.jwt = jwt+'';
          objectToSave.setObject(localObj)
        }
        else {
          objectToSave.setJwt(jwt)
        }
        await this.setLocalObject(objectToSave);
    }

    async setFcm(fcm){
        let localObj = await this.getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
          localObj.fcm = fcm+'';
          objectToSave.setObject(localObj)
        }
        else {
          objectToSave.setFcm(fcm)
        }
        await this.setLocalObject(objectToSave);
    }

    async setGender(gender){
        let localObj = await this.getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
          localObj.gender = gender+'';
          objectToSave.setObject(localObj)
        }
        else {
          objectToSave.setGender(gender)
        }
        await this.setLocalObject(objectToSave);
    }

    async setName(name){
        let localObj = await this.getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
          localObj.name = name+'';
          objectToSave.setObject(localObj)
        }
        else {
          objectToSave.setName(name)
        }
        await this.setLocalObject(objectToSave);
    }

    async setNumber(number){
        let localObj = await this.getLocalObject()
        let objectToSave = new BrainBucksObject()
        if (localObj) {
          localObj.number = number+'';
          objectToSave.setObject(localObj)
        }
        else {
          objectToSave.setNumber(number)
        }
        await this.setLocalObject(objectToSave);
    }

}

class BrainBucksObject {
    constructor(fcm, jwt, number, name,gender) {
        this.fcm = fcm;
        this.jwt = jwt;
        this.number = number;
        this.name = name;
        this.gender = gender;
    }

    setObject(obj){
        this.fcm = obj.fcm;
        this.jwt = obj.jwt;
        this.number = obj.number;
        this.name = obj.name;
        this.gender=obj.gender;
    }

    getObject(){
        return {
            fcm:this.fcm,
            jwt:this.jwt,
            number:this.number,
            name:this.name,
            gender:this.gender
        }
    }
    
    setGender(gender){
        this.gender=gender
    }
    getGender(){
        return this.gender
    }

    setJwt(jwt){
        this.jwt=jwt
    }
    getJwt(){
        return this.jwt
    }

    setFcm(fcm){
        this.fcm=fcm
    }
    getFcm(){
        return this.fcm
    }

    setNumber(number){
        this.number=number
    }
    getNumber(){
        return this.number
    }

    setName(name){
        this.name=name
    }
    getName(){
        return this.name
    }
    
}

export default{
    BrainBucksObject, BasicServices
}
