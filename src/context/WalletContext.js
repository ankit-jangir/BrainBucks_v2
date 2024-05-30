import React, { createContext } from 'react'

const AddBankContext = createContext({
    addBankState: {
        bankName: '',
        holderName: '',
        accnum: '',
        ifsc: '',
        otp: ''
    },
    reducer: () => { }
})

const WithdrawContext = createContext({
    withdrawState: {
        amount: '',
        bank: {},
        otp: '',
        balance:''
    },
    reducer: () => { }
})

const QuizPlayContext = createContext({
    quizState:{
        id:'',
        question:{
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            is_opt_img:0,
            is_ques_img:0,
            question_url:""
        },
        total:2,
        time: 10,
        ans:0
    },
    reducer: ()=>{}
})

module.exports = {
    AddBankContext,
    WithdrawContext,
    QuizPlayContext
}