import "./accountList.scss";
import { useState, useEffect } from "react";

interface AccountListProps {
  accounts: Account[];
}

interface Account {
  _id: number;
  accountName: String;
  accountType: String;
  balance: number;
  amount: number;
  owner: String;
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {

  const handleCreateAccount = async () => {
    //backend logic
    //redirect to a create account page with form & instructions
    console.log("account create clicked");
  };

  const handleRowClick = () => {
    //logic to redirect to account page where actions will be instructed/prompted
    console.log("account clicked"); 
  };

  return (
    <div className="manage-accounts">
      <h1>Banking App</h1>
      <h2>My Accounts</h2>
      <section className="account-list">
        <table>
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id} onClick={handleRowClick}>
                <td>{account.accountName}</td>
                <td>
                  <span className="balance">${account.balance}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button className="create-button" onClick={handleCreateAccount}>
        + CREATE NEW ACCOUNT
      </button>
    </div>
  );
};
export default AccountList;
