import { adminService } from "./services/adminService";


export const fetchFilms = async (dispatch)=>{
    try{
        const res = await adminService.getFilms()
        dispatch({
            type: "GET_FILMS",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}

export const fetchListUser = async (dispatch)=>{
    try{
        const res = await adminService.getListUser();
        dispatch({
            type: "GET_LIST_USER",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}