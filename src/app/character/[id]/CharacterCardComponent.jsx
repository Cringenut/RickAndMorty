'use client';

import "../../../styles/CardPageStyle.css";
import { useRouter } from 'next/navigation';

export default function CharacterCardComponent({ character }) {
    const router = useRouter();

    return (
        <div className="card" onClick={() => router.push(`/character/${character.id}`)}>
            <div className="card-image">
                <img src={character.image} alt={character.name} />
            </div>
            <div className="card-content">
                <h1>{character.name}</h1>
                <div className="status">
                    <div className="status-indicator"></div>
                    <span>{character.species} - {character.status}</span>
                </div>
                <div className="location">
                    Last known location: <br />
                    <span>{character.location.name}</span>
                </div>
            </div>
        </div>
    );
}
