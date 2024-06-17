import axios from 'axios';
import { NOTIFYMICRO, QUIZMICRO } from '../../config/urls';
import basic from '../BasicServices'

class ReelsApiService{

    async getTags(){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/tags`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }
    
    async getAlotedTags(){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/aloted/tag`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }
    async getReels(tag_id, page){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/reels/of/tag?tag_id=${tag_id}&page=${page}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getRandomReels(tags, seen){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/random/reels`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({tags:tags, seen_reels:seen})
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }
    
    async addTag(tag_id){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/add/tag`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({"tag_id":tag_id})
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

}

export default ReelsApiService;