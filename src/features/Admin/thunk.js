
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
export const searchUer = (tuKhoa) => async (dispatch) =>{
    try{
        const res =  await adminService.searchUser(tuKhoa);
        dispatch({
            type: "GET_LIST_USER",
            payload: res.data.content
        })
    
    }catch(err){
        console.log(err);
    }
}
export const searchFilms = (tuKhoa) => async (dispatch) =>{
    try{
        const res =  await adminService.searchFilms(tuKhoa);
        dispatch({
            type: "GET_FILMS",
            payload: res.data.content
        })
    
    }catch(err){
        console.log(err);
    }
}
export const addNewFilms = async (data)=>{
    try{
        const res = await adminService.addNewFilms(data);
        alert('thêm thành công');
        console.log(res.data.content);
    }catch(err){
        console.log(err);
    }
}
export const infoFilms = (id)=>  async (dispatch) =>{
    try{
        const res = await adminService.infoFilms(id);
        dispatch({
            type: "INFO_FILMS",
            payload: res.data.content
        })
    }catch(err){
        console.log(err);
    }
}
export const uploadFilms = async  (formData) =>{
    try{
    const res = await adminService.updateFilms(formData);
    alert("cập nhập thành công")
    }catch(err){
        console.log(err);
    }
}
export const deleteFimls =  (maPhim) =>async (dispatch) =>{
    try{
    const res = await adminService.deleteFilms(maPhim);
    alert("Xóa Thành Công")
    dispatch(fetchFilms)
    }catch(err){
        console.log(err);
    }
}
export const fetchCumRap =  async (dispatch) =>{
    try{
    const res = await adminService.getInfoTheaterSystem();
    dispatch({
        type:"LIST_RAP",
        payload: res.data.content
    })

    }catch(err){
        console.log(err);
    }
}