import React, { useState,useEffect } from 'react';

const BtnDarkMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    );
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-schema: dark)")
    const option = [
        {
            icon: "sunny-outline",
            text: "light"
        },
        {
            icon: "moon-outline",
            text: "dark"
        },
        // {
        //     icon: "settings-outline",
        //     text: "system"
        // }
    ]
    function onWindowMath() {
        if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add('dark')
        } else {
            element.classList.remove('dark')
        }
    }
    onWindowMath();

    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case "light":
                element.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMath();
                break
        }
    }, [theme]);

    darkQuery.addEventListener('change', e => {
        if(!(theme in localStorage)){
            if(e.matches){
                element.classList.add('dark')
            }else{
                element.classList.remove('dark')
            }
        }
    })
    return (
        <div className="fixed bottom-14 left-2 flex flex-col">
            {
                option?.map(item =>
                    <button
                        onClick={() => {
                            setTheme(item.text)
                        }}
                        key={item.text}
                        className={`bg-black text-white rounded border border-white duration-300 mt-3
                    w-9 h-9 text-2xl leading-10 mx-1 opacity-25 ${theme === item.text && 'bg-gray-500 text-black opacity-100'}`}
                    >
                        <ion-icon name={item.icon}></ion-icon>
                    </button>
                )
            }
        </div>
    );
};

export default BtnDarkMode;