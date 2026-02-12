"use client"

import { toast } from 'react-toastify';
import './task.css';

// lib
import { completeTask, deleteTask } from '@/lib/database';

// types
import type { TaskProps } from '@/types/types';

export default function Task({ id, color, priority, title, description, completed, owner }: TaskProps) {

    // complete task
    const handleCompleteTask = async (id: string) => {
      try
      {
        const res = await completeTask(id);

        if(res.success)
        {
          toast.success("Task completata.");
        }
        else
        {
          toast.error("Errore");
          console.error("Error: ", res.error);

        }
      }
      catch(err: any)
      {
        toast.error("Errore: ", err);
        console.error("Error: ", err);
      }
    }

    // delete task
    const handleDeleteTask = async (id: string) => {
      try
      {
        const res = await deleteTask(id);

        if(res.success)
        {
          toast.success("Task elimita.");
        }
        else
        {
          toast.error("Errore");
          console.error("Error: ", res.error);

        }
      }
      catch(err: any)
      {
        toast.error("Errore: ", err);
        console.error("Error: ", err);
      }
    }
    
    return(
        <div className="task-container">
            <div className="task-container-head" style={{ backgroundColor: color }}>
                <span>
                    Priority {priority}
                </span>
            </div>
            <div className="task-container-body">
                <h3 className="task-title">
                    {title}
                </h3>
                <p className="task-description">
                    {description}
                </p>
            </div>
            <div className="task-container-footer">
                {
                    !completed ? 
                    (
                        <button className="task-button" onClick={() => handleCompleteTask(id)}>
                            Complete task
                            <i className="bi bi-check-lg"></i>
                        </button>
                    ) : null
                }
                {
                    !completed && owner ?
                    (
                        <div className="task-button-container">
                            <button className="task-button-icon" onClick={() => handleDeleteTask(id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    ): null
                }
            </div>
        </div>
    );
}