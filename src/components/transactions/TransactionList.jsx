import React from "react";
import TransactionItem from "@/components/transactions/TransactionItem.jsx";
import { useLocation } from "react-router-dom";

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        Aucune transaction enregistrée pour cette période.
      </div>
    );
  }
  if(useLocation().pathname === "/dashboard"){
    transactions = transactions.slice(0, 10);
  }
  console.log("Transactions dans TransactionList :", transactions);
  return (
    <div className="border rounded-lg overflow-hidden">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
      <div className="text-center mt-4">
        <button
          className="hover:bg-gray-200 text-blue-700 font-semibold py-2 px-4 rounded-lg 
                           transition duration-150 ease-in-out"
          onClick={() => {
          }}
        >
          Voir tout l'historique
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
