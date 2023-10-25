import { useState } from "react";

import Home from "./pages/Home/Home.tsx";
import Transfer from "./pages/Transaction/Transfer.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory.tsx";
import ManageAccounts from "./pages/Accounts/Accounts.tsx";

import Menu from "./components/Menu/Menu.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Navbar from "./components/Navbar/navbar.tsx";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./styles/global.scss"

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
      
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/transfer",
          element: <Transfer/>
        },
        {
          path: "/placeholder",
          element: <Transfer/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<SignUp/>
        },
        {
          path:"/transactionHistory",
          element:<TransactionHistory/>
        },
        {
          path:"/accounts",
          element:<ManageAccounts/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
