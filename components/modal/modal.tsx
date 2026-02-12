"use client"

import { type ReactNode, useState } from 'react';
import './modal.css';

export default function Modal({ title, children }: { title: string; children: ReactNode }) {

    const [open, setOpen] = useState<boolean>(false);
    const handleSetOpen = () => {
        setOpen(!open);
    }
 
    return(
        <>
            <button className='modal-button' onClick={handleSetOpen}>
                <i className="bi bi-layout-sidebar"></i>
            </button>

            <div className={`modal-container ${open ? 'flex' : 'hidden'} `}>
                <div className='modal-head'>
                    <div>
                        <h3 className='modal-title'>
                            {title}
                        </h3>
                    </div>

                    <div>
                        <button className='close-icon' onClick={handleSetOpen}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>

                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </>
    );
}