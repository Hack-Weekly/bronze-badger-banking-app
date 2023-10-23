import { useState, useEffect } from "react";
import "./TransactionHistory.scss";
import TransactionHistoryGrid from "../../components/Grid/TransactionHistoryGrid";

interface Transaction {
    id: number;
    senderAccountId: number;
    receiverAccountId: number;
    amount: number;
    timestamp: Date;
    type: string;
    voided: boolean;
}

const TransactionHistory = () => {
    // mock data
    const transactions = [
        {
            id: 1,
            senderAccountId: 123,
            receiverAccountId: 456,
            amount: 1000,
            timestamp: new Date("2022-01-01T10:00:00Z"),
            type: "transfer",
            voided: false,
        },
        {
            id: 2,
            senderAccountId: 789,
            receiverAccountId: 123,
            amount: 500,
            timestamp: new Date("2022-01-02T14:30:00Z"),
            type: "deposit",
            voided: false,
        },
        {
            id: 3,
            senderAccountId: 456,
            receiverAccountId: 789,
            amount: 200,
            timestamp: new Date("2022-01-03T09:15:00Z"),
            type: "withdrawal",
            voided: true,
        },
    ];

    // receive transactions from specific user
    // from backend
    // const [transactions, setTransactions] = useState<Transaction[]>([]);
    // useEffect(() => {
    //     const fetchTransactions = async () => {
    //         const res = await fetch("/api/transactions");
    //         const data = await res.json();
    //         setTransactions(data);
    //     };
    //     fetchTransactions();
    // }, []);

    return (
        <div className="main">
            <h1 className="title">Banking App | Transaction History</h1>
            <TransactionHistoryGrid transactions={transactions} />
        </div>
    );
};

export default TransactionHistory;
