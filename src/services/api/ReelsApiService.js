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

    async likeReel(id){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/add/like/to/reel?reel_id=${id}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method:'get',
            headers:headers,
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

    async getComments(reel_id){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/comments/of/reel?reel_id=${reel_id}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }
    
    async deleteComment(reel_id, comment){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/delete/comments/of/reel`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "reel_id":reel_id,
            "comment":comment
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async addComment(reel_id, comment){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/add/comments/to/reel`
        let headers = {"content-type":"application/json", "authorization":token}
        let data = JSON.stringify({
            "reel_id":reel_id,
            "comment":comment
        })
        let options = {
            method: "post",
            headers: headers,
            data:data,
            url
        }
        let response = await axios(options)
        return response.data;
    }

    async getReelById(reel_id){
        let token = await basic.getBearerToken()
        let url = `${NOTIFYMICRO}/participants/reels/get/reels/by/id?reel_id=${reel_id}`
        let headers = {"content-type":"application/json", "authorization":token}
        let options = {
            method: "get",
            headers: headers,
            url
        }
        let response = await axios(options)
        return response.data;
    }

}

export default ReelsApiService;