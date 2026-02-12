// types

// User
export type UserData = {
  id: string
  email?: string
  username?: string
} | null;

// Team
export type Team = {
  id: string;
  nome: string;
  created_by: string;
};

// Task
export type TaskProps = {
    id: string;
    color: string;
    priority: string;
    title: string;
    description: string;
    completed: boolean;
    owner: boolean;
}

// Server action
export type ActionReturnType = 
    | { success: true }
    | { success: false; error: any; }
    | null
    