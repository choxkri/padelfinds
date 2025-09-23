import * as cheerio from "cheerio"

export async function GET() {

  const endpoint = "https://www.babolat.com/nl/padel/padel-rackets.html"

  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html,application/xhtml+xml'
    },
    cache: 'no-store'

  })
  const html = await response.text()
  //console.log(html)
  const $ = cheerio.load(html)
  console.log($('h3.c-product-tile__product-name').text())
  const products: { title: string, price: string }[] = []
  $('li.product').each((_, el) => {
    products.push({
      title: $(el).find("h3").first().text(),
      price: $(el).find("span").first().text()

    })
  })

  return Response.json({count: products.length, products})
}