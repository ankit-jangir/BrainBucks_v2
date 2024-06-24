import axios from 'axios';
import { NOTIFYMICRO, QUIZMICRO, ROOMURL } from '../../config/urls';
import basic from '../BasicServices'

class RoomsApiService{
    async createRoom(room_name, room_type){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/create/room`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_name":room_name,
            "room_type":room_type
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async joinPublicRoom(room_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/join/in/public/room`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async joinPrivateRoom(room_hash){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/join/in/private/room`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_hash
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async withdrawJoinRequest(room_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/withdraw/request`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async rejectJoinRequest(room_id, user_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/reject/request`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id,
            "user_id":user_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async acceptJoinRequest(room_id, user_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/accept/request`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id,
            "user_id":user_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async exitRoom(room_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/exit/room`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async deleteRoom(room_id){
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/delete/room`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "room_id":room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

}

export default RoomsApiService;