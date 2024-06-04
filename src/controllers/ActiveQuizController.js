import BasicServices from "../services/BasicServices";
import ActiveQuizApiService from "../services/api/ActiveQuizApiService";

const serv = new ActiveQuizApiService()

function activeDetailsHelper(id) {
    return async () => {
        let res = await serv.getActiveQuizDetails(id)
        return res;
    }
}

export async function getactiveDetails(id, toast, setData, setRefresh, dispatch) {
    let res = await BasicServices.apiTryCatch(activeDetailsHelper(id), toast, () => { setRefresh(true) }, () => { setRefresh(false) })
    if (res) {
        setData(res.data)
        dispatch({type:'change', state:{
            id:id,
            total:res.data.total_num_of_quest,
            time: res.data.time_per_question
        },})
    }
}


function activeRegisterHelper(id) {
    return async () => {
        let res = await serv.regiserInActiveQuiz(id)
        return res
    }
}
export async function registerActiveQuiz(id, toast, setRefresh,  setModalVisible){
    let res = await BasicServices.apiTryCatch(activeRegisterHelper(id), toast, ()=>{setRefresh(true)}, ()=>{setRefresh(false)})
    console.log(res);
    if (res) {
        setModalVisible(true)
    }
}

function activeJoinHelper(id) {
    return async () => {
        let res = await serv.joinActiveQuiz(id)
        return res
    }
}
export async function joinactiveQuiz(id, toast, setRefresh, dispatch) {
    let res = await BasicServices.apiTryCatch(activeJoinHelper(id), toast, () => { setRefresh(true) }, () => { setRefresh(false) })
    if (res) {
        dispatch({
            type: "change", state: {
                id: id,
                total: res.total_question,
                time: res.timeperiod
            }
        })
    }
    return res;
}

function activeGetQuestionHelper(id, page) {
    return async () => {
        let res = await serv.getQuestion(id, page)
        return res
    }
}
export async function getactiveQuestion(id, page, toast, dispatch, setSelectedOption) {
    let res = await BasicServices.apiTryCatch(activeGetQuestionHelper(id, page), toast)
    console.log(res);
    if (res && res.question) {
        dispatch({
            type:'change',
            state:{
            question:res.question,
            ans:res.selected_ans
        }})

        setSelectedOption(res.selected_ans)
        
    }
    return res;
}

function activeUpdateAnswerHelper(id, page, ans){
    return async ()=>{
        let res = await serv.updateAnswer(id, page, ans)
        return res
    }
}

export async function updateAnswer(id, page, ans, toast){
    let res = await BasicServices.apiTryCatch(activeUpdateAnswerHelper(id, page, ans), toast)
    return res
}

function activeSubmitHelper(id, time){
    return async ()=>{
        let res = await serv.submitActiveQuiz(id, time)
        return res
    }
}
export async function submitactiveQuiz(id, time, toast) { 
    let res = await BasicServices.apiTryCatch(activeSubmitHelper(id, time), toast)
    return res
}

function activeResultHelper(id){
    return async () =>{
        let res = await serv.getActiveQuizResult(id)
        return res;
    }
}
export async function getResultOfactiveQuiz(id, toast) {
    let res = await BasicServices.apiTryCatch(activeResultHelper(id),toast)
    return res;
 }


 function activeScoreboardHelper(id){
    return async () =>{
        let res = await serv.getActiveQuizScoreboard(id)
        return res;
    }
}
export async function viewScoreCardOfactiveQuiz(id, toast) {
    let res = await BasicServices.apiTryCatch(activeScoreboardHelper(id), toast )
    return res
}