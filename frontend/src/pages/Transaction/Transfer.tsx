import { useState } from "react";
import "./transfer.scss";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");

  const handlePay = () => {
    //Handle payment logic
  };

  const handleRequest = () => {
    //Handle request logic
  };

  return (
    <div className="main">
      <h1 className="title">Banking App | Transfer Money</h1>
      <form className="transfer-form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
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
            placeholder="Username or phone number"
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
          <button type="button" onClick={handlePay}>
            Pay
          </button>
          <button type="button" onClick={handleRequest}>
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
