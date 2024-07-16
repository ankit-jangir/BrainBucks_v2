import ChatSockService from "../services/api/ChatSockService";
import CourseApiService from "../services/api/CourseApiService";
import HomeApiService from "../services/api/HomeApiService";
import SavedApiService from "../services/api/SavedApiService";
import basic from "../services/BasicServices";

const homeServ = new HomeApiService()
const couServ = new CourseApiService()

function finalHelper() {
    return async () => {
        let banners = await homeServ.getBanners()
        let activeQuizzes = await homeServ.getActiveQuizes(1, 10)
        let triviaQuizzes = await homeServ.getTriviaQuizes(1, 10)
        let enrolledQuizzes = await homeServ.getEnrolledQuizes(1, 10)
        let reels = await homeServ.getReels()
        let courses = await couServ.getPaidCourses()
        let exams = await homeServ.getExams()


        return {
            status:"ok",
            banners: banners.banners,
            courses: courses.data,
            reels: reels.reels,
            enrolledquizes: enrolledQuizzes.enrolled_quizes,
            triviaquizes: triviaQuizzes.triviaquizes,
            activequizes: activeQuizzes.activequizes,
            exams: exams.exams
        };
    }
}

export async function getHomeData(toast, setLoading, setData) {
    let res = await basic.apiTryCatch(
        finalHelper(),
        toast,
        () => { setLoading(true) },
        () => { setLoading(false) }
    )

    if (res) {
        setData(res)
    }
}