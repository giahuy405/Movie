import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../HOCs/AdminLayout'
import { fetchFilms, searchFilms } from './thunk'
import { Table, Space, Button, Input } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const ListFilms = () => {
  const dispatch = useDispatch ();
  useEffect (()=>{
    dispatch(fetchFilms)
  },[dispatch])
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
    width: "7%"
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
      <button className='bg-sky-500 hover:bg-sky-700 text-white border-double border-4 border-sky-500 my-3 px-4 ' style={{borderRadius:5, width:"12%"}}>Thêm Phim</button>
      <Input.Search className='ml-10'  placeholder="Nhập tên phim"  onSearch={onSearchFilms} />
      </div>
     
      <Table columns={columns} dataSource={listFilms?.map((items)=>{
        return{
            key:items.maPhim,
            maPhim:items.maPhim,
            tenPhim:items.tenPhim,
            hinhAnh: <img src={items.hinhAnh} alt="mo ta hinh anh"/>,
            taiKhoan: items.taiKhoan,
            moTa:items.moTa,
        }
      })}/>
      </div>
  
  )
}

export default ListFilms