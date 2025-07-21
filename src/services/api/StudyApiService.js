import axios from "axios";
import basic from "../BasicServices";
import { QUIZMICRO } from "../../config/urls";

export default class StudyApiService {

    /**
     * this function reterieves the enrolled exams of user by calling the api
     * @returns response coming from api
     */
    async getEnrolledExams() {
        let bearer = await basic.getBearerToken();
        let url = `${QUIZMICRO}/participants/get/saved/exams`;
        let headers = { "content-type": "application/json", "authorization": bearer };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data;
    }
    async getOtherExams() { 
        let bearer = await basic.getBearerToken();
        let url = `${QUIZMICRO}/participants/get/not/saved/exams`;
        let headers = { "content-type": "application/json", "authorization": bearer };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data;
    }
    async enrollInExam(exam_id) {
        let bearer = await basic.getBearerToken();
        let url = `${QUIZMICRO}/participants/add/exams`;
        let headers = { "content-type": "application/json", "authorization": bearer };
        let data = JSON.stringify({"exam_id":exam_id})
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url,
        };
        const response = await axios(options);
        return response.data;
    }
    async getStudyMaterial(cat_id, pdf_type, search = '') {
        let bearer = await basic.getBearerToken();
        let url = `${QUIZMICRO}/participants/get/materials/of/particular/exam/in/particular/pdftype?cat_id=${cat_id}&pdf_type=${pdf_type}&search=${search}`;
        let headers = { "content-type": "application/json", "authorization": bearer };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data;
    }
    async listPdfs(cat_id) {
        let bearer = await basic.getBearerToken();
        let url = `${QUIZMICRO}/participants/get/pdfs/of/particular/exam?cat_id=${cat_id}`;
        let headers = { "content-type": "application/json", "authorization": bearer };
        let options = {
            method: "get",
            headers: headers,
            url,
        };
        const response = await axios(options);
        return response.data;
    }
}
