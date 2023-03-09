import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from './app/routes'
import NotFoundPage from "./components/NotFoundPage";
import { fetchProfile } from "./features/Auth/thunk";
import RouteComponent from "./HOCs/AppRoute";

 
function App() {
  const dispatch = useDispatch();
  // nếu user đã đăng nhập website trước đó thì moi cái token ra ( dưới localStorage ) để đăng nhập
  // dù user đăng nhập bất kì trang nào thì ta cũng cho user trạng thái đang đăng nhập
  // LƯU Ý CHỈ DISPATCH HÀM NÀY 1 LẦN !!! VÔ COMPONENT HOME DISPATCH 1 CÁI NỮA NÓ KO CHẠY 
  useEffect(() => {
    dispatch(fetchProfile);
  }, [])

  return (
    <BrowserRouter>

      <Routes>
        {routes.map(({ path, component: Component, isPrivate , isAuth, redirectPath , isAdmin, }) =>
          <Route key={path} path={path} element={<RouteComponent isPrivate={isPrivate} isAuth={isAuth} isAdmin ={isAdmin} Component={Component} redirectPath={redirectPath}  />}/>
        )}
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
