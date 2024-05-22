import axios from "axios";
import { AUTHMICRO, QUIZMICRO } from "../../config/urls";
import basic from '../BasicServices'

class AuthenticationApiService {
  async sendOtp(number) {
      number = "+91" + number;
      console.log("sending otp to " + number);
      const response = await axios({
        method: "post",
        url: `${AUTHMICRO}/auth/participant/send/otp`,
        data: {
          phone: number,
        },
      });
      return response.data;
  }

  async verifyOtpAndRegister(phone, otp) {
    phone = "+91" + phone;
    let local = await basic.getLocalObject();
    let fcm = local.fcm;
    console.log("fcm", fcm);
    const response = await axios({
      method: "post",
      url: `${AUTHMICRO}/auth/participant/verify/otp`,
      data: {
        phone: phone,
        fcm_key: fcm,
        otp: otp,
      },
    });

    await basic.setJwt(response.data.token);

    return response.data;
  }

  async getExams(search) {
    const response = await axios({
      method: "get",
      url: `${QUIZMICRO}/formfill/get/category?search=${search}`,
    });
    return response.data;
  }

  async registerUser(phone, name, gender, category) {
    phone = "+91" + phone;
    let local = await basic.getLocalObject();
    let fcm = local.fcm
    const response = await axios({
      method: "post",
      url: `${AUTHMICRO}/auth/participant/registor`,
      data: {
        phone: phone,
        name: name,
        gender: gender,
        category: category,
        fcm_key: fcm,
      },
    });
    if (response.data.status === 1) {
      await basic.setGender(gender);
      await basic.setJwt(response.data.token);
      await basic.setName(name);
      await basic.setNumber(phone);
    }
    return response.data;
  }


  async getUserProfile() {
    let bearer = await basic.getBearerToken();
    let url = `${AUTHMICRO}/auth/participant/view/profile`;
    let headers = { "content-type": "application/json", "authorization": bearer };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data;
  }

  async editProfile(gender, name, phone) {
    let bearer = await basic.getBearerToken();
    let url = `${AUTHMICRO}/auth/participant/edit/profile`;
    let data = JSON.stringify({ gender: gender, name: name, phone: phone });
    let headers = { "content-type": "application/json", "authorization": bearer };
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
    console.log("picture", picture);
    let bearer = await basic.getBearerToken();
    const formdata = new FormData();
    formdata.append("profile", picture);
    let url = `${AUTHMICRO}/auth/participant/upload/photo`;
    let headers = { "content-type": "multipart/form-data", "authorization": bearer };
    let options = {
      method: "post",
      headers: headers,
      data: formdata,
      url,
    };
    const response = await axios(options);
    return response.data;
  }

  async logout() {
    let bearer = await basic.getBearerToken();
    let url = `${AUTHMICRO}/auth/participant/logout`;
    let headers = { "content-type": "application/json", "authorization": bearer };
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
