"use server"

import { joinTeam } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

export async function joinAction( _prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    const codiceInvito = formData.get("invite") as string;
    
    if(!codiceInvito) return { success: false, error: "Codice invito mancante" }

    try
    {
        const res = await joinTeam(codiceInvito);

        if(!res?.success)
        {
            return { success: false, error: res?.error }
        }
    }
    catch(err: any)
    {
        console.error("Errore: ", err);
        return { success: false, error: err || "Errore sconosciuto" }
    }

    return { success: true }
}   