import axios from "axios";
import { Html } from "next/document";
import { useState } from "react";

export default function ScrapePage() {
  const [pageState, setPageState] = useState()
  async function scrapeSite() {
    const response = await axios.get("https://www.scrapingcourse.com/ecommerce/")
    const html = response.data
    setPageState(html)
    console.log(html)
  }
  scrapeSite()
  return <div>
    you can see the page
    </div>;
}
