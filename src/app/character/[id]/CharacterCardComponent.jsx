import "../../../styles/CardPageStyle.css"

export default function CharacterCardComponent({character}) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={character.image} alt={character.name}/>
            </div>
            <div className="card-content">
                <h1>{character.name}</h1>
                <div className="status">
                    <div className="status-indicator"></div>
                    <span>{character.species} - {character.status}</span>
                </div>
                <div className="location">
                    Last known location: <br/>
                    <span>{character.location.name}</span>
                </div>
            </div>
        </div>
    )
}