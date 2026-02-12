"use server"

import { redirect } from "next/navigation";
import { accedi } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

export async function login( _prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    const email = formData.get("email") as string;
    const passowrd = formData.get("password") as string;

    if(!email || !passowrd) return { success: false, error: "Email o password mancanti." }

    try
    {
        const res = await accedi(email, passowrd);

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
    
    redirect("/dashboard");
}   