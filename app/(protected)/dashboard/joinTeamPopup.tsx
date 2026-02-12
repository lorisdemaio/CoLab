"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import '../../styles/form.css';

// components
import Popup from "@/components/popup/popup";

// types
import type { ActionReturnType } from "@/types/types";

import { joinAction } from "../../actions/joinTeamAction";

const initialValue: ActionReturnType = null;

export default function JoinTeamPopup() {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [state, action] = useActionState(joinAction, initialValue);

    // popup handler
    const handlePopup = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(!state) return;
        if(!state.success) toast.error(state.error);
        if(state.success)
        {
            toast.success("You've joined the team.");
            handlePopup();
            router.refresh()
        }
    }, [state])

    return(
        <>
            <div>
                <button className="link" onClick={handlePopup}>
                    <span className="hidden md:block">Join a team</span>
                    <i className="bi bi-person-fill-add"></i>
                </button>
            </div>

            <Popup titolo="Join a team" state={open} func={handlePopup}>
                <form action={action} className="flex flex-col gap-4">
                    <div className="form-col">
                    <label htmlFor="invite">
                        Enter invitation code
                    </label>    
                    <input 
                        id="invite"
                        name="invite"
                        type="text"
                        placeholder="invitation code..."
                        required
                    />
                    </div>
                    <button className="hero-secondary-button" type="submit">
                        Join
                    </button>
                </form>
            </Popup>
        </>
    );
}