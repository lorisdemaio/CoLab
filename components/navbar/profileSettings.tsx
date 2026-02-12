"use client"

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// components
import SettingsPopup from "@/components/settings-popup/settingsPopup";

// lib
import { supabase } from "@/lib/adminClient";
import { logout, deleteAccount } from "@/lib/database";

export default function ProfileSettings({ children, id_utente }: { children: ReactNode; id_utente: string }) {

  const router = useRouter();

  // logout
  const handleLogout = async () => {
      try
      {
        await logout();
        router.push("/login");
        router.refresh();
      }
      catch(err: any)
      {
        console.error(err);
      }
  }

  // delete account
  const handleDeleteAccount = async () => {
     try
     {
       const { error } = await supabase.auth.admin.deleteUser(id_utente);
       
       if(!error?.message)
       {
         let scelta = confirm("The account will be deleted, are you sure?")
         if(scelta)
         {
            toast.success("Account deleted.");
            handleLogout();
         }
       }
       else
       {
         toast.error("Error: Before deleting your account, log out or delete all teams.");
         console.error("Error :", error.message);
       }
     }
     catch(err: any)
     {
       console.error(err);
     }
  }

  return(
    <SettingsPopup 
      titolo="Account settings"
      type="custom"
      items={[
        { name: "Logout", func: () => handleLogout() },
        { name: 'Delete account', func: () => handleDeleteAccount() }
      ]}
    >
        {children}
    </SettingsPopup>
  );
}