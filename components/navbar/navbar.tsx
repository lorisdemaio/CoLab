import { type ReactNode } from 'react';
import Link from 'next/link';
import './navbar.css';

// components
import ProfileSettings from './profileSettings';

// lib
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

/* --- --- --- --- --- --- --- */

type NavbarLinksType = {
    label: string;
    url: string;
}

type NavbarDataType = {
    navLogo: ReactNode;
    links?: NavbarLinksType[];
    navButton?: NavbarLinksType;
}

/* --- --- --- --- --- --- --- */

export default async function Navbar({ navLogo, links, navButton }: NavbarDataType) {

   const supabase = await createSupabaseServerClient();
   const { data: { user } } = await supabase.auth.getUser();

    return(
        <nav className="navbar">
            <div className='nav-left-content'>
                <div className='nav-logo'>
                    <Link href="/">
                        {navLogo}
                    </Link>
                </div>
                <div className='nav-text'>
                    <span>CoLab</span>
                </div>
            </div>
            <div className='nav-right-content'>
                <div className='link-container'>
                    {
                        user ? 
                        (
                            <ProfileSettings id_utente={user.id}>
                                <div className='user-container'>
                                    <span>
                                        <span>{user.user_metadata?.display_name}</span>
                                        <i className="bi bi-person-fill"></i>
                                    </span>
                                </div>
                            </ProfileSettings>
                        ) :
                        (
                            <>
                                <ul>
                                    {
                                        links?.map((link, index) => (
                                            <li key={index}>
                                                <Link href={link.url} className='nav-link'>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className='button-container'>
                                    {
                                        navButton ? 
                                        (
                                            <Link href={navButton.url} className='nav-button'>
                                                {navButton.label}
                                            </Link>
                                        ) : null
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}