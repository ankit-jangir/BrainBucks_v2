import ChatSockService from "../services/api/ChatSockService";
import HomeApiService from "../services/api/HomeApiService";
import basic from "../services/BasicServices";

const homeServ = new HomeApiService()
const chatServ = new ChatSockService()

function finalHelper(){
    return async ()=>{
        let homeData = await homeServ.getHomeData()
        let reels = await homeServ.getReels()
        return {...homeData, ...reels};
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