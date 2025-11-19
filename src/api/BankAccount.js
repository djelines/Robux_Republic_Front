export const createBankAccount = async  (
    account
) => {
    try {
        const res = await fetch("http://localhost:8000/bank_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
            body: JSON.stringify(account)
        })
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}