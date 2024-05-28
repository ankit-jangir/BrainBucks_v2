import { useContext, useReducer } from "react";
import { WithdrawContext } from './WalletContext'


export default function WithdrawReducer({ children }) {
    const [withdrawState, dispatch] = useReducer(withdrawReducer, {
        amount: '',
        bank: {},
        otp: '',
        balance:''
    })

    function withdrawReducer(withdrawDetails, action) {
        switch (action.type) {
            case 'details':
                {
                    return ({ ...withdrawDetails, ...action.withdrawDetails })
                }
            case 'empty':
                {
                    return ({
                        amount: '',
                        bank: {},
                        otp: '',
                        balance:''
                    })
                }
        }
    }

    return <WithdrawContext.Provider value={{ withdrawState, dispatch }}>{children}</WithdrawContext.Provider>
}

/**
 * 
 * this function gives an object ({withdrawState, dispath}) where dispatch is a function that takes input ({type, withdrawDetails})
 * the withdrawState object has {amount:'', bank:{}, otp:'', balance:''} in it 
 * @returns returns result of useContext(WithdrawContext)
 */
export function useWithdraw(){
    return useContext(WithdrawContext)
}