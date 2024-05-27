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

module.exports = {
    AddBankContext,
    WithdrawContext
}