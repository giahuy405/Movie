import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import FooterAdmin from "../components/FooterAdmin";
import SiderAdmin from "../components/SiderAdmin";


const AdminLayout = (props) => {
  return (

  <div className="flex">
    <div style={{maxheight:"100%"}} >
    <SiderAdmin />
    </div>
    <div style={{width:"100%"}}>
    <HeaderAdmin className="mb-3" />
    {props.children}
    <FooterAdmin/>
    </div>
  </div>
        

  );
};

export default AdminLayout;
