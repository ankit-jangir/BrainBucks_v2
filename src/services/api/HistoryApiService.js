import axios from "axios";
import { QUIZMICRO } from "../../config/urls"
import basic from "../BasicServices";

class HistoryApiService {

    async getFullHistory(order, page) {
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/all/history/quiz?order=${order}&page=${page}`;
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
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/free/history/quiz?order=${order}&page=${page}`;
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
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/win/history/quiz?order=${order}&page=${page}`;
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
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/loss/history/quiz?order=${order}&page=${page}`;
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