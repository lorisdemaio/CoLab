"use client"

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// components
import SettingsPopup from "@/components/settings-popup/settingsPopup";

// lib
import { deleteTeam, leaveTeam, deleteCompletedTask } from "@/lib/database";

//utils
import { CopyToClipboard } from "@/utils/copyToClipboard";

export default function Settings({ owner, id }: { owner: boolean | null; id:string | null; }) {

  const router = useRouter();

  // copy invite code
  const handleCopyInviteCode = async () => {
    try
    {
      const res = await CopyToClipboard(id);
      if(res?.success)
      { 
        toast.success("Code copied to clipboard.");
      }
      else
      {
        toast.error("Error: ", res?.error);
        console.error("Error :", res?.error);
      }
    }
    catch(err: any)
    {
      console.error(err);
    }
  }

  // leave team
  const handleLeaveTeam = async () => {
    try
    {
      const res = await leaveTeam(id);
      if(res.success)
      { 
        toast.success("You left the team.");
        router.push("/dashboard");
      }
      else
      {
        toast.error("Error");
        console.error("Error :", res.error);
      }
    }
    catch(err: any)
    {
      console.error(err);
    }
  }

  // delete team (team owner only)
  const handleDeleteTeam = async () => {
    try
    {
      const res = await deleteTeam(id);
      if(res.success)
      { 
        toast.success("Team eliminated");
        router.push("/dashboard");
      }
      else
      {
        toast.error("Error");
        console.error("Error :", res.error);
      }
    }
    catch(err: any)
    {
      console.error(err);
    }
  } 

  // delete all completed task (team owner only)
    const handleDeleteTeamTask = async () => {
    try
    {
      const res = await deleteCompletedTask(id);
      if(res.success)
      { 
        toast.success("All completed tasks have been deleted.");
      }
      else
      {
        toast.error("Error");
        console.error("Error :", res.error);
      }
    }
    catch(err: any)
    {
      console.error(err);
    }
  } 

  return(
    <SettingsPopup 
      titolo="Team settings"
      type="standard"
      items={[
        { name: "Copy invitation code", func: () => handleCopyInviteCode() },
        { name: 'Leave the team', func: () => handleLeaveTeam() },
        ...(owner ? [{ name: "Delete completed tasks", func: () => handleDeleteTeamTask() }] : []),
        ...(owner ? [{ name: "Delete team", func: () => handleDeleteTeam() }] : [])
      ]}
    >
      <i className="bi bi-gear text-xl 2xl:text-2xl font-semibold"></i>
    </SettingsPopup>
  );
}