"use client";

import "../../../src/styles/CardPageStyle.css";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EpisodeListComponent from "@/app/episode-list/EpisodeListComponent";

export default function EpisodeListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [episodes, setEpisodes] = useState([]);

    const season = searchParams.get('season');
    const sort = searchParams.get('sort');

    useEffect(() => {
        if (!season || !sort) {
            const defaultSeason = season || '1';
            const defaultSort = sort || 'asc';
            router.replace(`/episode-list?season=${defaultSeason}&sort=${defaultSort}`);
        }
    }, [season, sort, router]);

    useEffect(() => {
        // Fetch episodes when season or sort changes
        if (season && sort) {
            fetchEpisodes(season, sort).then(setEpisodes);
        }
    }, [season, sort]);

    if (!season || !sort) {
        return null;
    }

    const updateQueryParams = (newSeason: string, newSort: string) => {
        router.push(`/episode-list?season=${newSeason}&sort=${newSort}`);
    };

    return (
        <div>
            <div>
                <h3 style={{color: "white"}}>Select Season:</h3>
                {[1, 2].map((s) => (
                    <button
                        key={s}
                        onClick={() => updateQueryParams(s.toString(), sort || 'asc')}
                        style={{
                            margin: '0 5px',
                            backgroundColor: season === s.toString() ? 'forestgreen' : '#ddd',
                            color: season === s.toString() ? 'white' : 'black',
                            padding: '5px 10px',
                        }}
                    >
                        Season {s}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '10px' }}>
                <h3 style={{ color: "white" }}>Sort by:</h3>
                <button
                    onClick={() => updateQueryParams(season || '1', 'asc')}
                    style={{
                        marginRight: '5px',
                        backgroundColor: sort === 'asc' ? 'forestgreen' : '#ddd',
                        color: sort === 'asc' ? 'white' : 'black',
                        padding: '5px 10px',
                    }}
                >
                    Ascending
                </button>
                <button
                    onClick={() => updateQueryParams(season || '1', 'dsc')}
                    style={{
                        backgroundColor: sort === 'dsc' ? 'forestgreen' : '#ddd',
                        color: sort === 'dsc' ? 'white' : 'black',
                        padding: '5px 10px',
                    }}
                >
                    Descending
                </button>
            </div>

            <h1>Episodes</h1>
            <EpisodeListComponent episodes={episodes} />
        </div>
    );
}

async function fetchEpisodes(season: string, order: string) {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();

        const filteredEpisodes = data.results.filter((episode: any) => {
            const episodeSeason = episode.episode.slice(1, 3);
            return episodeSeason === String(season).padStart(2, '0');
        });

        return filteredEpisodes.sort((a: any, b: any) => {
            if (order === "asc") return a.id - b.id;
            if (order === "dsc") return b.id - a.id;
            return 0;
        });
    } catch (error) {
        return [];
    }
}
