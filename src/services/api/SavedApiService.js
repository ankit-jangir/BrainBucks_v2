import { QUIZMICRO } from "../../config/urls";
import bsaic from "../BasicServices";

export default class SavedApiService{

    async getSavedExams(){
    let token = await bsaic.getBearerToken()
    let url = `${QUIZMICRO}/participants/get/saved`

    }
    async enrollInExam(){}
    async getOtherExams(){}  
    async getTriviaQuizzes(){} 
    async getActiveQuizzes(){} 
    async getEnrolledQuizzes(){} 
    async getStudyMaterial(){}
}