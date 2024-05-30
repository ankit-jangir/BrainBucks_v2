import { QUIZMICRO } from "../../config/urls";
import axios from "axios";
import basic from "../BasicServices";

class FreeQuizApiService {

  async getTriviaQuizDetails(id) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/view/detail/of/trivia/quiz?id=${id}`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async joinTriviaQuiz(subtrivia_id) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/join/in/trivia/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ subtrivia_id: subtrivia_id })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async submitTriviaQuiz(submit_time_period, stu_ans, subtrivia_id) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/submit/in/trivia/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ subtrivia_id: subtrivia_id, stu_ans: stu_ans, submit_time_period: submit_time_period })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async resultTriviaQuiz(quiz_id) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/view/result/in/trivia/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ quiz_id: quiz_id })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async scoreboardTriviaQuiz(subtrivia_id) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/view/scoreboard/in/trivia/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ subtrivia_id: subtrivia_id })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getQuestion(id, page){
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/participants/get/question/bypage/in/trivia/quiz`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ subtrivia_id: id, page: page })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }


}
export default FreeQuizApiService