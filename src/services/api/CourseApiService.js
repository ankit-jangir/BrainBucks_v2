import { PRERECMICRO } from "../../config/urls";
import axios from "axios";
import basic from "../BasicServices";

class CourseApiService {


  async getFreeCourses() {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/get/free/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getPaidCourses(page) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/get/paid/courses?page=${page}`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getEnrolledCourses() {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/get/enrolled/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async buyCourse(course_id) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/enrolled/in/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = { course_id: course_id };
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getCourseDetails(course_id) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/view/detail/of/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = { course_id: course_id };
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getVideos(course_id) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/get/video/of/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = { course_id: course_id };
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async startVideo(course_id, video_id) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/course/start/video`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ course_id: course_id, video_id: video_id });
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getStudyMaterial(course_id, video_id) {
    let token = await basic.getBearerToken()
    let url = `${PRERECMICRO}/participant/studymaterials/get/study/materials/in/video`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ course_id: course_id, video_id: video_id });
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getCourseBuyingHistory(course_id, video_id) {
    let token = await basic.getBearerToken();
    let url = `${PRERECMICRO}/participant/buycourseplan/history`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = { course_id: course_id, video_id: video_id };
    let options = {
      method: "get",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }
async CoursePlanHistorys(){
  let token = await basic.getBearerToken();
  let url = `${PRERECMICRO}/participant/buycourseplan/history`;
  let headers = {"content-type": "application/json", authorization: token};
  let options ={
    method: "get",
    headers: headers,
    url,
  };
  const response = await axios (options)
  return response.data
}

}

export default CourseApiService;
