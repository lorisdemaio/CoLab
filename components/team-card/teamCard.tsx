import Link from "next/link";
import './teamCard.css';

type TeamCardProps = {
    title: string;
    link: string;
}

export default function TeamCard({ title, link }: TeamCardProps) {
    return(
        <div className="team-card-container">
            <div className="team-card-head">
                <i className="bi bi-people-fill"></i>
                <div>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="team-card-body">
                <Link className="team-card-btn" href={link}>
                    Select team
                </Link>
            </div>
        </div>
    );
}