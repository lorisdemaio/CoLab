import { CSSProperties, type ReactNode } from 'react';
import './section.css';

type SectionProps = {
    id?: string;
    type: "full" | "fit";
    options?: CSSProperties;
    className?: string;
    children: ReactNode;
}

export default function Section({ id, type, options, className, children }: SectionProps) {
    return(
        <section 
            id={id} 
            className={`${className} section-${type}`} 
            style={options}
        >
            {children}
        </section>
    );
}