import axios from 'axios';
import { NOTIFYMICRO, QUIZMICRO, ROOMURL } from '../../config/urls';
import basic from '../BasicServices'
import { gql, useQuery } from '@apollo/client';

class RoomsApiService {

    GETPUBLICROOMS = gql`
                query GetPublicRoom($page : Int!, $search: String){
                getPublicRoom(page: $page, search: $search) {
                    status
                    error
                    totalPages
                    response {
                        _id
                        room_name
                        enrolled_participants_count
                    }
                }
            }
        `;

    Get_created_rooms = gql`
  query GetCreatedRooms {
    get_created_rooms {
      status
      error
      response {
        _id
        room_name
        enrolled_participants_count
        room_type
        room_hash
      }
    }
  }
`;
    Get_pending_rooms = gql`
  query GetPendingRooms {
    get_pending_rooms {
      status
      error
      response {
        _id
        room_name
        enrolled_participants_count
        room_type
        room_hash
      }
    }
  }
`;

    Get_joined_rooms = gql`
      query GetJoinedRooms {
       get_joined_rooms{
       status
        error
        response {
            _id
            room_name
            enrolled_participants_count
            room_type
            room_hash
        }
       }
      }
       `;
    Get_Req_Participants_Quiz = gql`
  query GetParticipants($room_id: String, $page: Int!) {
    get_req_participants_of_quiz(room_id: $room_id, page: $page) {
        status
        error
        totalPages
        response {
            _id
            name
            image
        }
    }
  }
`;

    Get_Enroll_Participants_Quiz = gql`
  query GetEnrollParticipants {
    get_enrl_participants_of_quiz(room_id: "66792b61535c7636160ec0e4", page: 1) {
        status
        error
        totalPages
        response {
            _id
            name
            image
        }
    }
  }
`;

    async createRoom(room_name, room_type) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/create/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_name": room_name,
            "room_type": room_type
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async joinPublicRoom(room_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/join/in/public/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async joinPrivateRoom(room_hash) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/join/in/private/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_hash
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async withdrawJoinRequest(room_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/withdraw/request`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async rejectJoinRequest(room_id, user_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/reject/request`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id,
            "user_id": user_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async acceptJoinRequest(room_id, user_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/accept/request`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id,
            "user_id": user_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async exitRoom(room_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/exit/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async deleteRoom(room_id) {
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/delete/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_id": room_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }


}

export default RoomsApiService;

