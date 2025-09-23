import * as cheerio from "cheerio"

export async function GET() {

  const endpoint = "https://www.scrapingcourse.com/ecommerce/"

  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html,application/xhtml+xml'
    },
    cache: 'no-store'

  })
  const html = await response.text()
  const $ = cheerio.load(html)

  const products: { title: string }[] = []
  $('li.product').each((_, el) => {
    products.push({
      title: $(el).find("h2").first().text()
    })
  })

  return Response.json({count: products.length, products})
}