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
export async function joinTriviaQuiz(id, toast, navigation, routename, setRefresh, dispatch) {
    let res = await BasicServices.apiTryCatch(triviaJoinHelper(id), toast, () => { setRefresh(true) }, () => { setRefresh(false) })
    if (res) {
        dispatch({
            type: "change", state: {
                id: id,
                total: res.total_questions,
                time: res.timeperiod
            }
        })
        navigation.navigate(routename)
    }
}

function triviaGetQuestionHelper(id, page) {
    return async () => {
        let res = await triviaServ.getQuestion(id, page)
        return res
    }
}
export async function getTriviaQuestion(id, page, toast, dispatch) {
    let res = await BasicServices.apiTryCatch(triviaGetQuestionHelper(id, page), toast)
    if (res) {
        dispatch({
            type:'change',
            state:{
            question:res.question,
            ans:res.selected_ans
        }})
    }
}

export async function submitTriviaQuiz() { }
export async function getResultOfTriviaQuiz() { }
export async function viewScoreCardOfTriviaQuiz() { }