import React, { useState } from "react";
import "./createAccount.scss";
import axios from "axios";

const CreateAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("savings");
  const [transactionLimit, setTransactionLimit] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAccountCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = {
        accountName: accountName,
        accountType: accountType,
        transactionLimit: parseInt(transactionLimit, 10) || 0,
      };
      console.log(formData);

      const response = await axios.post(
        "http://localhost:3000/accounts/create-account",
        formData
      );
      if (response.status === 200) {
        setSuccessMessage(`${accountName} created successfully!`);
      } else {
        setSuccessMessage("");
      }
      console.log(response);
    } catch (error) {
      console.log("Create account failed:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="create-account">
      <h1>Create an Account</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleAccountCreation}>
        <label>
          Account Name:
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </label>
        <label>
          Account Type:
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>
        </label>
        <label>
          Transaction Limit:
          <input
            type="number"
            value={transactionLimit}
            onChange={(e) => setTransactionLimit(e.target.value)}
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;