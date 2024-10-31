import "../../../../../styles/CardPageStyle.css"
import {notFound} from "next/navigation";
import EpisodeCardComponent from "@/app/character/[id]/episodes/[episodeId]/EpisodeCardComponent";

export default async function EpisodePage({ params }: { params: { id: string; episodeId: string } }) {
    const { id, episodeId } = await params;
    const url = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    let episode = null;
    try {
        const response = await fetch(url);
        episode = await response.json();
        if (!episode || episode.error) {
            notFound();
        }
    } catch (err) {
        console.error("Couldn't fetch episode:", err);
        notFound();
    }

    return (
        <div className="container">
            <EpisodeCardComponent episode={episode}/>
        </div>
    );
}
