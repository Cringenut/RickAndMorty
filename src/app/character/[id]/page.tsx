import "../../../styles/CardPageStyle.css"
import CharacterCardComponent from "@/app/character/[id]/CharacterCardComponent";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = await params;
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    try {
        const response = await fetch(url);
        const character = await response.json();

        return {
            title: character.name,
            description: `Details about ${character.name}, a ${character.species} - ${character.status} character from Rick and Morty.`,
        };
    } catch (err) {
        console.error("Couldn't fetch character for metadata:", err);
        return {
            title: "Character not found",
            description: "Details about a character from Rick and Morty.",
        };
    }
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    let character = null;
    try {
        const response = await fetch(url);
        character = await response.json();
    } catch (err) {
        console.error("Couldn't fetch character:", err);
    }

    return (
        <div className="container">
            <CharacterCardComponent character={character}/>
        </div>
    );
}
