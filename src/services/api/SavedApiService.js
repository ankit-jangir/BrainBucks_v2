import axios from "axios";
import { QUIZMICRO } from "../../config/urls";
import basic from "../BasicServices";

export default class SavedApiService{

    async getSavedExams(){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/get/saved`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data
    }

     

    async getTriviaQuizzes(id,page){
    let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/trivia/quizes?category_id=${id}&page=${page}`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data

    } 
    async getActiveQuizzes(id, page){
        let token =await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/active/quiz?category_id=${id}&page=${page}`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data  
    } 
    async getEnrolledQuizzes(id,page){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/enrolled/quizes?category_id=${id}&page=${page}`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data
    }    
    
    async getStudyMaterial(){}
}