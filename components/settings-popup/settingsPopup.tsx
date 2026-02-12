"use client"

import { type ReactNode, useState } from 'react';
import './settingsPopup.css';

type SettingsType = {
    name: string;
    func?: () => {};
}

type SettingsPopupType = {
    items?: SettingsType[];
    titolo: string;
    type: "custom" | "standard";
    children: ReactNode;
}

export default function SettingsPopup({ items, titolo, type, children }: SettingsPopupType) {
    
    const [open, setOpen] = useState<boolean>(false);
    const handleSetOpen = () => {
        setOpen(!open);
    }

    return(
        <>  
            <button className='settings-button' onClick={handleSetOpen}>
                {children}
            </button>

            <div className={`settings-container ${type} ${open ? 'block' : 'hidden'}`}>
                <div className='settings-head'>
                    <span>{titolo}</span>
                </div>
                <hr></hr>
                <div className='settings-body'>
                    <ul>
                        {
                            items?.map((item, index) => (
                                <li key={index}>
                                    <button className='settings-item' onClick={item.func}>
                                        {item.name}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}