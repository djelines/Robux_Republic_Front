import React, { useEffect, useState } from "react";
import { ExternalLink , Wallet , Plus } from "lucide-react";
import { useUser } from "@/context/UserContext.jsx";

import { getAllBankAccounts } from "@/api/bankAccount";
import { getTransactionsByIbanList } from "@/api/transaction.js";

import TransactionList from "@/components/transactions/TransactionList.jsx";
import BankCard from "@/components/Card.jsx";

import { cn } from "@/lib/utils";

const AddAccountCard = () => {
  return (
    <div className="h-64 w-full max-w-md rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 flex flex-col items-center justify-center gap-3 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 group">
      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <Plus size={24} />
      </div>
      <span className="font-bold text-sm tracking-wide">OUVRIR UN COMPTE</span>
    </div>
  );
};

function Dashboard() {
  const { user } = useUser();

  // State
  const [transactions, setTransactions] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    getAllBankAccounts(user.uid).then((data) => {
      if (data && Array.isArray(data)) {
        setBankAccounts(data);
      } else {
        setBankAccounts([]);
      }
    });
  }, [user.uid]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (bankAccounts.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const ibanList = bankAccounts.map((acc) => acc.iban);
        const data = await getTransactionsByIbanList(ibanList);
        setTransactions(data);
      } catch (error) {
        console.error("Erreur transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [bankAccounts]);
  console.log(user.uid);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-blue-600 font-bold">
          Chargement de vos finances...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans text-gray-800 overflow-x-hidden">
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Mes Comptes
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Gérez vos finances et vos transactions
            </p>
          </div>

          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95">
            {" "}
            <ExternalLink size={18} />
            Voir tous mes comptes
          </button>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bankAccounts.map((account, index) => (
              <div
                key={account.id || index}
                className="flex justify-center md:justify-start"
              >
                <BankCard
                  label="COMPTE COURANT"
                  accountName={account.name || "Compte sans nom"}
                  balance={account.balance || 0}
                  iban={account.iban}
                  icon={
                    account.name?.toLowerCase().includes("principal")
                      ? undefined
                      : Wallet
                  }
                />
              </div>
            ))}

            <div className="flex justify-center md:justify-start">
              <AddAccountCard />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Transactions Récentes
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
              Voir tout
            </button>
          </div>

          {transactions && transactions.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <TransactionList transactions={transactions} />
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
              Aucune transaction récente trouvée.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
