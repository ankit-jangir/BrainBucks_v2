import BasicServices from "../BasicServices";

class HomeApiService{
    constructor(){
        this.basic = new BasicServices();
    }

    async getHomeData(){}
    async getTriviaQuizes(){}
    async getActiveQuizes(){}
    async getEnrolledQuizes(){}
    async getExams(){}
    async getDailyUpdates(){}

}

export default HomeApiService;