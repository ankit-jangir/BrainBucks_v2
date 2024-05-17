import BasicServices from "../BasicServices";

export default class StudyApiService{
    constructor(){
        this.basic = new BasicServices();
    }

    async getEnrolledExams(){}
    async getOtherExams(){}
    async enrollInExam(){}
    async getStudyMaterial(){}
    async listPdfs(){}
}