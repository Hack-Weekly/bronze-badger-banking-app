import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./accountList.scss";

interface AccountListProps {
  accounts: Account[];
}

interface Account {
  _id: string;
  accountName: string;
  accountType: string;
  balance: number;
  transactionLimit: number;
  owner: string;
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    // Backend logic
    navigate("/accounts/createAccount");
  };

  const handleRowClick = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
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
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id} onClick={() => handleRowClick(account._id)}>
                <td>
                  <span className="account-name">{account.accountName}</span>
                </td>
                <td>
                  <span className="account-type">{account.accountType}</span>
                </td>
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
