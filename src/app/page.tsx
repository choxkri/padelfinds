"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [exampleState, setExampleState] = useState<CatAPI[]>([])

  type CatAPI = {
    url: string
  }
  
  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/catAPI')
        const data = await response.json()
        setExampleState(data)
    }
    
    fetchData();
  }, [])


  return <div>
    <h1>
      hello world
    </h1>
    {JSON.stringify(exampleState)}
    <img src={exampleState[0].url}></img>
  </div>
}