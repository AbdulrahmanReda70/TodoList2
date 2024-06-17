import './Css/normalize.css';
import './Css/App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Link, } from 'react-router-dom';
import HomePage from './Components/HomePage';
import MainLayout from './Components/MainLayout';
import Doc from './Components/Doc';
import Products from './Components/Products';
import Login from './Components/Login';
import { loader as productsLoader } from './Components/Products';
import SignUp from './Components/Login/SignUp';
import Confirm from './Components/Login/Confirm';
// Applying code splitting
// import Todo from './Components/products/todo/Todo';
// import CardTodo from './Components/products/cardTodo/CardTodo';
// import MindMap from './Components/products/mindMap/MindMap';
// import Calender from './Components/products/calender/Calender';
//
import ProtectedRoutes from './Components/ProtectedRoutes';
import Pricing from './Components/Pricing';
import { Suspense, lazy, useContext } from 'react';
import { UserInfo } from './context/UserContext';
import { todoListLoader } from './Components/products/todo/todoListLoader.js';
import { cardLoader } from './Components/products/cardTodo/cardLoader.js';
import { mindMapLoader } from './Components/products/mindMap/mindMapLoader.js';
import { calenderLoader } from './Components/products/calender/calenderLoader.js';
import List from './Components/products/todo/List.js';
import ErrorPage from './HandleError.js';
const Todo = lazy(() => import('./Components/products/todo/Todo.js'));
const CardTodo = lazy(() => import('./Components/products/cardTodo/CardTodo.js'));
const MindMap = lazy(() => import('./Components/products/mindMap/MindMap.js'));
const Calender = lazy(() => import('./Components/products/calender/Calender.js'));

const PROJECT_ROLES = {
  'FREE_SUBSCRIBER': 1, // & users don't have role key
  'PRO_SUBSCRIBER': 2,
  'PREMIUM_SUBSCRIBER': 3
};




function App() {
  const userInfo = useContext(UserInfo);
  const user_role = userInfo?.user_metadata.role;

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        {/* protect routes using loaders */}
        <Route path="products" element={<Products />} loader={productsLoader} />

        {/*  */}
        {/* protect routes using Outlet */}
        <Route element={<ProtectedRoutes allowedRoles={PROJECT_ROLES.FREE_SUBSCRIBER} />} >
          <Route path="productsV2" element={<Products />} />
          <Route path="productsV2/todo" element={<Todo />} />
        </Route>
        {/* PRO */}
        <Route element={<ProtectedRoutes user_role={user_role} allowedRoles={PROJECT_ROLES.PRO_SUBSCRIBER} />} >
          <Route path="productsV2/cardTodo" lazy={() => import('./Components/products/cardTodo/CardTodo.js')} />
        </Route>
        {/*  */}
        <Route element={<ProtectedRoutes user_role={user_role} allowedRoles={PROJECT_ROLES.PREMIUM_SUBSCRIBER} />} >
          <Route path="productsV2/mindMap" element={<MindMap />} />
          <Route path="productsV2/calender" lazy={() => import('./Components/products/calender/Calender.js')} />
        </Route>
        {/*  */}
        <Route path="docs" element={<Doc />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="confirm" element={<Confirm />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      {/* Todo list App */}
      <Route path="products/todo" element={<Suspense fallback={<h1 className='loading'>Loading...</h1>}><Todo /></Suspense>} errorElement={<ErrorPage />} loader={todoListLoader} >
        <Route path=':listId' element={<List />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      {/*  */}
      <Route path="products/cardTodo" element={<Suspense fallback={<h1 className='loading'>Loading...</h1>}><CardTodo /></Suspense>} loader={cardLoader} />
      <Route path="products/mindMap" element={<Suspense fallback={<h1 className='loading'>Loading...</h1>}><MindMap /></Suspense>} loader={mindMapLoader} />
      <Route path="products/calender" element={<Suspense fallback={<h1 className='loading'>Loading...</h1>}><Calender /></Suspense>} loader={calenderLoader} />
    </>
  ));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
