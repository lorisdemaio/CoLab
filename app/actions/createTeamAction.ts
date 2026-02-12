"use server"

import { creaTeam } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

export async function createAction( _prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    const nomeTeam = formData.get("team-name") as string;
    
    if(!nomeTeam) return { success: false, error: "Inserisci un nome del team" };

    try
    {
        const res = await creaTeam(nomeTeam);

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