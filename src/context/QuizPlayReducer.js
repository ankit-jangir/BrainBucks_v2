import { View, Text } from 'react-native'
import React, { act, useContext, useReducer } from 'react'
import {QuizPlayContext} from './WalletContext'

const QuizPlayReducer = ({children}) => {
    const [quizState, dispatch] = useReducer(quizReducer, {})

    function quizReducer(state, action){
        switch(action.type){
            case 'change' :{
                console.log('updating',{...state, ...action.state});
                return {...state, ...action.state}
            }
            case 'empty' :{
                return {}
            }
        }
    }

    return <QuizPlayContext.Provider value={{ quizState, dispatch }}>{children}</QuizPlayContext.Provider>
}

export default QuizPlayReducer

/**
 * 
 * this function gives an object ({quizState, dispath}) where dispatch is a function that takes input ({type, state})
 * the idState object has {id:'', total:1, question: {}, ans:0} in it 
 * @returns returns result of useContext(QuizPlayContext)
 */
export function useQuiz(){
    return useContext(QuizPlayContext)
}