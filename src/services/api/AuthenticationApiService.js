import axios from "axios";
import { AUTHMICRO, QUIZMICRO } from "../../config/urls";
import basic from '../BasicServices'

class AuthenticationApiService {
  async sendOtp(number,userTypeToSend) {
      number = "+91" + number;
      console.log("sending otp to " + number);
      const response = await axios({
        method: "post",
        url: `${AUTHMICRO}/auth/participant/send/otp`,
        data: {
          phone: number,
          is_edu:userTypeToSend
        },
      });
      return response.data;
  }

  async verifyOtpAndRegister(phone, otp,userType) {
    phone = "+91" + phone;
    let local = await basic.getLocalObject();
    let fcm = local.fcm;
    const response = await axios({
      method: "post",
      url: `${AUTHMICRO}/auth/participant/verify/otp`,
      data: {
        phone: phone,
        fcm_key: fcm,
        otp: otp,
       is_edu:userType
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

       
  async registerUser(phone, name, gender, category, otp,referralCode,userType,description) {
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
        otp:otp,
        refer_id:referralCode,
        is_edu:userType,
        description:description
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


//   async registerUser(phone, name, gender, category, otp, referralCode, userType, description) {
//   phone = "+91" + phone;
//   let local = await basic.getLocalObject();
//   let fcm = local.fcm;

  
//   // ✅ Log the data to be sent
//   const payload = {
//     phone: phone,
//     name: name,
//     gender: gender,
//     category: category,
//     fcm_key: fcm,
//     otp: otp,
//     refer_id: referralCode,
//     is_edu: userType,
//     description: description,
//   };
//   console.log('====================================');
//   console.log(payload,'sssss');
//   console.log('====================================');
//   const response = await axios({
//     method: "post",
//     url: `${AUTHMICRO}/auth/participant/registor`,
//     data: payload,
//   });

//   if (response.data.status === 1) {
//     await basic.setGender(gender);
//     await basic.setJwt(response.data.token);
//     await basic.setName(name);
//     await basic.setNumber(phone);
//   }

//   return response.data;
// }


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
    let bearer = await basic.getBearerToken();
    const formdata = new FormData();
    if(picture==='remove'){
      formdata.append('profile',null)
    }else{
      formdata.append("profile", {
        name: picture.fileName,
        size: picture.fileSize,
        type: picture.type,
        uri: picture.uri
      });
    }
    
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




async getReferCode() {
    try {
      let bearer = await basic.getBearerToken();
      const response = await axios.get(`${AUTHMICRO}/auth/participant/refer-code`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        }
      });

      if (response.data.status === '001') {
        return response.data.data; // Return only refer code
      } else {
        console.warn("Refer code fetch failed:", response.data);
        return null;
      }
    } catch (error) {
      console.error("getReferCode error:", error);
      return null;
    }
  }


}

export default AuthenticationApiService;
