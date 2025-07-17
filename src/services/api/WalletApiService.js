import axios from "axios";
import { AUTHMICRO, IFSC_CHECk, QUIZMICRO } from "../../config/urls";
import basic from "../BasicServices";
import { ToastAndroid } from "react-native";

class WalletApiService {



async  withdrawMoneyReq({ bankAccountId, amount }) {
  let token = await basic.getBearerToken()

  try {
    const response = await axios.post(
      `${QUIZMICRO}/api/v1/withdrawal/check/wallet?bank_account_id=${bankAccountId}&amount=${amount}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Withdrawal Check Error:', error?.response?.data || error.message);
    return {
      status: 0,
      Backend_Error: error?.response?.data?.Backend_Error || 'Network or Server Error',
    };
  }
}



// In WalletApiService
async checkIfsc(bankDetails) {
  let token = await basic.getBearerToken()
  const res = await axios.post(
    `${QUIZMICRO}/BankAccount/detail/create`,
    {
      account_number: bankDetails.accnum,
      account_holder_name: bankDetails.holderName,
      bank_name: bankDetails.bankName,
      ifsc: bankDetails.ifsc,
    },
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
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

  async withdrawTranctions(page, limit=25) {
    let token = await basic.getBearerToken()
    let url = `${QUIZMICRO}/api/v1/withdrawal/history?status=&date=`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

 async getTransactions(page, limit=25) {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/get/payment/transaction?page=${page}&limit=${limit}`;
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
    let url = `${QUIZMICRO}/BankAccount/detail/acceptedBanks`;
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
    let url = `${QUIZMICRO}/BankAccount/detail/allAccounts`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getSpentMoney(page) {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/see/spent_money?page=${page}&limit=${25}`;
    let headers = { "content-type": "application/json", authorization: token };
    let options = {
      method: "get",
      headers: headers,
      url,
    };
    const response = await axios(options);
    return response.data
  }

  async getEarnedMoney(page) {
    let token = await basic.getBearerToken()
    let url = `${AUTHMICRO}/sales/see/earned_money?page=${page}&limit=${25}`;
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

}

export default WalletApiService