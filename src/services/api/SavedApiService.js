import axios from "axios";
import { QUIZMICRO } from "../../config/urls";
import basic from "../BasicServices";

export default class SavedApiService{

    async getSavedExams(){
        let token = basic.getBearerToken()
        let url = `${QUIZMICRO}/participants/get/saved`
        let headers = {"content-type":"application/json", authorization:token}
        let options = {
            method: 'get',
            headers:headers,
            url
        }
        const response = await axios(options)
        return response.send_data
    }
    async enrollInExam(){
       
    }
    async getOtherExams(){}  
    async getTriviaQuizzes(){} 
    async getActiveQuizzes(){} 
    async getEnrolledQuizzes(){} 
    async getStudyMaterial(){}
}