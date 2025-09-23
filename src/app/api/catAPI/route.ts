export async function GET() {

  const endpoint = "https://api.thecatapi.com/v1/images/search";
  const response = await fetch(endpoint)

  const responseText = await response.text()

  const data = JSON.parse(responseText)

  return Response.json(data)
}
