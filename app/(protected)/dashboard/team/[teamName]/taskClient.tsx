"use client"

import { useState } from "react";
import { TaskRealtime } from "./taskRealtime";

// components
import Task from "@/components/task/task";

type TaskClientProps = {
    userId: string | undefined;
    teamId: string | undefined;
    initialTask: any[];
}

export default function TaskClient({ userId, teamId, initialTask } : TaskClientProps) {
    const [tasks, setTasks] = useState(initialTask);

    const activeTasks = tasks.filter(t => !t.completata);
    const completedTasks = tasks.filter(t => t.completata);

    return(
        <>
            <TaskRealtime
                teamId={teamId}
                onInsert={(task) => {
                    setTasks(prev => [task, ...prev])
                }}
                onUpdate={(updated) => {
                    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
                }}
                onDelete={(id) => {
                    setTasks(prev => prev.filter(t => t.id !== id))
                }}
            />

            {/* ACTIVE TASKS */}
            <div id="active-task">
              <h2 className="subtitle">
                Active tasks
              </h2>
              <div className="grid-layout-3">
                {
                  activeTasks.length > 0 ?
                  (
                    activeTasks.map((task) => (
                      <Task
                        key={task.id}
                        id={task.id}
                        title={task.titolo}
                        description={task.descrizione}
                        priority={task.priorita}
                        color={task.colore}
                        completed={task.completata}
                        owner={task.id_utente === userId ? true : false}
                      />
                    ))
                  ) : 
                  (
                    <p className="description">
                      You have no tasks to complete.
                    </p>
                  )
                }
              </div>
            </div>
                      
            {/* COMPLETED TASKS */}
            <div id="completed-task" style={{ marginTop: "4rem" }}>
              <h2 className="subtitle">
                Completed tasks
              </h2>
              <div className="grid-layout-3">
                {
                  completedTasks.length > 0 ?
                  (
                    completedTasks.map((task) => (
                      <Task
                        key={task.id}
                        id={task.id}
                        title={task.titolo}
                        description={task.descrizione}
                        priority={task.priorita}
                        color={task.colore}
                        completed={task.completata}
                        owner={task.id_utente === userId ? true : false}
                      />
                    ))
                  ) : 
                  (
                    <p className="description">
                      You have no completed tasks.
                    </p>
                  )
                }
              </div>
            </div>
        </>
    );
}