import axios from "axios";
import { Html } from "next/document";
import { useEffect, useState } from "react";

export default function ScrapePage() {
  const [pageState, setPageState] = useState()
  async function fetchData() {
    const response = await fetch('api/scrapeAPI')
    const data = await response.json()
    setPageState(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return <div>
    {JSON.stringify(pageState)}
    </div>;
}
