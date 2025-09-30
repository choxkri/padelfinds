import * as cheerio from "cheerio"
import { BabolatProduct } from "./BabolatTypes"

export async function GET() {

  const endpoint = "https://www.babolat.com/nl/padel/padel-rackets.html" //url to scan page with products in html


  //send request to endpoint using fetch
  const response = await fetch(endpoint, {
    headers: { 
      'User-Agent': 'Mozilla/5.0', //this header lets the webpage think we are a real user and not a program (prevent bot blocking)
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
  const $ = cheerio.load(html) //let cheerio library scan entire html file

  const products: BabolatProduct[] = []
  
  // we can search for an html element with "$(<element we're searching for>)" 
  $('div.col-6.col-sm-4.m-grid-results-product-tile').each((_, el) => {
    products.push({
      title: ArrayToString($(el).find("a.c-product-tile__product-link").first().attr("href")?.split("/")[2].split("-").map(n => Capitalize(n))),
      price: $(el).find("span.c-price__value").first().text().trim(),
      img_url: $(el).find("img.c-product-tile__tile-image.tile-image").first().attr("data-srcset")
    }) /* This code creates an object that contains 3 properties: title, price and img_url
          The object is then inserted into the array products with .push(<we create the object as we insert it>)
       */
  })

  return Response.json({count: products.length, products})
  /* says we return an response object that will look like this:
  {
    count: 3 <of course depending on the amount of products we we're able to scrape>
    products: [ <products is an array of type BabolatProduct (see line 41 and BabolatTypes.ts) so its items will follow that structure>
      {
        title: "product 1",
        price: "300 eu",
        img_url: "https://..."
      },
      {
        title: "product 2",
        etc.
      }
    ]
  }
  */
}