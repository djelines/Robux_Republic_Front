import React from 'react'
import { fetchBeneficiaries, createBeneficiary, deleteBeneficiary } from '@/api/beneficiary.js'
import { useState } from 'react'
import { useEffect } from 'react'

function Beneficiary() {

    // États pour gérer les bénéficiaires, le formulaire, le chargement et les erreurs
    const [beneficiaries, setBeneficiaries] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [name, setName] = useState("")
    const [iban, setIban] = useState("")


    // Récupérer les bénéficiaires au chargement du composant
    useEffect(() => {
        fetchBeneficiaries()
            .then(data => {
                setBeneficiaries(data)
                setLoading(false)
                setError(null)
            })
            .catch(err => {
                console.error("Erreur fetch:", err)
                setError(err.message)
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }, [])



    // Gérer la soumission du formulaire pour ajouter un bénéficiaire
    const handleSubmit = async () => {
        try {
            const newBeneficiary = await createBeneficiary(name, iban)
            setBeneficiaries(prev => [...prev, newBeneficiary])
            setShowForm(false)
            setName("")
            setIban("")
            setError(null) 
        } catch (err) {
            // affiche les erreurs renvoyées par le backend
            console.error("Erreur lors de l’ajout du bénéficiaire:", err)
            setError(err.message)
        }
    }


    return (
        <div className="p-4">
            
            <h1 className="text-2xl font-bold mb-4">Liste des Bénéficiaires</h1>

            {loading && <p>Chargement…</p>}

            <button onClick={() => setShowForm(true)} className='bg-indigo-200 px-4 py-2 rounded'>Ajouter un beneficiaire</button>

            {showForm && (
                <div className="mb-4 p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Ajouter un Bénéficiaire</h2>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="IBAN"
                        value={iban}
                        onChange={e => setIban(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    />

                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>

                    {error && (
                        <p className="text-red-500 mb-2">
                            {error}
                        </p>
                    )}

                </div>
            )}

            <ul className="space-y-2">
                {beneficiaries.length === 0 && (

                    <p>Aucun bénéficiaire trouvé.</p>

                )}

                {Array.isArray(beneficiaries) && beneficiaries.map((b) => (
                    <li key={b.id} className="p-4 border rounded shadow">
                        <p><strong>Nom:</strong> {b.name}</p>
                        <p><strong>Relation:</strong> {b.iban_to}</p>
                        <p><strong>Date d'ajout:</strong> {b.creation_date.slice(8,10)}/{b.creation_date.slice(5,7)}/{b.creation_date.slice(0,4)}</p>
                        <button onClick={() => {
                            deleteBeneficiary(b.iban_to).then(() => {
                                setBeneficiaries(prev => prev.filter(ben => ben.iban_to !== b.iban_to))
                            }).catch(err => {
                                console.error("Erreur lors de la suppression :", err)
                                setError(err.message)
                            })
                        }} className="flex mt-2 bg-red-500 text-white px-4 py-2 rounded">
                            Supprimer
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    )

}

export default Beneficiary