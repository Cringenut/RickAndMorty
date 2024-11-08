"use client"

import { useRouter } from "next/navigation";
import "../styles/CardPageStyle.css"

export default function Home() {
  const router = useRouter();

  return (
      <>
          <div className="button-container">
              <button onClick={() => router.push(`/character/${1}`)}>Characters</button>
              <button onClick={() => router.push(`/character/${1}/episodes/${1}`)}>Episodes</button>
              <button onClick={() => router.push(`/episode-list`)}>Episode List</button>
          </div>
      </>
  );
}
