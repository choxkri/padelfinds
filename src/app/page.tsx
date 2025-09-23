"use client"

import { useEffect, useState } from "react"
import ScrapePage from "./test"

export default function Home() {
  const [exampleState, setExampleState] = useState<CatAPI[]>([])
  const [players, setPlayers] = useState<ListPlayerAPI>({data: []})

  type CatAPI = {
    url: string
  }
  type Player = {
    name: string
    photo_url: string
  }
  type ListPlayerAPI = {
    data: Player[]
  }
  
  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/catAPI')
        const data = await response.json()
        setExampleState(data)

        const second = await fetch('/api/playersAPI')
        const newdata = await second.json()
        setPlayers(newdata)
    }
    
    fetchData();
  }, [])


  return <div>
    {/* <h1>
      hello world
    </h1>
    <button onClick={_ => alert(JSON.stringify(players["data"][9]))}>list of players</button>
    <div>
      {JSON.stringify(exampleState)}
    </div>
    <div>
      {players["data"].length > 0 && (
        <div>
          <h1>{players["data"][0].name}</h1>
          <img src={players["data"][0].photo_url}/>
        </div>
        
      )}
      
    </div>
    <div>
      {exampleState.length > 0 && (
        <img src={exampleState[0].url}/>
      )}
    </div> */}
    <ScrapePage/>
  </div>
}