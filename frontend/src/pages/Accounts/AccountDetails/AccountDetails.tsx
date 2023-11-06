import React, { useState, useEffect } from "react";
import "./accountDetails.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

function AccountDetails() {
  const { accountID } = useParams();
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTokenResponse = await axios.get(
          "http://localhost:3000/auth/get-token",
          {
            withCredentials: true,
          }
        );
        const userToken = userTokenResponse.data.token;
        const response = await axios.get(
          `http://localhost:3000/accounts/user-account/${accountID}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            withCredentials: true,
          }
        );
        setAccountData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accountID]);

  return (
    <div className="account-details-container">
      <h1>Account Details for Account ID: {accountID}</h1>
      {accountData ? (
        <table>
          <tbody>
            <tr>
              <td className="label">Account Name:</td>
              <td className="value">{accountData.account.accountName}</td>
            </tr>
            <tr>
              <td className="label">Balance:</td>
              <td className="value">{accountData.account.balance}</td>
            </tr>
            <tr>
              <td className="label">Account type:</td>
              <td className="value">{accountData.account.accountType}</td>
            </tr>
            <tr>
              <td className="label">Transaction Limit:</td>
              <td className="value">{accountData.account.transactionLimit}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="loading-text">Loading account details...</p>
      )}
    </div>
  );
}
export default AccountDetails;
