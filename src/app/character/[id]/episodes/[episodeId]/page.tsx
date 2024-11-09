import "../../../../../styles/CardPageStyle.css";
import { notFound } from "next/navigation";
import EpisodeCardComponent from "@/app/character/[id]/episodes/[episodeId]/EpisodeCardComponent";
import {fetchCharacter} from "@/app/character/[id]/page";
import CharacterCardComponent from "@/app/character/[id]/CharacterCardComponent";

export async function fetchEpisode({ url }: { url: string }) {
    try {
        const response = await fetch(url);
        const episode = await response.json();
        if (!episode || episode.error) {
            notFound();
        }

        return episode;
    } catch (err) {
        notFound();
    }
}

export default async function EpisodePage({ params }: { params: { id: string; episodeId: string } }) {
    const { id, episodeId } = await params;
    const characterUrl = `https://rickandmortyapi.com/api/character/${id}`;
    const episodeUrl = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    const episode = await fetchEpisode({ url: episodeUrl });
    if (!episode.characters.includes(characterUrl)) {
        notFound();
    }

    const character = await fetchCharacter({ url: characterUrl });

    return (
        <>
            <div className="container">
                <CharacterCardComponent character={character}/>
            </div>
            <div className="container">
                <EpisodeCardComponent episode={episode}/>
            </div>
        </>

    );
}
