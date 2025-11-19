

export const createTransaction = async (transaction) => {

    try {
        const res = await fetch("http://localhost:8000/transactions/transactions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                ...transaction
            })
        })

        return res.json();
    } catch (e) {
        console.error(e)
    }
}