import axios from "axios";
import basic from "../BasicServices";
import { CHATURL, TICKETURL } from "../../config/urls";
import {io} from "socket.io-client"
import { onMessageReceived } from "../../config/FirebaseConfig";

class ChatSockService {

    static socket;

    static setSocket(sock){
        this.socket = sock;
    }

    async createTicket(title) {
        let token = await basic.getBearerToken()
        let url = `${TICKETURL}/partichat/create/ticket`;
        let headers = { "content-type": "application/json", authorization: token };
        let data = JSON.stringify({
            "title": title
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url,
        };
        const response = await axios(options);
        return response.data
    }

    async getAllTickets() {
        let token = await basic.getBearerToken()
        let url = `${TICKETURL}/partichat/get/previous/ticket`;
        let headers = { "content-type": "application/json", authorization: token };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data
    }

    async getChatByTicket(chat_id) {
        let token = await basic.getBearerToken()
        let url = `${TICKETURL}/partichat/get/chat/of/particular/ticket`;
        let headers = { "content-type": "application/json", authorization: token };
        let data = JSON.stringify({
            "chat_id": chat_id
        })
        let options = {
            method: "post",
            headers: headers,
            data: data,
            url,
        };
        const response = await axios(options);
        return response.data
    }

    static async connect(){
        const local = await basic.getLocalObject();
        const token = local?.jwt;

        if(!token){
            throw new Error("Restart to connect to chats")   
        }
        const sock = io(CHATURL,
            {
                reconnectionDelayMax: 10000, 
                query: {
                  "token": token,
                  'user_type': "Participants"
                },
                transports:['websocket']
            }
        )

        this.setSocket(sock)

        sock.on('error',(err)=>{console.log("ERROR IN CLIENT", err)})
        sock.on('ticket_response', (res)=>{
            res = JSON.parse(res)
            console.log("Message recieved (default reciever): ", res);
        })
        sock.on('connect', ()=>{console.log("Socket Connected")})
        sock.on('disconnect', ()=>{console.log("Socket Disconnected")})
        return sock;
    }

    static getSocket(){
        return this.socket;
    }

    static async disconnect(){
        if(this.socket && this.socket.disconnect)
        this.socket.disconnect()
    }

    static async sendMessage(chat_id, message) {
        let local = await basic.getLocalObject()
        let user_id = local.id;
        let block = {user_id: user_id, chat_id: chat_id, message: message}
        let date = Date.now().toLocaleString()
        try{
            await this.socket.emit('participant_msg_to_ticket', JSON.stringify(block))
            return {chat_id:chat_id, content:message, send_time:date, status:1, sender_id: user_id, _id:date}
        }catch(err){
            return false
        }
    }


    static async listen(callback){
        this.socket.off('ticket_response')
        this.socket.on("ticket_response", callback)
    }

    static async keepOnlyOneListener(){
        this.socket.off('ticket_response')
        this.socket.on('ticket_response', (msg)=>{console.log("Ticket Response: ",msg)})
    }

}


export default ChatSockService;
