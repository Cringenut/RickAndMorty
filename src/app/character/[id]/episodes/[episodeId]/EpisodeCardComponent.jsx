import "../../../../../styles/CardPageStyle.css"

export default function EpisodeCardComponent({episode}) {
    return (
        <div className="card">
            <div className="card-content">
                <h1>{episode.name}</h1>
                <div className="status">
                    <span>{episode.episode}</span>
                </div>
                <div className="location">
                    Air date: <br/>
                    <span>{episode.air_date}</span>
                </div>
            </div>
        </div>
    )
}