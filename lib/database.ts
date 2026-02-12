"use server"

import { createSupabaseServerClient } from "./supabaseServerClient";
import { createSupabaseLoginClient, createSupabaseLogoutClient } from "./auth";

export async function getSupabaseAndUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

/* --- --- --- AUTH --- --- --- */

// * login
export async function accedi(email: string, passowrd: string) {
  const supabase = await createSupabaseLoginClient();
  
  const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: passowrd
  });

  if(error)
  {
      console.error("Error: ", error);
      return { success: false, error: error.message };
  }

  return { success: true }
}

// * register
export async function registrati(email: string, display_name: string, passowrd: string) {
  const { supabase } = await getSupabaseAndUser();  
  
  const { error } = await supabase.auth.signUp({
      email: email,
      password: passowrd,
      options: {
          data: {
              display_name
          }
      }
  });

  if(error)
  {
      console.error("Error: ", error);
      return { success: false, error: error.message };
  }

  return { success: true }
}

// logout
export async function logout() {
    const supabase = await createSupabaseLogoutClient();
    await supabase.auth.signOut();
}

/* --- --- --- TEAM --- --- --- */

// * Get teams
export async function getTeams() {
  const { supabase, user } = await getSupabaseAndUser();

  if(!user) return [];

  const { data, error } = await supabase
    .from('partecipazioni')
    .select(`
        teams (
        id,
        nome,
        created_by
        )
    `)
    .eq('id_utente', user.id);

  if (error) 
  {
    console.error("Error:", error);
    return [];
  }

  return data;
}

// Get team members
export async function getTeamMembers(id_team: string | undefined) {
  const { supabase, user } = await getSupabaseAndUser();  

  if(!user) return [];

  const { data, error } = await supabase
    .from('partecipazioni')
    .select(`
        utenti(
         id,
         username
        )
    `)
    .eq('id_team', id_team);

  if(error) 
  {
    console.error("Error:", error);
    return [];
  }

  return data;
}

// * create team
export async function creaTeam(nomeTeam: string) {
  const { supabase, user } = await getSupabaseAndUser();  
  
  if(!user) return;

  const { error } = await supabase
    .from("teams")
    .insert([
        {
            nome: nomeTeam,
            created_by: user.id
        }
    ]);

  if(error)
  {
      console.error("Error: ", error.message);
      return { success: false, error: error.message };
  }

  return { success: true }
}

// * join team
export async function joinTeam(codiceInvito: string) {
  const { supabase, user } = await getSupabaseAndUser();  

  if(!user) return;


  const { error } = await supabase
    .from("partecipazioni")
    .insert([
        {
            id_utente: user.id,
            id_team: codiceInvito
        }
    ]);
  
  if(error)
  {
      console.error("Error: ", error.message);
      return { success: false, error: error.message };
  }
  else
  {
      return { success: true };
  }
}

// * leave team
export async function leaveTeam(id_team: string | null) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { data, error } = await supabase
        .from("partecipazioni")
        .delete()
        .eq('id_team', id_team)
        .eq('id_utente', user.id);
    
    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

// * change team name
export async function changeTeamName(nuovoNome: string, id_team: string | null) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("teams")
        .update({ "nome": nuovoNome })
        .eq("id", id_team);

    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

// * delete team
export async function deleteTeam(id_team: string | null) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("teams")
        .delete()
        .eq("created_by", user.id)
        .eq("id", id_team);
    
    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

/* --- --- --- TASK --- --- --- */

// * Get task
export async function getTasks(id_team: string | undefined) {
  const { supabase, user } = await getSupabaseAndUser();  

  if(!user) return [];

  const { data, error } = await supabase
    .from('tasks')
    .select(`
        id,
        titolo,
        descrizione,
        priorita,
        colore,
        completata,
        id_utente,
        created_at
    `)
    .eq('id_team', id_team);

  if(error) 
  {
    console.error("Error:", error);
    return [];
  }

  return data;
}

// * Create task
export async function createTask(
    titolo: string, 
    descrizione: string, 
    priorita: string, 
    colore: string | undefined, 
    id_team: string
) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("tasks")
        .insert([
            {
                titolo: titolo,
                descrizione: descrizione,
                priorita: priorita,
                completata: false,
                colore: colore,
                id_utente: user.id,
                id_team: id_team
            }
        ]);
    
    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true }
}

// * Complete task
export async function completeTask(id_task: string) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("tasks")
        .update({ "completata": true })
        .eq("id", id_task);

    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

// * Delete task
export async function deleteTask(id_task: string) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id_task)
        .eq("id_utente", user.id);

    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

// * Delete all completed task
export async function deleteCompletedTask(id_team: string | null) {
    const { supabase, user } = await getSupabaseAndUser();  

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("completata", true)
        .eq("id_team", id_team);

    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}

/* --- --- --- ACCOUNT --- --- --- */

// Delete account
export async function deleteAccount() {
    const { supabase, user } = await getSupabaseAndUser();

    if(!user) return { success: false, error: "Utente non loggato." };

    const { error } = await supabase
        .from("utenti")
        .delete()
        .eq("id", user.id);

    if(error)
    {
        console.error("Error: ", error.message);
        return { success: false, error: error.message };
    }
    else
    {
        return { success: true };
    }
}