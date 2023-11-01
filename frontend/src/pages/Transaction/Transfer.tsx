import { useState, useEffect } from "react";
import "./transfer.scss";
import axios from "axios";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  const fetchEmails = async () => {
    try {
      if (receipt) {
        const senderID = receipt.sender;
        const receiverID = receipt.receiver;

        const senderEmailResponse = await axios.get(
          `http://localhost:3000/transfer/getEmail?userId=${senderID}`
        );
        const receiverEmailResponse = await axios.get(
          `http://localhost:3000/transfer/getEmail?userId=${receiverID}`
        );

        setSenderEmail(senderEmailResponse.data.email);
        setReceiverEmail(receiverEmailResponse.data.email);
      }
    } catch (error) {
      console.error("Error fetching email", error);
    }
  };

  const handlePay = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const requestData = {
      amount: parseFloat(amount),
      email: target,
      message,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/transfer/pay",
        requestData,
        {
          withCredentials: true,
        }
      );
      setReceipt(response.data.transaction);
      console.log(receipt);
      fetchEmails();
    } catch (error) {
      console.error("Payment failed: ", error);
    }
  };

  const handleRequest = () => {};

  return (
    <div className="main">
      <h1 className="title">Banking App | Transfer Money</h1>
      <form className="transfer-form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group to-group">
          <label htmlFor="target">
            <strong>To</strong>
          </label>
          <input
            type="text"
            id="target"
            placeholder="Email"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div className="form-group note-group">
          <textarea
            id="message"
            placeholder="Note"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => handlePay()}>
            Pay
          </button>
          <button type="button" onClick={handleRequest}>
            Request
          </button>
        </div>
      </form>
      {receipt && (
        <div className="receipt">
          <h2>Transaction Receipt</h2>
          <p>Transaction ID: {receipt._id}</p>
          <p>Type: {receipt.type}</p>
          <p>Amount: {receipt.amount}</p>
          <p>Sender: {senderEmail}</p>
          <p>Receiver: {receiverEmail}</p>
        </div>
      )}
    </div>
  );
};

export default Transfer;
