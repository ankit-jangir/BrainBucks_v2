import axios from 'axios';
import { QUIZMICRO, TICKETURL } from '../../config/urls';
import basic from '../BasicServices'

class HomeApiService{

    // async getHomeData(){
    //     let token = await basic.getBearerToken()
    //     let url = `${QUIZMICRO}/home/page/overview`
    //     let headers = {"content-type":"application/json", "authorization":token}
    //     let options = {
    //         method: "get",
    //         headers: headers,
    //         url
    //     }
    //     let response = await axios(options)
    //     return response.data;
    // }

    async getBanners(){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/home/get/banners`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getActiveQuizes(page=1, limit=25){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/home/get/live/quizes?page=${page}&limit=${limit}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getTriviaQuizes(page=1, limit=25){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/home/get/trivia/quizes?page=${page}&limit=${limit}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }
    
    async getExams(){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/home/get/exams`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getEnrolledQuizes(page=1, limit=25){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/home/get/enrolled/quizes?page=${page}&limit=${limit}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getReels(){
        let token = await basic.getBearerToken()
        let url = `${TICKETURL}/participants/reels/get/popular/reels/for/homepage`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    // async getTriviaQuizes(page){
    //     let token = await basic.getBearerToken()
    //     let url = `${QUIZMICRO}/home/see/all/trivia/quizes?page=${page}`
    //     let headers = {"content-type":"application/json", "authorization":token}
    //     let options = {
    //         method: "get",
    //         headers: headers,
    //         url
    //     }
    //     let response = await axios(options)
    //     return response.data;
    // }
    // async getActiveQuizes(page){
    //     let token = await basic.getBearerToken()
    //     let url = `${QUIZMICRO}/home/see/all/active/quizes?page=${page}`
    //     let headers = {"content-type":"application/json", "authorization":token}
    //     let options = {
    //         method: "get",
    //         headers: headers,
    //         url
    //     }
    //     let response = await axios(options)
    //     return response.data;
    // }
    // async getEnrolledQuizes(page){
    //     let token = await basic.getBearerToken()
    //     let url = `${QUIZMICRO}/home/see/all/enrolled/quizes?page=${page}`
    //     let headers = {"content-type":"application/json", "authorization":token}
    //     let options = {
    //         method: "get",
    //         headers: headers,
    //         url
    //     }
    //     let response = await axios(options)
    //     return response.data;
    // }

    async getDailyUpdates(page){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/get/daily/updates?page=${page}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

}

export default HomeApiService;