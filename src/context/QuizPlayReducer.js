import { View, Text } from 'react-native'
import React, { act, useContext, useReducer } from 'react'
import { QuizPlayContext } from './WalletContext'

const QuizPlayReducer = ({ children }) => {
    const [quizState, dispatch] = useReducer(quizReducer, {
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
    },)

    function quizReducer(state, action) {
        switch (action.type) {
            case 'change': {
                console.log('updating', { ...state, ...action.state });
                return { ...state, ...action.state }
            }
            case 'empty': {
                return {
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
                }
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
export function useQuiz() {
    return useContext(QuizPlayContext)
}