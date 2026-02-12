"use client"

import { useContext, createContext, useState, useEffect, type ReactNode } from "react";

// lib
import { supabase } from "@/lib/supabaseClient"; 

// types
import type { UserData } from "@/types/types";

type UserContextType = {
  userData: UserData | undefined;
  loading: boolean | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserDataProvider({ init, children }: { init: UserData | undefined; children: ReactNode }) {
    
    const [userData, setUserData] = useState<UserData | undefined>(init);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if(session?.user)
            {
                setUserData({
                    id: session.user.id,
                    email: session.user.email,
                    username: session.user.user_metadata?.display_name
                });

                setLoading(false);
            }
            else
            {   
                setUserData(undefined);
                setLoading(false);
            }
        }

        const { data: { subscription } } = 
         supabase.auth.onAuthStateChange((_event, session) => {
            setUserData(
                session?.user 
                ? {
                    id: session.user.id,
                    email: session.user.email,
                    username: session.user.user_metadata?.display_name
                }
                : undefined
            );
        }); 

        loadSession();

        return () => subscription.unsubscribe();
    }, []);
    
    return(
        <UserContext.Provider value={{ userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserData = (): UserContextType => {
   const ctx = useContext(UserContext);

   if(!ctx)
   {
     throw new Error("useUserData must be used within UserDataProvider");
   }

   return ctx;
}