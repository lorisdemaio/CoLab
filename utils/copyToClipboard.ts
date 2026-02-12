// types
import type { ActionReturnType } from "@/types/types";

export async function CopyToClipboard(txt: string | null | undefined): Promise<ActionReturnType> {
    if(!txt) return { success: false, error: "Inserici un testo da copiare." };

    try
    {
        await navigator.clipboard.writeText(txt);
        return { success: true };
    }
    catch(err: any)
    {
        console.error("Errore: ", err);
        return { success: false, error: err };
    }
}