import React from 'react';
import {ArrowRight, Landmark, Type, User} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import {Button} from "@/components/animate-ui/components/buttons/button.jsx";

function DepotCardForm({allBankAccounts}) {

    const {handleSubmit, control} = useForm();

    return (
        <form >

            <div className={"bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row md:items-center gap-6 mb-7.5"}>
                <div className={"px-3 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-500"}>
                    <Landmark />
                </div>
                <div className={"flex flex-col gap-2 flex-1"}>
                    <label className={"block text-xs font-bold text-gray-400 uppercase tracking-wider"}>
                        Compte de destination
                    </label>
                    <Controller
                        rules={{ required: "Un compte de débit est requis"}}
                        render={({ field,fieldState }) => (
                            <>
                                <Select {...field} onValueChange={field.onChange} className={"!m-0 w-full flex-1 text-black"}>
                                    <SelectTrigger className={"w-full !text-black"}>
                                        <SelectValue placeholder={"Selectionne un compte"}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Vos comptes</SelectLabel>
                                            {allBankAccounts.map(account => (
                                                <SelectItem key={account.iban} value={account.iban}>
                                                    {account.name + " "}

                                                    •

                                                    { " " + (parseFloat(account.balance)).toFixed(2)}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {fieldState.error && (
                                    <p className="text-red-500 text-xs ml-2">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </>
                        )}
                        name={"iban_to"}
                        control={control}
                    />

                </div>
            </div>



            <div className={"bg-white p-8 rounded-3xl border-2 border-purple-50 shadow-purple-50 shadow-sm flex flex-col items-center justify-center gap-4 mt-4 mb-4"}>
                <label className={"text-xs font-bold text-gray-400 uppercase tracking-wider"}>
                    montant du virement
                </label>
                <div className={"flex items-baseline gap-2"}>

                    <Controller
                        control={control}
                        rules={{ required: "Un montant est requis", valueAsNumber: true }}
                        render={({ field, fieldState }) => (
                            <>
                                <div className={"flex flex-col gap-3 items-center justify-center"}>
                                    <input type="number"
                                           {...field}
                                           className={"text-5xl font-bold text-center text-gray-900 placeholder-gray-200 outline-none w-64 bg-transparent"}
                                           placeholder={"0.00"}
                                    />
                                    {fieldState.error && (
                                        <p className="text-red-500 text-xs ml-2">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        name={"amount"}
                    />
                    <span className={"text-xl font-medium text-gray-400"}>
                                                RBX
                                            </span>
                </div>
            </div>

            <Button type={"submit"} className={"flex gap-3 ml-auto text-lg !px-8 !py-6 !rounded-xl text-white cursor-pointer bg-blue-600 hover:bg-blue-700 transition shadow-blue-500"}>
                Envoyer les fonds <ArrowRight/>
            </Button>

        </form>
    );
}

export default DepotCardForm;