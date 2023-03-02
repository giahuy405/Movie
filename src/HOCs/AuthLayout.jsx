import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
const AuthLayout = (props) => {
    const { t, i18n } = useTranslation();
    const handleChange = (value = "vi") => {
        i18n.changeLanguage(value)
    };
    return (
        <div>
            {props.children}
            <div className='md:fixed z-50 md:top-1 md:right-4  md:bottom-auto my-4 ml-2 '>
                <NavLink to='/' className='flex hover:text-orange-600 duration-300'>
                    <p className='mr-2'> {t('Quay lại trang chủ')}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </NavLink>
            </div>
            <Loading />
            <Select
                className='fixed top-1 md:right-48 right-1  md:top-4'
                defaultValue='1'
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: '1', label: 'Language' },
                    { value: 'vi', label: 'Vietnamese' },
                    { value: 'en', label: 'English' },
                    { value: 'chi', label: 'Chinese' },
                ]}
            />
        </div>
    );
};

export default AuthLayout;