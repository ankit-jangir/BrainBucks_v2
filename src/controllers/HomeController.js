import ChatSockService from "../services/api/ChatSockService";
import CourseApiService from "../services/api/CourseApiService";
import HomeApiService from "../services/api/HomeApiService";
import basic from "../services/BasicServices";

const homeServ = new HomeApiService()
const couServ = new CourseApiService()

function finalHelper(){
    return async ()=>{
        let homeData = await homeServ.getHomeData()
        let reels = await homeServ.getReels()
        let courses = await couServ.getPaidCourses()
        return {...homeData, ...reels, courses:courses.data};
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