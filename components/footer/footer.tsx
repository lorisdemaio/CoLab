import Link from "next/link";
import './footer.css';

type FooterLinkType = {
    label: string;
    url: string;
    target: boolean;
}

type FooterType = {
    links: FooterLinkType[];
}

export default function Footer({ links }: FooterType) {
    return(
        <div className="footer">
            <div className="footer-body">
                <ul>
                    {
                        links?.map((link, index) => (
                            <li key={index}>
                                <Link href={link.url} target={link.target ? '_blank' : ''} className="footer-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="footer-head">
                <span>
                    CoLab
                </span>

                <span>
                    &copy; 2026
                </span>
            </div>
        </div>
    );
}