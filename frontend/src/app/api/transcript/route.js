export async function POST(req) {
    const body = await req.json()
  
    try {
      const response = await fetch("https://main-ui-8dzc.onrender.com/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
  
      if (!response.ok) {
        throw new Error("Failed to get response from server")
      }
  
      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  }
  
  