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

     

    async getTriviaQuizzes(id){
    let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/trivia/quizes?category_id=${id}&page=1`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data

    } 
    async getActiveQuizzes(id){
        let token =await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/active/quiz?category_id=${id}&page=1`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.data  
    } 
    async getEnrolledQuizzes(id){
        let token = await basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/particular/exam/enrolled/quizes?category_id=${id}&page=1`
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