import { type ReactNode } from 'react';
import './popup.css';

/* --- --- --- --- --- --- --- */

type PopupProps = {
    titolo: string;
    state: boolean;
    func: () => void;
    children?: ReactNode;
}

/* --- --- --- --- --- --- --- */

export default function Popup({ titolo, children, state, func}: PopupProps) {
    return(
        <div className={`popup-container ${state ? 'flex' : 'hidden'}`}>
            <div className='popup'>
                <div className='popup-head'>
                    <div>
                        <h3 className='popup-title'>
                            {titolo}
                        </h3>
                    </div>
                    <div>
                        <button className='popup-button' onClick={func}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
                <div className='popup-body'>
                    {children}
                </div>
            </div>
        </div>
    );
}