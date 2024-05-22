import {QUIZMICRO } from "../../config/urls";
import axios from "axios";
import basic from "../BasicServices";

class ActiveQuizApiService {
  constructor() {
    this.quizmicro = QUIZMICRO;
  }
  
  async getBearerToken(){
    let token = await basic.getLocalObject().jwt;
    return "Bearer "+token
  }

  async getActiveQuizDetails(id) {
    let token = await this.getBearerToken();
    let url = `${this.quizmicro}/participants/view/detail/of/active/quiz?id=${id}`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
  return response.data
  }


  async regiserInActiveQuiz(subactivequiz_id) {
    let token = await this.getBearerToken();
    let url = `${this.quizmicro}/participants/registor/in/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({subactivequiz_id:subactivequiz_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }



  async joinActiveQuiz(subactivequiz_id) {
    let token = await this.getBearerToken();
    let url = `${this.quizmicro}/participants/join/in/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({subactivequiz_id:subactivequiz_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }

  async submitActiveQuiz(subactivequiz_id,submit_time_period,stu_ans) {
    let token = `Bearer `;
    let url = `${this.quizmicro}/participants/submit/in/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({subactivequiz_id:subactivequiz_id,stu_ans:stu_ans,submit_time_period:submit_time_period})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }

  async getActiveQuizParticipants(subactivequiz_id) {
    let token = `Bearer `;
    let url = `${this.quizmicro}/participants/particpants/in/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({subactivequiz_id:subactivequiz_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }


  async getActiveQuizRewards(subactivequiz_id) {
    let token = `Bearer `;
    let url = `${this.quizmicro}/participants/reward/in/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({subactivequiz_id:subactivequiz_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }

  async getActiveQuizResult(quiz_id) {
    let token = `Bearer `;
    let url = `${this.quizmicro}/participants/view/result/of/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({quiz_id:quiz_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }


  async getActiveQuizScoreboard(SubActive_id) {
    let token = `Bearer `;
    let url = `${this.quizmicro}/participants/view/scoreboard/of/active/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({SubActive_id:SubActive_id})
    let options = {
      method: "post",
      headers: headers,
      data:data,
      url,
    };
    const response = await axios(options);
  return response.data
  }
}


export default ActiveQuizApiService;