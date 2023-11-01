import "./accounts.scss";
import { useState, useEffect } from "react";
import AccountList from "../../components/AccountList/AccountList";
import { Outlet } from "react-router-dom";

const ManageAccounts = () => {
  //const [accounts, setAccounts] = useState([]);

  const accounts = [
    {
      _id: 490823,
      accountName: "Joe's savings account",
      accountType: "savings",
      balance: 4968.09,
      amount: 1000,
      owner: "653718441f0a55cf2992358b",
    },
    {
      _id: 490825,
      accountName: "Emergency fund",
      accountType: "savings",
      balance: 4968.09,
      amount: 1000,
      owner: "653718441f0a55cf2992358b",
    },
    {
      _id: 490824,
      accountName: "Checking Account",
      accountType: "checking",
      balance: 4968.09,
      amount: 1000,
      owner: "653718441f0a55cf2992358b",
    },
  ];

  return (
    <div>
      <Outlet />
      <AccountList accounts={accounts} />
    </div>
  );
};

export default ManageAccounts;
