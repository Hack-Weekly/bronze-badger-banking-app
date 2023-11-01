import "./accounts.scss";
import { useState, useEffect } from "react";
import AccountList from "../../components/AccountList/AccountList";
import { Outlet } from "react-router-dom";
import axios from "axios";
import cookie from 'react-cookie';

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTokenResponse = await axios.get("http://localhost:3000/auth/get-token", {
          withCredentials: true,
        });
        const userToken = userTokenResponse.data.token;
        const response = await axios.get("http://localhost:3000/accounts/user-accounts", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });
        setAccounts(response.data.accounts); // Update the state with the data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Outlet />
      <AccountList accounts={accounts} />
    </div>
  );
};

export default ManageAccounts;
