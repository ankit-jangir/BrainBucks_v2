import { StackActions } from "@react-navigation/native";
import BasicServices from "../services/BasicServices";
import FreeQuizApiService from "../services/api/FreeQuizApiService";

const triviaServ = new FreeQuizApiService()

function triviaDetailsHelper(id) {
    return async () => {
        let res = await triviaServ.getTriviaQuizDetails(id)
        return res;
    }
}

export async function getTriviaDetails(id, toast, setData, setRefresh) {
    let res = await BasicServices.apiTryCatch(triviaDetailsHelper(id), toast, () => { setRefresh(true) }, () => { setRefresh(false) })
    if (res) {
        setData(res.data)
    }
}

function triviaJoinHelper(id) {
    return async () => {
        let res = await triviaServ.joinTriviaQuiz(id)
        return res
    }
}
export async function joinTriviaQuiz(id, toast, setRefresh, dispatch) {
    let res = await BasicServices.apiTryCatch(triviaJoinHelper(id), toast, () => { setRefresh(true) }, () => { setRefresh(false) })
    if (res) {
        dispatch({
            type: "change", state: {
                id: id,
                total: res.total_questions,
                time: res.timeperiod
            }
        })
    }
    return res;
}

function triviaGetQuestionHelper(id, page) {
    return async () => {
        let res = await triviaServ.getQuestion(id, page)
        return res
    }
}
export async function getTriviaQuestion(id, page, toast, dispatch, setSelectedOption) {
    let res = await BasicServices.apiTryCatch(triviaGetQuestionHelper(id, page), toast)
    if (res && res.question) {
        dispatch({
            type:'change',
            state:{
            question:res.question,
            ans:res.selected_ans
        }})

        setSelectedOption(res.selected_ans)
        
    }
}

function triviaUpdateAnswerHelper(id, page, ans){
    return async ()=>{
        let res = await triviaServ.updateAnswer(id, page, ans)
        return res
    }
}

export async function updateAnswer(id, page, ans, toast){
    let res = await BasicServices.apiTryCatch(triviaUpdateAnswerHelper(id, page, ans), toast)
    return res
}

function triviaSubmitHelper(id, time){
    return async ()=>{
        let res = await triviaServ.submitTriviaQuiz(id, time)
        return res
    }
}
export async function submitTriviaQuiz(id, time, toast) { 
    let res = await BasicServices.apiTryCatch(triviaSubmitHelper(id, time), toast)
    return res
}

function triviaResultHelper(id){
    return async () =>{
        let res = await triviaServ.resultTriviaQuiz(id)
        return res;
    }
}
export async function getResultOfTriviaQuiz(id, toast) {
    let res = await BasicServices.apiTryCatch(triviaResultHelper(id),toast)
    return res;
 }


 function triviaScoreboardHelper(id){
    return async () =>{
        let res = await triviaServ.scoreboardTriviaQuiz(id)
        return res;
    }
}
export async function viewScoreCardOfTriviaQuiz(id, toast) {
    let res = await BasicServices.apiTryCatch(triviaScoreboardHelper(id), toast )
    return res
}