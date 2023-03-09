import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../HOCs/AdminLayout";
import { fetchFilms, fetchListUser } from "./thunk";
import { Button, Input, Table  } from "antd";

import { UserAddOutlined} from "@ant-design/icons";

const User = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.adminReducer.user);
  useEffect(() => {
    dispatch(fetchFilms);
    dispatch(fetchListUser)
  }, [dispatch]);

  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện Thoại",
      dataIndex: "soDT",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
    },
    {
      title: "Loại Người dùng",
      dataIndex: "maLoaiNguoiDung",
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
      title: "thao tác",
      dataIndex: "thaoTac",
    },
  ];
  console.log(dataSource);
  return (
    <AdminLayout>
      <div className="m-5 p-2 bg-slate-300">
        <h2 className="m-0">Quản lý tài khoản</h2>
        <div className="flex justify-center items-center">
        <Button type="primary" className="my-3">
          <UserAddOutlined />
          Thêm người dùng
        </Button>
        <Input.Search placeholder="Nhập từ khóa tìm kím" enterButton 
        style={{
          width: 1480,
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
            matKhau:<Input.Password value={items.matKhau}/>,
            maLoaiNguoiDung:items.maLoaiNguoiDung  
          }
        })} />
        <Input/>
        
      </div>
    </AdminLayout>
  );
};

export default User;
