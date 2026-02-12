import { type ReactNode } from 'react';
import './section.css';

type SectionContainerProps = {
    id?: string;
    justify?: string;
    items?: string;
    children: ReactNode;
}

export default function SectionContainer({ id, justify, items, children }: SectionContainerProps) {
    return(
        <div 
            id={id} 
            className={`section-container`}
            style={{
                justifyContent: justify,
                alignItems: items
            }}
        >
            {children}
        </div>
    );
}