import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFimls, fetchFilms, searchFilms } from './thunk'
import { Table, Space, Button, Input, Tooltip } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditOutlined, DeleteOutlined,DesktopOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListFilms = () => {
const dispatch = useDispatch ();
const Navigate = useNavigate();
  useEffect (()=>{
    dispatch(fetchFilms)
  },[dispatch])
  const goToEditFilms = (id) =>{Navigate("/admin/films/edit/" + id)}; // đi đến trang edit films
  const goToShowTimme = (id) =>{Navigate("/admin/films/showtime/" + id)} // đi đến trang show time 
  const listFilms = useSelector(state=> state.adminReducer.films)
  const  onSearchFilms = (value)=>{
    value === ""? dispatch(fetchFilms):dispatch(searchFilms(value))
  }
 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
          className='bg-sky-500'
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [{
    title: "Mã Phim",
    dataIndex: "maPhim",
    ...getColumnSearchProps('maPhim'),
    width: 120
  },
  {
    title: "Hình Ảnh",
    dataIndex: "hinhAnh",
    width: "8%"
  },
  {
    title: "Tên Phim",
    dataIndex: "tenPhim",
    width: 240
  },
  {
    title: "Mô Tả",
    dataIndex: "moTa",
    width: 780
  },
  {
    title: "Hành Động",
    dataIndex: "thaoTac",
    width: 120
  },
]
  return (
      <div className='m-5 p-2 bg-slate-300'>
      <h2 className='text-2xl font-bold'>Quản lý phim</h2>
      <div className='flex items-center'> 
      <NavLink to="/admin/films/addnew" className='bg-sky-500 hover:bg-sky-700 text-white border-double border-4 border-sky-500 my-3 px-4'
      style={{borderRadius:5, width:"11%"}} >Thêm Phim</NavLink>
      <Input.Search className='ml-10'  placeholder="Nhập tên phim"  onSearch={onSearchFilms} />
      </div>
     
      <Table columns={columns} rowKey="maPhim" dataSource={listFilms?.map((items)=>{
        return{
            key:items.maPhim,
            maPhim:items.maPhim,
            tenPhim:items.tenPhim,
            hinhAnh: <img src={items.hinhAnh} alt="mo ta hinh anh"/>,
            taiKhoan: items.taiKhoan,
            moTa: items.moTa,
            thaoTac:<>
            <Tooltip title="Edit" color="green" key="green">
            <button className='  text-green-600 text-lg ' onClick={()=>{goToEditFilms(items.maPhim)}}><EditOutlined /></button>
            </Tooltip>
            <Tooltip title="Delete" color="red" key="red" >
            <button className='mx-3  text-red-600 text-lg ' onClick={()=>{
              Swal.fire({
                title: 'Có chắc bạn muốn xóa phim !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'xóa'
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteFimls(items.maPhim))
                  Swal.fire({
                    
                    title: 'Xóa Thành Công',
                    icon: 'success',
                    timer: 1500,
                  })
                 
                }
              })}}><DeleteOutlined /></button>
            </Tooltip>
            <Tooltip title="Showtime" color="blue" key="blue" >
            <button className=' text-sky-600 text-lg ' onClick={()=>{goToShowTimme(items.maPhim)}}><DesktopOutlined /></button>
            </Tooltip>
            </>         
        }
      })}/>
      </div>
  
  )
}

export default ListFilms