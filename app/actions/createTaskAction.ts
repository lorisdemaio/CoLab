"use server"

import { createTask } from "@/lib/database";

// types
import type { ActionReturnType } from "@/types/types";

// utils
import { getColor } from "@/utils/getColor";

export async function createTaskAction(_prevState: ActionReturnType, formData: FormData): Promise<ActionReturnType> {
    
    const titoloTask = formData.get("titolo-task") as string;
    const descTask = formData.get("descrizione-task") as string;
    const prioritaTask = formData.get("priorita-task") as string;
    const idTeam = formData.get("team-id") as string;
    const colore = getColor(prioritaTask);

    if(!titoloTask || !descTask || !prioritaTask || !idTeam) return { success: false, error: "Inserisci un nome del team" };

    try
    {
        const res = await createTask(titoloTask, descTask, prioritaTask, colore, idTeam);

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