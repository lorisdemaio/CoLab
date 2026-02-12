"use server"

import { redirect } from "next/navigation";
import { registrati } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

export async function register( _prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    const display_name = formData.get("username") as string;
    const email = formData.get("email") as string;
    const passowrd = formData.get("password") as string;

    if(!email || !display_name || !passowrd) return { success: false, error: "Compile tutti i campi." }

    try
    {
        const res = await registrati(email, display_name, passowrd);

        if(!res.success)
        {
            return { success: false, error: res.error };
        }
    }
    catch(err: any)
    {
        console.error("Errore: ", err);
        return { success: false, error: err || "Errore sconosciuto" }
    }

    redirect("/login");
}   