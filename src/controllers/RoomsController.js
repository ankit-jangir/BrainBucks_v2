import BasicServices from "../services/BasicServices";
import RoomsApiService from "../services/api/RoomsApiService";

const roomServ = new RoomsApiService();

export async function createRoomInController(room_type, room_name, setErrorMessage, setLoading) {

    if (room_name.length === 0) {
        setErrorMessage("Enter name to create room")
        return;
    }

    setErrorMessage(null)

    let toast = {
        show(errorObj) {
            setErrorMessage(errorObj.text1)
        }
    }

    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.createRoom(room_name, room_type);
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )

    return res;
}

export async function joinPublicRoomInController(room_id, toast) {

    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.joinPublicRoom(room_id);
        },
        toast,
    )
    return res;
}

export async function joinPrivateRoomInController(room_hash, toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.joinPublicRoom(room_hash);
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )
    return res;
}

export async function withdrawJoinRequestInController(room_id, toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.withdrawJoinRequest(room_id);
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )
    return res;
}

export async function rejectJoinRequestInController(room_id, user_id, toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.rejectJoinRequest(room_id, user_id);
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )
    return res;
}

export async function acceptJoinRequestInController(room_id, user_id, toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async () => {
            return await roomServ.acceptJoinRequest(room_id, user_id);
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )
    return res;
}

export async function exitRoomInController(room_id,toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async()=>{
            return await roomServ.exitRoom(room_id)
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}   
    )

    return res;

}

export async function deleteRoomInController(room_id, toast, setLoading){
    let res = BasicServices.apiTryCatch(
        async()=>{
            return await roomServ.deleteRoom(room_id)
        },
        toast,
        ()=>{setLoading(true)},
        ()=>{setLoading(false)}
    )

    return res;
}

