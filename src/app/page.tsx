"use client"
import Nav from "./components/Navbar"
import { useEffect, useState } from "react"
import ScrapePage from "./productPage"

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
    <Nav></Nav>
    <ScrapePage/>
  </div>
}