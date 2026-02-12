import { type ReactNode } from "react";
import './pillow.css';

type PillowProps = {
    icon: ReactNode;
    testo: string;
}

export default function Pillow({ icon, testo }: PillowProps) {
    return(
        <div className="pillow">
            <div className="pillow-icon">
                {icon}
            </div>
            <div className="pillow-body">
                <p>
                    {testo}
                </p>
            </div>
        </div>
    );
}