import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOG_OUT } from '../features/Auth/constants';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
const url ="data:image/png;base64,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"
const HeaderAdmin = () => {
const dispatch = useDispatch();
const infoUser = useSelector(state=>state.authReducer.infoUser);
const Naviagate = useNavigate()
const logOut = ()=>{
  Swal.fire({
    text: 'Bạn chắc chắn muốn đăng xuất ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EA580C',
    cancelButtonColor: 'grey',
    confirmButtonText: 'Log out'
}).then((result) => {
    if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        dispatch({
          type: LOG_OUT
      })
        Swal.fire({
            title: 'Đăng xuất thành công',
            icon: 'success',
            timer: 1500,
        })
        Naviagate("/")
    }
})
 const tess=  localStorage.getItem("userToken");
 console.log(tess);
}
  return (
      <div style={{backgroundColor:"#111827"}}  className="flex justify-end items-center h-20 " > 
       
      <Avatar size={60} src={<img src={url} alt="avatar" />} />
      <div className='flex mx-5'>
      <h2 className='text-orange-500 font-bold text-xl'>hi, </h2> 
      <button className='px-5  text-white font-bold text-xl bg-orange-500 rounded-lg' onClick={logOut}>Đăng Xuất</button>
      </div>
     
    </div>
  )
}

export default HeaderAdmin