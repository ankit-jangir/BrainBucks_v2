import { PRERECMICRO } from "../../config/urls";
import axios from "axios";
import { BasicServices } from "../BasicServices";

class CourseApiService {
  constructor() {
    this.prerecMicro = PRERECMICRO;
    this.basic = new BasicServices();
  }

  async getFreeCourses() {
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/get/free/courses`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getPaidCourses() {
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/get/paid/courses`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/get/enrolled/courses`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/enrolled/in/courses`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/view/detail/of/courses`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/get/video/of/courses`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/course/start/video`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/studymaterials/get/study/materials/in/video`;
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
    let token = `Bearer `+this.basic.getLocalObject().jwt;
    let url = `${this.prerecMicro}/participant/buycourseplan/history`;
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
}

export default CourseApiService;
