"use client"

import { useState, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import '../../../../styles/form.css';

// components
import Popup from "@/components/popup/popup";

// types
import type { ActionReturnType } from "@/types/types";

import { createTaskAction } from "@/app/actions/createTaskAction";

const initialValue: ActionReturnType = null;

export default function CreateTaskPopup({ id }: { id: string | undefined }) {

    const [open, setOpen] = useState<boolean>(false);
    const [state, action] = useActionState(createTaskAction, initialValue);
    
    // popup handler
    const handlePopup = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(!state) return;
        if(!state.success) toast.error(state.error);
        if(state.success)
        {
            toast.success("Task created.");
            handlePopup();
        }
    }, [state])

    return(
        <>
            <div>
                <button className="absolute-btn" onClick={handlePopup}>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>

            <Popup titolo="Create task" state={open} func={handlePopup}>
                <form action={action} className="flex flex-col gap-4">
                    <div className="form-col">
                        <label htmlFor="titolo-task">
                            Title
                        </label>    
                        <input 
                            id="titolo-task"
                            name="titolo-task"
                            type="text"
                            placeholder="task title..."
                            required
                        />
                    </div>
                    <div className="form-col">
                        <label htmlFor="descrizione-task">
                            Description
                        </label>    
                        <textarea 
                            id="descrizione-task"
                            name="descrizione-task"
                            placeholder="task description..."
                            required
                        />
                    </div>
                    <div className="form-col">
                        <label htmlFor="priority-task">
                            Priority
                        </label>    
                        <select id="priorita-task" name="priorita-task" required>
                            <option value="" disabled>Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <input 
                        id="team-id"
                        name="team-id"
                        type="hidden"
                        value={id ?? ""}
                        required
                    />
                    <button className="hero-secondary-button" type="submit">
                        Create task
                    </button>
                </form>
            </Popup>
        </>
    );
}