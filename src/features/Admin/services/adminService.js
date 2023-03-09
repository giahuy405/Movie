import { https } from "../../../serivce/config";

export const adminService = {
   getFilms: ()=> https.get("/QuanLyPhim/LayDanhSachPhim"),
   getListUser: ()=>https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung")

};