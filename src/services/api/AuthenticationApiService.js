import axios from "axios";
import { AUTHMICRO, QUIZMICRO } from "../../config/urls";
import { BasicServices } from "../BasicServices";

class AuthenticationApiService {
  constructor() {
    this.basic = new BasicServices();
    this.authUrl = AUTHMICRO;
  }

  async sendOtp(number) {
    number = "+91" + number;
    console.log("sending otp to " + number);
    const response = await axios({
      method: "post",
      url: `${this.authUrl}/auth/participant/send/otp`,
      data: {
        phone: number,
      },
    });
    console.log("OTP RESPONSE", response);
    return response.data;
  }

  async verifyOtpAndRegister(phone, otp) {
    phone = "+91" + phone;
    let fcm = this.basic.getLocalObject().fcm;
    console.log("fcm", fcm);
    const response = await axios({
      method: "post",
      url: `${this.authUrl}/auth/participant/verify/otp`,
      data: {
        phone: phone,
        fcm_key: fcm,
        otp: otp,
      },
    });

    this.basic.setJwt(response.data.token);

    return response.data;
  }

  async getExams() {
    const response = await axios({
      method: "get",
      url: `${QUIZMICRO}/formfill/get/category?search=`,
    });
    return response.data;
  }

  async registerUser(phone, name, gender, category) {
    console.log(category, "sdkla");
    phone = "+91" + phone;
    let fcm = this.basic.getLocalObject().fcm;
    const response = await axios({
      method: "post",
      url: `${this.authUrl}/auth/participant/registor`,
      data: {
        phone: phone,
        name: name,
        gender: gender,
        category: category,
        fcm_key: fcm,
      },
    });
    if (response.data.status === 1) {
      this.basic.setGender(gender);
      this.basic.setJwt(response.data.token);
      this.basic.setName(name);
      this.basic.setNumber(phone);
    }
    return response.data;
  }


  async getUserProfile() {
    let token = "Bearer " + this.basic.getLocalObject().jwt;

    let url = `${this.authUrl}/auth/participant/view/profile`;
    let headers = { "content-type": "application/json", "authorization": token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data;
  }

  async editProfile(gender, name, phone) {
    let token = "Bearer " + this.basic.getLocalObject().jwt;
    let url = `${this.authUrl}/auth/participant/edit/profile`;
    let data = JSON.stringify({ gender: gender, name: name, phone: phone });
    let headers = { "content-type": "application/json", "authorization": token };
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data;
  }

  async uploadProfile(picture) {
    console.log("PIasd",picture);
    const formdata = new FormData();
    formdata.append("profile", picture);
    let token = "Bearer " + this.basic.getLocalObject().jwt;
    let url = `${this.authUrl}/auth/participant/upload/photo`;
    let headers = { "content-type": "multipart/form-data", "authorization": token };
    let options = {
      method: "post",
      headers: headers,
      data:formdata,
      url,
    };
    const response = await axios(options);
    return response.data;
  }

  async logout() {
    let token = "Bearer " + this.basic.getLocalObject().jwt;
    let url = `${this.authUrl}/auth/participant/logout`;
    let headers = { "content-type": "application/json", "authorization": token };
    let options = {
      method: "post",
      headers: headers,
      data: "{ }",
      url,
    };
    const response = await axios(options);
    return response.data;
  }
}

export default AuthenticationApiService;
