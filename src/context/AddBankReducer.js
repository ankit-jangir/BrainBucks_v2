import { useContext, useReducer } from "react";
import { AddBankContext } from './WalletContext'

export default function AddBankReducer({ children }) {
    const [addBankState, dispatch] = useReducer(addBankReducer, {
        bankName: '',
        holderName: '',
        accnum: '',
        ifsc: '',
        otp: ''
    })

    function addBankReducer(bankDetails, action) {
        switch (action.type) {
            case 'details':
                {
                    return ({ ...bankDetails, ...action.bankDetails })
                }
            case 'empty':
                {
                    return ({
                        bankName: '',
                        holderName: '',
                        accnum: '',
                        ifsc: '',
                        otp: ''
                    })
                }
        }
    }

    return <AddBankContext.Provider value={{ addBankState, dispatch }}>{children}</AddBankContext.Provider>
}

/**
 * 
 * this function returns a {addBankState, dispatch} object where:
 * addBankState - the state with data,
 * dispatch - function to update state and takes input ({type, bankDetails})
 * @returns result of useContext(AddBankContext)
 */
export function useAddBank(){
    return useContext(AddBankContext)
}