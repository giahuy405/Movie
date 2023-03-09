import { https } from "../../../serivce/config";

export const adminService = {
   getFilms: ()=> https.get("/QuanLyPhim/LayDanhSachPhim"),
   getListUser: ()=>https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung"),
   searchUser: (tuKhoa)=>https.get("/QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
         tuKhoa:tuKhoa
      }
   }),
   searchFilms: (tuKhoa)=>https.get("/QuanLyPhim/LayDanhSachPhim",{
      params:{
         tenPhim:tuKhoa
      }
   }),

};