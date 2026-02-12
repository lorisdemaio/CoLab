"use client"

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import '../../../../styles/form.css';

// components
import Popup from "@/components/popup/popup";

// types
import type { ActionReturnType } from "@/types/types";

import { changeTeamNameAction } from "../../../../actions/changeTeamNameAction";

const initialValue: ActionReturnType = null;

export default function ChangeTeamNamePopup({ id }: { id: string | undefined }) {

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [state, action] = useActionState(changeTeamNameAction, initialValue);
    
    // popup handler
    const handlePopup = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(!state) return;
        if(!state.success) toast.error(state.error);
        if(state.success)
        {
            toast.success("Updated team name.");
            handlePopup();
            router.push("/dashboard");
        }
    }, [state])

    return(
        <>
            <div>
                <button className="link" onClick={handlePopup}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
            </div>

            <Popup titolo="Change team name" state={open} func={handlePopup}>
                <form action={action} className="flex flex-col gap-4">
                    <div className="form-col">
                    <label htmlFor="new-team-name">
                        New team name
                    </label>    
                    <input 
                        id="new-team-name"
                        name="new-team-name"
                        type="text"
                        placeholder="new team name..."
                        required
                    />
                    <input 
                        id="team-id"
                        name="team-id"
                        type="hidden"
                        value={id ?? ""}
                        required
                    />
                    </div>
                    <button className="hero-secondary-button" type="submit">
                        Update
                    </button>
                </form>
            </Popup>
        </>
    );
}