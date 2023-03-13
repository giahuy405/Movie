import React from "react";
import {
  UnorderedListOutlined,
  UserOutlined,
  ProfileOutlined,
  FileAddOutlined,
  RightOutlined,
  DesktopOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const SiderAdmin = () => {

 
  const [collapsed, setCollapsed] = useState(false);
  // eslint-disable-next-line no-unused-vars



  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const items = [
    {
      key: "img",
      label: <span style={{ color: "#fb4226" }}>TIX VN</span>,
      icon: (
        <img
          src="https://movie-booking-project.vercel.app/img/headTixLogo.png"
          alt=""
          style={{ width: 25 }}
        />
      ),
    },

    {
      key: "1",
      label:<NavLink to="/admin" >User</NavLink>,
      icon: <UserOutlined />,
      
    },
    {
      key: "sub1",
      label: "Films",
      icon: <ProfileOutlined />,
      children: [
        {
          key: 2,
          label: <NavLink to="/admin/films" >List films</NavLink>,
          icon: <UnorderedListOutlined />,
        },
        {
          key: 3,
          label: <NavLink to="/admin/films/addnew" >New films</NavLink>,
          icon: <FileAddOutlined />,
        },
      ],
    },
    {
      key: 4,
      label: <span>Showtime</span>,
      icon: <DesktopOutlined />,
    },
 
  ];
  return (
    <div style={{ height:"100%"}}>
      <div
        onClick={toggleCollapsed}
        style={{
          height: 40,
          position: "fixed",
          backgroundColor: "#002140",
          bottom: 0,
        }}
      >
        {collapsed ? (
          <RightOutlined style={{ color: "white", padding: "15px 32px" }} />
        ) : (
          <LeftOutlined style={{ color: "white", padding: "15px 70px" }} />
        )}
      </div>
      <Menu
     
        style={{position:"relative"}}
        defaultSelectedKeys={"1"}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SiderAdmin;
