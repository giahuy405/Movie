import React, { useEffect, useState } from 'react'
import { Avatar, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LOG_OUT } from '../features/Auth/constants';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {RollbackOutlined} from '@ant-design/icons'

const url = "https://edu.cfd-engineer.com/static/assets/img/single.png"

const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector(state => state.authReducer);
  const Naviagate = useNavigate()
  const logOut = () => {
    Swal.fire({
      text: 'Bạn chắc chắn muốn đăng xuất ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EA580C',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy'
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
  }
  return (
    <div className="flex justify-end items-center pr-3 py-2 border-gray-200 border-b shadow-2xl dark:bg-[#393E46] dark:border-gray-800" >
      <NavLink to='/'
        className=' dark:text-white hover:text-orange-500 dark:hover:text-orange-500 flex items-center mr-auto ml-3 text-sm'
      ><p>Quay lại trang chủ</p>
        <RollbackOutlined className='ml-1' />
      </NavLink>
      <img src={url} width={40} alt="avatar" />
      <div className='flex ml-2 items-center'>
        {infoUser ? <h2 className='text-orange-500 font-bold  mr-4'>Hi, {infoUser.hoTen} </h2> : <Spin size="large" className='mr-4' />}
        <button className='px-5 py-1.5 text-white font-bold  bg-orange-500 rounded hover:bg-orange-600' onClick={logOut}>Đăng Xuất</button>
      </div>
    </div>
  )
}

export default HeaderAdmin