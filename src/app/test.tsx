import axios from "axios";
import { Html } from "next/document";
import { useEffect, useState } from "react";
import { BabolatProduct } from "./api/scrapeAPI/babolat/BabolatProduct";

export default function ScrapePage() {
  const [pageState, setPageState] = useState()
  async function fetchData() {
    const response = await fetch('api/scrapeAPI/babolat')
    const data = await response.json()
    setPageState(data["products"])
  }

  useEffect(() => {
    fetchData()
  }, [])
  return <div>
    {JSON.stringify(pageState)}
    </div>;
}
