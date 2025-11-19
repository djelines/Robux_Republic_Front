import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/animate-ui/components/radix/dropdown-menu.jsx";
import {Plus} from "lucide-react";
import {Button} from "@/components/animate-ui/components/buttons/button.jsx";
import {createSearchParams, useNavigate} from "react-router-dom";

function DropdownTransactionMenu() {

    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"outline"} className={"cursor-pointer"}><Plus/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={"center"}
                side={"bottom"}
                className={"font-text"}
            >

                <DropdownMenuLabel>Les Transactions</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className={"cursor-pointer"}
                        onClick={() => {
                            navigate({
                                pathname: "/dashboard/transaction",
                                search: createSearchParams({
                                    type: "depot"
                                }).toString()
                            });
                        }}
                    >
                        Dépôt
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={"cursor-pointer"}
                        onClick={() => {
                            navigate({
                                pathname: "/dashboard/transaction",
                                search: createSearchParams({
                                    type: "virement"
                                }).toString()
                            });
                        }}
                    >
                        Virement
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropdownTransactionMenu;