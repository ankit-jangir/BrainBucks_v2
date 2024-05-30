import HomeApiService from "../services/api/HomeApiService";
import basic from "../services/BasicServices";

const homeServ = new HomeApiService()

export async function getHomeData(toast, setLoading, setData) {
    let res = await basic.apiTryCatch(
    homeServ.getHomeData,
    toast, 
    ()=>{setLoading(true)}, 
    ()=>{setLoading(false)}
    )

    if(res){
        setData(res)
    }
}