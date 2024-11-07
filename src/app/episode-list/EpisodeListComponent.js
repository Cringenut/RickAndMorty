// src/app/episode-list/EpisodeListComponent.js
import EpisodeCardComponent from "../../app/character/[id]/episodes/[episodeId]/EpisodeCardComponent";

export default function EpisodeListComponent({ episodes }) {
    return (
        <div className="episode-list">
            {episodes.map((episode) => (
                <EpisodeCardComponent key={episode.id} episode={episode} />
            ))}
        </div>
    );
}
