import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

// lib
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) redirect("/login");

    return <>{children}</>
}