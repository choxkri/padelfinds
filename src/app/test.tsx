import axios from "axios";
import { Html } from "next/document";
import { useEffect, useState } from "react";
import { BabolatProduct } from "./api/scrapeAPI/babolat/BabolatProduct";
import { redirect } from "next/dist/server/api-utils";

export default function ScrapePage() {
  const [pageState, setPageState] = useState<BabolatRacketAPI>({ count: 0, products: [] })
  async function fetchData() {
    const response = await fetch('/api/scrapeAPI/babolat')
    const data = await response.json()
    setPageState(data)
  }

  type BabolatRacketAPI = {
    count: number,
    products: BabolatProduct[]
  }

  useEffect(() => {
    fetchData()
  }, [])
  return <div>
    <div>
      here will be header / navbar
    </div>
    ----------------------------
    <h1>Products</h1>
    {
      pageState.count > 0 && (
        <div onClick={() => window.open('https://example.com', '_blank', 'noopener,noreferrer')}>
          <h2>{pageState.products[1].title}</h2>
          <h3>{pageState.products[1].price}</h3>
          <img srcSet={pageState.products[1].img_url}></img>
        </div>
      )
    }
    </div>;
}
