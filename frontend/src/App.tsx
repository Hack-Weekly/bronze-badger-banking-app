import { useState, useEffect } from "react";

import Home from "./pages/Home/Home.tsx";
import Transfer from "./pages/Transaction/Transfer.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory.tsx";
import ManageAccounts from "./pages/Accounts/Accounts.tsx";

import Menu from "./components/Menu/Menu.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Navbar from "./components/Navbar/navbar.tsx";

import { createBrowserRouter, RouterProvider, Outlet, Route, useNavigate } from "react-router-dom";

import "./styles/global.scss";
import Landing from "./pages/Landing/Landing.tsx";
import CreateAccount from "./pages/Accounts/CreateAccount/CreateAccount.tsx";

function App() {
  function Layout() {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/transfer",
          element: <Transfer />,
        },
        {
          path: "/placeholder",
          element: <Transfer />,
        },
        {
          path: "/transactionHistory",
          element: <TransactionHistory />,
        },
        {
          path: "/accounts/*",
          children: [
            {
              path: "",
              element: (
                <ManageAccounts />
              ),
            },
            {
              path: "createAccount",
              element: <CreateAccount />,
            },
          ],
        },
      ],
    },
  ]);

  function MainApp() {
    const navigate = useNavigate();

    const goToRouter = () => {
      navigate("/app");
    };

    return (
      <div>
        <Landing />
        <button onClick={goToRouter}>Go to App</button>
      </div>
    );
  }

  return (
    <RouterProvider router={router}>
      <MainApp />
    </RouterProvider>
  );
}

export default App;
