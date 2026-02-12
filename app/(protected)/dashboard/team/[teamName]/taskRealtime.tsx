"use client"

import { useEffect } from "react";

// lib
import { supabase } from "@/lib/supabaseClient";

// types
import type { TaskProps } from '@/types/types';

type TaskRealtimeProps = {
    teamId: string | undefined;
    onInsert: (task: TaskProps) => void
    onUpdate: (task: TaskProps) => void
    onDelete: (taskId: string) => void
}

export function TaskRealtime({ teamId, onInsert, onUpdate, onDelete }: TaskRealtimeProps) {
    useEffect(() => {
        const channel = supabase
            .channel(`tasks-team-${teamId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tasks'
                },
                (payload) => {
                    switch (payload.eventType) 
                    {
                        case 'INSERT':
                            onInsert(payload.new as TaskProps)
                        break
                        case 'UPDATE':
                            onUpdate(payload.new as TaskProps)
                        break
                        case 'DELETE':
                            onDelete(payload.old.id)
                        break
                    }
                }
            )
            .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }

    }, [teamId]);

    return null;
}