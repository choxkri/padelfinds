const UNSECURED_API_KEY = "PJVJIsg1baT3u85iswDsjBsNjXfeGDgJppP5NGYB737493ad"
export async function GET() {
  
  const endpoint = "https://en.fantasypadeltour.com/api/players";
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${UNSECURED_API_KEY}`,
      'Accept': 'application/json'
    }
  });

  const responseText = await response.text();
  const data = JSON.parse(responseText);

  return Response.json(data)
}
