"use server"

import { changeTeamName } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

export async function changeTeamNameAction(_prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    
    const nomeTeam = formData.get("new-team-name") as string;
    const idTeam = formData.get("team-id") as string;

    if(!nomeTeam || !idTeam) return { success: false, error: "Inserisci un nome del team" };

    try
    {
        const res = await changeTeamName(nomeTeam, idTeam);

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