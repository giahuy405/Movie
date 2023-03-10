import React from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,

  } from 'antd';
  import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
const NewFilms = () => {
const [imgScr, setImgSrc] = useState("");
const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues:{
        tenPhim:"",
        trailer:"",
        moTa:"",
        ngayKhoiChieu:"",
        dangChieu: false,
        sapChieu: false,
        danhGia:0,
        hinhAnh:{}

    },
    onSubmit:(value)=>{
        console.log("value",value);
    }
  })
  const handleChangeDatePicker = (value)=>{
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu",ngayKhoiChieu);
  }

  const handleChangeSwitch =(name)=>{
    return(value)=>{
        formik.setFieldValue(name,value)
    }
  }
  const handleChangeFile =(e)=>{
    let file = e.target.files[0];
    let  render = new FileReader();
    render.readAsDataURL(file);
    render.onload=(e)=>{
    setImgSrc(e.target.result)
    }
    formik.setFieldValue("hinhAnh",file)
}
  return (
    <Form
    onSubmitCapture={formik.handleSubmit}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
    style={{
      width:"97%",
    }}
    className="m-4 py-4 bg-slate-400"
  >
    <Form.Item label="Form Size" name="size">
      <Radio.Group>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="Tên Phim">
      <Input name='tenPhim' onChange={formik.handleChange}/>
    </Form.Item>
    <Form.Item label="Trailer">
      <Input name='trailer' onChange={formik.handleChange}/>
    </Form.Item>
    <Form.Item label="Mô Tả">
      <Input name='moTa'onChange={formik.handleChange}/>
    </Form.Item>
    <Form.Item label="Ngày Khởi Chiếu">
      <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}/>
    </Form.Item>
    <Form.Item label="Đang Chiếu" >
      <Switch  onChange={handleChangeSwitch("dangChieu")}/>
    </Form.Item>
    <Form.Item label="Sắp Chiếu" >
      <Switch  onChange={handleChangeSwitch("sapChieu")}/>
    </Form.Item>
    <Form.Item label="Hot" >
      <Switch onChange={handleChangeSwitch("hot")} />
    </Form.Item>
     <Form.Item label="Số Sao">
      <InputNumber onChange={(value)=>{formik.setFieldValue("danhGia",value)}} min={1} max={5}/>
    </Form.Item>
    <Form.Item label="Hình Ảnh">
      <input type="file" onChange={handleChangeFile}/> <br/>
      <img width={150} height={150} src={imgScr} alt='...'/>
    </Form.Item>
    <Form.Item label="Thêm">
      <button type='submit' className='bg-sky-400 text-white p-1 '>Thêm Phim</button>
    </Form.Item>
  </Form>
  )
}

export default NewFilms