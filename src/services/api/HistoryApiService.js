import axios from "axios";
import { QUIZMICRO } from "../../config/urls"
import { BasicServices } from "../BasicServices";

class HistoryApiService {
    constructor() {
        this.quizUrl = QUIZMICRO
        this.basic = new BasicServices()
    }

    async getFullHistory(order, page) {
        let token = `Bearer ` + this.basic.getLocalObject().jwt;
        let url = `${this.quizUrl}/participants/all/history/quiz?order=${order}&page=${page}`;
        let headers = { "content-type": "application/json", authorization: token };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data
    }

    async getFreeQuizzes(order,page) {
        let token = `Bearer ` + this.basic.getLocalObject().jwt;
        let url = `${this.quizUrl}/participants/free/history/quiz?order=${order}&page=${page}`;
        let headers = { "content-type": "application/json", authorization: token };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data
    }
    async getWonQuizzes(order,page) {
        let token = `Bearer ` + this.basic.getLocalObject().jwt;
        let url = `${this.quizUrl}/participants/win/history/quiz?order=${order}&page=${page}`;
        let headers = { "content-type": "application/json", authorization: token };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data
    }
    async getLostQuizzes(order,page) { 
        let token = `Bearer ` + this.basic.getLocalObject().jwt;
        let url = `${this.quizUrl}/participants/loss/history/quiz?order=${order}&page=${page}`;
        let headers = { "content-type": "application/json", authorization: token };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data
    }

}

export default HistoryApiService;