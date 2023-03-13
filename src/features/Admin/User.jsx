import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchListUser, searchUer } from "./thunk";
import { Button, Input, Table,Tooltip} from "antd";
import { UserAddOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";

const User = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.adminReducer.user);
  useEffect(() => {
    dispatch(fetchListUser)
  }, [dispatch]);
  const  onSearch = (value)=>{
    value === ""? dispatch(fetchListUser):dispatch(searchUer(value))
  }
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      // width: 170
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      // width:200,
    },
    {
      title: "Email",
      dataIndex: "email",
      // width:230
    },
    {
      title: "Số điện Thoại",
      dataIndex: "soDT",
      // width:150
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      // width: 150

    },
    {
      title: "Loại Người dùng",
      dataIndex: "maLoaiNguoiDung",
      // width:200,
      filters:[
        {
          text:"KhachHang",
          value:"KhachHang"
        },
        {
          text:"QuanTri",
          value:"QuanTri"
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value),
    },
    {
      title: "Hành Động",
      dataIndex: "thaoTac",
    },
  ];
  return (
      <div className="m-5 p-2 bg-slate-300">
        <h2 className="m-0 text-2xl font-bold">Quản lý tài khoản</h2>
        <div className="flex justify-center items-center">
        <Button type="primary" className="my-3 bg-sky-500">
          <UserAddOutlined />
          Thêm người dùng
        </Button>
        <Input.Search placeholder="Nhập từ khóa tìm kím" 
        onSearch={onSearch}
        style={{
          marginLeft: 40
        }}
        />
        </div>
        
        <Table columns={columns} dataSource={dataSource.map((items)=>{
          return{
            key:items.taikhoan,
            taiKhoan:items.taiKhoan,
            hoTen: items.hoTen,
            email: items.email,
            soDT:items.soDT,
            matKhau:<Input.Password value={items.matKhau} style ={{width: 150}}/>,
            maLoaiNguoiDung:items.maLoaiNguoiDung ,
            thaoTac:<> <Tooltip title="Edit" color="green" key="green">
            <button className='ml-3 text-green-600 text-lg '><EditOutlined /></button>
            </Tooltip>
            <Tooltip title="Delete" color="red" key="red" >
            <button className='ml-5 text-red-600 text-lg '><DeleteOutlined /></button>
            </Tooltip>
            </>
          }
        })} />
          
      </div>
  );
};

export default User;
