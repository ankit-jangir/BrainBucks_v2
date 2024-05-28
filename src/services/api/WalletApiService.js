import axios from "axios";
import { AUTHMICRO, IFSC_CHECk } from "../../config/urls";
import basic from "../BasicServices";
import { ToastAndroid } from "react-native";

class WalletApiService {

  async checkIfsc(ifsc){
    let options = {
      method:'get',
      url:IFSC_CHECk+"/"+ifsc
    }
    const res = await axios(options)
    return res
  }
  
  async createOrder(amount) {
    amount = parseInt(amount + "")
    let token = await basic.getBearerToken()

    let url = `${AUTHMICRO}/sales/make/payment`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({ amount: amount })
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }



  async getTransactions() {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/get/payment/transaction`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }


  async verifyPayment() {
    let token = await basic.getBearerToken()

    let url = `${AUTHMICRO}/sales/verify/payment`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }


  async createContact() {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/create/contact`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async withdrawMoney(amount, otp, account_id){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/withdraw/money`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({"amount":amount,"otp":otp,"account_id":account_id})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async sendOtp(){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/send/otp`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async viewBankDetails(id){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/select/bank/during/withdraw`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({"id":id})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async viewPaymentDetails(t_id){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/view/payment/details`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({"transaction_id":t_id})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getVerfiedBanks(){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/select/bank/during/withdraw`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getAllBanks(){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/get/banks`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getSpentMoney() {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/see/spent_money`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getEarnedMoney() {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/see/earned_money`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async deleteBank(acc_id){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/delete/bank/by/id`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({"account_id":acc_id})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getWalletBalance(){
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/get/wallet/balance`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async addBank(ifsc_code, bank_name, bank_acc_no, acc_holder_name, otp){
    ifsc_code = ifsc_code.toLocaleUpperCase()
    console.log(ifsc_code,"SERVICE");
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/add/bank/details`;
    let headers = { "content-type": "application/json", authorization: token };
    let data = JSON.stringify({"ifsc_code":ifsc_code,"otp":otp,"bank_acc_no":bank_acc_no,"bank_name":bank_name,"acc_holder_name":acc_holder_name})
    let options = {
      method: "post",
      headers: headers,
      data: data,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async displayRazorpay(options, setActive) {
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      ToastAndroid.show("error in loading razorpay",ToastAndroid.SHORT)
      return;
    }

    const opt = {
      ...options,
      handler: async function (response) {
        //todo: send to the failed section
        console.log("Response from the razor pay", response);
      },
      modal: {
        confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
        // This function is executed when checkout modal is closed
        // There can be 3 reasons when this modal is closed.
        ondismiss: async (reason) => {
          const {
            reason: paymentReason, field, step, code,
          } = reason && reason.error ? reason.error : {};
          // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly. 
          if (reason === undefined) {
            console.log("Cancelled");
            setActive(true)
            //todo: send to the failed section
          }
          // Reason 2 - When modal is auto closed because of time out
          else if (reason === 'timeout') {
            console.log("Timed Out");
            setActive(true)
            //todo: send to the failed section
          }
          // Reason 3 - When payment gets failed.
          else {
            console.log('failed');
            setActive(true)
            //todo: send to the failed section

          }
        },
      }
    };

    const rzp1 = new window.Razorpay(opt);
    rzp1.on('payment.submit', (response) => {
      //todo: send to the success screen
      console.log("Successful Payment", response);
      setActive(true)
    });
    rzp1.on('payment.failed', (response) => {
      console.log("Failed Payment", response);
      setActive(true)
    });
    rzp1.open()
    return rzp1;
  }


}

export default WalletApiService