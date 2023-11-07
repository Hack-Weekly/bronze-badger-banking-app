import { useState, useEffect } from "react";
import "./TransactionHistory.scss";
import TransactionHistoryGrid from "../../components/Grid/TransactionHistoryGrid";
import axios from "axios";

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
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userTokenResponse = await axios.get(
                    "http://localhost:3000/auth/get-token",
                    {
                      withCredentials: true,
                    }
                  );
                  const userToken = userTokenResponse.data.token;
                const response = await axios.get("http://localhost:3000/transactions/transaction-history",{
                    headers:{
                        Authorization: `Bearer ${userToken}`,
                    },
                    withCredentials: true,
                });
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

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
