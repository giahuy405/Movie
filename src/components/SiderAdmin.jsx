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
import { useNavigate } from "react-router-dom";

const SiderAdmin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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
      label: (
        <span
          onClick={() => {
            navigate("/admin");
          }}
        >
          User
        </span>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "sub1",
      label: "Films",
      icon: <ProfileOutlined />,
      children: [
        {
          key: "2",
          label: <span>List films</span>,
          icon: <UnorderedListOutlined />,
        },
        {
          key: "3",
          label: <span>New films</span>,
          icon: <FileAddOutlined />,
        },
      ],
    },
    {
      key: "4",
      label: <span>Showtime</span>,
      icon: <DesktopOutlined />,
    },
 
  ];
  return (
    <div style={{ height: "100%" }}>
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
        defaultSelectedKeys={["1"]}
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
