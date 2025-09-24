import * as cheerio from "cheerio"
import { BabolatProduct } from "./BabolatProduct"

export async function GET() {

  const endpoint = "https://www.babolat.com/nl/padel/padel-rackets.html"

  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html,application/xhtml+xml'
    },
    cache: 'no-store'

  })

  function Capitalize(word: string) : string {
    return word[0].toUpperCase() + word.slice(1)
  }

  function ArrayToString(arr: string[] | undefined) : string {
    if (arr === undefined) {
      return ""
    }
    var goodArr = arr as string[]
    var productName: string = ""
    goodArr.forEach(element => {
      productName += element
      productName += " "
    });

    return productName.trim()
  }

  
  const html = await response.text()
  const $ = cheerio.load(html)

  const products: BabolatProduct[] = []
  $('div.col-6.col-sm-4.m-grid-results-product-tile').each((_, el) => {
    products.push({
      title: ArrayToString($(el).find("a.c-product-tile__product-link").first().attr("href")?.split("/")[2].split("-").map(n => Capitalize(n))),
      price: $(el).find("span.c-price__value").first().text().trim(),
      img_url: $(el).find("img.c-product-tile__tile-image.tile-image").first().attr("srcset")
    })
  })

  return Response.json({count: products.length, products})
}