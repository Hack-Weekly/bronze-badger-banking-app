import React, { useState } from "react";
import "./grid.scss";

interface TransactionHistoryGridProps {
    transactions: Transaction[];
}

interface Transaction {
    id: number;
    senderAccountId: number;
    receiverAccountId: number;
    amount: number;
    timestamp: Date;
    type: string;
    voided: boolean;
}

const TransactionHistoryGrid: React.FC<TransactionHistoryGridProps> = ({ transactions }) => {
    const [sortColumn, setSortColumn] = useState<keyof Transaction>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedTransactions = transactions.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (columnA < columnB) {
            return sortDirection === "asc" ? -1 : 1;
        } else if (columnA > columnB) {
            return sortDirection === "asc" ? 1 : -1;
        } else {
            return 0;
        }
    });

    return (
        <div className="transaction-grid">
            <div className="transaction-grid-header">
                <div className="transaction-grid-cell">
                    <button className="transaction-grid-btn" type="button" onClick={() => handleSort("id")}>
                        Transaction ID
                        {sortColumn === "id" && (sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button
                        className="transaction-grid-btn"
                        type="button"
                        onClick={() => handleSort("senderAccountId")}
                    >
                        Sender Account ID
                        {sortColumn === "senderAccountId" && (
                            sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button
                        className="transaction-grid-btn"
                        type="button"
                        onClick={() => handleSort("receiverAccountId")}
                    >
                        Receiver Account ID 
                        {sortColumn === "receiverAccountId" && (
                            sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button className="transaction-grid-btn" type="button" onClick={() => handleSort("amount")}>
                        Transaction Amount
                        {sortColumn === "amount" && (sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button className="transaction-grid-btn" type="button" onClick={() => handleSort("timestamp")}>
                        Time / Date
                        {sortColumn === "timestamp" && (
                            sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button className="transaction-grid-btn" type="button" onClick={() => handleSort("type")}>
                        Transaction Type
                        {sortColumn === "type" && (sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
                <div className="transaction-grid-cell">
                    <button className="transaction-grid-btn" type="button" onClick={() => handleSort("voided")}>
                        Voided entry
                        {sortColumn === "voided" && (
                            sortDirection === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>)}
                    </button>
                </div>
            </div>
            {sortedTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-grid-row" style={{
                  // Change the color of the row based on whether the transaction is voided or not
                  // it's ugly for now for the sake of demonstration
                  backgroundColor : transaction.voided ? "red" : "green"
                }}>
                    <div className="transaction-grid-cell-data">{transaction.id}</div>
                    <div className="transaction-grid-cell-data">{transaction.senderAccountId}</div>
                    <div className="transaction-grid-cell-data">{transaction.receiverAccountId}</div>
                    <div className="transaction-grid-cell-data">${transaction.amount}</div>
                    <div className="transaction-grid-cell-data">{transaction.timestamp.toLocaleString()}</div>
                    <div className="transaction-grid-cell-data">{transaction.type}</div>
                    <div className="transaction-grid-cell-data">{transaction.voided ? "Yes" : "No"}</div>
                </div>
            ))}
        </div>
    );
};

export default TransactionHistoryGrid;
