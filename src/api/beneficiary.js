

export async function fetchBeneficiaries() {
    try {
        const response = await fetch('http://127.0.0.1:8000/beneficiaires/all-beneficiaries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem("access_token")}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        throw error;
    }
}