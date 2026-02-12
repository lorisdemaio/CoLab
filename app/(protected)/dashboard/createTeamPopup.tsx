"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import '../../styles/form.css';

// components
import Popup from "@/components/popup/popup";

// types
import type { ActionReturnType } from "@/types/types";

import { createAction } from "../../actions/createTeamAction";

const initialValue: ActionReturnType = null;

export default function CreateTeamPopup() {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [state, action] = useActionState(createAction, initialValue);
    
    // popup handler
    const handlePopup = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(!state) return;
        if(!state.success) toast.error(state.error);
        if(state.success)
        {
            toast.success("Team created.");
            handlePopup();
            router.refresh()
        }
    }, [state])

    return(
        <>
            <div>
                <button className="link" onClick={handlePopup}>
                    <span className="hidden md:block">Create team</span>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>

            <Popup titolo="Create team" state={open} func={handlePopup}>
                <form action={action} className="flex flex-col gap-4">
                    <div className="form-col">
                    <label htmlFor="team-name">
                        Team name
                    </label>    
                    <input 
                        id="team-name"
                        name="team-name"
                        type="text"
                        placeholder="team name..."
                        required
                    />
                    </div>
                    <button className="hero-secondary-button" type="submit">
                        Create
                    </button>
                </form>
            </Popup>
        </>
    );
}