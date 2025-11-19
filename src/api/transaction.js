export const getTransactionByIban = async (iban) => {
  try {
    const res = await fetch(
      "http://localhost:8000/transactions/transactions/" + iban,
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      return {
        transactions: data,
        userIban: iban,
      };
    }
  } catch (e) {
    return null;
  }
};

const processAllTransactions = (apiResults) => {
  let finalTransactionList = [];

  apiResults.forEach((result) => {
    if (
      !result ||
      !result.transactions ||
      !Array.isArray(result.transactions)
    ) {
      return;
    }

    const currentIban = result.userIban;

    const processedTransactions = result.transactions.map((transaction) => {
      let type;
      let counterparty;

      if (transaction.iban_to === currentIban) {
        type = "credit";
        counterparty = transaction.account_name || transaction.iban_from;
      } else if (transaction.iban_from === currentIban) {
        type = "debit";
        counterparty = transaction.account_name || transaction.iban_to;
      } else {
        type = "unknown";
        counterparty = null;
      }

      return {
        ...transaction,
        type: type,
        user_iban: currentIban,
        display_name: counterparty,
      };
    });

    finalTransactionList = finalTransactionList.concat(processedTransactions);
  });

  finalTransactionList.sort((a, b) => b.id - a.id);

  return finalTransactionList;
};

export const getTransactionsByIbanList = async (ibanList) => {
  if (!ibanList || ibanList.length === 0) {
    return [];
  }

  const promises = ibanList.map((iban) => getTransactionByIban(iban));

  try {
    const results = await Promise.all(promises);

    const successfulResults = results.filter(Boolean);

    const allProcessedTransactions = processAllTransactions(successfulResults);

    return allProcessedTransactions;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération ou du traitement des transactions:",
      error
    );
    return [];
  }
};
