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

    GETROOMJOINREQUESTS = gql`
        query Get_req_participants_of_quiz($room_id:String!, $page: Int!) {
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

    GETROOMMEMBERS = gql`
        query Get_enrl_participants_of_quiz($room_id:String!, $page:Int!) {
            get_enrl_participants_of_quiz(room_id: $room_id, page: $page) {
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

    GETLIVEQUIZES = gql`
        query Live_quizes($room_id: String!) {
            live_quizes(room_id: $room_id) {
                status
                error
                totalPages
                response {
                    _id
                    prize
                    slots
                    slot_aloted
                    sch_time
                    category_name
                    category_image
                    entryFees
                    participants
                    rewards
                    room_name
                    room_id
                    is_res_dec
                }
            }
        }`


    GETSCHEDULEDQUIZES = gql`
        query Schedule_quizes($room_id: String!, $page: Int!) {
            schedule_quizes(room_id: $room_id, page: $page) {
                status
                error
                totalPages
                response {
                    _id
                    prize
                    slots
                    slot_aloted
                    sch_time
                    category_name
                    category_image
                    entryFees
                    participants
                    rewards
                    room_name
                    room_id
                }
            }
        }
    `;

    GETHISTORYQUIZES = gql
        `query History_quizes($room_id: String!, $page: Int!) {
            history_quizes(room_id: $room_id, page: $page) {
                status
                error
                totalPages
                response {
                    _id
                    prize
                    slots
                    slot_aloted
                    sch_time
                    category_name
                    entryFees
                    participants
                    rewards
                    room_name
                    room_id
                    is_res_dec
                    crontab_result_time
                }
            }
        }`;


    GETEXAMCATEGORIES = gql`
        query Get_category_fromfill($search_cat: String, $search_sub_cat: String, $cat_id: String! ) {
            get_category_fromfill(search: $search_cat) {
                status
                error
                response {
                    _id
                    category_name
                    image
                }
            }
            get_sub_category_fromfill(cat_id: $cat_id, search: $search_sub_cat) {
                status
                error
                response {
                    _id
                    sub_category_name
                }
            }
        }
        `

    GETQUIZDETAILS = gql`
        query View_detail_of_roomquiz($room_id: String!) {
            view_detail_of_roomquiz(roomquiz_id: $room_id) {
                status
                error
                response {
                    _id
                    prize
                    slots
                    slot_aloted
                    sch_time
                    category_name
                    category_image
                    entryFees
                    participants
                    rewards
                    room_name
                    room_id
                    is_res_dec
                }
            }
        }
    `


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
        console.log(room_hash);
        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/join/in/private/room`
        let headers = { "content-type": "application/json", "authorization": token }
        let data = JSON.stringify({
            "room_hash": room_hash
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


    async createQuiz({ room_id, room_name, category_id, category_name, category_image, sub_cat_id, total_ques, entryFees, slots, time_per_que, sch_time, lobby_time }) {
        let data = {
            "room_id": room_id,
            "room_name": room_name,
            "category_id": category_id,
            "category_name": category_name,
            "category_image": category_image,
            "sub_cat_id": sub_cat_id,
            "total_num_of_quest": total_ques,
            "entryFees": entryFees,
            "slots": slots,
            "time_per_question": time_per_que,
            "sch_time": sch_time, //"27-06-2024 20:40:50",
            "lobby_time": lobby_time //"5 mins"
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/create/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async registerInQuiz(roomquiz_id) {
        let data = {
            "roomquiz_id": roomquiz_id
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/registor/quiz/`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async joinQuiz(roomquiz_id) {
        let data = {
            "roomquiz_id": roomquiz_id
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/join/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getQuestion(roomquiz_id, page) {
        let data = {
            "roomquiz_id": roomquiz_id,
            "page": page
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/get/question/playing/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async updateAnswer(roomquiz_id, page, ans) {
        let data = {
            "roomquiz_id": roomquiz_id,
            "page": page,
            "ans": ans
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/update/question/playing/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async submitQuiz(roomquiz_id, submit_time_period) {
        let data = {
            "roomquiz_id": roomquiz_id,
            "submit_time_period": submit_time_period
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/submit/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async viewScorecard(roomquiz_id) {
        let data = {
            "roomquiz_id": roomquiz_id
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/view/scoreboard/of/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async viewResult(roomquiz_id) {
        let data = {
            "roomquiz_id": roomquiz_id
        };

        let token = await basic.getBearerToken()
        let url = `${ROOMURL}/participant/room/quiz/view/result/of/quiz`
        let headers = { "content-type": "application/json", "authorization": token }
        data = JSON.stringify(data)
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

