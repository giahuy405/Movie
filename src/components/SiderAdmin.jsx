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
      key: "1",
      label: <NavLink to="/admin" >User</NavLink>,
      icon: <UserOutlined />,
    },
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
  ];
  return (
    <div
      className="bg-white dark:bg-[#393E46]  border-r border-gray-300 dark:border-gray-900"
      style={{ height: "100%" }}>
      <div
        className="bg-white dark:bg-[#393E46] text-black"
        onClick={toggleCollapsed}
        style={{
          height: 40,
          position: "fixed",
          bottom: 0,
        }}
      >
        {collapsed ? (
          <RightOutlined style={{ padding: "15px 32px" }} className='dark:text-white' />
        ) : (
          <LeftOutlined style={{ padding: "15px 59px" }} className='dark:text-white' />
        )}
      </div>
      <div>
        <NavLink to='/'><img className="w-14 mx-auto py-6" src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="" /></NavLink>
        <Menu

          style={{ position: "relative" }}
          defaultSelectedKeys={"1"}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </div>
  );
};

export default SiderAdmin;
