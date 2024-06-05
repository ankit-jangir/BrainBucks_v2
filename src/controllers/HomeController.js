import ChatSockService from "../services/api/ChatSockService";
import HomeApiService from "../services/api/HomeApiService";
import basic from "../services/BasicServices";

const homeServ = new HomeApiService()
const chatServ = new ChatSockService()


function helper() {
    return async () => {
        let res = await homeServ.getHomeData()
        return res;
    }
}

export async function getHomeData(toast, setLoading, setData) {
    let res = await basic.apiTryCatch(
        helper(),
        toast,
        () => { setLoading(true) },
        () => { setLoading(false) }
    )

    if (res) {
        setData(res)
    }
}